"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AppState,
  UserProfile,
  UserStats,
  UserWordProgress,
  UserLessonProgress,
  EarnedBadge,
  BadgeType,
  LessonStatus,
  DailyGoalMinutes,
  LearningGoal,
  ProficiencyLevel,
} from "@/lib/types";
import {
  calculateNextReview,
  createInitialProgress,
  isDueForReview,
  responseToQuality,
} from "@/lib/utils/spaced-repetition";
import { getLevelFromXP, updateStreak, checkForNewBadges, BADGES } from "@/lib/utils/xp";
import { format, addDays } from "date-fns";

const DEFAULT_STATS: UserStats = {
  totalXP: 0,
  currentLevel: 1,
  xpToNextLevel: 100,
  currentStreak: 0,
  longestStreak: 0,
  totalWordsLearned: 0,
  totalLessonsCompleted: 0,
  totalTimeMinutes: 0,
  todayXP: 0,
  todayMinutes: 0,
  lastActiveDate: "",
  startDate: new Date().toISOString().split("T")[0],
};

interface AppStore extends AppState {
  // Actions
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addXP: (amount: number, context?: string) => BadgeType[];
  recordWordAnswer: (
    wordId: string,
    wasCorrect: boolean,
    wasEasy?: boolean
  ) => void;
  markWordNew: (wordId: string) => void;
  completeLesson: (day: number, score: number, durationMinutes: number) => void;
  completeBlock: (day: number, blockId: string) => void;
  getDueReviewWords: () => string[];
  getWordProgress: (wordId: string) => UserWordProgress | null;
  getLessonStatus: (day: number) => LessonStatus;
  resetProgress: () => void;
  touchStreak: () => void;
  isOnboarded: () => boolean;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      profile: null,
      stats: DEFAULT_STATS,
      wordProgress: {},
      lessonProgress: {},
      earnedBadges: [],
      reviewQueue: [],

      isOnboarded: () => {
        return get().profile?.onboardingCompleted === true;
      },

      setProfile: (profile) => {
        set({ profile });
        get().touchStreak();
      },

      updateProfile: (updates) => {
        const current = get().profile;
        if (!current) return;
        set({ profile: { ...current, ...updates } });
      },

      touchStreak: () => {
        const stats = get().stats;
        const streakUpdates = updateStreak(stats);
        if (Object.keys(streakUpdates).length > 0) {
          set((state) => ({
            stats: { ...state.stats, ...streakUpdates },
          }));
        }
      },

      addXP: (amount, _context) => {
        const state = get();
        const newTotalXP = state.stats.totalXP + amount;
        const levelInfo = getLevelFromXP(newTotalXP);
        const today = new Date().toISOString().split("T")[0];
        const isNewDay = state.stats.lastActiveDate !== today;

        const updatedStats: UserStats = {
          ...state.stats,
          totalXP: newTotalXP,
          currentLevel: levelInfo.level,
          xpToNextLevel: levelInfo.xpToNextLevel,
          todayXP: isNewDay ? amount : state.stats.todayXP + amount,
          lastActiveDate: today,
        };

        set({ stats: updatedStats });

        // Check for badges
        const wordCount = Object.keys(state.wordProgress).length;
        const lessonCount = Object.values(state.lessonProgress).filter(
          (p) => p.status === "completed"
        ).length;
        const newBadges = checkForNewBadges(
          updatedStats,
          state.earnedBadges,
          wordCount,
          lessonCount,
          0,
          0
        );

        if (newBadges.length > 0) {
          const earned: EarnedBadge[] = newBadges.map((id) => ({
            badgeId: id,
            earnedAt: new Date().toISOString(),
          }));
          const badgeXP = newBadges.reduce((sum, id) => {
            const badge = BADGES.find((b) => b.id === id);
            return sum + (badge?.xpReward ?? 0);
          }, 0);

          set((s) => ({
            earnedBadges: [...s.earnedBadges, ...earned],
            stats: {
              ...s.stats,
              totalXP: s.stats.totalXP + badgeXP,
            },
          }));
        }

        return newBadges;
      },

      markWordNew: (wordId) => {
        const existing = get().wordProgress[wordId];
        if (existing) return;
        set((state) => ({
          wordProgress: {
            ...state.wordProgress,
            [wordId]: createInitialProgress(wordId),
          },
          stats: {
            ...state.stats,
            totalWordsLearned: state.stats.totalWordsLearned + 1,
          },
        }));
      },

      recordWordAnswer: (wordId, wasCorrect, wasEasy = false) => {
        const state = get();
        let current = state.wordProgress[wordId];
        if (!current) {
          current = createInitialProgress(wordId);
        }

        const quality = responseToQuality(wasCorrect, wasEasy);
        const updates = calculateNextReview(current, quality);

        set((s) => ({
          wordProgress: {
            ...s.wordProgress,
            [wordId]: { ...current, ...updates },
          },
        }));

        const xpAmount = wasCorrect ? 5 : 1;
        get().addXP(xpAmount);

        // Update review queue
        const updated = { ...current, ...updates };
        set((s) => ({
          reviewQueue: isDueForReview(updated as UserWordProgress)
            ? [...new Set([...s.reviewQueue, wordId])]
            : s.reviewQueue.filter((id) => id !== wordId),
        }));
      },

      completeLesson: (day, score, durationMinutes) => {
        const state = get();
        const existing = state.lessonProgress[day];
        const xpEarned = Math.round((score / 100) * 150);

        set((s) => ({
          lessonProgress: {
            ...s.lessonProgress,
            [day]: {
              day,
              status: "completed" as LessonStatus,
              completedBlocks: existing?.completedBlocks ?? [],
              xpEarned,
              completedAt: new Date().toISOString(),
              score,
            },
          },
          stats: {
            ...s.stats,
            totalLessonsCompleted: s.stats.totalLessonsCompleted + (existing?.status === "completed" ? 0 : 1),
            totalTimeMinutes: s.stats.totalTimeMinutes + durationMinutes,
            todayMinutes: s.stats.todayMinutes + durationMinutes,
          },
        }));

        get().addXP(xpEarned);
      },

      completeBlock: (day, blockId) => {
        set((s) => {
          const existing = s.lessonProgress[day];
          const completed = new Set(existing?.completedBlocks ?? []);
          completed.add(blockId);
          return {
            lessonProgress: {
              ...s.lessonProgress,
              [day]: {
                day,
                status: "in_progress" as LessonStatus,
                completedBlocks: Array.from(completed),
                xpEarned: existing?.xpEarned ?? 0,
                completedAt: existing?.completedAt,
                score: existing?.score,
              },
            },
          };
        });
        get().addXP(15);
      },

      getDueReviewWords: () => {
        const { wordProgress } = get();
        return Object.values(wordProgress)
          .filter(isDueForReview)
          .map((p) => p.wordId);
      },

      getWordProgress: (wordId) => {
        return get().wordProgress[wordId] ?? null;
      },

      getLessonStatus: (day) => {
        const state = get();
        const progress = state.lessonProgress[day];
        if (progress?.status === "completed") return "completed";
        if (progress?.status === "in_progress") return "in_progress";

        // Day 1 is always available
        if (day === 1) return "available";

        // Check if previous day is completed
        const prevProgress = state.lessonProgress[day - 1];
        if (prevProgress?.status === "completed") return "available";

        return "locked";
      },

      resetProgress: () => {
        set({
          stats: DEFAULT_STATS,
          wordProgress: {},
          lessonProgress: {},
          earnedBadges: [],
          reviewQueue: [],
        });
      },
    }),
    {
      name: "jadra-app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        stats: state.stats,
        wordProgress: state.wordProgress,
        lessonProgress: state.lessonProgress,
        earnedBadges: state.earnedBadges,
        reviewQueue: state.reviewQueue,
      }),
    }
  )
);

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Brain, Zap, ChevronRight, Clock, Star, Target, MessageCircle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StreakCard } from "@/components/ui/StreakCard";
import { XPBar } from "@/components/ui/XPBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useAppStore } from "@/lib/store/appStore";
import { LESSON_DAYS } from "@/data/lesson-days";
import { VOCABULARY } from "@/data/vocabulary";
import { getLevelFromXP } from "@/lib/utils/xp";
import { cn } from "@/lib/utils/cn";
import { formatMinutes } from "@/lib/utils/formatting";

export default function DashboardPage() {
  const { stats, profile, lessonProgress, wordProgress, getDueReviewWords } = useAppStore();

  const dueWords = getDueReviewWords();
  const levelInfo = getLevelFromXP(stats.totalXP);

  // Find today's recommended lesson
  const recommendedDay = useMemo(() => {
    for (let d = 1; d <= 60; d++) {
      const prog = lessonProgress[d];
      if (!prog || prog.status !== "completed") return d;
    }
    return 60;
  }, [lessonProgress]);

  const recommendedLesson = LESSON_DAYS.find((l) => l.day === recommendedDay);
  const completedLessons = Object.values(lessonProgress).filter(
    (p) => p.status === "completed"
  ).length;
  const totalLessons = 60;
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  const masteredWords = Object.values(wordProgress).filter(
    (w) => w.status === "mastered"
  ).length;
  const totalWordsInProgress = Object.keys(wordProgress).length;

  const dailyProgress = profile
    ? Math.min(100, Math.round((stats.todayMinutes / profile.dailyGoalMinutes) * 100))
    : 0;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Goedemorgen!";
    if (hour < 17) return "Goedemiddag!";
    return "Goedenavond!";
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-5 px-4 pt-6 pb-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-text-secondary text-sm">{greeting()}</p>
            <h1 className="text-2xl font-display font-bold text-text-primary">
              Laten we leren 🇭🇷
            </h1>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-coral flex items-center justify-center shadow-glow">
            <span className="text-base font-bold text-white">J</span>
          </div>
        </div>

        {/* XP bar */}
        <XPBar
          totalXP={stats.totalXP}
          level={levelInfo.level}
          xpToNextLevel={levelInfo.xpToNextLevel}
          xpInCurrentLevel={levelInfo.xpInCurrentLevel}
        />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl p-3 bg-bg-card border border-border-default space-y-1"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-coral/10 flex items-center justify-center">
              <Zap size={14} className="text-brand-coral" />
            </div>
            <p className="text-lg font-bold text-text-primary">{stats.currentStreak}</p>
            <p className="text-2xs text-text-secondary">dagen streak</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl p-3 bg-bg-card border border-border-default space-y-1"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-teal/10 flex items-center justify-center">
              <Brain size={14} className="text-brand-teal" />
            </div>
            <p className="text-lg font-bold text-text-primary">{totalWordsInProgress}</p>
            <p className="text-2xs text-text-secondary">woorden actief</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl p-3 bg-bg-card border border-border-default space-y-1"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-gold/10 flex items-center justify-center">
              <Star size={14} className="text-brand-gold" />
            </div>
            <p className="text-lg font-bold text-text-primary">{stats.todayXP}</p>
            <p className="text-2xs text-text-secondary">XP vandaag</p>
          </motion.div>
        </div>

        {/* Daily goal progress */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-3xl p-4 bg-bg-card border border-border-default"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-brand-teal" />
                <span className="text-sm font-semibold text-text-primary">Dagdoel</span>
              </div>
              <span className="text-xs text-text-secondary">
                {stats.todayMinutes}/{profile.dailyGoalMinutes} min
              </span>
            </div>
            <div className="flex items-center gap-4">
              <ProgressRing
                percent={dailyProgress}
                size={64}
                strokeWidth={5}
                color="#00D4B8"
              >
                <span className="text-xs font-bold text-brand-teal">{dailyProgress}%</span>
              </ProgressRing>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-text-primary font-medium">
                  {dailyProgress >= 100
                    ? "🎉 Dagdoel bereikt!"
                    : dailyProgress >= 50
                    ? "Op de helft — doorgaan!"
                    : "Begin je dagelijkse sessie!"}
                </p>
                <p className="text-xs text-text-secondary">
                  {dailyProgress < 100
                    ? `Nog ${profile.dailyGoalMinutes - stats.todayMinutes} minuten te gaan`
                    : `${stats.todayXP} XP verdiend vandaag`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommended lesson */}
        {recommendedLesson && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-text-primary">Aanbevolen voor vandaag</h2>
              <Link
                href="/learn"
                className="text-xs text-brand-coral hover:underline"
              >
                Alle lessen
              </Link>
            </div>
            <Link href={`/learn/day/${recommendedLesson.day}`}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="rounded-3xl p-5 bg-gradient-to-br from-brand-coral/15 to-brand-red/5 border border-brand-coral/20 hover:border-brand-coral/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-coral flex items-center justify-center shrink-0">
                    <BookOpen size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-text-primary">{recommendedLesson.title}</p>
                    <p className="text-sm text-text-secondary truncate mt-0.5">{recommendedLesson.theme}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-text-muted">
                        <Clock size={11} />
                        <span className="text-2xs">~60 min</span>
                      </div>
                      <div className="flex items-center gap-1 text-text-muted">
                        <Star size={11} />
                        <span className="text-2xs">{recommendedLesson.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-brand-coral shrink-0 mt-1" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}

        {/* Review due */}
        {dueWords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Link href="/review">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="rounded-3xl p-4 bg-bg-card border border-brand-gold/20 hover:border-brand-gold/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                    <Brain size={18} className="text-brand-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary">
                      {dueWords.length} woorden te reviewen
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Houd je spaced repetition bij!
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/20">
                    REVIEW
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}

        {/* 2-maanden voortgang */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl p-4 bg-bg-card border border-border-default"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-text-primary">2-maanden doel</h2>
            <span className="text-xs text-brand-coral font-bold">{overallProgress}%</span>
          </div>
          <div className="flex items-center gap-4">
            <ProgressRing
              percent={overallProgress}
              size={56}
              strokeWidth={5}
              color="#FF6B4A"
            >
              <span className="text-2xs font-bold text-brand-coral">{completedLessons}</span>
            </ProgressRing>
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Lessen voltooid</span>
                <span className="text-text-primary font-medium">{completedLessons}/{totalLessons}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-coral rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Woorden beheerst</span>
                <span className="text-text-primary font-medium">{masteredWords}/{VOCABULARY.length}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="grid grid-cols-3 gap-3"
        >
          <Link href="/vocabulary">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="rounded-3xl p-3 bg-bg-card border border-border-default hover:border-brand-teal/30 transition-all"
            >
              <Brain size={18} className="text-brand-teal mb-2" />
              <p className="text-xs font-semibold text-text-primary">Woorden</p>
              <p className="text-2xs text-text-secondary mt-0.5">{VOCABULARY.length}+</p>
            </motion.div>
          </Link>
          <Link href="/grammar">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="rounded-3xl p-3 bg-bg-card border border-border-default hover:border-brand-gold/30 transition-all"
            >
              <BookOpen size={18} className="text-brand-gold mb-2" />
              <p className="text-xs font-semibold text-text-primary">Grammatica</p>
              <p className="text-2xs text-text-secondary mt-0.5">20 lessen</p>
            </motion.div>
          </Link>
          <Link href="/scenarios">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="rounded-3xl p-3 bg-bg-card border border-border-default hover:border-brand-coral/30 transition-all"
            >
              <MessageCircle size={18} className="text-brand-coral mb-2" />
              <p className="text-xs font-semibold text-text-primary">Scenario&apos;s</p>
              <p className="text-2xs text-text-secondary mt-0.5">10 dialogen</p>
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </AppShell>
  );
}

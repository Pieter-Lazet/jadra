import type { UserWordProgress, WordStatus } from "@/lib/types";
import { addDays, format, parseISO, isAfter } from "date-fns";

// SM-2 spaced repetition algorithm
// Quality: 0-5 (0=complete blackout, 5=perfect)
// Initial ease factor: 2.5
// After each review: newEF = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
// If EF < 1.3, set to 1.3
// Interval calculation:
//   rep 1: 1 day
//   rep 2: 6 days
//   rep n: prev_interval * EF

export function calculateNextReview(
  progress: UserWordProgress,
  quality: 0 | 1 | 2 | 3 | 4 | 5
): Partial<UserWordProgress> {
  const now = new Date();
  let { interval, easeFactor, repetitions } = progress;

  if (quality < 3) {
    // Failed — reset repetitions, keep short interval
    repetitions = 0;
    interval = 1;
  } else {
    // Success
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const nextReviewDate = format(addDays(now, interval), "yyyy-MM-dd");

  let status: WordStatus = "learning";
  if (repetitions >= 5 && easeFactor >= 2.0) {
    status = "mastered";
  } else if (repetitions >= 2) {
    status = "reviewing";
  } else if (repetitions === 0) {
    status = "new";
  }

  return {
    interval,
    easeFactor,
    repetitions,
    nextReviewDate,
    lastReviewedAt: now.toISOString(),
    status,
    correctCount: quality >= 3 ? progress.correctCount + 1 : progress.correctCount,
    incorrectCount: quality < 3 ? progress.incorrectCount + 1 : progress.incorrectCount,
  };
}

export function isDueForReview(progress: UserWordProgress): boolean {
  const today = new Date();
  const reviewDate = parseISO(progress.nextReviewDate);
  return isAfter(today, reviewDate) || format(today, "yyyy-MM-dd") === progress.nextReviewDate;
}

export function createInitialProgress(wordId: string): UserWordProgress {
  const today = format(new Date(), "yyyy-MM-dd");
  return {
    wordId,
    status: "new",
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewDate: today,
    lastReviewedAt: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0,
  };
}

// Map user response to quality
export function responseToQuality(
  wasCorrect: boolean,
  wasEasy: boolean
): 0 | 1 | 2 | 3 | 4 | 5 {
  if (!wasCorrect) return 1;
  if (wasEasy) return 5;
  return 3;
}

export function getReviewStats(progressMap: Record<string, UserWordProgress>) {
  const all = Object.values(progressMap);
  return {
    total: all.length,
    new: all.filter((p) => p.status === "new").length,
    learning: all.filter((p) => p.status === "learning").length,
    reviewing: all.filter((p) => p.status === "reviewing").length,
    mastered: all.filter((p) => p.status === "mastered").length,
    dueToday: all.filter(isDueForReview).length,
  };
}

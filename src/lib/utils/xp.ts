import type { Badge, BadgeType, EarnedBadge, UserStats } from "@/lib/types";

// Level thresholds: XP needed per level (cumulative)
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  900,    // Level 5
  1400,   // Level 6
  2000,   // Level 7
  2750,   // Level 8
  3600,   // Level 9
  4600,   // Level 10
  5800,   // Level 11
  7200,   // Level 12
  8800,   // Level 13
  10600,  // Level 14
  12600,  // Level 15
  15000,  // Level 16
  18000,  // Level 17
  21500,  // Level 18
  25500,  // Level 19
  30000,  // Level 20
];

export function getLevelFromXP(totalXP: number): {
  level: number;
  xpToNextLevel: number;
  xpInCurrentLevel: number;
  progressPercent: number;
} {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpInCurrentLevel = totalXP - currentThreshold;
  const xpNeededForNext = nextThreshold - currentThreshold;
  const xpToNextLevel = nextThreshold - totalXP;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100));

  return { level, xpToNextLevel, xpInCurrentLevel, progressPercent };
}

export const BADGES: Badge[] = [
  {
    id: "first_lesson",
    title: "Eerste Les!",
    description: "Je hebt je eerste les voltooid.",
    icon: "🎉",
    xpReward: 50,
    condition: "Voltooi 1 les",
  },
  {
    id: "first_word",
    title: "Eerste Woord",
    description: "Je hebt je eerste woord geleerd.",
    icon: "📝",
    xpReward: 10,
    condition: "Leer 1 woord",
  },
  {
    id: "streak_3",
    title: "Op Rolletjes",
    description: "3 dagen achter elkaar geleerd!",
    icon: "🔥",
    xpReward: 50,
    condition: "3 dagen streak",
  },
  {
    id: "streak_7",
    title: "Een Hele Week!",
    description: "7 dagen streak bereikt!",
    icon: "⚡",
    xpReward: 100,
    condition: "7 dagen streak",
  },
  {
    id: "streak_30",
    title: "IJzeren Discipline",
    description: "30 dagen streak! Ongelooflijk.",
    icon: "💎",
    xpReward: 500,
    condition: "30 dagen streak",
  },
  {
    id: "words_10",
    title: "Woordenschatstarter",
    description: "10 woorden geleerd!",
    icon: "📚",
    xpReward: 30,
    condition: "Leer 10 woorden",
  },
  {
    id: "words_50",
    title: "50 Woorden!",
    description: "50 woorden geleerd!",
    icon: "🌟",
    xpReward: 100,
    condition: "Leer 50 woorden",
  },
  {
    id: "words_100",
    title: "Woordenmeester",
    description: "100 woorden geleerd!",
    icon: "🏆",
    xpReward: 200,
    condition: "Leer 100 woorden",
  },
  {
    id: "words_500",
    title: "Halfweg naar 1000!",
    description: "500 woorden geleerd!",
    icon: "🦁",
    xpReward: 500,
    condition: "Leer 500 woorden",
  },
  {
    id: "perfect_quiz",
    title: "Perfecte Score",
    description: "100% op een quiz!",
    icon: "✨",
    xpReward: 75,
    condition: "Perfecte quiz score",
  },
  {
    id: "grammar_master",
    title: "Grammatica Guru",
    description: "5 grammatica lessen voltooid.",
    icon: "📖",
    xpReward: 150,
    condition: "Voltooi 5 grammatica lessen",
  },
  {
    id: "scenario_complete",
    title: "Eerste Gesprek!",
    description: "Je eerste scenario voltooid!",
    icon: "💬",
    xpReward: 75,
    condition: "Voltooi 1 scenario",
  },
  {
    id: "week_1",
    title: "Eerste Week!",
    description: "7 lessen voltooid!",
    icon: "🎯",
    xpReward: 150,
    condition: "Voltooi 7 lessen",
  },
  {
    id: "week_4",
    title: "Maand vol!",
    description: "28 lessen voltooid!",
    icon: "🌊",
    xpReward: 300,
    condition: "Voltooi 28 lessen",
  },
  {
    id: "two_months",
    title: "Kroatisch Kampioen!",
    description: "60 lessen voltooid!",
    icon: "🇭🇷",
    xpReward: 1000,
    condition: "Voltooi alle 60 lessen",
  },
];

export function checkForNewBadges(
  stats: UserStats,
  currentBadges: EarnedBadge[],
  wordCount: number,
  lessonCount: number,
  grammarCount: number,
  scenarioCount: number
): BadgeType[] {
  const earned = new Set(currentBadges.map((b) => b.badgeId));
  const newBadges: BadgeType[] = [];

  const check = (id: BadgeType, condition: boolean) => {
    if (condition && !earned.has(id)) {
      newBadges.push(id);
    }
  };

  check("first_lesson", lessonCount >= 1);
  check("first_word", wordCount >= 1);
  check("streak_3", stats.currentStreak >= 3);
  check("streak_7", stats.currentStreak >= 7);
  check("streak_30", stats.currentStreak >= 30);
  check("words_10", wordCount >= 10);
  check("words_50", wordCount >= 50);
  check("words_100", wordCount >= 100);
  check("words_500", wordCount >= 500);
  check("grammar_master", grammarCount >= 5);
  check("scenario_complete", scenarioCount >= 1);
  check("week_1", lessonCount >= 7);
  check("week_4", lessonCount >= 28);
  check("two_months", lessonCount >= 60);

  return newBadges;
}

export function updateStreak(stats: UserStats): Partial<UserStats> {
  const today = new Date().toISOString().split("T")[0];
  const lastActive = stats.lastActiveDate;

  if (lastActive === today) {
    return {}; // Already active today
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let newStreak = stats.currentStreak;
  if (lastActive === yesterdayStr) {
    newStreak = stats.currentStreak + 1;
  } else if (lastActive !== today) {
    newStreak = 1; // Streak broken
  }

  const longestStreak = Math.max(stats.longestStreak, newStreak);

  return {
    currentStreak: newStreak,
    longestStreak,
    lastActiveDate: today,
  };
}

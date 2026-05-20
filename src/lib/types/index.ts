// ─── Vocabulary ───────────────────────────────────────────────────────────────

export type WordDifficulty = "beginner" | "intermediate" | "advanced";
export type WordStatus = "new" | "learning" | "reviewing" | "mastered";

export type VocabCategory =
  | "greetings"
  | "family"
  | "food_drink"
  | "travel"
  | "work"
  | "school"
  | "numbers"
  | "time"
  | "days_months"
  | "verbs"
  | "adjectives"
  | "directions"
  | "restaurant"
  | "emergency"
  | "daily_conversation"
  | "love_dating"
  | "sports_gym"
  | "money"
  | "housing"
  | "transport"
  | "nature"
  | "body"
  | "clothes"
  | "weather";

export interface VocabWord {
  id: string;
  croatian: string;
  dutch: string;
  english: string;
  pronunciation: string; // phonetic hint
  exampleCroatian: string;
  exampleDutch: string;
  category: VocabCategory;
  difficulty: WordDifficulty;
  gender?: "m" | "f" | "n"; // grammatical gender
  tags?: string[];
}

// ─── User Word Progress ────────────────────────────────────────────────────────

export interface UserWordProgress {
  wordId: string;
  status: WordStatus;
  interval: number; // days until next review (spaced repetition)
  easeFactor: number; // SM-2 ease factor (default 2.5)
  repetitions: number; // successful repetitions in a row
  nextReviewDate: string; // ISO date string
  lastReviewedAt: string; // ISO date string
  correctCount: number;
  incorrectCount: number;
}

// ─── Grammar ──────────────────────────────────────────────────────────────────

export interface GrammarLesson {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  dayUnlock: number; // which day this unlocks
  order: number;
  explanation: string;
  rules: GrammarRule[];
  examples: GrammarExample[];
  cheatSheet?: string[];
  exercises: GrammarExercise[];
}

export interface GrammarRule {
  title: string;
  description: string;
  example?: string;
}

export interface GrammarExample {
  croatian: string;
  dutch: string;
  note?: string;
}

export interface GrammarExercise {
  id: string;
  type: "fill_blank" | "multiple_choice" | "translate";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

// ─── Lessons / Daily Plan ────────────────────────────────────────────────────

export type LessonBlockType =
  | "vocabulary"
  | "grammar"
  | "listening"
  | "reading"
  | "quiz"
  | "review"
  | "scenario"
  | "flashcard"
  | "typing";

export interface LessonBlock {
  id: string;
  type: LessonBlockType;
  title: string;
  durationMinutes: number;
  contentIds: string[]; // word IDs, grammar IDs, etc.
  description?: string;
}

export interface DayLesson {
  day: number;
  title: string;
  theme: string;
  xpReward: number;
  blocks: LessonBlock[];
  newWordCount: number;
  grammarFocus?: string;
  scenarioId?: string;
}

export type LessonStatus = "locked" | "available" | "in_progress" | "completed";

export interface UserLessonProgress {
  day: number;
  status: LessonStatus;
  completedBlocks: string[]; // block IDs
  xpEarned: number;
  completedAt?: string; // ISO date
  score?: number; // 0-100
}

// ─── Scenarios / Conversations ────────────────────────────────────────────────

export interface ScenarioTurn {
  id: string;
  speaker: "npc" | "user";
  croatian: string;
  dutch: string;
  options?: ScenarioOption[]; // only for user turns with choices
}

export interface ScenarioOption {
  id: string;
  croatian: string;
  dutch: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface Scenario {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  setting: string;
  difficulty: WordDifficulty;
  dayUnlock: number;
  xpReward: number;
  turns: ScenarioTurn[];
  vocabulary?: string[]; // word IDs used in this scenario
}

// ─── Gamification ─────────────────────────────────────────────────────────────

export type BadgeType =
  | "first_lesson"
  | "first_word"
  | "streak_3"
  | "streak_7"
  | "streak_30"
  | "words_10"
  | "words_50"
  | "words_100"
  | "words_500"
  | "perfect_quiz"
  | "grammar_master"
  | "scenario_complete"
  | "week_1"
  | "week_4"
  | "two_months";

export interface Badge {
  id: BadgeType;
  title: string;
  description: string;
  icon: string; // emoji
  xpReward: number;
  condition: string; // human-readable condition
}

export interface EarnedBadge {
  badgeId: BadgeType;
  earnedAt: string; // ISO date
}

// ─── User Profile / Progress ──────────────────────────────────────────────────

export type LearningGoal =
  | "travel"
  | "family"
  | "culture"
  | "work"
  | "challenge"
  | "fun";
export type ProficiencyLevel = "beginner" | "some_experience" | "intermediate";
export type DailyGoalMinutes = 15 | 30 | 45 | 60;

export interface UserProfile {
  id: string;
  name?: string;
  learningGoal: LearningGoal;
  proficiencyLevel: ProficiencyLevel;
  dailyGoalMinutes: DailyGoalMinutes;
  onboardingCompleted: boolean;
  createdAt: string;
  soundEnabled: boolean;
  animationsEnabled: boolean;
}

export interface UserStats {
  totalXP: number;
  currentLevel: number;
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  totalWordsLearned: number;
  totalLessonsCompleted: number;
  totalTimeMinutes: number;
  todayXP: number;
  todayMinutes: number;
  lastActiveDate: string; // ISO date
  startDate: string; // ISO date
}

export interface AppState {
  profile: UserProfile | null;
  stats: UserStats;
  wordProgress: Record<string, UserWordProgress>;
  lessonProgress: Record<number, UserLessonProgress>; // keyed by day number
  earnedBadges: EarnedBadge[];
  reviewQueue: string[]; // word IDs due for review
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export type QuizType =
  | "multiple_choice_cr_nl"
  | "multiple_choice_nl_cr"
  | "typing_cr_nl"
  | "typing_nl_cr"
  | "flashcard"
  | "match_pairs";

export interface QuizQuestion {
  id: string;
  type: QuizType;
  wordId: string;
  question: string;
  correctAnswer: string;
  options?: string[]; // for multiple choice
  hint?: string;
}

// ─── XP system ───────────────────────────────────────────────────────────────

export interface XPEvent {
  id: string;
  type:
    | "lesson_complete"
    | "word_learned"
    | "quiz_correct"
    | "streak_bonus"
    | "perfect_lesson"
    | "badge_earned";
  amount: number;
  timestamp: string;
  context?: string;
}

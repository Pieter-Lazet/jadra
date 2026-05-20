"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, Star, Lock, Play } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Flashcard } from "@/components/learning/Flashcard";
import { MultipleChoice } from "@/components/learning/MultipleChoice";
import { TypingChallenge } from "@/components/learning/TypingChallenge";
import { GrammarCard } from "@/components/learning/GrammarCard";
import { ScenarioChat } from "@/components/learning/ScenarioChat";
import { RewardModal } from "@/components/ui/RewardModal";
import { useAppStore } from "@/lib/store/appStore";
import { LESSON_DAYS } from "@/data/lesson-days";
import { VOCABULARY } from "@/data/vocabulary";
import { GRAMMAR_LESSONS } from "@/data/grammar-lessons";
import { SCENARIOS } from "@/data/scenarios";
import type { LessonBlock, VocabWord } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

type ViewState = "overview" | "block" | "done";

interface QuizState {
  words: VocabWord[];
  currentIdx: number;
  correct: number;
  total: number;
}

export default function DayLessonPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: dayParam } = use(params);
  const day = parseInt(dayParam, 10);
  const router = useRouter();

  const { getLessonStatus, completeBlock, completeLesson, markWordNew, recordWordAnswer, addXP } = useAppStore();
  const lessonProgress = useAppStore((s) => s.lessonProgress[day]);

  const [view, setView] = useState<ViewState>("overview");
  const [activeBlock, setActiveBlock] = useState<LessonBlock | null>(null);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [rewardXP, setRewardXP] = useState(0);

  const lesson = LESSON_DAYS.find((l) => l.day === day);
  const status = getLessonStatus(day);

  if (!lesson) {
    return (
      <AppShell>
        <MobileHeader title="Niet gevonden" showBack />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <p className="text-text-secondary">Les niet gevonden</p>
        </div>
      </AppShell>
    );
  }

  if (status === "locked") {
    return (
      <AppShell>
        <MobileHeader title={lesson.title} showBack />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="w-16 h-16 rounded-3xl bg-bg-card border border-border-default flex items-center justify-center">
            <Lock size={28} className="text-text-muted" />
          </div>
          <h2 className="text-xl font-bold text-text-primary">Les vergrendeld</h2>
          <p className="text-text-secondary">Voltooi eerst dag {day - 1} om dit te ontgrendelen.</p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.back()}
            className="px-6 py-3 rounded-2xl bg-bg-card border border-border-default text-text-primary"
          >
            Terug
          </motion.button>
        </div>
      </AppShell>
    );
  }

  const handleStartBlock = (block: LessonBlock) => {
    setActiveBlock(block);

    if (block.type === "vocabulary" || block.type === "flashcard") {
      const words = block.contentIds
        .map((id) => VOCABULARY.find((w) => w.id === id))
        .filter((w): w is VocabWord => !!w);
      // Mark words as new
      words.forEach((w) => markWordNew(w.id));
      setQuizState({ words, currentIdx: 0, correct: 0, total: words.length });
    }

    setView("block");
  };

  const handleBlockComplete = (score = 100) => {
    if (!activeBlock) return;
    completeBlock(day, activeBlock.id);
    addXP(20);

    // Check if all blocks done
    const allCompleted = lesson.blocks.every(
      (b) => b.id === activeBlock.id || lessonProgress?.completedBlocks?.includes(b.id)
    );

    setView("overview");
    setActiveBlock(null);
    setQuizState(null);

    if (allCompleted) {
      const finalScore = Math.max(70, score);
      completeLesson(day, finalScore, 60);
      setRewardXP(lesson.xpReward);
      setShowReward(true);
    }
  };

  const handleFlashcardKnew = () => {
    if (!quizState || !activeBlock) return;
    const word = quizState.words[quizState.currentIdx];
    recordWordAnswer(word.id, true, false);
    if (quizState.currentIdx >= quizState.words.length - 1) {
      handleBlockComplete(100);
    } else {
      setQuizState({ ...quizState, currentIdx: quizState.currentIdx + 1, correct: quizState.correct + 1 });
    }
  };

  const handleFlashcardDidntKnow = () => {
    if (!quizState || !activeBlock) return;
    const word = quizState.words[quizState.currentIdx];
    recordWordAnswer(word.id, false, false);
    if (quizState.currentIdx >= quizState.words.length - 1) {
      const score = Math.round((quizState.correct / quizState.total) * 100);
      handleBlockComplete(score);
    } else {
      setQuizState({ ...quizState, currentIdx: quizState.currentIdx + 1 });
    }
  };

  // Render active block content
  const renderBlockContent = () => {
    if (!activeBlock) return null;

    if ((activeBlock.type === "vocabulary" || activeBlock.type === "flashcard") && quizState) {
      const word = quizState.words[quizState.currentIdx];
      if (!word) return null;
      return (
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setView("overview"); setActiveBlock(null); setQuizState(null); }}
              className="text-sm text-text-secondary"
            >
              ← Terug
            </motion.button>
            <span className="text-sm text-text-secondary">
              {quizState.currentIdx + 1}/{quizState.total}
            </span>
          </div>
          <Flashcard
            word={word}
            onKnew={handleFlashcardKnew}
            onDidntKnow={handleFlashcardDidntKnow}
            showProgress={`${quizState.currentIdx + 1} van ${quizState.total}`}
          />
        </div>
      );
    }

    if (activeBlock.type === "grammar") {
      const grammarLesson = GRAMMAR_LESSONS.find(
        (g) => g.id === activeBlock.contentIds[0]
      );
      if (!grammarLesson) return null;
      return (
        <div className="px-4 py-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setView("overview"); setActiveBlock(null); }}
            className="text-sm text-text-secondary mb-4"
          >
            ← Terug
          </motion.button>
          <GrammarCard lesson={grammarLesson} onComplete={handleBlockComplete} />
        </div>
      );
    }

    if (activeBlock.type === "scenario") {
      const scenario = SCENARIOS.find(
        (s) => s.id === activeBlock.contentIds[0]
      );
      if (!scenario) return null;
      return (
        <div className="flex flex-col h-full">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setView("overview"); setActiveBlock(null); }}
              className="text-sm text-text-secondary"
            >
              ← Terug
            </motion.button>
            <div>
              <p className="text-sm font-semibold text-text-primary">{scenario.title}</p>
              <p className="text-xs text-text-secondary">{scenario.subtitle}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ScenarioChat scenario={scenario} onComplete={handleBlockComplete} />
          </div>
        </div>
      );
    }

    if (activeBlock.type === "quiz") {
      const words = activeBlock.contentIds
        .map((id) => VOCABULARY.find((w) => w.id === id))
        .filter((w): w is VocabWord => !!w);

      if (!quizState && words.length > 0) {
        setQuizState({ words, currentIdx: 0, correct: 0, total: words.length });
        return null;
      }

      if (!quizState) return null;

      const word = quizState.words[quizState.currentIdx];
      if (!word) return null;

      const options = [word.dutch];
      const otherWords = VOCABULARY.filter((w) => w.id !== word.id && w.dutch !== word.dutch);
      while (options.length < 4 && otherWords.length > 0) {
        const idx = Math.floor(Math.random() * otherWords.length);
        options.push(otherWords.splice(idx, 1)[0].dutch);
      }
      options.sort(() => Math.random() - 0.5);

      return (
        <div className="px-4 py-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setView("overview"); setActiveBlock(null); setQuizState(null); }}
            className="text-sm text-text-secondary mb-4"
          >
            ← Terug
          </motion.button>
          <MultipleChoice
            question={word.croatian}
            options={options}
            correctAnswer={word.dutch}
            hint={`[${word.pronunciation}]`}
            context="Kroatisch → Nederlands"
            onAnswer={(correct) => {
              recordWordAnswer(word.id, correct, false);
              if (quizState.currentIdx >= quizState.total - 1) {
                handleBlockComplete(Math.round(((quizState.correct + (correct ? 1 : 0)) / quizState.total) * 100));
              } else {
                setQuizState({
                  ...quizState,
                  currentIdx: quizState.currentIdx + 1,
                  correct: quizState.correct + (correct ? 1 : 0),
                });
              }
            }}
            showProgress={`${quizState.currentIdx + 1}/${quizState.total}`}
          />
        </div>
      );
    }

    // Typing block
    if (activeBlock.type === "typing") {
      const words = activeBlock.contentIds
        .map((id) => VOCABULARY.find((w) => w.id === id))
        .filter((w): w is VocabWord => !!w);

      if (!quizState && words.length > 0) {
        setQuizState({ words, currentIdx: 0, correct: 0, total: words.length });
        return null;
      }

      if (!quizState) return null;
      const word = quizState.words[quizState.currentIdx];
      if (!word) return null;

      return (
        <div className="px-4 py-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setView("overview"); setActiveBlock(null); setQuizState(null); }}
            className="text-sm text-text-secondary mb-4"
          >
            ← Terug
          </motion.button>
          <TypingChallenge
            question={word.croatian}
            correctAnswer={word.dutch}
            acceptableAnswers={word.english ? [word.english] : []}
            hint={`[${word.pronunciation}]`}
            context="Kroatisch → Nederlands"
            showProgress={`${quizState.currentIdx + 1}/${quizState.total}`}
            onAnswer={(correct) => {
              recordWordAnswer(word.id, correct, false);
              if (quizState.currentIdx >= quizState.total - 1) {
                handleBlockComplete(Math.round(((quizState.correct + (correct ? 1 : 0)) / quizState.total) * 100));
              } else {
                setQuizState({
                  ...quizState,
                  currentIdx: quizState.currentIdx + 1,
                  correct: quizState.correct + (correct ? 1 : 0),
                });
              }
            }}
          />
        </div>
      );
    }

    // Review type
    return (
      <div className="px-4 py-6 text-center space-y-4">
        <div className="text-5xl">🔄</div>
        <h3 className="text-xl font-bold text-text-primary">Review sessie</h3>
        <p className="text-text-secondary">Review je recente woorden</p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => handleBlockComplete(100)}
          className="w-full py-4 rounded-3xl bg-brand-coral text-white font-semibold"
        >
          Review voltooid ✓
        </motion.button>
      </div>
    );
  };

  const completedBlockIds = new Set(lessonProgress?.completedBlocks ?? []);
  const completedBlockCount = lesson.blocks.filter((b) => completedBlockIds.has(b.id)).length;

  return (
    <AppShell hideNav={view === "block"}>
      {view === "overview" && (
        <>
          <MobileHeader title={lesson.title} subtitle={lesson.theme} showBack />

          <div className="px-4 py-4 space-y-5">
            {/* Progress */}
            <div className="rounded-3xl p-4 bg-bg-card border border-border-default space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-primary">Voortgang dag {day}</span>
                <span className="text-xs text-brand-coral font-bold">
                  {completedBlockCount}/{lesson.blocks.length}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-coral rounded-full"
                  animate={{ width: `${(completedBlockCount / lesson.blocks.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1"><Clock size={11} />~60 min</span>
                <span className="flex items-center gap-1"><Star size={11} />{lesson.xpReward} XP te verdienen</span>
              </div>
            </div>

            {/* Blocks */}
            <div className="space-y-3">
              {lesson.blocks.map((block, i) => {
                const isDone = completedBlockIds.has(block.id);
                const isNext = !isDone && i === completedBlockCount;

                const BLOCK_ICONS: Record<string, string> = {
                  vocabulary: "📝",
                  grammar: "📖",
                  scenario: "💬",
                  quiz: "🧠",
                  flashcard: "🃏",
                  review: "🔄",
                  listening: "🎧",
                  reading: "📚",
                  typing: "⌨️",
                };

                return (
                  <motion.button
                    key={block.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileTap={isNext || isDone ? { scale: 0.98 } : undefined}
                    onClick={() => (isNext || isDone) && handleStartBlock(block)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-3xl border text-left transition-all",
                      isDone
                        ? "bg-brand-green/5 border-brand-green/20"
                        : isNext
                        ? "bg-bg-card border-brand-coral/30 hover:border-brand-coral/50"
                        : "bg-bg-card border-border-subtle opacity-50 cursor-default"
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl",
                        isDone ? "bg-brand-green/10" : isNext ? "bg-brand-coral/10" : "bg-white/5"
                      )}
                    >
                      {isDone ? (
                        <CheckCircle2 size={22} className="text-brand-green" />
                      ) : (
                        BLOCK_ICONS[block.type] ?? "📌"
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary">{block.title}</p>
                      {block.description && (
                        <p className="text-xs text-text-secondary mt-0.5 truncate">{block.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={10} className="text-text-muted" />
                        <span className="text-2xs text-text-muted">{block.durationMinutes} min</span>
                      </div>
                    </div>
                    {isNext && (
                      <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center shrink-0">
                        <Play size={14} className="text-white ml-0.5" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {view === "block" && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBlock?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            {renderBlockContent()}
          </motion.div>
        </AnimatePresence>
      )}

      <RewardModal
        isOpen={showReward}
        onClose={() => {
          setShowReward(false);
          router.push("/dashboard");
        }}
        xpEarned={rewardXP}
        type="lesson_complete"
        message={`Dag ${day} voltooid! 🎉`}
      />
    </AppShell>
  );
}

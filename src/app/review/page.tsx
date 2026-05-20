"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Flashcard } from "@/components/learning/Flashcard";
import { MultipleChoice } from "@/components/learning/MultipleChoice";
import { RewardModal } from "@/components/ui/RewardModal";
import { useAppStore } from "@/lib/store/appStore";
import { VOCABULARY } from "@/data/vocabulary";
import type { VocabWord } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

type ReviewMode = "select" | "flashcard" | "quiz" | "done";

export default function ReviewPage() {
  const { getDueReviewWords, recordWordAnswer, addXP } = useAppStore();
  const [mode, setMode] = useState<ReviewMode>("select");
  const [quizType, setQuizType] = useState<"flashcard" | "quiz">("flashcard");
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const dueWordIds = getDueReviewWords();
  const dueWords = useMemo(() => {
    return dueWordIds
      .map((id) => VOCABULARY.find((w) => w.id === id))
      .filter((w): w is VocabWord => !!w)
      .slice(0, 20); // max 20 per sessie
  }, [dueWordIds]);

  const generateOptions = (word: VocabWord) => {
    const opts = [word.dutch];
    const others = VOCABULARY.filter((w) => w.id !== word.id && w.dutch !== word.dutch);
    while (opts.length < 4 && others.length > 0) {
      opts.push(others.splice(Math.floor(Math.random() * others.length), 1)[0].dutch);
    }
    return opts.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (wasCorrect: boolean) => {
    if (!dueWords[idx]) return;
    recordWordAnswer(dueWords[idx].id, wasCorrect, false);
    if (wasCorrect) setCorrect((n) => n + 1);
    if (idx >= dueWords.length - 1) {
      addXP(correct * 3);
      setMode("done");
      setShowReward(true);
    } else {
      setIdx((i) => i + 1);
    }
  };

  if (dueWords.length === 0) {
    return (
      <AppShell>
        <MobileHeader title="Review" showBack />
        <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8 text-center">
          <div className="text-6xl">✨</div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Alles up-to-date!</h2>
            <p className="text-text-secondary mt-2">
              Je hebt geen woorden die nu review nodig hebben.<br />
              Kom later terug of leer nieuwe woorden!
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <MobileHeader
        title="Review"
        subtitle={`${dueWords.length} woorden te reviewen`}
        showBack
      />

      <div className="px-4 py-4 flex-1 flex flex-col">
        {mode === "select" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-3xl p-5 bg-bg-card border border-border-default text-center space-y-2">
              <div className="text-5xl">🧠</div>
              <h2 className="text-xl font-bold text-text-primary">
                {dueWords.length} woorden
              </h2>
              <p className="text-text-secondary text-sm">
                Deze woorden hebben review nodig op basis van je spaced repetition schema.
              </p>
            </div>

            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { setQuizType("flashcard"); setMode("flashcard"); }}
                className="w-full py-4 rounded-3xl bg-bg-card border border-brand-teal/30 hover:border-brand-teal/50 transition-all flex items-center justify-center gap-3"
              >
                <span className="text-xl">🃏</span>
                <div className="text-left">
                  <p className="font-semibold text-text-primary">Flashcards</p>
                  <p className="text-xs text-text-secondary">Wist ik het / wist ik het niet</p>
                </div>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { setQuizType("quiz"); setMode("quiz"); }}
                className="w-full py-4 rounded-3xl bg-bg-card border border-brand-coral/30 hover:border-brand-coral/50 transition-all flex items-center justify-center gap-3"
              >
                <span className="text-xl">🎯</span>
                <div className="text-left">
                  <p className="font-semibold text-text-primary">Multiple Choice Quiz</p>
                  <p className="text-xs text-text-secondary">Kies het juiste antwoord</p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {mode === "flashcard" && dueWords[idx] && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setMode("select"); setIdx(0); setCorrect(0); }}
                className="text-sm text-text-secondary"
              >
                ← Stoppen
              </motion.button>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-teal rounded-full transition-all"
                    style={{ width: `${((idx) / dueWords.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary">{idx + 1}/{dueWords.length}</span>
              </div>
            </div>
            <Flashcard
              word={dueWords[idx]}
              onKnew={() => handleAnswer(true)}
              onDidntKnow={() => handleAnswer(false)}
            />
          </div>
        )}

        {mode === "quiz" && dueWords[idx] && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setMode("select"); setIdx(0); setCorrect(0); }}
                className="text-sm text-text-secondary"
              >
                ← Stoppen
              </motion.button>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-coral rounded-full transition-all"
                    style={{ width: `${((idx) / dueWords.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary">{idx + 1}/{dueWords.length}</span>
              </div>
            </div>
            <MultipleChoice
              question={dueWords[idx].croatian}
              options={generateOptions(dueWords[idx])}
              correctAnswer={dueWords[idx].dutch}
              hint={`[${dueWords[idx].pronunciation}]`}
              context="Kroatisch → Nederlands"
              onAnswer={handleAnswer}
            />
          </div>
        )}

        {mode === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center gap-6 text-center"
          >
            <div className="text-6xl">{correct / dueWords.length >= 0.8 ? "🎉" : "💪"}</div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Review voltooid!</h2>
              <p className="text-text-secondary mt-2">
                {correct}/{dueWords.length} correct
              </p>
            </div>
            <div className="text-3xl font-bold text-brand-green">
              {Math.round((correct / dueWords.length) * 100)}%
            </div>
          </motion.div>
        )}
      </div>

      <RewardModal
        isOpen={showReward}
        onClose={() => setShowReward(false)}
        xpEarned={correct * 3}
        type="lesson_complete"
        message="Review sessie voltooid!"
      />
    </AppShell>
  );
}

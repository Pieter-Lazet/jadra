"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Flashcard } from "@/components/learning/Flashcard";
import { MultipleChoice } from "@/components/learning/MultipleChoice";
import { useAppStore } from "@/lib/store/appStore";
import { VOCABULARY, VOCAB_CATEGORIES } from "@/data/vocabulary";
import { useTTS } from "@/lib/hooks/useTTS";
import type { VocabWord } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils/formatting";

type Mode = "browse" | "flashcard" | "quiz";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const { wordProgress, markWordNew, recordWordAnswer } = useAppStore();

  const [mode, setMode] = useState<Mode>("browse");
  const [quizIdx, setQuizIdx] = useState(0);
  const { speak } = useTTS();

  const catInfo = VOCAB_CATEGORIES[category];
  const words = VOCABULARY.filter((w) => w.category === category);

  if (!catInfo || words.length === 0) {
    return (
      <AppShell>
        <MobileHeader title="Niet gevonden" showBack />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Categorie niet gevonden</p>
        </div>
      </AppShell>
    );
  }

  const learnedCount = words.filter((w) => {
    const prog = wordProgress[w.id];
    return prog && (prog.status === "reviewing" || prog.status === "mastered");
  }).length;

  const handleFlashcardKnew = (word: VocabWord, idx: number) => {
    markWordNew(word.id);
    recordWordAnswer(word.id, true, false);
    if (idx >= words.length - 1) setMode("browse");
    else setQuizIdx(idx + 1);
  };

  const handleFlashcardDidntKnow = (word: VocabWord, idx: number) => {
    markWordNew(word.id);
    recordWordAnswer(word.id, false, false);
    if (idx >= words.length - 1) setMode("browse");
    else setQuizIdx(idx + 1);
  };

  const generateOptions = (word: VocabWord) => {
    const opts = [word.dutch];
    const others = VOCABULARY.filter((w) => w.id !== word.id && w.dutch !== word.dutch);
    while (opts.length < 4 && others.length > 0) {
      opts.push(others.splice(Math.floor(Math.random() * others.length), 1)[0].dutch);
    }
    return opts.sort(() => Math.random() - 0.5);
  };

  return (
    <AppShell>
      <MobileHeader
        title={catInfo.label}
        subtitle={`${catInfo.emoji} ${learnedCount}/${words.length} geleerd`}
        showBack
      />

      <div className="px-4 py-4">
        {mode === "browse" && (
          <div className="space-y-5">
            {/* Mode selector */}
            <div className="flex gap-2">
              {(["flashcard", "quiz"] as Mode[]).map((m) => (
                <motion.button
                  key={m}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMode(m); setQuizIdx(0); }}
                  className="flex-1 py-3 rounded-2xl border border-brand-coral bg-brand-coral/10 text-brand-coral font-semibold text-sm hover:bg-brand-coral/20 transition-all"
                >
                  {m === "flashcard" ? "🃏 Flashcards" : "🧠 Quiz"}
                </motion.button>
              ))}
            </div>

            {/* Word list */}
            <div className="space-y-2">
              {words.map((word, i) => {
                const prog = wordProgress[word.id];
                const status = prog?.status ?? "new";
                const statusColors: Record<string, string> = {
                  new: "bg-white/5 text-text-muted",
                  learning: "bg-brand-gold/10 text-brand-gold",
                  reviewing: "bg-brand-teal/10 text-brand-teal",
                  mastered: "bg-brand-green/10 text-brand-green",
                };
                const statusLabels: Record<string, string> = {
                  new: "Nieuw",
                  learning: "Aan het leren",
                  reviewing: "Review",
                  mastered: "Beheerst",
                };

                return (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="rounded-2xl p-4 bg-bg-card border border-border-default"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-text-primary">{word.croatian}</span>
                          <span className="text-xs text-text-muted italic">[{word.pronunciation}]</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => { e.stopPropagation(); speak(word.croatian); }}
                            className="w-6 h-6 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center shrink-0"
                            aria-label="Uitspreken"
                          >
                            <Volume2 size={11} className="text-brand-teal" />
                          </motion.button>
                        </div>
                        <p className="text-sm text-text-secondary mt-0.5">{word.dutch}</p>
                        <p className="text-xs text-text-muted mt-1 italic">{word.exampleCroatian}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={cn("text-2xs px-2 py-0.5 rounded-full font-medium", statusColors[status])}>
                          {statusLabels[status]}
                        </span>
                        <span className={cn("text-2xs px-2 py-0.5 rounded-full", getDifficultyColor(word.difficulty))}>
                          {getDifficultyLabel(word.difficulty)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {mode === "flashcard" && quizIdx < words.length && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode("browse")}
                className="text-sm text-text-secondary"
              >
                ← Stoppen
              </motion.button>
              <span className="text-sm text-text-secondary">{quizIdx + 1}/{words.length}</span>
            </div>
            <Flashcard
              word={words[quizIdx]}
              onKnew={() => handleFlashcardKnew(words[quizIdx], quizIdx)}
              onDidntKnow={() => handleFlashcardDidntKnow(words[quizIdx], quizIdx)}
            />
          </div>
        )}

        {mode === "quiz" && quizIdx < words.length && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode("browse")}
                className="text-sm text-text-secondary"
              >
                ← Stoppen
              </motion.button>
              <span className="text-sm text-text-secondary">{quizIdx + 1}/{words.length}</span>
            </div>
            <MultipleChoice
              question={words[quizIdx].croatian}
              options={generateOptions(words[quizIdx])}
              correctAnswer={words[quizIdx].dutch}
              hint={`[${words[quizIdx].pronunciation}]`}
              context="Kroatisch → Nederlands"
              onAnswer={(correct) => {
                markWordNew(words[quizIdx].id);
                recordWordAnswer(words[quizIdx].id, correct, false);
                if (quizIdx >= words.length - 1) setMode("browse");
                else setQuizIdx(quizIdx + 1);
              }}
            />
          </div>
        )}
      </div>
    </AppShell>
  );
}

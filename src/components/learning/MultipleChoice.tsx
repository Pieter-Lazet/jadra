"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useTTS } from "@/lib/hooks/useTTS";

interface MultipleChoiceProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (wasCorrect: boolean) => void;
  hint?: string;
  showProgress?: string;
  context?: string; // Extra context shown above
}

export function MultipleChoice({
  question,
  options,
  correctAnswer,
  onAnswer,
  hint,
  showProgress,
  context,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak } = useTTS();

  useEffect(() => {
    speak(question);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const handleSelect = (option: string) => {
    if (hasAnswered) return;
    setSelected(option);
    setHasAnswered(true);
    const isCorrect = option === correctAnswer;

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelected(null);
      setHasAnswered(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-5">
      {showProgress && (
        <div className="flex justify-between items-center">
          <p className="text-xs text-text-secondary">{showProgress}</p>
        </div>
      )}

      {/* Question card */}
      <div className="rounded-3xl p-6 bg-bg-card border border-border-default text-center space-y-3">
        {context && (
          <p className="text-xs text-text-secondary uppercase tracking-widest">{context}</p>
        )}
        <p className="text-2xl font-display font-bold text-text-primary leading-snug">
          {question}
        </p>
        <div className="flex items-center justify-center gap-2">
          {hint && (
            <p className="text-xs text-text-muted italic">{hint}</p>
          )}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => speak(question)}
            className="w-7 h-7 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center"
            aria-label="Uitspreken"
          >
            <Volume2 size={12} className="text-brand-teal" />
          </motion.button>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, i) => {
          const isSelected = selected === option;
          const isCorrect = option === correctAnswer;
          let stateClass = "border-border-default bg-bg-card hover:border-brand-coral/30 hover:bg-bg-elevated";

          if (hasAnswered) {
            if (isSelected && isCorrect) {
              stateClass = "border-brand-green bg-brand-green/10";
            } else if (isSelected && !isCorrect) {
              stateClass = "border-brand-red bg-brand-red/10";
            } else if (isCorrect) {
              stateClass = "border-brand-green/50 bg-brand-green/5";
            } else {
              stateClass = "border-border-subtle bg-bg-card opacity-50";
            }
          }

          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={!hasAnswered ? { scale: 0.98 } : undefined}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered}
              className={cn(
                "w-full text-left px-4 py-4 rounded-2xl border transition-all duration-200",
                "flex items-center justify-between gap-3",
                stateClass,
                !hasAnswered && "cursor-pointer"
              )}
              aria-label={`Optie: ${option}`}
            >
              <span className="text-base font-medium text-text-primary">
                {option}
              </span>
              <AnimatePresence mode="wait">
                {hasAnswered && isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {isCorrect ? (
                      <CheckCircle2 size={20} className="text-brand-green shrink-0" />
                    ) : (
                      <XCircle size={20} className="text-brand-red shrink-0" />
                    )}
                  </motion.div>
                )}
                {hasAnswered && !isSelected && isCorrect && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 size={20} className="text-brand-green/50 shrink-0" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "rounded-2xl px-4 py-3 text-sm font-medium text-center",
              selected === correctAnswer
                ? "bg-brand-green/10 text-brand-green border border-brand-green/20"
                : "bg-brand-red/10 text-brand-red border border-brand-red/20"
            )}
          >
            {selected === correctAnswer
              ? "✓ Goed zo! +5 XP"
              : `✗ Het goede antwoord is: ${correctAnswer}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

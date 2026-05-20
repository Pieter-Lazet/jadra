"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import type { GrammarLesson, GrammarExercise } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface GrammarCardProps {
  lesson: GrammarLesson;
  onComplete?: (score: number) => void;
}

type Phase = "learn" | "practice" | "done";

export function GrammarCard({ lesson, onComplete }: GrammarCardProps) {
  const [phase, setPhase] = useState<Phase>("learn");
  const [expandedRule, setExpandedRule] = useState<number | null>(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentExercise = lesson.exercises[exerciseIndex];

  const handleAnswer = (answer: string) => {
    if (hasAnswered) return;
    setSelected(answer);
    setHasAnswered(true);
    if (answer === currentExercise.correctAnswer) {
      setCorrectCount((n) => n + 1);
    }
    setTimeout(() => {
      if (exerciseIndex < lesson.exercises.length - 1) {
        setExerciseIndex((i) => i + 1);
        setSelected(null);
        setHasAnswered(false);
      } else {
        const score = Math.round(
          ((correctCount + (answer === currentExercise.correctAnswer ? 1 : 0)) /
            lesson.exercises.length) *
            100
        );
        setPhase("done");
        onComplete?.(score);
      }
    }, 1200);
  };

  if (phase === "done") {
    const score = Math.round((correctCount / lesson.exercises.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-4xl p-8 bg-bg-card border border-border-default text-center space-y-4"
      >
        <div className="text-5xl">{score >= 80 ? "🎓" : score >= 60 ? "📚" : "💪"}</div>
        <h3 className="text-xl font-display font-bold">Grammatica voltooid!</h3>
        <p className="text-text-secondary">
          {correctCount}/{lesson.exercises.length} oefeningen correct
        </p>
        <div
          className={cn(
            "text-3xl font-bold",
            score >= 80 ? "text-brand-green" : "text-brand-gold"
          )}
        >
          {score}%
        </div>
      </motion.div>
    );
  }

  if (phase === "practice") {
    return (
      <div className="space-y-5">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-coral rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((exerciseIndex) / lesson.exercises.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-text-secondary shrink-0">
            {exerciseIndex + 1}/{lesson.exercises.length}
          </span>
        </div>

        {/* Exercise */}
        <div className="rounded-3xl p-6 bg-bg-card border border-border-default space-y-4">
          <p className="text-sm text-text-secondary uppercase tracking-widest">Oefening</p>
          <p className="text-lg font-semibold text-text-primary">
            {currentExercise.question}
          </p>
        </div>

        {/* Options for multiple choice */}
        {currentExercise.type === "multiple_choice" && currentExercise.options && (
          <div className="space-y-2">
            {currentExercise.options.map((opt) => {
              const isSelected = selected === opt;
              const isCorrect = opt === currentExercise.correctAnswer;
              let cls = "border-border-default bg-bg-card hover:border-brand-coral/30";
              if (hasAnswered) {
                if (isSelected && isCorrect) cls = "border-brand-green bg-brand-green/10";
                else if (isSelected && !isCorrect) cls = "border-brand-red bg-brand-red/10";
                else if (isCorrect) cls = "border-brand-green/50 bg-brand-green/5";
                else cls = "border-border-subtle bg-bg-card opacity-40";
              }

              return (
                <motion.button
                  key={opt}
                  whileTap={!hasAnswered ? { scale: 0.98 } : undefined}
                  onClick={() => handleAnswer(opt)}
                  disabled={hasAnswered}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-2xl border transition-all flex items-center justify-between gap-2",
                    cls
                  )}
                >
                  <span className="text-sm font-medium text-text-primary">{opt}</span>
                  {hasAnswered && isSelected && (
                    isCorrect
                      ? <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                      : <XCircle size={16} className="text-brand-red shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {hasAnswered && currentExercise.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl px-4 py-3 bg-brand-gold/10 border border-brand-gold/20"
            >
              <p className="text-xs text-brand-gold">{currentExercise.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Learn phase
  return (
    <div className="space-y-5">
      {/* Explanation */}
      <div className="rounded-3xl p-5 bg-bg-card border border-border-default space-y-2">
        <p className="text-xs text-brand-teal uppercase tracking-widest font-medium">Uitleg</p>
        <p className="text-sm text-text-secondary leading-relaxed">{lesson.explanation}</p>
      </div>

      {/* Rules accordion */}
      <div className="space-y-2">
        {lesson.rules.map((rule, i) => (
          <div key={i} className="rounded-2xl border border-border-default overflow-hidden">
            <button
              onClick={() => setExpandedRule(expandedRule === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              aria-expanded={expandedRule === i}
            >
              <span className="text-sm font-semibold text-text-primary">{rule.title}</span>
              <motion.div
                animate={{ rotate: expandedRule === i ? 180 : 0 }}
                className="shrink-0"
              >
                <ChevronDown size={16} className="text-text-muted" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedRule === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2 border-t border-border-subtle">
                    <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                      {rule.description}
                    </p>
                    {rule.example && (
                      <div className="bg-brand-teal/5 border border-brand-teal/15 rounded-xl px-3 py-2">
                        <p className="text-xs font-mono text-brand-teal">{rule.example}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Examples */}
      <div className="rounded-3xl p-4 bg-bg-card border border-border-default space-y-3">
        <p className="text-xs text-text-muted uppercase tracking-widest font-medium">Voorbeelden</p>
        {lesson.examples.slice(0, 4).map((ex, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-brand-coral text-xs mt-1">→</span>
            <div>
              <p className="text-sm font-medium text-text-primary">{ex.croatian}</p>
              <p className="text-xs text-text-secondary">{ex.dutch}</p>
              {ex.note && <p className="text-xs text-text-muted italic mt-0.5">{ex.note}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Cheat sheet */}
      {lesson.cheatSheet && (
        <div className="rounded-3xl p-4 bg-brand-gold/5 border border-brand-gold/15 space-y-2">
          <p className="text-xs text-brand-gold uppercase tracking-widest font-medium">📋 Cheat Sheet</p>
          <div className="flex flex-wrap gap-2">
            {lesson.cheatSheet.map((item, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 bg-bg-card border border-border-default rounded-full text-text-secondary font-mono"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setPhase("practice")}
        className="w-full py-4 rounded-3xl bg-brand-coral text-white font-semibold text-base hover:bg-brand-coral-light transition-colors"
      >
        Oefeningen starten →
      </motion.button>
    </div>
  );
}

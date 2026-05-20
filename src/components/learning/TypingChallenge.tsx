"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, XCircle, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useTTS } from "@/lib/hooks/useTTS";

interface TypingChallengeProps {
  question: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  hint?: string;
  onAnswer: (wasCorrect: boolean, typed: string) => void;
  showProgress?: string;
  context?: string;
}

export function TypingChallenge({
  question,
  correctAnswer,
  acceptableAnswers = [],
  hint,
  onAnswer,
  showProgress,
  context,
}: TypingChallengeProps) {
  const [typed, setTyped] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { speak } = useTTS();

  useEffect(() => {
    if (!submitted) {
      inputRef.current?.focus();
    }
  }, [submitted]);

  const normalize = (s: string) =>
    s.trim().toLowerCase().replace(/[.,!?]/g, "");

  const checkAnswer = (answer: string) => {
    const normalized = normalize(answer);
    const correct = normalize(correctAnswer);
    const acceptable = acceptableAnswers.map(normalize);
    return normalized === correct || acceptable.includes(normalized);
  };

  const handleSubmit = () => {
    if (!typed.trim() || submitted) return;
    const correct = checkAnswer(typed);
    setIsCorrect(correct);
    setSubmitted(true);

    setTimeout(() => {
      onAnswer(correct, typed);
      setTyped("");
      setSubmitted(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex flex-col gap-5">
      {showProgress && (
        <p className="text-xs text-text-secondary">{showProgress}</p>
      )}

      {/* Question */}
      <div className="rounded-3xl p-6 bg-bg-card border border-border-default text-center space-y-2">
        {context && (
          <p className="text-xs text-text-secondary uppercase tracking-widest">{context}</p>
        )}
        <p className="text-2xl font-display font-bold text-text-primary">
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

      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitted}
          placeholder="Typ je antwoord..."
          className={cn(
            "w-full px-5 py-4 pr-14 rounded-2xl border bg-bg-card text-text-primary text-lg font-medium",
            "placeholder:text-text-muted",
            "focus:outline-none transition-all duration-200",
            submitted
              ? isCorrect
                ? "border-brand-green bg-brand-green/5"
                : "border-brand-red bg-brand-red/5"
              : "border-border-default focus:border-brand-coral/50"
          )}
          aria-label="Typ je antwoord"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          disabled={submitted || !typed.trim()}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all",
            typed.trim() && !submitted
              ? "bg-brand-coral text-white hover:bg-brand-coral-light"
              : "bg-white/5 text-text-muted"
          )}
          aria-label="Antwoord versturen"
        >
          <Send size={16} />
        </motion.button>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "rounded-2xl px-4 py-3 border",
              isCorrect
                ? "bg-brand-green/10 border-brand-green/20"
                : "bg-brand-red/10 border-brand-red/20"
            )}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
              ) : (
                <XCircle size={18} className="text-brand-red shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={cn(
                    "font-semibold text-sm",
                    isCorrect ? "text-brand-green" : "text-brand-red"
                  )}
                >
                  {isCorrect ? "Correct! +5 XP" : "Niet helemaal..."}
                </p>
                {!isCorrect && (
                  <p className="text-xs text-text-secondary mt-1">
                    Het goede antwoord: <strong className="text-text-primary">{correctAnswer}</strong>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

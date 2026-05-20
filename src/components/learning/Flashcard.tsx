"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Check, X } from "lucide-react";
import type { VocabWord } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { useTTS } from "@/lib/hooks/useTTS";

interface FlashcardProps {
  word: VocabWord;
  onKnew: () => void;
  onDidntKnow: () => void;
  showProgress?: string; // e.g. "3/10"
  className?: string;
}

export function Flashcard({
  word,
  onKnew,
  onDidntKnow,
  showProgress,
  className,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { speak } = useTTS();

  const handleFlip = () => {
    if (!hasAnswered) {
      setIsFlipped(true);
      speak(word.croatian);
    }
  };

  const handleAnswer = (knew: boolean) => {
    setHasAnswered(true);
    setTimeout(() => {
      setIsFlipped(false);
      setHasAnswered(false);
      if (knew) {
        onKnew();
      } else {
        onDidntKnow();
      }
    }, 300);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {showProgress && (
        <p className="text-xs text-text-secondary">{showProgress}</p>
      )}

      {/* Card container with 3D flip */}
      <div
        className="w-full cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative"
        >
          {/* Front — Croatian */}
          <div
            className={cn(
              "relative rounded-4xl p-8 bg-bg-card border border-border-default min-h-[220px] flex flex-col items-center justify-center gap-4",
              "backface-hidden"
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-xs font-medium text-text-muted uppercase tracking-widest">
              Kroatisch
            </span>
            <div className="text-center">
              <h2 className="text-4xl font-display font-bold text-text-primary tracking-tight">
                {word.croatian}
              </h2>
              <p className="text-sm text-text-secondary mt-2 italic">
                [{word.pronunciation}]
              </p>
            </div>
            <div className="flex items-center gap-3">
              {word.gender && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                  {word.gender === "m" ? "de (m)" : word.gender === "f" ? "de (v)" : "het (o)"}
                </span>
              )}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); speak(word.croatian); }}
                className="w-8 h-8 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center"
                aria-label="Uitspreken"
              >
                <Volume2 size={14} className="text-brand-teal" />
              </motion.button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-xs text-text-muted animate-pulse">
                Tik om te onthullen
              </p>
            </div>
          </div>

          {/* Back — Dutch */}
          <div
            className="absolute inset-0 rounded-4xl p-8 bg-gradient-to-br from-brand-coral/10 to-brand-red/5 border border-brand-coral/20 min-h-[220px] flex flex-col items-center justify-center gap-4"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <span className="text-xs font-medium text-brand-coral/60 uppercase tracking-widest">
              Nederlands
            </span>
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-text-primary">
                {word.dutch}
              </h2>
            </div>
            <div className="mt-1 text-center">
              <p className="text-sm text-text-secondary italic">
                &ldquo;{word.exampleCroatian}&rdquo;
              </p>
              <p className="text-xs text-text-muted mt-1">
                {word.exampleDutch}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Answer buttons — only show after flip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
        className="flex gap-3 w-full"
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => handleAnswer(false)}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl bg-brand-red/10 border border-brand-red/20 text-brand-red font-semibold transition-colors hover:bg-brand-red/20"
          aria-label="Ik wist het niet"
        >
          <X size={18} />
          <span>Niet geweten</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => handleAnswer(true)}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl bg-brand-green/10 border border-brand-green/20 text-brand-green font-semibold transition-colors hover:bg-brand-green/20"
          aria-label="Ik wist het"
        >
          <Check size={18} />
          <span>Geweten!</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

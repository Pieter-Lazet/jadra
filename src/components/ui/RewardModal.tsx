"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import Confetti from "react-confetti";
import { BADGES } from "@/lib/utils/xp";
import type { BadgeType } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  xpEarned: number;
  newBadges?: BadgeType[];
  message?: string;
  type?: "lesson_complete" | "badge" | "streak" | "perfect";
}

export function RewardModal({
  isOpen,
  onClose,
  xpEarned,
  newBadges = [],
  message,
  type = "lesson_complete",
}: RewardModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const defaultMessages: Record<string, string> = {
    lesson_complete: "Les voltooid!",
    badge: "Nieuwe badge verdiend!",
    streak: "Streak verlengd!",
    perfect: "Perfecte score!",
  };

  const bg: Record<string, string> = {
    lesson_complete: "from-brand-coral/20 to-brand-red/5",
    badge: "from-brand-gold/20 to-brand-gold/5",
    streak: "from-brand-coral/20 to-brand-red/5",
    perfect: "from-brand-teal/20 to-brand-teal/5",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti */}
          {showConfetti && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={type === "perfect" ? 300 : 180}
              gravity={0.25}
              colors={["#FF6B4A", "#00D4B8", "#FFD166", "#06FFA5", "#FF4E6A"]}
              style={{ position: "fixed", top: 0, left: 0, zIndex: 100, pointerEvents: "none" }}
            />
          )}
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-x-4 bottom-8 z-50 max-w-sm mx-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Beloning"
          >
            <div
              className={cn(
                "relative rounded-4xl p-6 bg-gradient-to-br border border-white/10 overflow-hidden",
                bg[type]
              )}
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to)), #1E2230` }}
            >
              <div className={cn("absolute inset-0 rounded-4xl bg-gradient-to-br opacity-90 -z-10", `bg-bg-card`)} />

              {/* Close */}
              <button
                ref={closeRef}
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Sluiten"
              >
                <X size={16} />
              </button>

              {/* Content */}
              <div className="text-center space-y-4">
                {/* Big icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="text-5xl"
                >
                  {type === "lesson_complete" ? "🎉" : type === "perfect" ? "✨" : type === "streak" ? "🔥" : "🏆"}
                </motion.div>

                <div>
                  <h2 className="text-xl font-display font-bold text-text-primary">
                    {message ?? defaultMessages[type]}
                  </h2>
                </div>

                {/* XP earned */}
                {xpEarned > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/25 rounded-full px-4 py-2"
                  >
                    <Star size={16} className="text-brand-gold fill-brand-gold" />
                    <span className="text-lg font-bold text-brand-gold">+{xpEarned} XP</span>
                  </motion.div>
                )}

                {/* Badges */}
                {newBadges.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <p className="text-sm text-text-secondary">Nieuwe badge{newBadges.length > 1 ? "s" : ""}!</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {newBadges.map((badgeId) => {
                        const badge = BADGES.find((b) => b.id === badgeId);
                        if (!badge) return null;
                        return (
                          <div
                            key={badgeId}
                            className="flex items-center gap-1.5 bg-bg-card border border-border-default rounded-2xl px-3 py-1.5"
                          >
                            <span className="text-xl">{badge.icon}</span>
                            <span className="text-xs font-semibold text-text-primary">{badge.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl bg-brand-coral text-white font-semibold text-base hover:bg-brand-coral-light transition-colors"
                >
                  Doorgaan! 🚀
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

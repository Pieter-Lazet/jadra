"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

interface XPBarProps {
  totalXP: number;
  level: number;
  xpToNextLevel: number;
  xpInCurrentLevel?: number;
  compact?: boolean;
  className?: string;
}

export function XPBar({
  totalXP,
  level,
  xpToNextLevel,
  xpInCurrentLevel = 0,
  compact = false,
  className,
}: XPBarProps) {
  const [displayXP, setDisplayXP] = useState(totalXP);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (totalXP !== displayXP) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayXP(totalXP);
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [totalXP, displayXP]);

  const nextLevelThreshold = xpInCurrentLevel + xpToNextLevel;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / nextLevelThreshold) * 100));

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex items-center gap-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full px-2.5 py-1">
          <Star size={12} className="text-brand-gold fill-brand-gold" />
          <span className="text-xs font-bold text-brand-gold">{totalXP.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 bg-brand-purple/10 border border-brand-purple/20 rounded-full px-2.5 py-1">
          <span className="text-xs font-bold text-brand-purple">Lvl {level}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-brand-gold fill-brand-gold" />
            <span className="text-sm font-bold text-brand-gold">
              {totalXP.toLocaleString()} XP
            </span>
          </div>
          <AnimatePresence>
            {isAnimating && (
              <motion.span
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: -20, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs font-bold text-brand-gold pointer-events-none"
              >
                +XP!
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <span className="text-xs text-text-secondary">
          Niveau {level} → {level + 1} ({xpToNextLevel} XP te gaan)
        </span>
      </div>
      <div
        className="h-2 bg-white/5 rounded-full overflow-hidden"
        role="progressbar"
        aria-label={`${progressPercent}% naar niveau ${level + 1}`}
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-coral via-brand-red to-brand-purple"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

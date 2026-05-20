"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface StreakCardProps {
  streak: number;
  compact?: boolean;
  className?: string;
}

export function StreakCard({ streak, compact = false, className }: StreakCardProps) {
  const isActive = streak > 0;

  if (compact) {
    return (
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 border",
          isActive
            ? "bg-brand-coral/10 border-brand-coral/20"
            : "bg-white/5 border-white/10",
          className
        )}
      >
        <Flame
          size={14}
          className={isActive ? "text-brand-coral" : "text-text-muted"}
          fill={isActive ? "#FF6B4A" : "none"}
        />
        <span
          className={cn(
            "text-sm font-bold",
            isActive ? "text-brand-coral" : "text-text-muted"
          )}
        >
          {streak}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "relative overflow-hidden rounded-3xl p-4 border",
        isActive
          ? "bg-gradient-to-br from-brand-coral/15 to-brand-red/5 border-brand-coral/20"
          : "bg-bg-card border-border-default",
        className
      )}
    >
      {isActive && streak >= 7 && (
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-brand-coral/10 rounded-full blur-xl" />
      )}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center",
            isActive ? "bg-brand-coral/15" : "bg-white/5"
          )}
        >
          <motion.div
            animate={isActive ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Flame
              size={24}
              className={isActive ? "text-brand-coral" : "text-text-muted"}
              fill={isActive ? "#FF6B4A" : "none"}
            />
          </motion.div>
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "text-3xl font-display font-bold",
                isActive ? "text-brand-coral" : "text-text-muted"
              )}
            >
              {streak}
            </span>
            <span className="text-sm text-text-secondary">dagen</span>
          </div>
          <p className="text-xs text-text-secondary">
            {streak === 0
              ? "Begin vandaag je streak!"
              : streak === 1
              ? "Eerste dag — goed zo!"
              : streak < 7
              ? `${7 - streak} dagen tot een week-streak!`
              : streak < 30
              ? `${30 - streak} dagen tot een maand-streak!`
              : "Ongekende wilskracht! 🏆"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

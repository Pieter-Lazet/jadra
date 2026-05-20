"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, Clock, ChevronRight, Star } from "lucide-react";
import type { DayLesson, LessonStatus } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface LessonCardProps {
  lesson: DayLesson;
  status: LessonStatus;
  score?: number;
  className?: string;
}

const STATUS_CONFIG = {
  locked: {
    icon: Lock,
    color: "text-text-muted",
    bg: "bg-bg-card",
    border: "border-border-subtle",
    badge: null,
  },
  available: {
    icon: null,
    color: "text-text-primary",
    bg: "bg-bg-card",
    border: "border-border-default hover:border-brand-coral/40",
    badge: "START",
  },
  in_progress: {
    icon: null,
    color: "text-text-primary",
    bg: "bg-bg-card",
    border: "border-brand-coral/30",
    badge: "DOORGAAN",
  },
  completed: {
    icon: CheckCircle2,
    color: "text-text-primary",
    bg: "bg-bg-card",
    border: "border-brand-green/20",
    badge: null,
  },
};

export function LessonCard({ lesson, status, score, className }: LessonCardProps) {
  const config = STATUS_CONFIG[status];
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  const card = (
    <motion.div
      whileTap={!isLocked ? { scale: 0.98 } : undefined}
      className={cn(
        "relative overflow-hidden rounded-3xl p-4 border transition-all duration-200",
        config.bg,
        config.border,
        isLocked && "opacity-50 cursor-default",
        !isLocked && "cursor-pointer active:opacity-90",
        className
      )}
    >
      {/* Completed glow */}
      {isCompleted && (
        <div className="absolute -right-6 -top-6 w-20 h-20 bg-brand-green/10 rounded-full blur-xl" />
      )}

      <div className="flex items-start gap-3">
        {/* Day number */}
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-display font-bold text-sm",
            isCompleted
              ? "bg-brand-green/10 text-brand-green"
              : isLocked
              ? "bg-white/5 text-text-muted"
              : "bg-brand-coral/10 text-brand-coral"
          )}
        >
          {isCompleted ? (
            <CheckCircle2 size={20} className="text-brand-green" />
          ) : isLocked ? (
            <Lock size={16} />
          ) : (
            <span>D{lesson.day}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">
                {lesson.title}
              </p>
              <p className="text-xs text-text-secondary truncate mt-0.5">
                {lesson.theme}
              </p>
            </div>

            {/* Status badge */}
            {config.badge && (
              <span
                className={cn(
                  "shrink-0 text-2xs font-bold px-2 py-0.5 rounded-full",
                  status === "in_progress"
                    ? "bg-brand-gold/15 text-brand-gold"
                    : "bg-brand-coral/15 text-brand-coral"
                )}
              >
                {config.badge}
              </span>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-text-muted">
              <Clock size={11} />
              <span className="text-2xs">~60 min</span>
            </div>
            <div className="flex items-center gap-1 text-text-muted">
              <Star size={11} />
              <span className="text-2xs">{lesson.xpReward} XP</span>
            </div>
            {lesson.newWordCount > 0 && (
              <div className="flex items-center gap-1 text-text-muted">
                <span className="text-2xs">+{lesson.newWordCount} woorden</span>
              </div>
            )}
            {isCompleted && score !== undefined && (
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    "text-2xs font-bold",
                    score >= 80 ? "text-brand-green" : score >= 60 ? "text-brand-gold" : "text-brand-red"
                  )}
                >
                  {score}%
                </span>
              </div>
            )}
          </div>
        </div>

        {!isLocked && (
          <ChevronRight
            size={16}
            className="text-text-muted shrink-0 mt-1"
          />
        )}
      </div>
    </motion.div>
  );

  if (isLocked) return card;

  return <Link href={`/learn/day/${lesson.day}`}>{card}</Link>;
}

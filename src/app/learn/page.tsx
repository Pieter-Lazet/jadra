"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { LessonCard } from "@/components/ui/LessonCard";
import { useAppStore } from "@/lib/store/appStore";
import { LESSON_DAYS } from "@/data/lesson-days";
import { cn } from "@/lib/utils/cn";

const WEEKS = [
  { week: 1, days: [1, 2, 3, 4, 5, 6, 7], label: "Week 1 — De Basis" },
  { week: 2, days: [8, 9, 10, 11, 12, 13, 14], label: "Week 2 — Uitbreiding" },
  { week: 3, days: [15, 16, 17, 18, 19, 20, 21], label: "Week 3 — Gesprekken" },
  { week: 4, days: [22, 23, 24, 25, 26, 27, 28], label: "Week 4 — Verdieping" },
  { week: 5, days: [29, 30, 31, 32, 33, 34, 35], label: "Week 5 — Vloeiendheid" },
  { week: 6, days: [36, 37, 38, 39, 40, 41, 42], label: "Week 6 — Geavanceerd" },
  { week: 7, days: [43, 44, 45, 46, 47, 48, 49], label: "Week 7 — Mastery" },
  { week: 8, days: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], label: "Week 8 — Finaliseren" },
];

export default function LearnPage() {
  const { getLessonStatus, lessonProgress } = useAppStore();

  const completedCount = Object.values(lessonProgress).filter(
    (p) => p.status === "completed"
  ).length;

  return (
    <AppShell>
      <MobileHeader title="Leerpad" subtitle={`${completedCount}/60 lessen voltooid`} />

      <div className="px-4 py-4 space-y-6">
        {/* Progress overview */}
        <div className="rounded-3xl p-4 bg-bg-card border border-border-default">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-text-primary">Totale voortgang</span>
            <span className="text-sm font-bold text-brand-coral">
              {Math.round((completedCount / 60) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-coral rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / 60) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-2">
            {60 - completedCount} lessen te gaan richting basisvaardigheid
          </p>
        </div>

        {/* Weeks */}
        {WEEKS.map((week) => {
          const weekDays = week.days.map((d) => LESSON_DAYS.find((l) => l.day === d)!).filter(Boolean);
          const weekCompleted = weekDays.filter(
            (d) => getLessonStatus(d.day) === "completed"
          ).length;
          const allCompleted = weekCompleted === weekDays.length;

          return (
            <div key={week.week} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  {allCompleted && <span className="text-brand-green">✓</span>}
                  {week.label}
                </h2>
                <span className="text-xs text-text-secondary">
                  {weekCompleted}/{weekDays.length}
                </span>
              </div>

              {weekDays.map((lesson, i) => (
                <motion.div
                  key={lesson.day}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <LessonCard
                    lesson={lesson}
                    status={getLessonStatus(lesson.day)}
                    score={lessonProgress[lesson.day]?.score}
                  />
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}

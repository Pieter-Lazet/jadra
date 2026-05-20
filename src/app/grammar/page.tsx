"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useAppStore } from "@/lib/store/appStore";
import { GRAMMAR_LESSONS } from "@/data/grammar-lessons";
import { getDifficultyColor } from "@/lib/utils/formatting";
import { cn } from "@/lib/utils/cn";

export default function GrammarPage() {
  const { getLessonStatus } = useAppStore();

  return (
    <AppShell>
      <MobileHeader title="Grammatica" subtitle="20 lessen" />

      <div className="px-4 py-4 space-y-3">
        <p className="text-sm text-text-secondary">
          Grammatica-lessen ontgrendelen naarmate je vordert. Begin bij het begin!
        </p>

        {GRAMMAR_LESSONS.map((lesson, i) => {
          const dayStatus = getLessonStatus(lesson.dayUnlock);
          const isUnlocked = dayStatus === "completed" || lesson.dayUnlock === 1;

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              {isUnlocked ? (
                <Link href={`/grammar/${lesson.slug}`}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start gap-4 p-4 rounded-3xl bg-bg-card border border-border-default hover:border-brand-gold/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-brand-gold/10 flex items-center justify-center shrink-0 font-bold text-brand-gold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary">{lesson.title}</p>
                      <p className="text-xs text-text-secondary mt-0.5 truncate">{lesson.subtitle}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-2xs text-text-muted">
                          {lesson.exercises.length} oefeningen
                        </span>
                        <span className="text-2xs text-text-muted">·</span>
                        <span className="text-2xs text-text-muted">
                          Ontgrendeld op dag {lesson.dayUnlock}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <div className="flex items-start gap-4 p-4 rounded-3xl bg-bg-card border border-border-subtle opacity-50">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                    <Lock size={16} className="text-text-muted" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary">{lesson.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      Ontgrendelt na dag {lesson.dayUnlock}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </AppShell>
  );
}

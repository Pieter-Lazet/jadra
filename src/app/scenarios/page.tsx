"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Star } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useAppStore } from "@/lib/store/appStore";
import { SCENARIOS } from "@/data/scenarios";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils/formatting";
import { cn } from "@/lib/utils/cn";

export default function ScenariosPage() {
  const { getLessonStatus } = useAppStore();

  return (
    <AppShell>
      <MobileHeader title="Gesprekken" subtitle={`${SCENARIOS.length} scenario's`} />

      <div className="px-4 py-4 space-y-3">
        <p className="text-sm text-text-secondary leading-relaxed">
          Oefen echte Kroatische gesprekken. Kies een scenario en leer hoe een lokaal zou reageren.
        </p>

        {SCENARIOS.map((scenario, i) => {
          const dayStatus = getLessonStatus(scenario.dayUnlock);
          const isUnlocked = dayStatus === "completed" || scenario.dayUnlock <= 3;

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              {isUnlocked ? (
                <Link href={`/scenarios/${scenario.slug}`}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="p-4 rounded-3xl bg-bg-card border border-border-default hover:border-brand-teal/30 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text-primary">{scenario.title}</p>
                        <p className="text-sm text-text-secondary mt-0.5">{scenario.subtitle}</p>
                        <p className="text-xs text-text-muted mt-1 italic">📍 {scenario.setting}</p>
                      </div>
                      <span
                        className={cn(
                          "text-2xs px-2 py-1 rounded-full shrink-0",
                          getDifficultyColor(scenario.difficulty)
                        )}
                      >
                        {getDifficultyLabel(scenario.difficulty)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-text-muted">
                        <Star size={11} className="text-brand-gold" />
                        <span className="text-2xs">{scenario.xpReward} XP</span>
                      </div>
                      <div className="flex items-center gap-1 text-text-muted">
                        <span className="text-2xs">{scenario.turns.length} berichten</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <div className="p-4 rounded-3xl bg-bg-card border border-border-subtle opacity-50">
                  <div className="flex items-start gap-3">
                    <Lock size={16} className="text-text-muted mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-text-primary">{scenario.title}</p>
                      <p className="text-xs text-text-muted mt-1">
                        Ontgrendelt na dag {scenario.dayUnlock}
                      </p>
                    </div>
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

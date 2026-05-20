"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useAppStore } from "@/lib/store/appStore";
import { VOCABULARY, VOCAB_CATEGORIES } from "@/data/vocabulary";
import { cn } from "@/lib/utils/cn";

export default function VocabularyPage() {
  const { wordProgress } = useAppStore();

  const categorySummary = useMemo(() => {
    return Object.entries(VOCAB_CATEGORIES).map(([catId, cat]) => {
      const words = VOCABULARY.filter((w) => w.category === catId);
      const learned = words.filter((w) => {
        const prog = wordProgress[w.id];
        return prog && (prog.status === "reviewing" || prog.status === "mastered");
      }).length;
      return {
        id: catId,
        ...cat,
        total: words.length,
        learned,
      };
    }).filter((c) => c.total > 0);
  }, [wordProgress]);

  const totalWords = VOCABULARY.length;
  const totalLearned = Object.values(wordProgress).filter(
    (p) => p.status === "reviewing" || p.status === "mastered"
  ).length;

  return (
    <AppShell>
      <MobileHeader title="Woordenschat" subtitle={`${totalLearned}/${totalWords} geleerd`} />

      <div className="px-4 py-4 space-y-5">
        {/* Overall stats */}
        <div className="rounded-3xl p-4 bg-bg-card border border-border-default space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text-primary">Totale voortgang</span>
            <span className="text-sm font-bold text-brand-teal">
              {totalWords > 0 ? Math.round((totalLearned / totalWords) * 100) : 0}%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-teal rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${totalWords > 0 ? (totalLearned / totalWords) * 100 : 0}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-text-secondary">{totalWords} woorden beschikbaar — {5000 - totalWords} te voegen</p>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-text-primary">Categorieën</h2>
          <div className="grid grid-cols-1 gap-2">
            {categorySummary.map((cat, i) => {
              const progress = cat.total > 0 ? (cat.learned / cat.total) * 100 : 0;

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link href={`/vocabulary/${cat.id}`}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-bg-card border border-border-default hover:border-brand-teal/30 transition-all"
                    >
                      <span className="text-2xl shrink-0">{cat.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-text-primary truncate">{cat.label}</p>
                          <span className="text-xs text-text-secondary shrink-0">
                            {cat.learned}/{cat.total}
                          </span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                          <motion.div
                            className="h-full bg-brand-teal rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, delay: i * 0.03 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

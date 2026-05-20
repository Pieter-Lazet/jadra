"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { StreakCard } from "@/components/ui/StreakCard";
import { useAppStore } from "@/lib/store/appStore";
import { VOCABULARY, VOCAB_CATEGORIES } from "@/data/vocabulary";
import { BADGES } from "@/lib/utils/xp";
import { getLevelFromXP } from "@/lib/utils/xp";
import { formatMinutes } from "@/lib/utils/formatting";
import { cn } from "@/lib/utils/cn";

export default function ProgressPage() {
  const { stats, wordProgress, lessonProgress, earnedBadges } = useAppStore();
  const levelInfo = getLevelFromXP(stats.totalXP);

  const wordStats = useMemo(() => {
    const all = Object.values(wordProgress);
    return {
      new: all.filter((p) => p.status === "new").length,
      learning: all.filter((p) => p.status === "learning").length,
      reviewing: all.filter((p) => p.status === "reviewing").length,
      mastered: all.filter((p) => p.status === "mastered").length,
      total: all.length,
    };
  }, [wordProgress]);

  const completedLessons = Object.values(lessonProgress).filter(
    (p) => p.status === "completed"
  ).length;

  const earnedBadgeIds = new Set(earnedBadges.map((b) => b.badgeId));

  const categoryStrengths = useMemo(() => {
    return Object.entries(VOCAB_CATEGORIES)
      .map(([catId, cat]) => {
        const words = VOCABULARY.filter((w) => w.category === catId);
        if (words.length === 0) return null;
        const mastered = words.filter(
          (w) => wordProgress[w.id]?.status === "mastered"
        ).length;
        const reviewing = words.filter(
          (w) => wordProgress[w.id]?.status === "reviewing"
        ).length;
        const score = words.length > 0
          ? Math.round(((mastered + reviewing * 0.5) / words.length) * 100)
          : 0;
        return { catId, ...cat, total: words.length, score };
      })
      .filter((c): c is NonNullable<typeof c> => !!c && c.total > 0)
      .sort((a, b) => b.score - a.score);
  }, [wordProgress]);

  return (
    <AppShell>
      <MobileHeader title="Voortgang" subtitle="Jouw leerstatistieken" />

      <div className="px-4 py-4 space-y-5">
        {/* Level + XP */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 bg-bg-card border border-border-default"
        >
          <div className="flex items-center gap-5">
            <ProgressRing
              percent={levelInfo.progressPercent}
              size={80}
              strokeWidth={6}
              color="#FF6B4A"
            >
              <div className="text-center">
                <p className="text-lg font-bold text-text-primary leading-none">{levelInfo.level}</p>
                <p className="text-2xs text-text-secondary">lvl</p>
              </div>
            </ProgressRing>
            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-bold text-text-primary">Niveau {levelInfo.level}</h2>
              <p className="text-sm text-text-secondary">
                {stats.totalXP.toLocaleString()} XP totaal
              </p>
              <p className="text-xs text-text-muted">
                Nog {levelInfo.xpToNextLevel} XP naar niveau {levelInfo.level + 1}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Streak */}
        <StreakCard streak={stats.currentStreak} />

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Lessen voltooid", value: completedLessons, total: 60, color: "brand-coral" },
            { label: "Woorden actief", value: wordStats.total, total: VOCABULARY.length, color: "brand-teal" },
            { label: "Woorden beheerst", value: wordStats.mastered, total: wordStats.total, color: "brand-green" },
            { label: "Totale tijd", value: formatMinutes(stats.totalTimeMinutes), total: null, color: "brand-gold" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl p-4 bg-bg-card border border-border-default space-y-1"
            >
              <p className="text-2xl font-display font-bold text-text-primary">{stat.value}</p>
              {stat.total !== null && (
                <p className="text-xs text-text-secondary">van {stat.total}</p>
              )}
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Word status breakdown */}
        <div className="rounded-3xl p-4 bg-bg-card border border-border-default space-y-3">
          <h2 className="text-sm font-bold text-text-primary">Woordenstatus</h2>
          {[
            { label: "Nieuw", value: wordStats.new, color: "bg-white/20" },
            { label: "Aan het leren", value: wordStats.learning, color: "bg-brand-gold" },
            { label: "Reviewing", value: wordStats.reviewing, color: "bg-brand-teal" },
            { label: "Beheerst", value: wordStats.mastered, color: "bg-brand-green" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={cn("w-3 h-3 rounded-full shrink-0", item.color)} />
              <span className="text-sm text-text-secondary flex-1">{item.label}</span>
              <span className="text-sm font-bold text-text-primary">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Category strengths */}
        <div className="rounded-3xl p-4 bg-bg-card border border-border-default space-y-3">
          <h2 className="text-sm font-bold text-text-primary">Sterkste categorieën</h2>
          {categoryStrengths.slice(0, 6).map((cat, i) => (
            <div key={cat.catId} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">
                  {cat.emoji} {cat.label}
                </span>
                <span className="text-xs font-bold text-text-primary">{cat.score}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-teal rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.score}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-text-primary">
            Badges ({earnedBadges.length}/{BADGES.length})
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {BADGES.map((badge) => {
              const earned = earnedBadgeIds.has(badge.id);
              return (
                <div
                  key={badge.id}
                  className={cn(
                    "rounded-2xl p-3 border text-center space-y-1 transition-all",
                    earned
                      ? "border-brand-gold/30 bg-brand-gold/10"
                      : "border-border-subtle bg-bg-card opacity-40"
                  )}
                >
                  <p className={cn("text-2xl", !earned && "grayscale")}>{badge.icon}</p>
                  <p className="text-2xs font-semibold text-text-primary leading-tight">{badge.title}</p>
                  {earned && (
                    <p className="text-2xs text-brand-gold">+{badge.xpReward} XP</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </AppShell>
  );
}

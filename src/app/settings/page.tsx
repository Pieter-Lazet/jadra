"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useAppStore } from "@/lib/store/appStore";
import { cn } from "@/lib/utils/cn";
import type { DailyGoalMinutes } from "@/lib/types";

export default function SettingsPage() {
  const { profile, updateProfile, resetProgress } = useAppStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const DAILY_GOALS: { minutes: DailyGoalMinutes; label: string }[] = [
    { minutes: 15, label: "15 min" },
    { minutes: 30, label: "30 min" },
    { minutes: 45, label: "45 min" },
    { minutes: 60, label: "60 min" },
  ];

  if (!profile) {
    return (
      <AppShell>
        <MobileHeader title="Instellingen" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Nog niet ingesteld. Doorloop de onboarding.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <MobileHeader title="Instellingen" />

      <div className="px-4 py-4 space-y-5">
        {/* Dagdoel */}
        <div className="rounded-3xl p-4 bg-bg-card border border-border-default space-y-3">
          <h2 className="text-sm font-bold text-text-primary">Dagelijks doel</h2>
          <div className="grid grid-cols-4 gap-2">
            {DAILY_GOALS.map((dg) => (
              <motion.button
                key={dg.minutes}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateProfile({ dailyGoalMinutes: dg.minutes })}
                className={cn(
                  "py-2.5 rounded-2xl border text-sm font-medium transition-all",
                  profile.dailyGoalMinutes === dg.minutes
                    ? "border-brand-coral bg-brand-coral/10 text-brand-coral"
                    : "border-border-default bg-bg-surface text-text-secondary hover:border-brand-coral/30"
                )}
              >
                {dg.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Geluid */}
        <div className="rounded-3xl p-4 bg-bg-card border border-border-default">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text-primary">Geluid</p>
              <p className="text-xs text-text-secondary mt-0.5">Feedback geluiden in-app</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => updateProfile({ soundEnabled: !profile.soundEnabled })}
              className={cn(
                "w-12 h-6 rounded-full relative transition-all",
                profile.soundEnabled ? "bg-brand-coral" : "bg-white/10"
              )}
              aria-label={`Geluid ${profile.soundEnabled ? "uitschakelen" : "inschakelen"}`}
              role="switch"
              aria-checked={profile.soundEnabled}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ left: profile.soundEnabled ? "calc(100% - 22px)" : "2px" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Animaties */}
        <div className="rounded-3xl p-4 bg-bg-card border border-border-default">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text-primary">Animaties</p>
              <p className="text-xs text-text-secondary mt-0.5">Schakel uit als je liever minder beweging hebt</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => updateProfile({ animationsEnabled: !profile.animationsEnabled })}
              className={cn(
                "w-12 h-6 rounded-full relative transition-all",
                profile.animationsEnabled ? "bg-brand-coral" : "bg-white/10"
              )}
              aria-label={`Animaties ${profile.animationsEnabled ? "uitschakelen" : "inschakelen"}`}
              role="switch"
              aria-checked={profile.animationsEnabled}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ left: profile.animationsEnabled ? "calc(100% - 22px)" : "2px" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </motion.button>
          </div>
        </div>

        {/* App info */}
        <div className="rounded-3xl p-4 bg-bg-card border border-border-default space-y-3">
          <h2 className="text-sm font-bold text-text-primary">Over Jadra</h2>
          <div className="space-y-2">
            {[
              { label: "Versie", value: "0.1.0" },
              { label: "Woorden beschikbaar", value: "205" },
              { label: "Grammatica lessen", value: "20" },
              { label: "Scenario's", value: "10" },
              { label: "Taal interface", value: "Nederlands" },
              { label: "Leertaal", value: "Kroatisch" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-sm text-text-secondary">{item.label}</span>
                <span className="text-sm text-text-primary font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Toekomstige functies placeholder */}
        <div className="rounded-3xl p-4 bg-bg-card border border-border-subtle space-y-2 opacity-60">
          <h2 className="text-sm font-bold text-text-muted">Binnenkort</h2>
          <p className="text-xs text-text-muted">Audio / TTS uitspraak</p>
          <p className="text-xs text-text-muted">Dagelijkse herinnering instellen</p>
          <p className="text-xs text-text-muted">Voortgang exporteren</p>
          <p className="text-xs text-text-muted">Supabase account synchronisatie</p>
        </div>

        {/* Reset */}
        <div className="rounded-3xl p-4 bg-bg-card border border-brand-red/20 space-y-3">
          <h2 className="text-sm font-bold text-brand-red">Gevaarzone</h2>
          {!showResetConfirm ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-3 rounded-2xl border border-brand-red/30 text-brand-red text-sm font-medium hover:bg-brand-red/5 transition-all"
            >
              Voortgang resetten
            </motion.button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <p className="text-sm text-brand-red font-medium">
                  Weet je het zeker? Dit kan niet ongedaan worden!
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowResetConfirm(false)}
                    className="py-3 rounded-2xl bg-bg-surface border border-border-default text-text-secondary text-sm"
                  >
                    Annuleren
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      resetProgress();
                      setShowResetConfirm(false);
                    }}
                    className="py-3 rounded-2xl bg-brand-red/10 border border-brand-red/30 text-brand-red text-sm font-bold"
                  >
                    Ja, reset alles
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
    </AppShell>
  );
}

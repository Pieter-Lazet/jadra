"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Flame, Star, BookOpen, Target } from "lucide-react";
import { useAppStore } from "@/lib/store/appStore";
import type { LearningGoal, ProficiencyLevel, DailyGoalMinutes } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

type Step = "goal" | "level" | "daily_goal" | "welcome";

const GOALS: { id: LearningGoal; emoji: string; label: string; desc: string }[] = [
  { id: "travel", emoji: "✈️", label: "Reizen", desc: "Ik ga naar Kroatië of Dalmatië" },
  { id: "family", emoji: "👨‍👩‍👧", label: "Familie", desc: "Mijn partner/familie spreekt Kroatisch" },
  { id: "culture", emoji: "🎭", label: "Cultuur", desc: "Ik hou van Kroatische cultuur en muziek" },
  { id: "work", emoji: "💼", label: "Werk", desc: "Voor professionele doeleinden" },
  { id: "challenge", emoji: "🏆", label: "Uitdaging", desc: "Ik hou van talen leren" },
  { id: "fun", emoji: "😄", label: "Fun", desc: "Gewoon voor de lol!" },
];

const LEVELS: { id: ProficiencyLevel; emoji: string; label: string; desc: string }[] = [
  { id: "beginner", emoji: "🌱", label: "Beginner", desc: "Ik ken vrijwel geen Kroatisch" },
  { id: "some_experience", emoji: "🌿", label: "Beetje ervaring", desc: "Ik ken wat woorden/zinnen" },
  { id: "intermediate", emoji: "🌳", label: "Tussenliggend", desc: "Ik kan eenvoudige gesprekken voeren" },
];

const DAILY_GOALS: { minutes: DailyGoalMinutes; label: string; desc: string; emoji: string }[] = [
  { minutes: 15, label: "15 minuten", desc: "Snelle dagelijkse sessie", emoji: "⚡" },
  { minutes: 30, label: "30 minuten", desc: "Solide leerritme", emoji: "🎯" },
  { minutes: 45, label: "45 minuten", desc: "Serieuze leerder", emoji: "🚀" },
  { minutes: 60, label: "60 minuten", desc: "Vloeiendheidsdoel in 2 maanden!", emoji: "💎" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const setProfile = useAppStore((s) => s.setProfile);
  const touchStreak = useAppStore((s) => s.touchStreak);

  const [step, setStep] = useState<Step>("goal");
  const [goal, setGoal] = useState<LearningGoal | null>(null);
  const [level, setLevel] = useState<ProficiencyLevel | null>(null);
  const [dailyGoal, setDailyGoal] = useState<DailyGoalMinutes | null>(null);

  const handleStart = () => {
    if (!goal || !level || !dailyGoal) return;

    setProfile({
      id: `user_${Date.now()}`,
      learningGoal: goal,
      proficiencyLevel: level,
      dailyGoalMinutes: dailyGoal,
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
      soundEnabled: true,
      animationsEnabled: true,
    });
    touchStreak();
    router.push("/dashboard");
  };

  const STEPS: Step[] = ["goal", "level", "daily_goal", "welcome"];
  const stepIdx = STEPS.indexOf(step);
  const progress = ((stepIdx + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-coral flex items-center justify-center">
            <span className="text-sm font-bold text-white">J</span>
          </div>
          <span className="text-sm font-semibold text-text-primary">Jadra</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-coral rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="text-xs text-text-secondary">Stap {stepIdx + 1} van {STEPS.length}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-8">
        <AnimatePresence mode="wait">

          {/* Goal step */}
          {step === "goal" && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-display font-bold text-text-primary">
                  Waarom wil je Kroatisch leren?
                </h1>
                <p className="text-text-secondary">
                  We passen de lessen aan op jouw doel.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map((g) => (
                  <motion.button
                    key={g.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setGoal(g.id); setStep("level"); }}
                    className={cn(
                      "flex flex-col items-start gap-2 p-4 rounded-3xl border text-left transition-all",
                      goal === g.id
                        ? "border-brand-coral bg-brand-coral/10"
                        : "border-border-default bg-bg-card hover:border-brand-coral/30"
                    )}
                  >
                    <span className="text-2xl">{g.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{g.label}</p>
                      <p className="text-xs text-text-secondary mt-0.5 leading-tight">{g.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Level step */}
          {step === "level" && (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-display font-bold text-text-primary">
                  Wat is je niveau?
                </h1>
                <p className="text-text-secondary">Eerlijk zijn helpt ons de juiste lessen te kiezen.</p>
              </div>
              <div className="space-y-3">
                {LEVELS.map((l) => (
                  <motion.button
                    key={l.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setLevel(l.id); setStep("daily_goal"); }}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-3xl border text-left transition-all",
                      level === l.id
                        ? "border-brand-coral bg-brand-coral/10"
                        : "border-border-default bg-bg-card hover:border-brand-coral/30"
                    )}
                  >
                    <span className="text-3xl">{l.emoji}</span>
                    <div>
                      <p className="font-semibold text-text-primary">{l.label}</p>
                      <p className="text-sm text-text-secondary mt-0.5">{l.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Daily goal step */}
          {step === "daily_goal" && (
            <motion.div
              key="daily_goal"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-display font-bold text-text-primary">
                  Hoeveel tijd per dag?
                </h1>
                <p className="text-text-secondary">Wees realistisch — consistentie wint van intensiteit.</p>
              </div>
              <div className="space-y-3">
                {DAILY_GOALS.map((dg) => (
                  <motion.button
                    key={dg.minutes}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setDailyGoal(dg.minutes); setStep("welcome"); }}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-3xl border text-left transition-all",
                      dailyGoal === dg.minutes
                        ? "border-brand-coral bg-brand-coral/10"
                        : "border-border-default bg-bg-card hover:border-brand-coral/30"
                    )}
                  >
                    <span className="text-3xl">{dg.emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary">{dg.label}</p>
                      <p className="text-sm text-text-secondary mt-0.5">{dg.desc}</p>
                    </div>
                    {dg.minutes === 60 && (
                      <span className="text-xs bg-brand-gold/15 text-brand-gold border border-brand-gold/20 rounded-full px-2 py-0.5 font-bold shrink-0">
                        AANBEVOLEN
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Welcome step */}
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-center pt-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-7xl"
              >
                🇭🇷
              </motion.div>
              <div className="space-y-3">
                <h1 className="text-3xl font-display font-bold text-text-primary">
                  Klaar voor dag 1!
                </h1>
                <p className="text-text-secondary leading-relaxed">
                  Je gaat in {dailyGoal} minuten per dag Kroatisch leren.<br />
                  Met consistentie ben je over 2 maanden basistaalvaardig!
                </p>
              </div>

              {/* Stats preview */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Flame size={18} className="text-brand-coral" />, val: "0 dagen", label: "Streak" },
                  { icon: <Star size={18} className="text-brand-gold" />, val: "0 XP", label: "Punten" },
                  { icon: <BookOpen size={18} className="text-brand-teal" />, val: "60 lessen", label: "Te gaan" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="rounded-2xl p-3 bg-bg-card border border-border-default space-y-1"
                  >
                    {item.icon}
                    <p className="text-sm font-bold text-text-primary">{item.val}</p>
                    <p className="text-2xs text-text-secondary">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleStart}
                className="w-full py-4 rounded-3xl bg-brand-coral text-white font-bold text-lg hover:bg-brand-coral-light transition-colors flex items-center justify-center gap-2 shadow-glow"
              >
                Begin met leren!
                <ChevronRight size={20} />
              </motion.button>

              <p className="text-xs text-text-muted">
                Altijd aanpasbaar in instellingen
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

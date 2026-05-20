"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { ScenarioChat } from "@/components/learning/ScenarioChat";
import { RewardModal } from "@/components/ui/RewardModal";
import { useAppStore } from "@/lib/store/appStore";
import { SCENARIOS } from "@/data/scenarios";
import { useState } from "react";

export default function ScenarioPage({ params }: { params: Promise<{ scenario: string }> }) {
  const { scenario: scenarioSlug } = use(params);
  const router = useRouter();
  const { addXP } = useAppStore();
  const [showReward, setShowReward] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const scenario = SCENARIOS.find((s) => s.slug === scenarioSlug);

  if (!scenario) {
    return (
      <AppShell>
        <MobileHeader title="Niet gevonden" showBack />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Scenario niet gevonden</p>
        </div>
      </AppShell>
    );
  }

  const handleComplete = (score: number) => {
    const xp = Math.round((score / 100) * scenario.xpReward);
    addXP(xp);
    setEarnedXP(xp);
    setShowReward(true);
  };

  return (
    <AppShell hideNav>
      <MobileHeader
        title={scenario.title}
        subtitle={scenario.setting}
        showBack
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ScenarioChat scenario={scenario} onComplete={handleComplete} />
      </div>

      <RewardModal
        isOpen={showReward}
        onClose={() => {
          setShowReward(false);
          router.push("/scenarios");
        }}
        xpEarned={earnedXP}
        type="lesson_complete"
        message="Gesprek voltooid! 💬"
      />
    </AppShell>
  );
}

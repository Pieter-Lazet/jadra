"use client";

import { use } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { GrammarCard } from "@/components/learning/GrammarCard";
import { useAppStore } from "@/lib/store/appStore";
import { GRAMMAR_LESSONS } from "@/data/grammar-lessons";

export default function GrammarLessonPage({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: lessonSlug } = use(params);
  const { addXP } = useAppStore();

  const lesson = GRAMMAR_LESSONS.find((l) => l.slug === lessonSlug);

  if (!lesson) {
    return (
      <AppShell>
        <MobileHeader title="Niet gevonden" showBack />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Grammatica les niet gevonden</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <MobileHeader
        title={lesson.title}
        subtitle={lesson.subtitle}
        showBack
      />

      <div className="px-4 py-4">
        <GrammarCard
          lesson={lesson}
          onComplete={(score) => {
            addXP(Math.round((score / 100) * 50));
          }}
        />
      </div>
    </AppShell>
  );
}

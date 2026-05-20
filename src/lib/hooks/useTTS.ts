"use client";

import { useCallback } from "react";
import { useAppStore } from "@/lib/store/appStore";

export function useTTS() {
  const soundEnabled = useAppStore((s) => s.profile?.soundEnabled ?? true);

  const speak = useCallback(
    (text: string, lang = "hr-HR") => {
      if (!soundEnabled) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    },
    [soundEnabled]
  );

  return { speak };
}

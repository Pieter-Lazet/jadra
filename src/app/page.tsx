"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/appStore";
import { motion } from "framer-motion";

export default function RootPage() {
  const router = useRouter();
  const isOnboarded = useAppStore((s) => s.isOnboarded);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOnboarded()) {
        router.replace("/dashboard");
      } else {
        router.replace("/onboarding");
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [isOnboarded, router]);

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        {/* Logo */}
        <div className="w-24 h-24 rounded-4xl bg-gradient-coral flex items-center justify-center shadow-glow">
          <span className="text-4xl font-display font-bold text-white">J</span>
        </div>
        <motion.div
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-brand-teal flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <span className="text-sm">🇭🇷</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">
          Jadra
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Govori kao lokalni — Spreek als een local
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex gap-1.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-brand-coral rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </div>
  );
}

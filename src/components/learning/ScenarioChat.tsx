"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, MessageCircle } from "lucide-react";
import type { Scenario, ScenarioTurn, ScenarioOption } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { useTTS } from "@/lib/hooks/useTTS";

interface ScenarioChatProps {
  scenario: Scenario;
  onComplete: (score: number) => void;
}

interface Message {
  turn: ScenarioTurn;
  selectedOption?: ScenarioOption;
}

export function ScenarioChat({ scenario, onComplete }: ScenarioChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { speak } = useTTS();

  const currentTurn = scenario.turns[currentTurnIndex];
  const isUserTurn = currentTurn?.speaker === "user";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!currentTurn) {
      setIsComplete(true);
      const score = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
      setTimeout(() => onComplete(score), 500);
      return;
    }

    if (currentTurn.speaker === "npc") {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, { turn: currentTurn }]);
        speak(currentTurn.croatian);
        setCurrentTurnIndex((i) => i + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentTurnIndex, currentTurn, totalCorrect, totalAnswered, onComplete]);

  const handleOptionSelect = (option: ScenarioOption) => {
    if (!currentTurn) return;

    setMessages((prev) => [
      ...prev,
      { turn: currentTurn, selectedOption: option },
    ]);
    setLastFeedback(option.feedback ?? null);
    setTotalAnswered((n) => n + 1);
    if (option.isCorrect) setTotalCorrect((n) => n + 1);

    setTimeout(() => {
      setLastFeedback(null);
      setCurrentTurnIndex((i) => i + 1);
    }, 1800);
  };

  if (isComplete) {
    const score = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 100;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 p-8 text-center"
      >
        <div className="text-6xl">{score >= 80 ? "🎉" : score >= 60 ? "👍" : "💪"}</div>
        <div>
          <h2 className="text-2xl font-display font-bold text-text-primary">
            Gesprek voltooid!
          </h2>
          <p className="text-text-secondary mt-1">
            {totalCorrect}/{totalAnswered} goede keuzes
          </p>
        </div>
        <div
          className={cn(
            "text-3xl font-bold",
            score >= 80 ? "text-brand-green" : score >= 60 ? "text-brand-gold" : "text-brand-coral"
          )}
        >
          {score}%
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-border-subtle">
        <p className="text-xs text-text-secondary">{scenario.setting}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-2",
                msg.turn.speaker === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              {msg.turn.speaker === "npc" && (
                <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center shrink-0 mt-1">
                  <MessageCircle size={14} className="text-brand-teal" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-3xl px-4 py-3 space-y-1",
                  msg.turn.speaker === "npc"
                    ? "bg-bg-elevated text-text-primary rounded-tl-sm"
                    : msg.selectedOption?.isCorrect
                    ? "bg-brand-green/15 border border-brand-green/20 rounded-tr-sm"
                    : "bg-brand-red/15 border border-brand-red/20 rounded-tr-sm"
                )}
              >
                <p className="text-sm font-medium">
                  {msg.turn.speaker === "npc"
                    ? msg.turn.croatian
                    : msg.selectedOption?.croatian ?? ""}
                </p>
                <p className="text-xs text-text-secondary">
                  {msg.turn.speaker === "npc"
                    ? msg.turn.dutch
                    : msg.selectedOption?.dutch ?? ""}
                </p>
                {msg.turn.speaker === "user" && msg.selectedOption && (
                  <div className="flex items-center gap-1">
                    {msg.selectedOption.isCorrect ? (
                      <CheckCircle2 size={12} className="text-brand-green" />
                    ) : (
                      <XCircle size={12} className="text-brand-red" />
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {!isUserTurn && currentTurn?.speaker === "npc" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 px-2"
          >
            <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center">
              <MessageCircle size={14} className="text-brand-teal" />
            </div>
            <div className="bg-bg-elevated rounded-2xl px-4 py-2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-text-muted rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Feedback banner */}
      <AnimatePresence>
        {lastFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mx-4 mb-2 rounded-2xl px-4 py-2 bg-brand-gold/10 border border-brand-gold/20"
          >
            <p className="text-xs text-brand-gold">{lastFeedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User options */}
      {isUserTurn && currentTurn?.options && (
        <div className="px-4 pb-4 space-y-2">
          <p className="text-xs text-text-muted mb-2">Kies je antwoord:</p>
          {currentTurn.options.map((option) => (
            <motion.button
              key={option.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionSelect(option)}
              className="w-full text-left px-4 py-3 rounded-2xl bg-bg-elevated border border-border-default hover:border-brand-coral/30 transition-all"
            >
              <p className="text-sm font-medium text-text-primary">{option.croatian}</p>
              <p className="text-xs text-text-secondary mt-0.5">{option.dutch}</p>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

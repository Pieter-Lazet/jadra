"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export function MobileHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightSlot,
  transparent = false,
  className,
}: MobileHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between px-4 py-3 safe-top",
        transparent
          ? "bg-transparent"
          : "bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle",
        className
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showBack && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="flex items-center justify-center w-9 h-9 rounded-2xl bg-bg-card border border-border-default text-text-secondary hover:text-text-primary transition-colors shrink-0"
            aria-label="Terug"
          >
            <ChevronLeft size={20} />
          </motion.button>
        )}
        {(title || subtitle) && (
          <div className="min-w-0">
            {title && (
              <h1 className="text-lg font-display font-semibold text-text-primary truncate">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs text-text-secondary truncate">{subtitle}</p>
            )}
          </div>
        )}
      </div>
      {rightSlot && (
        <div className="flex items-center gap-2 shrink-0 ml-3">{rightSlot}</div>
      )}
    </header>
  );
}

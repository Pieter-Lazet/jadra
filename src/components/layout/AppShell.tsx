"use client";

import { BottomNavigation } from "./BottomNavigation";
import { cn } from "@/lib/utils/cn";

interface AppShellProps {
  children: React.ReactNode;
  hideNav?: boolean;
  className?: string;
}

export function AppShell({ children, hideNav = false, className }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col max-w-lg mx-auto relative">
      <main
        className={cn(
          "flex-1 flex flex-col",
          !hideNav && "pb-20", // space for bottom nav
          className
        )}
      >
        {children}
      </main>
      {!hideNav && <BottomNavigation />}
    </div>
  );
}

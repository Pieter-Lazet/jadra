"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpen, Brain, BarChart2, Settings } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/learn", icon: BookOpen, label: "Lessen" },
  { href: "/vocabulary", icon: Brain, label: "Woorden" },
  { href: "/progress", icon: BarChart2, label: "Voortgang" },
  { href: "/settings", icon: Settings, label: "Instellingen" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border-default safe-bottom"
      role="navigation"
      aria-label="Hoofdnavigatie"
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 min-w-[52px] tap-highlight",
                isActive
                  ? "text-brand-coral"
                  : "text-text-secondary hover:text-text-primary"
              )}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -inset-2 bg-brand-coral/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className="relative z-10"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className="text-2xs font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

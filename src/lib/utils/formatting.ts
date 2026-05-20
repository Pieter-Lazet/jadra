export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}u ${m}m` : `${h}u`;
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function getAccuracyColor(percent: number): string {
  if (percent >= 90) return "text-brand-green";
  if (percent >= 70) return "text-brand-gold";
  if (percent >= 50) return "text-brand-coral";
  return "text-brand-red";
}

export function getDifficultyLabel(difficulty: string): string {
  const map: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Gemiddeld",
    advanced: "Gevorderd",
  };
  return map[difficulty] ?? difficulty;
}

export function getDifficultyColor(difficulty: string): string {
  const map: Record<string, string> = {
    beginner: "text-brand-green bg-brand-green/10",
    intermediate: "text-brand-gold bg-brand-gold/10",
    advanced: "text-brand-red bg-brand-red/10",
  };
  return map[difficulty] ?? "text-text-secondary";
}

import { cn } from "@/utils/cn";

interface CharacterCounterProps {
  current: number;
  max: number;
  className?: string;
}

export function CharacterCounter({ current, max, className }: CharacterCounterProps) {
  const percent = (current / max) * 100;
  const isWarning = percent > 80;
  const isError = percent >= 100;

  return (
    <span
      className={cn(
        "text-xs tabular-nums transition-colors",
        isError ? "text-error" : isWarning ? "text-warning" : "text-text-muted",
        className
      )}
    >
      {current}/{max}
    </span>
  );
}

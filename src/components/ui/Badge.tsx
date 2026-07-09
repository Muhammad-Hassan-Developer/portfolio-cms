import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "gradient";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        {
          "bg-accent-blue/10 text-accent-blue border border-accent-blue/20":
            variant === "default",
          "bg-surface-elevated text-text-secondary border border-border":
            variant === "secondary",
          "border border-border text-text-secondary hover:border-accent-blue/30":
            variant === "outline",
          "bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-text-primary border border-accent-purple/20":
            variant === "gradient",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

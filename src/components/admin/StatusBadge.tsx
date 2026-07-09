import { cn } from "@/utils/cn";

type BadgeVariant = "published" | "draft" | "featured" | "archived" | "active" | "inactive";

interface StatusBadgeProps {
  variant: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  published: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  draft: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  featured: { bg: "bg-accent-blue/10", text: "text-accent-blue", dot: "bg-accent-blue" },
  archived: { bg: "bg-text-muted/10", text: "text-text-muted", dot: "bg-text-muted" },
  active: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  inactive: { bg: "bg-text-muted/10", text: "text-text-muted", dot: "bg-text-muted" },
};

export function StatusBadge({ variant, className, dot = true }: StatusBadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles.bg,
        styles.text,
        className
      )}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      )}
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </span>
  );
}

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-border/80 hover:shadow-lg hover:shadow-black/20",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export { Card };

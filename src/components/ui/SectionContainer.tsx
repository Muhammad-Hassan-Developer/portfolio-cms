import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

const SectionContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
});
SectionContainer.displayName = "SectionContainer";

export { SectionContainer };

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface AdminPageContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

const AdminPageContainer = forwardRef<HTMLDivElement, AdminPageContainerProps>(
  ({ className, maxWidth = "xl", children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mx-auto w-full px-4 py-6 sm:px-6 lg:px-8", className)} {...props}>
        <div className={cn(maxWidthMap[maxWidth], "mx-auto")}>
          {children}
        </div>
      </div>
    );
  }
);
AdminPageContainer.displayName = "AdminPageContainer";

export { AdminPageContainer };

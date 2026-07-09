import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-accent-blue text-white hover:bg-accent-blue-light shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40 hover:scale-[1.02]",
        secondary:
          "bg-surface-elevated text-text-primary border border-border hover:bg-surface-hover hover:border-accent-blue/30 hover:shadow-lg hover:shadow-accent-blue/5 hover:scale-[1.02]",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-surface-elevated hover:scale-[1.02]",
        outline:
          "border border-border text-text-primary hover:bg-surface-elevated hover:border-accent-blue/30 hover:shadow-lg hover:shadow-accent-blue/5 hover:scale-[1.02]",
        gradient:
          "bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:opacity-90 shadow-lg shadow-accent-purple/20 hover:shadow-accent-purple/40 hover:scale-[1.02]",
        link: "text-accent-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

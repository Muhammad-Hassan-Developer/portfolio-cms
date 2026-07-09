import { cn } from "@/utils/cn";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export function AnimatedHeading({ text, className }: AnimatedHeadingProps) {
  return (
    <h1
      className={cn(
        "text-5xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl xl:text-8xl",
        className
      )}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block">
          <span
            className={
              word.toLowerCase() === "ai" || word.toLowerCase() === "ml"
                ? "gradient-text"
                : ""
            }
          >
            {word}
          </span>
          {i < text.split(" ").length - 1 && "\u00A0"}
        </span>
      ))}
    </h1>
  );
}

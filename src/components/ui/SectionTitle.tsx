import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  description,
  center = true,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "mb-16",
        center && "text-center",
        className
      )}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 inline-block rounded-full bg-accent-blue/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent-blue"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
      >
        {title.split(" ").map((word, i) => {
          const isGradient = ["Intelligence", "AI", "Scale", "Impact", "Expertise", "Journey"].includes(word);
          return (
            <span key={i} className="inline-block">
              <span className={isGradient ? "gradient-text" : ""}>{word}</span>
              {i < title.split(" ").length - 1 && "\u00A0"}
            </span>
          );
        })}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-6 text-center text-base leading-relaxed text-text-secondary"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

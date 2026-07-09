import { motion } from "framer-motion";

interface CountUpProps {
  value: string;
  label: string;
  className?: string;
}

export function CountUp({ value, label, className }: CountUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl font-bold gradient-text sm:text-4xl"
      >
        {value}
      </motion.div>
      <div className="mt-1 text-sm text-text-secondary">{label}</div>
    </motion.div>
  );
}

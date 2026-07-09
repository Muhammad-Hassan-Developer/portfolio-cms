import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

interface AutoSaveIndicatorProps {
  status: "idle" | "saving" | "saved" | "error";
}

export function AutoSaveIndicator({ status }: AutoSaveIndicatorProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-1.5 text-xs"
      >
        {status === "saving" && (
          <>
            <Loader2 className="h-3 w-3 animate-spin text-accent-blue" />
            <span className="text-accent-blue">Saving...</span>
          </>
        )}
        {status === "saved" && (
          <>
            <Check className="h-3 w-3 text-success" />
            <span className="text-success">Saved</span>
          </>
        )}
        {status === "error" && (
          <span className="text-error">Save failed</span>
        )}
        {status === "idle" && (
          <span className="text-text-muted">Changes pending</span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

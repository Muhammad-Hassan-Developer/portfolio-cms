import { motion } from "framer-motion";
import { FolderOpen, Award, Code2, Image, MessageSquare } from "lucide-react";
import { cn } from "@/utils/cn";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "projects" | "certificates" | "skills" | "media" | "messages";
  action?: React.ReactNode;
  className?: string;
}

const iconMap = {
  projects: FolderOpen,
  certificates: Award,
  skills: Code2,
  media: Image,
  messages: MessageSquare,
};

export function EmptyState({ title, description, icon = "projects", action, className }: EmptyStateProps) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center py-16 text-center", className)}
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-elevated border border-border/50">
        <Icon className="h-8 w-8 text-text-muted" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-text-secondary">{description}</p>
      {action}
    </motion.div>
  );
}

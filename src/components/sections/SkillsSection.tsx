import { motion } from "framer-motion";
import { Brain, MessageSquare, Code2, Server } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { skillCategories } from "@/data/skillsData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  MessageSquare,
  Code2,
  Server,
};

const categoryColors: Record<string, { gradient: string; iconBg: string; iconColor: string; glow: string }> = {
  "ml-frameworks": {
    gradient: "from-accent-blue/20 to-accent-purple/10",
    iconBg: "bg-accent-blue/10",
    iconColor: "text-accent-blue",
    glow: "group-hover:shadow-accent-blue/10",
  },
  "llm-tools": {
    gradient: "from-accent-purple/20 to-accent-blue/10",
    iconBg: "bg-accent-purple/10",
    iconColor: "text-accent-purple",
    glow: "group-hover:shadow-accent-purple/10",
  },
  programming: {
    gradient: "from-success/20 to-accent-blue/10",
    iconBg: "bg-success/10",
    iconColor: "text-success",
    glow: "group-hover:shadow-success/10",
  },
  infrastructure: {
    gradient: "from-warning/20 to-accent-purple/10",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    glow: "group-hover:shadow-warning/10",
  },
};

export function SkillsSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-accent-purple/[0.02] blur-[100px]" />
      </div>

      <SectionContainer>
        <SectionTitle
          subtitle="Skills & Expertise"
          title="Technical Proficiency"
          description="A deep toolkit spanning machine learning, infrastructure, and software engineering."
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];
            const colors = categoryColors[category.id] || categoryColors["ml-frameworks"];

            return (
              <StaggerItem key={category.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`glass group h-full rounded-2xl p-6 gradient-border transition-shadow duration-300 shadow-lg ${colors.glow}`}
                >
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg} ${colors.iconColor} transition-all duration-300 group-hover:scale-110`}>
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>

                  <h3 className="mb-4 text-base font-semibold text-text-primary">
                    {category.name}
                  </h3>

                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium text-text-secondary">
                            {skill.name}
                          </span>
                          <span className="text-[10px] text-text-muted">{skill.level}%</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-surface-elevated">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </SectionContainer>
    </section>
  );
}

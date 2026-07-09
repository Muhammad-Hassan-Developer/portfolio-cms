import { motion } from "framer-motion";
import { Brain, Globe, Eye, Server, ArrowRight, Zap, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { aboutData } from "@/data/aboutData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Globe,
  Eye,
  Server,
};

const roleCards = [
  { icon: Brain, title: "AI Engineer", description: "Designing intelligent systems", color: "from-accent-blue/20 to-accent-blue/5", iconColor: "text-accent-blue" },
  { icon: Zap, title: "Problem Solver", description: "Turning complexity into clarity", color: "from-accent-purple/20 to-accent-purple/5", iconColor: "text-accent-purple" },
  { icon: Cpu, title: "Automation Expert", description: "Streamlining workflows with AI", color: "from-success/20 to-success/5", iconColor: "text-success" },
  { icon: Eye, title: "Computer Vision", description: "Teaching machines to see", color: "from-warning/20 to-warning/5", iconColor: "text-warning" },
];

export function AboutPreview() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent-blue/[0.02] blur-[100px]" />
      </div>

      <SectionContainer>
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-border/50">
                <img
                  src={aboutData.image}
                  alt="Alex Chen"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-accent-purple/10 blur-3xl" />
              <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-accent-blue/10 blur-3xl" />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-4 right-8 glass rounded-2xl px-5 py-3 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">8+</div>
                  <div className="text-xs text-text-muted">Years Experience</div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal direction="right">
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent-blue">
                About Me
              </span>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Turning Data Into{" "}
                <span className="gradient-text">Intelligence</span>
              </h2>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-text-secondary">
                {aboutData.description}
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
              {roleCards.map((card) => (
                <StaggerItem key={card.title}>
                  <div className="glass group card-hover cursor-default rounded-2xl p-4 gradient-border">
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} ${card.iconColor} transition-all duration-300 group-hover:scale-110`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-1 text-sm font-semibold text-text-primary">
                      {card.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-text-muted">
                      {card.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal delay={0.3}>
              <Link
                to="/about"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-blue transition-colors hover:text-accent-blue-light"
              >
                Learn more about me
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={0.2} className="mt-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutData.highlights.map((highlight, i) => {
              const Icon = iconMap[highlight.icon];
              return (
                <motion.div
                  key={highlight.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass group card-hover rounded-2xl p-6 gradient-border"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue transition-all duration-300 group-hover:bg-accent-blue group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent-blue/20">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-text-primary">
                    {highlight.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {highlight.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}

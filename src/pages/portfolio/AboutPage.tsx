import { Brain, Globe, Eye, Server, Zap, Cpu } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { aboutService } from "@/services";
import { SEO } from "@/components/seo/SEO";
import { useState, useEffect } from "react";
import type { AboutData } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Globe,
  Eye,
  Server,
};

const roleCards = [
  { icon: Brain, title: "AI Engineer", description: "Designing intelligent systems", color: "text-accent-blue", bg: "bg-accent-blue/10" },
  { icon: Zap, title: "Problem Solver", description: "Turning complexity into clarity", color: "text-accent-purple", bg: "bg-accent-purple/10" },
  { icon: Cpu, title: "Automation Expert", description: "Streamlining workflows with AI", color: "text-success", bg: "bg-success/10" },
  { icon: Eye, title: "Computer Vision", description: "Teaching machines to see", color: "text-warning", bg: "bg-warning/10" },
];

export function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    aboutService.get().then(setAboutData);
  }, []);

  if (!aboutData) return null;

  return (
    <div>
      <SEO title="About" description={aboutData.description} />
      <section className="relative py-16 lg:py-24">
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
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-accent-purple/10 blur-3xl" />
                <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-accent-blue/10 blur-3xl" />
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal direction="right">
                <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent-blue">
                  About Me
                </span>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                  Crafting the Future of{" "}
                  <span className="gradient-text">AI</span>
                </h2>
                <p className="mb-8 max-w-lg text-base leading-relaxed text-text-secondary">
                  {aboutData.longDescription}
                </p>
              </ScrollReveal>

              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
                {roleCards.map((card) => (
                  <StaggerItem key={card.title}>
                    <div className="glass group card-hover cursor-default rounded-2xl p-4 gradient-border">
                      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.bg} ${card.color} transition-all duration-300 group-hover:scale-110`}>
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
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {aboutData.highlights.map((highlight) => {
                    const Icon = iconMap[highlight.icon];
                    return (
                      <div
                        key={highlight.id}
                        className="glass rounded-xl p-4 gradient-border"
                      >
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                          {Icon && <Icon className="h-5 w-5" />}
                        </div>
                        <h4 className="font-semibold text-text-primary text-sm">
                          {highlight.title}
                        </h4>
                        <p className="mt-1 text-xs text-text-secondary">
                          {highlight.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent-purple/[0.02] blur-[100px]" />
        </div>

        <SectionContainer>
          <SectionTitle subtitle="Experience" title="Professional Journey" />

          <div className="mx-auto max-w-3xl space-y-6">
            {aboutData.experience.map((exp, index) => (
              <ScrollReveal
                key={exp.id}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.1}
              >
                <div className="glass group relative rounded-2xl p-6 pl-14 transition-all duration-300 hover:border-accent-blue/20 hover:shadow-lg hover:shadow-accent-blue/5">
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent-blue to-accent-purple" />
                  <div className="absolute left-0 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-blue shadow-lg shadow-accent-blue/30" />

                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-accent-blue/10 px-3 py-0.5 text-xs font-medium text-accent-blue">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {exp.role}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-accent-purple">
                    {exp.company}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-surface-elevated/80 px-2.5 py-1 text-[10px] font-medium text-text-muted border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </SectionContainer>
      </section>
    </div>
  );
}

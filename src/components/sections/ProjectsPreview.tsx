
import { ExternalLink, ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { projects } from "@/data/projectsData";
import { GithubIcon } from "@/components/ui/SocialIcons";

export function ProjectsPreview() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent-blue/[0.02] blur-[100px]" />
      </div>

      <SectionContainer>
        <SectionTitle
          subtitle="Featured Projects"
          title="Built for Scale, Designed for Impact"
          description="A selection of AI systems I've architected and deployed in production environments."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <TiltCard intensity={8}>
                <div className="glass group relative h-full overflow-hidden rounded-2xl transition-all duration-500 hover:border-accent-blue/20 hover:shadow-2xl hover:shadow-accent-blue/5">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <div className="flex gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue text-white shadow-lg shadow-accent-blue/30 transition-transform hover:scale-110"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-elevated text-text-primary shadow-lg transition-transform hover:scale-110"
                          >
                            <GithubIcon className="h-4 w-4" />
                          </a>
                        )}
                        <Link
                          to={`/projects?detail=${project.id}`}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-purple text-white shadow-lg shadow-accent-purple/30 transition-transform hover:scale-110"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    {project.featured && (
                      <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-1 text-xs font-medium text-white shadow-lg shadow-accent-purple/20">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-bold text-text-primary transition-colors group-hover:text-accent-blue">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-2">
                      {project.shortDescription}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {project.metrics && (
                      <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl bg-surface-elevated/50 p-3">
                        {project.metrics.map((metric) => (
                          <div key={metric.label} className="text-center">
                            <div className="text-sm font-bold gradient-text">
                              {metric.value}
                            </div>
                            <div className="text-[10px] text-text-muted">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 items-center gap-1.5 rounded-lg bg-accent-blue/10 px-3 text-xs font-medium text-accent-blue transition-all duration-300 hover:bg-accent-blue/20"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 items-center gap-1.5 rounded-lg bg-surface-elevated px-3 text-xs font-medium text-text-secondary transition-all duration-300 hover:text-text-primary"
                        >
                          <GithubIcon className="h-3 w-3" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link to="/projects">
              <Button variant="secondary" size="lg" className="group">
                View All Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </section>
  );
}

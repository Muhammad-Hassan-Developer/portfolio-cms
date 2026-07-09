import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { projectsService } from "@/services";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { SEO } from "@/components/seo/SEO";
import type { Project, ProjectCategory } from "@/types";

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);

  useEffect(() => {
    Promise.all([projectsService.getProjects(), projectsService.getCategories()]).then(([p, c]) => {
      setProjects(p);
      setProjectCategories(c);
    });
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <SEO title="Projects" description="Production-grade machine learning solutions across NLP, computer vision, and MLOps." />
      <section className="py-16 lg:py-24">
        <SectionContainer>
          <SectionTitle
            subtitle="Projects"
            title="AI Systems That Scale"
            description="Production-grade machine learning solutions across NLP, computer vision, and MLOps."
          />

          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {projectCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "text-white"
                      : "bg-surface-elevated text-text-secondary hover:text-text-primary border border-border hover:border-accent-blue/30"
                  }`}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TiltCard intensity={6}>
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
                        <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-3">
                          {project.description}
                        </p>

                        <div className="mb-4 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
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
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-elevated text-text-muted">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm text-text-muted">No projects found in this category.</p>
            </div>
          )}
        </SectionContainer>
      </section>
    </div>
  );
}

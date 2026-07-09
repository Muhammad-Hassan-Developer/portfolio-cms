import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { certificatesService } from "@/services";
import { formatDate } from "@/utils/cn";
import { SEO } from "@/components/seo/SEO";
import type { Certificate } from "@/types";

export function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    certificatesService.get().then(setCertificates);
  }, []);

  return (
    <div>
      <SEO title="Certificates" description="Professional certifications from leading technology companies in AI and cloud computing." />
      <section className="py-16 lg:py-24">
        <SectionContainer>
          <SectionTitle
            subtitle="Certifications"
            title="Validated Expertise"
            description="Professional certifications from leading technology companies in AI and cloud computing."
          />

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            {certificates.map((cert, i) => (
              <StaggerItem key={cert.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="glass group relative h-full overflow-hidden rounded-2xl transition-all duration-500 hover:border-accent-blue/20 hover:shadow-2xl hover:shadow-accent-blue/5"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="mb-1 text-lg font-bold text-white">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-white/70">{cert.issuer}</p>
                    </div>

                    {i === 0 && (
                      <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-warning to-amber-400 px-3 py-1 text-xs font-semibold text-black shadow-lg">
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          Top
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-text-muted">
                        {formatDate(cert.date)}
                      </span>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-lg bg-accent-blue/10 px-2.5 py-1 text-xs font-medium text-accent-blue transition-all duration-300 hover:bg-accent-blue/20"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Verify
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-surface-elevated/80 px-2.5 py-1 text-[10px] font-medium text-text-muted border border-border/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SectionContainer>
      </section>
    </div>
  );
}

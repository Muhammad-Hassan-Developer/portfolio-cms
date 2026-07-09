import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Sparkles, Mail, Heart, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { footerData } from "@/data/footerData";
import { PORTFOLIO_NAV } from "@/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  GraduationCap,
};

export function Footer() {
  const [, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border/50">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-background" />

      <SectionContainer className="relative py-16 lg:py-20">
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Link to="/" className="group mb-4 inline-flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-base font-bold tracking-tight text-text-primary">
                  HAZA Tech
                </span>
              </Link>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-text-secondary">
                {footerData.tagline}
              </p>

              <div className="flex items-center gap-3">
                {footerData.socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-elevated/50 text-text-muted transition-all duration-300 hover:border-accent-blue/30 hover:text-accent-blue hover:bg-accent-blue/5"
                      aria-label={link.platform}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" />}
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-text-primary">Navigation</h4>
              <ul className="space-y-2.5">
                {PORTFOLIO_NAV.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-text-muted transition-colors duration-300 hover:text-accent-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-text-primary">Contact</h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={`mailto:${footerData.email}`}
                    className="flex items-center gap-2 text-sm text-text-muted transition-colors duration-300 hover:text-accent-blue"
                  >
                    <Mail className="h-3 w-3" />
                    {footerData.email}
                  </a>
                </li>
                <li>
                  <span className="text-sm text-text-muted">
                    {footerData.phone}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative mt-12 border-t border-border/30 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <span>Built with</span>
              <Heart className="h-3 w-3 fill-accent-blue text-accent-blue" />
              <span>by HAZA Tech</span>
              <span className="mx-1.5 text-border">|</span>
              <span>{footerData.copyright}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex h-9 items-center gap-1.5 rounded-xl border border-border bg-surface-elevated/50 px-3 text-xs text-text-muted transition-all duration-300 hover:border-accent-blue/30 hover:text-accent-blue"
              aria-label="Back to top"
            >
              Back to Top
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { SEO } from "@/components/seo/SEO";

export function HomePage() {
  return (
    <>
      <SEO />
      <HeroSection />
      <AboutPreview />
      <SkillsSection />
      <ProjectsPreview />
      <ContactSection />
    </>
  );
}

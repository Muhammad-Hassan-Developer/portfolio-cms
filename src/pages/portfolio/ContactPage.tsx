import { ContactSection } from "@/components/sections/ContactSection";
import { SEO } from "@/components/seo/SEO";

export function ContactPage() {
  return (
    <div>
      <SEO title="Contact" description="Get in touch about AI/ML projects, collaborations, or opportunities." />
      <ContactSection />
    </div>
  );
}

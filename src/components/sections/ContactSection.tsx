import { Send, Mail, MapPin, Clock, FileText } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { contactData } from "@/data/contactData";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: contactData.email,
    href: `mailto:${contactData.email}`,
    color: "from-accent-blue/20 to-accent-blue/5",
    iconColor: "text-accent-blue",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "https://github.com/Muhammad-Hassan-Developer",
    href: "https://github.com/Muhammad-Hassan-Developer",
    color: "from-text-primary/10 to-text-primary/5",
    iconColor: "text-text-primary",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "https:www.linkedin.com/in/hassan-zakria-58a11a2a1",
    href: "https:www.linkedin.com/in/hassan-zakria-58a11a2a1",
    color: "from-accent-blue/20 to-accent-blue/5",
    iconColor: "text-accent-blue",
  },
  {
    icon: FileText,
    label: "Resume",
    value: "Download PDF",
    href: "#",
    color: "from-accent-purple/20 to-accent-purple/5",
    iconColor: "text-accent-purple",
  },
];

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-purple/[0.02] blur-[100px]" />
      </div>

      <SectionContainer>
        <SectionTitle
          subtitle="Get in Touch"
          title={contactData.headline}
          description={contactData.description}
        />

        <div>
          <StaggerContainer className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4" staggerDelay={0.1}>
            {contactCards.map((card) => (
              <StaggerItem key={card.label}>
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass group card-hover flex w-full flex-col items-center overflow-hidden rounded-2xl p-5 text-center gradient-border"
                >
                  <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} ${card.iconColor} transition-all duration-300 group-hover:scale-110`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <p className="mb-1 text-xs text-text-muted">{card.label}</p>
                  <p className="text-sm font-medium text-text-primary truncate">{card.value}</p>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="grid gap-12 lg:grid-cols-5">
            <ScrollReveal direction="left" className="lg:col-span-2">
              <div className="space-y-4">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">Location</h3>
                      <p className="text-xs text-text-secondary">{contactData.location}</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-success">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">Availability</h3>
                      <p className="text-xs text-text-secondary">{contactData.availability}</p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">Response Time</h3>
                      <p className="text-xs text-text-secondary">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Name" placeholder="Your name" required />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <Input label="Subject" placeholder="Project inquiry" />
                <Textarea
                  label="Message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
                <Button type="submit" variant="gradient" className="w-full group" size="lg">
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  Send Message
                </Button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

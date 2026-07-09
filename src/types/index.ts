// export interface HeroData {
//   greeting: string;
//   name: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   ctaText: string;
//   ctaLink: string;
//   resumeLink: string;
//   stats: Stat[];
// }

// export interface Stat {
//   id: string;
//   value: string;
//   label: string;
// }
// types/index.ts

export interface Stat {
  id: string;
  value: string;
  label: string;
  display_order: number;
}

export interface HeroData {
  id: string;
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  resumeLink: string;
  stats: Stat[];
}

export interface AboutData {
  headline: string;
  description: string;
  longDescription: string;
  image: string;
  highlights: Highlight[];
  experience: Experience[];
}

export interface Highlight {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: ProjectMetric[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl: string;
  skills: string[];
}

export interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
  background: string;
  surface: string;
  font: string;
}

export interface FooterData {
  tagline: string;
  socialLinks: SocialLink[];
  copyright: string;
  email: string;
  phone: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface ContactData {
  headline: string;
  description: string;
  email: string;
  location: string;
  availability: string;
}

export interface AdminUser {
  email: string;
  password: string;
}

export interface NavLink {
  label: string;
  href: string;
}

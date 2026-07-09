import { useState, useCallback } from "react";
import type { AboutData, SkillCategory, Project, ProjectCategory, Certificate, ThemeData, FooterData } from "@/types";
import { aboutData as defaultAbout } from "@/data/aboutData";
import { skillCategories as defaultSkills } from "@/data/skillsData";
import { projects as defaultProjects, projectCategories as defaultCategories } from "@/data/projectsData";
import { certificates as defaultCertificates } from "@/data/certificatesData";
import { themeData as defaultTheme } from "@/data/themeData";
import { footerData as defaultFooter } from "@/data/footerData";

export function usePortfolioData() {
  const [about, setAbout] = useState<AboutData>(defaultAbout);
  const [skills, setSkills] = useState<SkillCategory[]>(defaultSkills);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [categories, setCategories] = useState<ProjectCategory[]>(defaultCategories);
  const [certificates, setCertificates] = useState<Certificate[]>(defaultCertificates);
  const [theme, setTheme] = useState<ThemeData>(defaultTheme);
  const [footer, setFooter] = useState<FooterData>(defaultFooter);

  const updateAbout = useCallback((data: AboutData) => setAbout(data), []);
  const updateSkills = useCallback((data: SkillCategory[]) => setSkills(data), []);
  const updateProjects = useCallback((data: Project[]) => setProjects(data), []);
  const updateCategories = useCallback((data: ProjectCategory[]) => setCategories(data), []);
  const updateCertificates = useCallback((data: Certificate[]) => setCertificates(data), []);
  const updateTheme = useCallback((data: ThemeData) => setTheme(data), []);
  const updateFooter = useCallback((data: FooterData) => setFooter(data), []);

  return {
    about, updateAbout,
    skills, updateSkills,
    projects, updateProjects,
    categories, updateCategories,
    certificates, updateCertificates,
    theme, updateTheme,
    footer, updateFooter,
  };
}

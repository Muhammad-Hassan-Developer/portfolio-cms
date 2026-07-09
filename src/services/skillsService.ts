import type { SkillCategory } from "@/types";
import { skillCategories as localData } from "@/data/skillsData";

let data: SkillCategory[] = [...localData];

export const skillsService = {
  get: async (): Promise<SkillCategory[]> => data.map((c) => ({ ...c, skills: [...c.skills] })),
  getSync: (): SkillCategory[] => data.map((c) => ({ ...c, skills: [...c.skills] })),
  update: async (updates: SkillCategory[]): Promise<SkillCategory[]> => {
    data = updates;
    return [...data];
  },
};

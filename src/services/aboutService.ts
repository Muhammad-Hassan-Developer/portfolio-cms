import type { AboutData } from "@/types";
import { aboutData as localData } from "@/data/aboutData";

let data: AboutData = { ...localData };

export const aboutService = {
  get: async (): Promise<AboutData> => ({ ...data, highlights: [...data.highlights], experience: [...data.experience] }),
  getSync: (): AboutData => ({ ...data, highlights: [...data.highlights], experience: [...data.experience] }),
  update: async (updates: Partial<AboutData>): Promise<AboutData> => {
    data = { ...data, ...updates };
    return { ...data };
  },
};

import type { ThemeData } from "@/types";
import { themeData as localData } from "@/data/themeData";

let data: ThemeData = { ...localData };

export const themeService = {
  get: async (): Promise<ThemeData> => ({ ...data }),
  getSync: (): ThemeData => ({ ...data }),
  update: async (updates: Partial<ThemeData>): Promise<ThemeData> => {
    data = { ...data, ...updates };
    return { ...data };
  },
};

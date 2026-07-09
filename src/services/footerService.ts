import type { FooterData } from "@/types";
import { footerData as localData } from "@/data/footerData";

let data: FooterData = { ...localData, socialLinks: [...localData.socialLinks] };

export const footerService = {
  get: async (): Promise<FooterData> => ({ ...data, socialLinks: [...data.socialLinks] }),
  getSync: (): FooterData => ({ ...data, socialLinks: [...data.socialLinks] }),
  update: async (updates: Partial<FooterData>): Promise<FooterData> => {
    data = { ...data, ...updates };
    return { ...data };
  },
};

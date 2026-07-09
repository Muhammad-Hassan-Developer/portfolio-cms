import type { Certificate } from "@/types";
import { certificates as localData } from "@/data/certificatesData";

let data: Certificate[] = [...localData];

export const certificatesService = {
  get: async (): Promise<Certificate[]> => [...data],
  getSync: (): Certificate[] => [...data],
  update: async (updates: Certificate[]): Promise<Certificate[]> => {
    data = updates;
    return [...data];
  },
};

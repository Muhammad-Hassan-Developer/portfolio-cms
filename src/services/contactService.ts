import type { ContactData } from "@/types";
import { contactData as localData } from "@/data/contactData";

let data: ContactData = { ...localData };

export const contactService = {
  get: async (): Promise<ContactData> => ({ ...data }),
  getSync: (): ContactData => ({ ...data }),
  update: async (updates: Partial<ContactData>): Promise<ContactData> => {
    data = { ...data, ...updates };
    return { ...data };
  },
};

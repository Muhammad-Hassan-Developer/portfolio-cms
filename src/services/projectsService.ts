import type { Project, ProjectCategory } from "@/types";
import { projects as localProjects, projectCategories as localCategories } from "@/data/projectsData";

let projectsData: Project[] = [...localProjects];
let categoriesData: ProjectCategory[] = [...localCategories];

export const projectsService = {
  getProjects: async (): Promise<Project[]> => [...projectsData],
  getProjectsSync: (): Project[] => [...projectsData],
  getFeaturedProjects: async (): Promise<Project[]> => projectsData.filter((p) => p.featured),
  getProjectsByCategory: async (category: string): Promise<Project[]> =>
    category === "all" ? [...projectsData] : projectsData.filter((p) => p.category === category),
  updateProjects: async (updates: Project[]): Promise<Project[]> => {
    projectsData = updates;
    return [...projectsData];
  },
  getCategories: async (): Promise<ProjectCategory[]> => [...categoriesData],
  getCategoriesSync: (): ProjectCategory[] => [...categoriesData],
  updateCategories: async (updates: ProjectCategory[]): Promise<ProjectCategory[]> => {
    categoriesData = updates;
    return [...categoriesData];
  },
};

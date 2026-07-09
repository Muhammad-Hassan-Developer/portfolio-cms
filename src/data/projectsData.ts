import type { Project, ProjectCategory } from "@/types";
import sugarcaneImg from "@/assets/sugarcane-post.png";

export const projectCategories: ProjectCategory[] = [
  { id: "all", name: "All Projects", slug: "all", description: "View all projects" },
  { id: "llm", name: "LLM & NLP", slug: "llm", description: "Large language model projects" },
  { id: "cv", name: "Computer Vision", slug: "cv", description: "Visual AI solutions" },
  { id: "mlops", name: "MLOps", slug: "mlops", description: "ML infrastructure & pipelines" },
  { id: "generative", name: "Generative AI", slug: "generative", description: "Generative models & applications" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Sugarcane Disease Scanner",
    shortDescription: "Professional, AI-driven mobile application for detecting sugarcane diseases in real time and offline using TensorFlow Lite and MobileNetV3-Large",
    description:
      "Sugarcane Disease Scanner is an innovative mobile application which combines deep learning technology and mobile capabilities. Using Flutter and MobileNetV3-Large model optimized for TensorFlow Lite, it allows detecting 7 different sugarcane diseases in real time without access to the Internet.",
    image: sugarcaneImg,
    tags: ["Flutter", "TensorFlow Lite", "MobileNetV3", "Computer Vision"],
    category: "cv",
    // liveUrl: "https://your-project-link.com",
    githubUrl: "https://github.com/Muhammad-Hassan-Developer/sugarcanapp",
    featured: true,
    metrics: [
      { label: "Accuracy", value: "96%" },
      { label: "Detection Mode", value: "Offline" },
    ],
  },
];
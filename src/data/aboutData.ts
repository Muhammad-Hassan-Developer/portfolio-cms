import type { AboutData } from "@/types";

import portfolioAI from "../assets/portfolio ai.png";

export const aboutData: AboutData = {
  headline: "Crafting the Future of AI, One Model at a Time",
  description:
    "I'm an AI Engineer with deep expertise in machine learning, deep learning, and natural language processing. I transform complex data into intelligent systems that drive real business outcomes.",
  longDescription:
    "With over 8 years of experience in AI and machine learning, I've worked across the full ML lifecycle — from research and experimentation to production deployment at scale. My background spans computer vision, natural language processing, recommendation systems, and generative AI. I'm passionate about building AI that's not just technically impressive, but genuinely useful for people and businesses.",
  // image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=faces",
  image: portfolioAI,
  highlights: [
    {
      id: "1",
      icon: "Brain",
      title: "Deep Learning",
      description: "Expertise in neural architectures including Transformers, GANs, and diffusion models for production systems.",
    },
    {
      id: "2",
      icon: "Globe",
      title: "NLP & LLMs",
      description: "Building and fine-tuning large language models for enterprise applications and conversational AI.",
    },
    {
      id: "3",
      icon: "Eye",
      title: "Computer Vision",
      description: "Object detection, image segmentation, and visual AI solutions for healthcare and manufacturing.",
    },
    {
      id: "4",
      icon: "Server",
      title: "MLOps",
      description: "End-to-end ML pipelines, model monitoring, and deployment infrastructure on cloud platforms.",
    },
  ],
  experience: [
    {
      id: "1",
      role: "Senior AI Engineer",
      company: "NeuralWorks Inc.",
      period: "2022 — Present",
      description: "Leading the development of LLM-powered products serving 5M+ users. Architected the RAG pipeline reducing hallucination by 40%.",
      technologies: ["PyTorch", "LangChain", "AWS", "Kubernetes"],
    },
    {
      id: "2",
      role: "Machine Learning Engineer",
      company: "DataForge Labs",
      period: "2019 — 2022",
      description: "Built computer vision models for manufacturing quality control, achieving 99.2% accuracy and saving $2M annually.",
      technologies: ["TensorFlow", "OpenCV", "GCP", "Docker"],
    },
    {
      id: "3",
      role: "AI Research Intern",
      company: "DeepMind",
      period: "2018 — 2019",
      description: "Researched attention mechanisms for multimodal learning. Published 3 papers in top-tier conferences.",
      technologies: ["Python", "JAX", "TPU", "LaTeX"],
    },
  ],
};

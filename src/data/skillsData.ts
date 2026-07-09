import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "ml-frameworks",
    name: "ML Frameworks & Libraries",
    icon: "Brain",
    skills: [
      { id: "pytorch", name: "PyTorch", level: 95, icon: "Flame" },
      { id: "tensorflow", name: "TensorFlow", level: 90, icon: "Box" },
      { id: "scikit", name: "Scikit-learn", level: 88, icon: "BarChart3" },
      { id: "keras", name: "Keras", level: 85, icon: "Layers" },
      { id: "jax", name: "JAX", level: 75, icon: "Zap" },
    ],
  },
  {
    id: "llm-tools",
    name: "LLM & NLP",
    icon: "MessageSquare",
    skills: [
      { id: "langchain", name: "LangChain", level: 92, icon: "Link" },
      { id: "huggingface", name: "Hugging Face", level: 90, icon: "Heart" },
      { id: "openai", name: "OpenAI API", level: 93, icon: "Sparkles" },
      { id: "transformers", name: "Transformers", level: 91, icon: "RefreshCw" },
      { id: "llamaindex", name: "LlamaIndex", level: 82, icon: "Database" },
    ],
  },
  {
    id: "programming",
    name: "Programming Languages",
    icon: "Code2",
    skills: [
      { id: "python", name: "Python", level: 96, icon: "Terminal" },
      { id: "typescript", name: "TypeScript", level: 88, icon: "FileCode2" },
      { id: "rust", name: "Rust", level: 70, icon: "Cpu" },
      { id: "sql", name: "SQL", level: 85, icon: "Table2" },
      { id: "cpp", name: "C++", level: 72, icon: "Code" },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure & MLOps",
    icon: "Server",
    skills: [
      { id: "aws", name: "AWS SageMaker", level: 88, icon: "Cloud" },
      { id: "docker", name: "Docker", level: 90, icon: "Container" },
      { id: "kubernetes", name: "Kubernetes", level: 82, icon: "Network" },
      { id: "mlflow", name: "MLflow", level: 85, icon: "GitBranch" },
      { id: "airflow", name: "Apache Airflow", level: 80, icon: "Wind" },
    ],
  },
];

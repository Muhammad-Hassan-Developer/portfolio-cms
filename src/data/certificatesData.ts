import type { Certificate } from "@/types";

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "AWS Machine Learning Specialty",
    issuer: "Amazon Web Services",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&h=300&fit=crop",
    credentialUrl: "https://aws.amazon.com/verification",
    skills: ["SageMaker", "ML Pipelines", "Deep Learning", "AWS"],
  },
  {
    id: "2",
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2023-11-20",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop",
    credentialUrl: "https://tensorflow.org/certificate",
    skills: ["TensorFlow", "Keras", "CNNs", "Time Series"],
  },
  {
    id: "3",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    date: "2023-06-10",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    credentialUrl: "https://coursera.org/verify",
    skills: ["Neural Networks", "RNNs", "Transformers", "Optimization"],
  },

];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: "Ingeniería de Datos" | "Ciencia de Datos" | "Big Data";
  tech: string[];
  bgColor: string; // Tailwind bg class for card wrapper
  accentColor: string; // Hex or tailwind text class
  illustrationType: "kafka" | "spark" | "kubernetes" | "snowflake";
}

export interface Skill {
  name: string;
  category: "languages" | "bigdata" | "cloud" | "ml";
  level: number; // 1 to 5
  icon: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface SandboxNode {
  id: string;
  label: string;
  type: "source" | "stream" | "process" | "storage";
  iconName: string;
  status: "idle" | "active" | "success" | "error";
  description: string;
}

export interface PipelineStep {
  id: string;
  title: string;
  duration: number;
}

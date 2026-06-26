import React, { useState } from "react";
import { Skill } from "../types";
import { Code, Database, Brain, Cloud, Star } from "lucide-react";

const SKILLS_LIST: Skill[] = [
  // Languages
  { name: "Python", category: "languages", level: 5, icon: "🐍" },
  { name: "SQL", category: "languages", level: 5, icon: "💾" },
  { name: "Scala", category: "languages", level: 4, icon: "☕" },
  { name: "Bash", category: "languages", level: 4, icon: "🐚" },

  // Big Data
  { name: "Apache Spark", category: "bigdata", level: 5, icon: "⚡" },
  { name: "Apache Kafka", category: "bigdata", level: 5, icon: "🛰️" },
  { name: "Apache Airflow", category: "bigdata", level: 5, icon: "🌪️" },
  { name: "Hadoop & Hive", category: "bigdata", level: 3, icon: "🐘" },

  // ML / AI
  { name: "PySpark MLlib", category: "ml", level: 4, icon: "🤖" },
  { name: "XGBoost", category: "ml", level: 4, icon: "📈" },
  { name: "TensorFlow", category: "ml", level: 3, icon: "🧠" },
  { name: "Scikit-Learn", category: "ml", level: 5, icon: "📊" },

  // Cloud & DB
  { name: "dbt (Data Build Tool)", category: "cloud", level: 5, icon: "🔨" },
  { name: "Snowflake", category: "cloud", level: 5, icon: "❄️" },
  { name: "Databricks", category: "cloud", level: 4, icon: "🧱" },
  { name: "Google BigQuery", category: "cloud", level: 4, icon: "🔍" },
  { name: "Kubernetes & Docker", category: "cloud", level: 4, icon: "☸️" },
  { name: "AWS & GCP", category: "cloud", level: 4, icon: "☁️" },
];

export default function SkillsSandbox() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const renderCategoryGroup = (
    title: string,
    category: Skill["category"],
    icon: React.ReactNode,
    bgColor: string
  ) => {
    const filtered = SKILLS_LIST.filter((s) => s.category === category);

    return (
      <div className="border-3 border-forest rounded-3xl p-5 bg-cream flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(33,51,41,1)]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-xl border-2 border-forest ${bgColor} text-forest`}>
              {icon}
            </div>
            <h3 className="font-display font-bold text-lg text-forest leading-tight">
              {title}
            </h3>
          </div>

          <div className="space-y-3">
            {filtered.map((skill) => (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative group p-2 rounded-xl border-2 border-transparent hover:border-forest/25 hover:bg-forest/5 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-forest flex items-center gap-1.5">
                    <span className="text-sm select-none">{skill.icon}</span> {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-sage font-bold">
                    {skill.level}/5
                  </span>
                </div>

                {/* Level Gauge (Vertical attributes) */}
                <div className="flex gap-1 h-3.5">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`flex-grow border border-forest rounded-md transition-all duration-300 ${
                        step <= skill.level
                          ? "bg-sage shadow-[1px_1px_0px_0px_rgba(33,51,41,0.2)]"
                          : "bg-dark/5"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 border-t border-forest/15 pt-3">
          <p className="text-[10px] font-mono italic text-forest/75 text-center">
            {category === "bigdata"
              ? "Optimizado para clústeres de petabytes"
              : category === "cloud"
              ? "Entrega orientada a SLA"
              : category === "ml"
              ? "Sistemas de inferencia en tiempo real"
              : "Hábitos de scripting limpios"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-lg mx-auto mb-10 space-y-2">
        <h2 className="text-3xl font-display font-bold text-cream">Matriz de Habilidades Técnicas</h2>
        <p className="text-sm text-moss leading-relaxed">
          Mis principales tecnologías y nivel de familiaridad, divididos en los dominios de Big Data y Aprendizaje Automático.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {renderCategoryGroup(
          "Lenguajes Principales",
          "languages",
          <Code size={18} />,
          "bg-terracotta"
        )}
        {renderCategoryGroup(
          "Motores de Big Data",
          "bigdata",
          <Database size={18} />,
          "bg-brand-sky"
        )}
        {renderCategoryGroup(
          "Aprendizaje Automático",
          "ml",
          <Brain size={18} />,
          "bg-brand-lavender"
        )}
        {renderCategoryGroup(
          "Nube y Almacenamiento",
          "cloud",
          <Cloud size={18} />,
          "bg-moss"
        )}
      </div>
    </div>
  );
}

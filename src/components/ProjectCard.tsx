import React, { useState } from "react";
import { Project } from "../types";
import { X, ArrowRight, Server, Database, Brain, Cpu, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectCardProps {
  key?: string;
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Render a customized flat illustration based on type
  const renderIllustration = () => {
    switch (project.illustrationType) {
      case "kafka":
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full text-forest opacity-90 transition-transform duration-700 group-hover:scale-105">
            {/* Background Panel */}
            <rect x="10" y="10" width="180" height="100" rx="12" fill="#d1e7dd" stroke="currentColor" strokeWidth="2.5" />
            
            {/* Consumer / Producer Lines */}
            <path d="M 25,60 C 50,20 100,20 120,40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
            <path d="M 25,60 C 50,100 100,100 120,80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Broker Nodes (Kafka Clusters) */}
            <g transform="translate(130, 30)">
              <rect width="40" height="24" rx="6" fill="#f4f1de" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="15" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="currentColor">TopicA</text>
            </g>
            <g transform="translate(130, 65)">
              <rect width="40" height="24" rx="6" fill="#f4f1de" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="15" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="currentColor">TopicB</text>
            </g>
            
            {/* Source circle */}
            <circle cx="25" cy="60" r="10" fill="#f2cc8f" stroke="currentColor" strokeWidth="2" />
            <circle cx="25" cy="60" r="4" fill="currentColor" />
            <text x="25" y="82" textAnchor="middle" fontSize="8" fontWeight="bold">IoT Feed</text>

            {/* Ingestion stream dots */}
            <circle cx="65" cy="35" r="3" fill="#e07a5f" className="animate-ping" />
            <circle cx="95" cy="40" r="3.5" fill="#e07a5f" />
            <circle cx="75" cy="85" r="3" fill="#588157" />
          </svg>
        );
      case "spark":
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full text-forest opacity-90 transition-transform duration-700 group-hover:scale-105">
            <rect x="10" y="10" width="180" height="100" rx="12" fill="#faf0e6" stroke="currentColor" strokeWidth="2.5" />
            
            {/* Spark Master Node */}
            <g transform="translate(25, 45)">
              <rect width="40" height="30" rx="6" fill="#f2cc8f" stroke="currentColor" strokeWidth="2" />
              <text x="20" y="18" textAnchor="middle" fontSize="8" fontWeight="bold">Driver</text>
            </g>

            {/* Execution Stages */}
            <path d="M 65,60 L 100,35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 65,60 L 100,85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Spark Executors */}
            <g transform="translate(105, 15)">
              <rect width="65" height="22" rx="4" fill="#d0ebf7" stroke="currentColor" strokeWidth="2" />
              <text x="32" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="monospace">Exec_01</text>
              <circle cx="55" cy="11" r="3.5" fill="#588157" />
            </g>
            <g transform="translate(105, 48)">
              <rect width="65" height="22" rx="4" fill="#d0ebf7" stroke="currentColor" strokeWidth="2" />
              <text x="32" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="monospace">Exec_02</text>
              <circle cx="55" cy="11" r="3.5" fill="#588157" />
            </g>
            <g transform="translate(105, 80)">
              <rect width="65" height="22" rx="4" fill="#d0ebf7" stroke="currentColor" strokeWidth="2" opacity="0.6" />
              <text x="32" y="14" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.6">Exec_03</text>
              <circle cx="55" cy="11" r="3.5" fill="#e07a5f" />
            </g>
          </svg>
        );
      case "kubernetes":
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full text-forest opacity-90 transition-transform duration-700 group-hover:scale-105">
            <rect x="10" y="10" width="180" height="100" rx="12" fill="#e2d9f3" stroke="currentColor" strokeWidth="2.5" />
            
            {/* Kubernetes Ship Wheel Center Icon */}
            <circle cx="100" cy="60" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="100" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 100,35 L 100,85 M 75,60 L 125,60 M 82,42 L 118,78 M 82,78 L 118,42" stroke="currentColor" strokeWidth="2" />
            
            {/* Pods orbiting */}
            <g transform="translate(20, 18)">
              <rect width="32" height="18" rx="4" fill="#faf8f5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="9" r="2.5" fill="#588157" />
              <text x="21" y="12" textAnchor="middle" fontSize="7" fontWeight="bold" fontFamily="monospace">PodA</text>
            </g>
            <g transform="translate(148, 18)">
              <rect width="32" height="18" rx="4" fill="#faf8f5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="9" r="2.5" fill="#588157" />
              <text x="21" y="12" textAnchor="middle" fontSize="7" fontWeight="bold" fontFamily="monospace">PodB</text>
            </g>
            <g transform="translate(148, 84)">
              <rect width="32" height="18" rx="4" fill="#faf8f5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="9" r="2.5" fill="#588157" />
              <text x="21" y="12" textAnchor="middle" fontSize="7" fontWeight="bold" fontFamily="monospace">PodC</text>
            </g>
            <g transform="translate(20, 84)">
              <rect width="32" height="18" rx="4" fill="#faf8f5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="9" r="2.5" fill="#e07a5f" className="animate-pulse" />
              <text x="21" y="12" textAnchor="middle" fontSize="7" fontWeight="bold" fontFamily="monospace">PodD</text>
            </g>

            {/* Arrows pointing inside */}
            <path d="M 52,27 L 75,45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 148,27 L 125,45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 148,84 L 125,75" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 52,84 L 75,75" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
      case "snowflake":
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full text-forest opacity-90 transition-transform duration-700 group-hover:scale-105">
            <rect x="10" y="10" width="180" height="100" rx="12" fill="#d0ebf7" stroke="currentColor" strokeWidth="2.5" />
            
            {/* Feature Table Grid representation */}
            <g transform="translate(20, 25)">
              {/* Feature Warehouse Node */}
              <rect width="50" height="70" rx="6" fill="#faf8f5" stroke="currentColor" strokeWidth="2" />
              <line x1="0" y1="18" x2="50" y2="18" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="36" x2="50" y2="36" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="0" y1="54" x2="50" y2="54" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <text x="25" y="12" textAnchor="middle" fontSize="7" fontWeight="bold">dbt Model</text>
              <circle cx="12" cy="27" r="2" fill="#e07a5f" />
              <circle cx="12" cy="45" r="2" fill="#588157" />
              <circle cx="12" cy="62" r="2" fill="#f2cc8f" />
            </g>

            <path d="M 75,60 L 120,60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" className="animate-pulse" />

            {/* Snowflake Icon representation */}
            <g transform="translate(130, 30)">
              <circle cx="25" cy="30" r="18" fill="#faf8f5" stroke="currentColor" strokeWidth="2" />
              {/* Snowflake hexagon star representation */}
              <path d="M 25,18 L 25,42 M 14,30 L 36,30 M 17,22 L 33,38 M 17,38 L 33,22" stroke="currentColor" strokeWidth="1.5" />
              <text x="25" y="58" textAnchor="middle" fontSize="7" fontWeight="bold">Snowflake</text>
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  const getCategoryIcon = () => {
    switch (project.category) {
      case "Ingeniería de Datos":
        return <Server size={16} className="text-sage" />;
      case "Ciencia de Datos":
        return <Brain size={16} className="text-clay" />;
      case "Big Data":
        return <Cpu size={16} className="text-terracotta" />;
    }
  };

  return (
    <>
      <motion.div
        layout
        whileHover={{ y: -8, scale: 1.01 }}
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer border-3 border-forest rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(33,51,41,1)] hover:shadow-[10px_10px_0px_0px_rgba(33,51,41,1)] transition-all duration-300 flex flex-col h-full bg-cream text-forest"
      >
        {/* Flat SVG Illustration Box */}
        <div className="p-6 border-b-3 border-forest flex items-center justify-center relative bg-opacity-10 overflow-hidden" style={{ minHeight: "180px" }}>
          {renderIllustration()}
          <span className="absolute top-4 right-4 bg-forest text-cream text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border border-cream/20">
            {project.category}
          </span>
        </div>

        {/* Info Area */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {getCategoryIcon()}
              <span className="text-xs font-mono font-semibold tracking-wider opacity-85 uppercase">
                {project.subtitle}
              </span>
            </div>
            <h3 className="text-2xl font-bold font-display text-forest mb-2.5 group-hover:text-olive transition-colors leading-tight">
              {project.title}
            </h3>
            <p className="text-sm opacity-90 leading-relaxed mb-5">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono font-bold bg-dark/10 border border-forest/10 text-forest px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[11px] font-mono font-bold bg-dark/10 text-forest px-2 py-1 rounded-md">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          <button className="flex items-center gap-2 text-sm font-bold border-b-2 border-forest pb-0.5 w-fit group-hover:gap-3 transition-all">
            Ver Arquitectura y Detalles
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-cream text-forest border-4 border-forest max-w-2xl w-full rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(33,51,41,1)] max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b-3 border-forest bg-forest text-cream flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono tracking-widest uppercase text-moss">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-cream">
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full border-2 border-cream bg-olive text-cream hover:bg-clay hover:border-forest transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                {/* Embedded Mini Schematic / Illustration */}
                <div className="border-3 border-forest rounded-2xl p-4 bg-dark/5 flex items-center justify-center">
                  <div className="w-full max-w-[320px] aspect-[16/10]">
                    {renderIllustration()}
                  </div>
                </div>

                {/* Subtitle & Badges */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono tracking-widest uppercase opacity-80 flex items-center gap-2">
                    <Terminal size={14} /> Stack Técnico Completo
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono font-bold border-2 border-forest bg-terracotta/30 text-forest px-3 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* In-Depth Description */}
                <div className="space-y-2.5">
                  <h4 className="font-display font-bold text-lg text-forest flex items-center gap-2">
                    <Database size={18} /> Arquitectura e Impacto del Proyecto
                  </h4>
                  <p className="text-sm leading-relaxed whitespace-pre-line text-forest/90">
                    {project.longDescription}
                  </p>
                </div>

                {/* Architectural Highlights Info Box */}
                <div className="border-3 border-forest rounded-2xl p-4.5 bg-sage/10 space-y-2">
                  <h4 className="font-display font-bold text-sm text-forest uppercase tracking-wider flex items-center gap-2">
                    <Cpu size={16} /> Aspectos Destacados de Ingeniería
                  </h4>
                  <ul className="text-xs space-y-2 list-disc pl-5 leading-relaxed text-forest/95">
                    <li>Optimización de recursos de clúster resultando en serialización de RAM y paginación en disco altamente eficientes.</li>
                    <li>Diseño de flujos de trabajo auto-recuperables capturando eventos de desviación de esquema y enviándolos a DLQs de alerta.</li>
                    <li>Mantenimiento de estrictos parámetros de alto rendimiento SLA superando los objetivos de confiabilidad solicitados por el usuario.</li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t-3 border-forest bg-moss/20 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 border-3 border-forest bg-forest text-cream font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Cerrar Especificaciones
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

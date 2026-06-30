import React, { useState, useEffect } from "react";
import Sparkle from "./components/Sparkle";
import ProjectCard from "./components/ProjectCard";
import PipelineSandbox from "./components/PipelineSandbox";
import SkillsSandbox from "./components/SkillsSandbox";
import CVAssistant from "./components/CVAssistant";
import BigDataBackground from "./components/BigDataBackground";
import { Project } from "./types";
import { Github, Linkedin, Mail, Facebook, ExternalLink, Award, FileText, ArrowDown, User, Sparkles, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const PROJECTS_DATA: Project[] = [
  {
    id: "football-pipeline",
    title: "Pipeline de Datos Deportivos - Fútbol",
    subtitle: "Arquitectura Medallón con APIs",
    description: "Orquestación de pipelines para obtención de datos de fútbol de proveedores deportivos mediante APIs, con procesamiento y normalización basada en arquitectura medallón para Machine Learning.",
    longDescription: `Diseñé y orquesté pipelines end-to-end para la ingesta y procesamiento de datos de proveedores deportivos de fútbol mediante APIs REST.

    Descripción de la Arquitectura:
    - Ingesta: Conexión a múltiples APIs de proveedores deportivos para obtención de datos en tiempo real y batch de estadísticas, resultados y métricas de jugadores.
    - Procesamiento: Limpieza, estandarización y normalización de datos garantizando consistencia y completitud a través de múltiples fuentes con diferentes formatos.
    - Arquitectura Medallón: Implementación de capas Bronze, Silver y Gold para el procesamiento progresivo de datos crudos hasta datos listos para Machine Learning.

    Impacto y Resultados:
    - Datos estandarizados y normalizados listos para consumo por modelos de Machine Learning.
    - Garantía de consistencia y completitud de datos de múltiples proveedores con diferentes formatos.
    - Pipeline reproducible y escalable para la incorporación de nuevos proveedores deportivos.`,
    category: "Ingeniería de Datos",
    tech: ["Python", "Spark", "APIs REST", "Data Lake", "Machine Learning", "SQL"],
    bgColor: "bg-brand-mint",
    accentColor: "text-sage",
    illustrationType: "kafka",
  },
  {
    id: "thesis-pipeline",
    title: "Pipeline End-to-End Deportivo-Ambiental",
    subtitle: "Tesis - Orquestación con Airflow",
    description: "Orquestación de web scraping y APIs con Airflow, diseño de Data Warehouse OLAP en SQL Server e integración con NASA POWER API optimizada de 10 horas a 45 minutos.",
    longDescription: `Desarrollé un pipeline de datos end-to-end integrando datos deportivos y ambientales para análisis predictivo como proyecto de tesis de ingeniería.

    Descripción de la Arquitectura:
    - Orquestación: Web scraping y consumo de APIs orquestados con Apache Airflow para extracción automatizada y programada de datos de múltiples fuentes.
    - Almacenamiento: Diseño de Data Warehouse dimensional (OLAP) en SQL Server con modelo estrella para análisis multidimensional.
    - Integración NASA POWER: Optimización de la integración con API NASA POWER tanto en software como en hardware, reduciendo tiempos de procesamiento de 10 horas a 45 minutos.
    - Calidad: Implementación de controles de calidad por cada etapa del pipeline. Procesamiento de datos no relacionales con alta inconsistencia.

    Impacto y Resultados:
    - Reducción del 92.5% en tiempo de procesamiento de datos ambientales (de 10h a 45min).
    - Implementación de RNN y PCA para análisis predictivo sobre los datos consolidados.
    - Controles de calidad automatizados garantizando integridad de datos en cada etapa del pipeline.`,
    category: "Big Data",
    tech: ["Apache Airflow", "SQL Server", "NASA POWER API", "Python", "RNN", "PCA"],
    bgColor: "bg-brand-cream",
    accentColor: "text-clay",
    illustrationType: "spark",
  },
  {
    id: "sis-health",
    title: "Consolidación Data de Salud - SIS Cusco",
    subtitle: "Data Warehouse y Optimización SQL",
    description: "Migración y consolidación de data de seguros de salud a Data Warehouse dimensional con reportes analíticos sobre millones de registros y optimización de queries y SPs.",
    longDescription: `Lideré la consolidación de datos del Seguro Integral de Salud (SIS) de múltiples centros asistenciales de Cusco hacia un Data Warehouse centralizado.

    Descripción de la Arquitectura:
    - Migración: Migración de data de múltiples sistemas hacia un Data Warehouse dimensional para análisis centralizado y reportes regulatorios.
    - Procesamiento: Procesamiento de promedio de 15,000 registros diarios aplicando reglas de consistencia mediante Stored Procedures, SQL Server y Python con Spark.
    - Reportes: Desarrollo de reportes analíticos sobre millones de registros con filtros por establecimiento, personal y paciente.
    - Optimización: Rewriting de queries y SPs con reordenamiento y aumento de condicionales en joins para mejora significativa de rendimiento.

    Impacto y Resultados:
    - Automatización de validaciones y controles de calidad de datos de múltiples fuentes asistenciales.
    - Optimización significativa de queries y stored procedures sobre tablas pesadas.
    - Pipelines ETL para consolidación de datos desde backups de múltiples centros de salud.`,
    category: "Ingeniería de Datos",
    tech: ["SQL Server", "Stored Procedures", "Python", "Spark", "ETL", "Power BI"],
    bgColor: "bg-brand-sky",
    accentColor: "text-sage",
    illustrationType: "snowflake",
  },
  {
    id: "fraud-detection",
    title: "Detección de Fraude Bancario",
    subtitle: "Machine Learning para Fintech",
    description: "Desarrollo de modelos de Machine Learning para detección de transacciones fraudulentas en el sector financiero, procesando +10M de registros transaccionales mensuales.",
    longDescription: `Implementé un sistema de detección de fraude bancario utilizando técnicas de Machine Learning sobre datos transaccionales del sector financiero.

    Descripción de la Arquitectura:
    - Procesamiento: Análisis y procesamiento de más de 10 millones de transacciones mensuales para identificación de patrones de fraude con pipelines ETL automatizados.
    - Modelado: Entrenamiento de modelos de clasificación con técnicas de balanceo de clases y detección de anomalías sobre datos transaccionales masivos.
    - Ingeniería de Características: Feature engineering sobre datos temporales, montos, frecuencia y patrones de comportamiento de usuarios.
    - Validación: Evaluación rigurosa con métricas especializadas (precision, recall, F1-score) optimizando el balance entre falsos positivos y negativos.

    Impacto y Resultados:
    - Detección efectiva de patrones de fraude en datos transaccionales masivos del sector financiero.
    - Reducción de falsos positivos manteniendo alta tasa de detección de fraudes reales.
    - Pipeline de datos reproducible integrado con Databricks para reentrenamiento continuo.`,
    category: "Ciencia de Datos",
    tech: ["Python", "Machine Learning", "SQL Server", "Pandas", "Databricks", "Power BI"],
    bgColor: "bg-brand-lavender",
    accentColor: "text-terracotta",
    illustrationType: "kubernetes",
  },
];

export default function App() {
  const [filter, setFilter] = useState<"Todos" | "Ingeniería de Datos" | "Ciencia de Datos" | "Big Data">("Todos");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects = PROJECTS_DATA.filter(
    (proj) => filter === "Todos" || proj.category === filter
  );

  const WHATSAPP_NUMBER = "51981505082";

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      const text = `Hola Anthony, soy ${contactForm.name} (${contactForm.email}).\n\n${contactForm.message}`;
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: "", email: "", message: "" });
      }, 4000);
    }
  };

  const handleNavScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-clay selection:text-cream">
      
      {/* Background Ambience, Breathing Lights & Big Data Particles */}
      <div className="absolute inset-0 bg-radial-gradient from-forest/15 via-dark to-dark pointer-events-none z-0" />
      <BigDataBackground />

      {/* FLOATING SPARKLES (Inspired by Sean Halpin's stars) */}
      <div className="absolute top-[12%] left-[8%] z-10 hidden md:block">
        <Sparkle size={32} delay={0.5} variant="primary" />
      </div>
      <div className="absolute top-[22%] right-[10%] z-10 hidden md:block">
        <Sparkle size={24} delay={2.5} variant="secondary" />
      </div>
      <div className="absolute top-[65%] left-[5%] z-10 hidden md:block">
        <Sparkle size={28} delay={1.2} variant="accent" />
      </div>
      <div className="absolute top-[82%] right-[8%] z-10 hidden md:block">
        <Sparkle size={30} delay={3.1} variant="primary" />
      </div>

      {/* Centered Floating Pill Navigation (Halpin-style Navigation Bubble) */}
      <header className="sticky top-5 z-40 px-4 w-full flex justify-center transition-all duration-300">
        <nav
          className={`px-5 py-2.5 flex items-center gap-5 sm:gap-7 rounded-full border-2 transition-all duration-500 ${
            isScrolled
              ? "bg-forest/85 backdrop-blur-[32px] border-sage/40 shadow-[4px_4px_12px_0px_rgba(10,18,13,0.4)]"
              : "bg-transparent border-transparent shadow-none"
          }`}
        >
          <button
            onClick={() => handleNavScroll("hero")}
            className={`text-xs font-mono font-bold tracking-widest uppercase hover:text-cream cursor-pointer transition-all ${
              isScrolled ? "text-terracotta" : "text-cream opacity-80"
            }`}
          >
            ANTHONY.SYS
          </button>
          <div className={`h-4 w-0.5 transition-colors duration-500 ${isScrolled ? "bg-olive" : "bg-cream/20"}`} />
          <div className={`flex items-center gap-3 sm:gap-5.5 text-xs sm:text-sm font-semibold transition-colors duration-500 ${isScrolled ? "text-cream" : "text-cream/80"}`}>
            <button
              onClick={() => handleNavScroll("work")}
              className="hover:text-terracotta transition-colors cursor-pointer"
            >
              Proyectos
            </button>
            <button
              onClick={() => handleNavScroll("sandbox")}
              className="hover:text-terracotta transition-colors cursor-pointer"
            >
              Simulador
            </button>
            <button
              onClick={() => handleNavScroll("skills")}
              className="hover:text-terracotta transition-colors cursor-pointer"
            >
              Habilidades
            </button>
            <button
              onClick={() => handleNavScroll("about")}
              className="hover:text-terracotta transition-colors cursor-pointer"
            >
              Sobre Mí
            </button>
            <button
              onClick={() => handleNavScroll("contact")}
              className="hover:text-terracotta transition-colors cursor-pointer"
            >
              Contacto
            </button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-24 pb-20 px-6 max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Columna Izquierda: Presentación (Texto) */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start space-y-5">
            <div className="mb-2 inline-flex items-center gap-2 bg-forest border-2 border-olive rounded-full px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(18,28,23,0.3)]">
              <Sparkles size={14} className="text-terracotta" />
              <span className="text-xs font-mono text-moss uppercase tracking-widest font-bold">
                DATA ENGINEER & DATA FABRIC
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-bold text-cream font-display tracking-tight leading-tight">
              Hola, soy Anthony Mayron López Oquendo. <br />
              <span className="text-terracotta font-extrabold">Data Engineer & Data Fabric.</span>
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-xl text-moss leading-relaxed font-sans font-light">
              Data Engineer con 2+ años de experiencia diseñando soluciones de datos escalables. Arquitecturas de Data Warehouses, Data Lakes, Big Data y pipelines ETL/ELT para sectores financiero y salud desde Cusco, Perú.
            </p>

            {/* Micro-bio */}
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed italic border-l-2 border-terracotta/40 pl-3 text-left">
              "Procesando +10M de transacciones mensuales, optimizando tiempos de procesamiento y diseñando modelos dimensionales (OLAP) y transaccionales (OLTP) escalables."
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4.5 w-full pt-4">
              <button
                onClick={() => handleNavScroll("work")}
                className="w-full sm:w-auto px-7 py-3.5 border-3 border-forest bg-terracotta text-forest font-bold font-display rounded-2xl shadow-[6px_6px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Explora mi trabajo <ArrowDown size={16} />
              </button>
              <button
                onClick={() => handleNavScroll("contact")}
                className="w-full sm:w-auto px-7 py-3.5 border-3 border-forest bg-forest text-cream font-bold font-display rounded-2xl shadow-[6px_6px_0px_0px_rgba(18,28,23,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all cursor-pointer"
              >
                Ponte en contacto
              </button>
            </div>
          </div>

          {/* Columna Derecha: Foto de Perfil */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-[380px] sm:max-w-[430px] w-full aspect-square bg-transparent transition-all flex items-center justify-center">
              <img
                src={`${import.meta.env.BASE_URL}images/yo_anthony.png`}
                alt="Anthony Mayron López Oquendo - Data Engineer & Data Fabric"
                className="w-full h-full object-contain hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Badge Overlay */}
              <div className="absolute -bottom-4 left-4 right-4 bg-forest border-2 border-olive rounded-2xl p-2.5 shadow-[4px_4px_0px_0px_rgba(33,51,41,0.2)] text-center">
                <span className="text-[10px] font-mono text-moss uppercase tracking-widest block font-bold">
                  Anthony Mayron López Oquendo
                </span>
                <span className="text-[9px] font-mono text-cream/75 block mt-0.5">
                  Cusco, Perú • Data Engineer & Data Fabric
                </span>
              </div>

              {/* Sparkle Decoration */}
              <div className="absolute top-2 right-2">
                <Sparkle size={20} delay={0.1} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PIPELINE EXECUTION SANDBOX SECTION */}
      <section id="sandbox" className="py-16 px-6 max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2.5">
          <span className="text-xs font-mono text-terracotta uppercase tracking-widest font-bold">
            01 / TELEMETRÍA INTERACTIVA
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-cream">
            El Simulador Interactivo
          </h2>
          <p className="text-sm sm:text-base text-moss leading-relaxed">
            No te limites a leer sobre mi trabajo: pruébalo. Juega con el simulador de pipeline dinámico a continuación para experimentar cómo diseño arquitecturas de clústeres de transmisión auto-recuperables.
          </p>
        </div>

        <PipelineSandbox />
      </section>

      {/* PORTFOLIO WORK SECTION */}
      <section id="work" className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono text-terracotta uppercase tracking-widest font-bold">
            02 / REPOSITORIOS SELECCIONADOS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-cream">
            Casos de Estudio y Proyectos de I+D
          </h2>
          <p className="text-sm sm:text-base text-moss leading-relaxed">
            Soluciones de datos reales para sectores financiero, salud y deportivo con pipelines ETL/ELT, Data Warehouses y Machine Learning.
          </p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {(["Todos", "Ingeniería de Datos", "Ciencia de Datos", "Big Data"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4.5 py-2 text-xs font-bold border-2 border-forest rounded-full transition-all cursor-pointer ${
                filter === tab
                  ? "bg-forest text-cream shadow-[3px_3px_0px_0px_rgba(18,28,23,1)] translate-x-0.5 translate-y-0.5"
                  : "bg-cream text-forest hover:bg-forest/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* TECHNICAL SKILLS GRID */}
      <section id="skills" className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="border-t-3 border-forest/15 pt-16">
          <SkillsSandbox />
        </div>
      </section>

      {/* ABOUT ME SECTION (HALPIN THEME) */}
      <section id="about" className="py-20 px-6 max-w-5xl mx-auto relative z-10">
        <div className="border-t-3 border-forest/15 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Playful Vector Robot/Illustration */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-[280px] aspect-square relative border-4 border-forest rounded-4xl bg-moss/20 p-6 flex flex-col items-center justify-center shadow-[10px_10px_0px_0px_rgba(33,51,41,1)]">
                {/* Floating sparkle beside */}
                <div className="absolute -top-4 -right-4">
                  <Sparkle size={26} delay={0.2} variant="secondary" />
                </div>
                
                {/* Clean SVG Robot representing Data Science / Engineering */}
                <svg viewBox="0 0 100 100" className="w-40 h-40 text-cream">
                  {/* Antenna */}
                  <line x1="50" y1="20" x2="50" y2="10" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="8" r="4" fill="#e07a5f" />
                  
                  {/* Ears */}
                  <rect x="18" y="32" width="6" height="12" rx="2" fill="#e07a5f" stroke="currentColor" strokeWidth="2" />
                  <rect x="76" y="32" width="6" height="12" rx="2" fill="#e07a5f" stroke="currentColor" strokeWidth="2" />

                  {/* Head */}
                  <rect x="24" y="20" width="52" height="38" rx="10" fill="#f4f1de" stroke="currentColor" strokeWidth="4" />
                  
                  {/* Eyes / Terminal Interface screen */}
                  <rect x="32" y="28" width="36" height="20" rx="4" fill="#213329" stroke="currentColor" strokeWidth="2.5" />
                  {/* Glowing neon eyes */}
                  <circle cx="42" cy="38" r="3.5" fill="#a3b18a" className="animate-pulse" />
                  <circle cx="58" cy="38" r="3.5" fill="#a3b18a" className="animate-pulse" />
                  
                  {/* Mouth / Smile gauge */}
                  <path d="M 40,51 Q 50,55 60,51" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />

                  {/* Body collar */}
                  <rect x="36" y="58" width="28" height="8" rx="2" fill="#e07a5f" stroke="currentColor" strokeWidth="2.5" />
                  {/* Tiny Cog / Heart representing engineering passion */}
                  <path d="M 50,75 L 50,85 M 45,80 L 55,80" stroke="currentColor" strokeWidth="3" />
                  <circle cx="50" cy="80" r="4" fill="#f2cc8f" />
                </svg>

                <div className="mt-4 text-center">
                  <span className="text-xs font-mono font-bold text-forest uppercase bg-cream border-2 border-forest px-3 py-1 rounded-full">
                    ANTHONY_V1.0.8
                  </span>
                </div>
              </div>
            </div>

            {/* Biography Details */}
            <div className="md:col-span-7 space-y-5">
              <span className="text-xs font-mono text-terracotta uppercase tracking-widest font-bold">
                03 / EL ARTESANO DETRÁS DE LA MATRIZ
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-cream">
                Hola, soy Anthony Mayron López Oquendo.
              </h2>
              <p className="text-sm sm:text-base text-moss leading-relaxed">
                Ingeniero Informático y de Sistemas graduado de la UNSAAC (Tercio Superior). Data Engineer con experiencia en Azure Databricks, Microsoft Fabric, SQL Server y Python para orquestación de datos. He trabajado en sectores financiero y salud, procesando más de 10M de transacciones mensuales y diseñando modelos dimensionales y transaccionales escalables.
              </p>
              <p className="text-sm sm:text-base text-moss leading-relaxed">
                Primer Puesto en Cuscontest 2021 con clasificación a la competencia internacional ACM/ICPC. Expresidente del Centro Federado de Ingeniería Informática UNSAAC y miembro activo de ACM Chapter Cusco y PhawAI. Certificación Microsoft Fabric DP-700 en proceso. Inglés B1 y Portugués Intermedio.
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-2 border-forest/15 rounded-2xl p-4 bg-forest/5">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-terracotta">Ubicación</span>
                  <p className="text-sm text-cream font-bold">Cusco, Perú (Disponible para Remoto)</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-terracotta">Sectores de Interés</span>
                  <p className="text-sm text-cream font-bold">Fintech, Healthtech, Insurtech</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT CARD SECTION */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto relative z-10">
        <div className="border-3 border-forest rounded-3xl overflow-hidden bg-cream text-forest shadow-[10px_10px_0px_0px_rgba(33,51,41,1)]">
          
          <div className="p-6 border-b-3 border-forest bg-forest text-cream flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-bold text-cream">¡Orquestemos Algo Grande!</h3>
              <p className="text-xs text-moss font-mono mt-0.5">Completa el formulario y tu mensaje llegará directo a mi WhatsApp.</p>
            </div>
            <MessageCircle size={22} className="text-terracotta" />
          </div>

          <div className="p-6">
            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-sage/20 border-3 border-sage flex items-center justify-center text-sage text-2xl animate-bounce">
                  ✨
                </div>
                <h4 className="font-display font-bold text-lg text-forest">¡Abriendo WhatsApp!</h4>
                <p className="text-sm text-forest/80 max-w-sm leading-relaxed">
                  Te redirigí a WhatsApp con tu mensaje listo para enviar. Si no se abrió automáticamente, escríbeme al +51 981 505 082. Te responderé en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest/75">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Diego Santana"
                      className="w-full bg-dark/5 border-2 border-forest rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-cream"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest/75">
                      Tu Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="diego@data-enterprise.io"
                      className="w-full bg-dark/5 border-2 border-forest rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-cream"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest/75">
                    Tu Mensaje
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Hola Anthony, tenemos un problema de desbordamiento de memoria (OOM) en Spark Streaming sobre EMR y necesitamos ayuda..."
                    className="w-full bg-dark/5 border-2 border-forest rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-cream resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 border-3 border-forest bg-terracotta text-forest font-bold font-display rounded-xl shadow-[4px_4px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Enviar por WhatsApp <MessageCircle size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CORE FOOTER */}
      <footer className="py-12 bg-dark/80 border-t-3 border-forest text-center relative z-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <span className="font-display font-bold text-lg text-cream tracking-tight">
              Anthony Mayron López Oquendo
            </span>
            <p className="text-xs text-moss font-mono">
              Diseñado y Construido en Cusco, Perú • © {new Date().getFullYear()}
            </p>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Stormlocc"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border-2 border-forest bg-cream hover:bg-terracotta text-forest rounded-xl transition-all shadow-[2.5px_2.5px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/mlocc/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border-2 border-forest bg-cream hover:bg-terracotta text-forest rounded-xl transition-all shadow-[2.5px_2.5px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.facebook.com/anthonymlocc/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border-2 border-forest bg-cream hover:bg-terracotta text-forest rounded-xl transition-all shadow-[2.5px_2.5px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Facebook size={16} />
            </a>
            <a
              href="mailto:anthonymlocc@gmail.com"
              className="p-2.5 border-2 border-forest bg-cream hover:bg-terracotta text-forest rounded-xl transition-all shadow-[2.5px_2.5px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://wa.me/51981505082"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="p-2.5 border-2 border-forest bg-cream hover:bg-terracotta text-forest rounded-xl transition-all shadow-[2.5px_2.5px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </footer>

      {/* PERSISTENT FLOATING AI CV ASSISTANT */}
      <CVAssistant />

    </div>
  );
}

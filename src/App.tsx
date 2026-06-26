import React, { useState, useEffect } from "react";
import Sparkle from "./components/Sparkle";
import ProjectCard from "./components/ProjectCard";
import PipelineSandbox from "./components/PipelineSandbox";
import SkillsSandbox from "./components/SkillsSandbox";
import CVAssistant from "./components/CVAssistant";
import BigDataBackground from "./components/BigDataBackground";
import { Project } from "./types";
import { Github, Linkedin, Mail, ExternalLink, Award, FileText, ArrowDown, User, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const PROJECTS_DATA: Project[] = [
  {
    id: "hydrostream",
    title: "Pipeline Kafka HydroStream",
    subtitle: "Bucle de Ingesta IoT en Tiempo Real",
    description: "Transmisión de más de 10 millones de eventos telemétricos diarios desde sensores municipales inteligentes hacia Delta Lake con alertas de anomalía de baja latencia.",
    longDescription: `Diseñé un pipeline de ingesta de datos en tiempo real de alto rendimiento para procesar la telemetría de más de 150 sensores de agua inteligentes distribuidos geográficamente.

    Descripción de la Arquitectura:
    - Ingesta: Los flujos de datos crudos continuos se almacenan temporalmente mediante canales de temas de Apache Kafka con replicación triple para garantizar tolerancia cero a la pérdida de datos.
    - Motor de Procesamiento: Implementé PySpark Structured Streaming en AWS EMR. Configuré ventanas deslizantes de tiempo de eventos de 10 segundos y marcas de agua (watermarks) para capturar datos tardíos.
    - Capa de Almacenamiento: Guardé los resultados analíticos en particiones de tablas de S3 Delta Lake, resolviendo reversiones de transacciones con protección ACID transaccional.
    
    Impacto y Aspectos de Recuperación:
    - Procesa más de 10 millones de mensajes crudos al día con una latencia inferior a 2 segundos.
    - Cuenta con controladores integrados de auto-recuperación para desviaciones de esquema (schema-drift), redirigiendo esquemas inesperados a una Cola de Mensajes no Entregados (DLQ) segura.`,
    category: "Ingeniería de Datos",
    tech: ["Apache Kafka", "Spark Streaming", "PySpark", "Delta Lake", "AWS EMR", "Docker"],
    bgColor: "bg-brand-mint",
    accentColor: "text-sage",
    illustrationType: "kafka",
  },
  {
    id: "deeppredict",
    title: "Pronóstico de Demanda DeepPredict",
    subtitle: "Entrenamiento de Series Temporales Distribuidas",
    description: "Escalado de un sistema de pronóstico XGBoost distribuido sobre un clúster Spark multinodo para analizar terabytes de conjuntos de datos de ventas minoristas.",
    longDescription: `Desarrollé y automaticé un motor distribuido de predicción de demanda multinodo para un cliente global de comercio minorista.

    Descripción de la Arquitectura:
    - Cómputo: PySpark MLlib y envoltorios distribuidos de XGBoost escalados en un clúster de 32 nodos de EC2, entrenando modelos de previsión sobre terabytes de flujos de compra de clientes.
    - Agregación de Características: Spark SQL calculó características de series temporales continuas (retrasos, promedios deslizantes, índices de fin de semana) en múltiples niveles de la cadena minorista.
    - Orquestación: Gestioné las programaciones de entrenamiento, prueba y despliegue del modelo de extremo a extremo mediante DAGs de Apache Airflow.
    
    Impacto y Aspectos de Recuperación:
    - Reducción del tiempo de compilación de características del modelo de 14 horas a solo 45 minutos.
    - Incremento de la precisión del pronóstico (puntuación MAPE) en un 14%, reduciendo directamente las rupturas de stock en inventario en un 18% durante picos de demanda estacionales.`,
    category: "Ciencia de Datos",
    tech: ["PySpark MLlib", "XGBoost", "Apache Airflow", "Python", "Snowflake", "Docker"],
    bgColor: "bg-brand-cream",
    accentColor: "text-clay",
    illustrationType: "spark",
  },
  {
    id: "georide",
    title: "Clúster Espacial GeoRide",
    subtitle: "Telemetría Espacial Contenedorizada",
    description: "Diseñé flujos de rutas GPS desplegados en GKE usando Kafka y rejillas espaciales para predecir el tiempo estimado de llegada (ETA) para 5,000 consultas/seg.",
    longDescription: `Diseñé un pipeline de transmisión de datos geoespaciales contenedorizado que se escala dinámicamente para predecir los tiempos de llegada de taxis y rutas de viaje.

    Descripción de la Arquitectura:
    - Contenedorización: Escalado de microservicios en Google Kubernetes Engine (GKE) bajo HPA (Escalado Automático Horizontal de Pods).
    - Bucle de Ingesta: Los flujos de coordenadas GPS se publican en un clúster de Apache Kafka que se ejecuta dentro de Kubernetes.
    - Caché e Indexación: Los resultados del flujo se almacenan en tablas Redis de baja latencia indexadas mediante cuadrículas espaciales jerárquicas H3.
    
    Impacto y Aspectos de Recuperación:
    - Atiende hasta 5,000 solicitudes por segundo con límites de respuesta inferiores a 25ms.
    - La arquitectura auto-curativa activa automáticamente reinicios de pods de Kubernetes ante fugas de memoria o activaciones de tiempo de espera agotado.`,
    category: "Big Data",
    tech: ["GKE Kubernetes", "Apache Kafka", "Redis Cache", "Python", "H3 Spatial Grids", "Helm"],
    bgColor: "bg-brand-lavender",
    accentColor: "text-terracotta",
    illustrationType: "kubernetes",
  },
  {
    id: "lakehouse",
    title: "Arquitectura de Feature Store",
    subtitle: "Transformaciones Automatizadas con dbt",
    description: "Ensamblé un almacén de características de ML centralizado en Snowflake y dbt para publicar automáticamente los pesos de agregación del modelo.",
    longDescription: `Estructuré un Feature Store centralizado para compilar, documentar y publicar conjuntos de características para pipelines activos de Aprendizaje Automático (Machine Learning).

    Descripción de la Arquitectura:
    - DAGs de Transformación: Ensamblé y gestioné múltiples modelos de dbt para transformar registros de almacén de datos sin procesar en métricas de características limpias y agregadas.
    - Estrategia de Almacén de Datos: Implementé claves de clúster de Snowflake y clones de copia cero (zero-copy clones) para optimizar la eficiencia del almacenamiento.
    - Bucle de Automatización: Integré GitHub Actions para ejecutar automáticamente transformaciones, pruebas de dbt y compilaciones de documentación.
    
    Impacto y Aspectos de Recuperación:
    - Reducción del tiempo de desarrollo de ingeniería de características para nuevos modelos de ML de varias semanas a una sola tarde.
    - Ahorro del 30% en créditos de cómputo de almacenamiento al materializar tablas como estructuras incrementales de Snowflake.`,
    category: "Ingeniería de Datos",
    tech: ["dbt (Data Build Tool)", "Snowflake DB", "Github Actions", "Python", "SQL", "Databricks"],
    bgColor: "bg-brand-sky",
    accentColor: "text-sage",
    illustrationType: "snowflake",
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
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
                AI DATA ENGINEER
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-bold text-cream font-display tracking-tight leading-tight">
              Hola, soy Anthony. <br />
              <span className="text-terracotta font-extrabold">Un Artesano de Datos e IA.</span>
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-xl text-moss leading-relaxed font-sans font-light">
              Diseño arquitecturas de pipelines escalables, orquesto colas distribuidas de alto rendimiento y optimizo flujos robustos de inteligencia artificial y machine learning desde Cusco, Perú.
            </p>

            {/* Micro-bio */}
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed italic border-l-2 border-terracotta/40 pl-3 text-left">
              "Equilibro la velocidad bruta de la optimización de clústeres de Big Data con la elegancia matemática de la compilación de modelos de Inteligencia Artificial."
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
                src="/yo_anthony.png"
                alt="Anthony López - AI Data Engineer"
                className="w-full h-full object-contain hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Badge Overlay */}
              <div className="absolute -bottom-4 left-4 right-4 bg-forest border-2 border-olive rounded-2xl p-2.5 shadow-[4px_4px_0px_0px_rgba(33,51,41,0.2)] text-center">
                <span className="text-[10px] font-mono text-moss uppercase tracking-widest block font-bold">
                  Anthony López
                </span>
                <span className="text-[9px] font-mono text-cream/75 block mt-0.5">
                  Cusco, Perú • AI Data Engineer
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
            Soluciones arquitectónicas reales creadas para responder a cargas de procesamiento de Big Data altamente exigentes y restricciones de agregación de características.
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
                Hola, soy Anthony López.
              </h2>
              <p className="text-sm sm:text-base text-moss leading-relaxed">
                Soy un Ingeniero de Datos y Científico de Datos obsesionado con la optimización del rendimiento de cómputo distribuido y el escalado de esquemas confiables de almacenes de datos en la nube. Veo la arquitectura de sistemas como un rompecabezas de alta precisión donde cada parámetro de hilos, configuración de partición en Kafka y materialización en dbt cuenta.
              </p>
              <p className="text-sm sm:text-base text-moss leading-relaxed">
                Mi enfoque hacia Big Data se guía por una filosofía simple: **construirlo limpio, probarlo agresivamente y asegurar que se auto-recupere de manera automática**. Estoy profundamente interesado en construir infraestructuras de transmisión de baja latencia, canales de automatización de microservicios y flujos paralelos de machine learning.
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-2 border-forest/15 rounded-2xl p-4 bg-forest/5">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-terracotta">Ubicación</span>
                  <p className="text-sm text-cream font-bold">Cusco, Perú (Disponible para Remoto)</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-terracotta">Pasatiempos</span>
                  <p className="text-sm text-cream font-bold">Café Peruano, Senderismo Andino, Arqueoastronomía Inca</p>
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
              <p className="text-xs text-moss font-mono mt-0.5">Envía un ping de conexión o una propuesta de contrato de pipeline de datos.</p>
            </div>
            <Mail size={22} className="text-terracotta" />
          </div>

          <div className="p-6">
            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-sage/20 border-3 border-sage flex items-center justify-center text-sage text-2xl animate-bounce">
                  ✨
                </div>
                <h4 className="font-display font-bold text-lg text-forest">¡Ingestión de Contacto Exitosa!</h4>
                <p className="text-sm text-forest/80 max-w-sm leading-relaxed">
                  Gracias por enviar tu mensaje. El receptor de cola de Anthony procesará tu ping de contacto y responderá en menos de 24 horas.
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
                  Publicar en la Cola de Mensajes <Mail size={15} />
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
              Anthony López
            </span>
            <p className="text-xs text-moss font-mono">
              Diseñado y Construido en Cusco, Perú • © {new Date().getFullYear()}
            </p>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border-2 border-forest bg-cream hover:bg-terracotta text-forest rounded-xl transition-all shadow-[2.5px_2.5px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 border-2 border-forest bg-cream hover:bg-terracotta text-forest rounded-xl transition-all shadow-[2.5px_2.5px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:anthonymlocc@gmail.com"
              className="p-2.5 border-2 border-forest bg-cream hover:bg-terracotta text-forest rounded-xl transition-all shadow-[2.5px_2.5px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </footer>

      {/* PERSISTENT FLOATING AI CV ASSISTANT */}
      <CVAssistant />

    </div>
  );
}

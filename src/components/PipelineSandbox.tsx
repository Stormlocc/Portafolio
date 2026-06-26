import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, ShieldAlert, Cpu, Database, AlertCircle, CheckCircle2, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LogMessage {
  time: string;
  type: "info" | "kafka" | "spark" | "storage" | "error" | "success";
  text: string;
}

export default function PipelineSandbox() {
  const [activeScenario, setActiveScenario] = useState<"normal" | "drift" | "failure">("normal");
  const [isRunning, setIsRunning] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [throughput, setThroughput] = useState(0);
  const [anomalyCount, setAnomalyCount] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs directly inside container to avoid page scrolling/view sliding
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle throughput, anomaly count, and processed count accumulation in real-time
  useEffect(() => {
    let timer: any;
    if (isRunning && currentStep >= 0) {
      timer = setInterval(() => {
        const driftMultiplier = activeScenario === "drift" ? 1.4 : 1.0;
        let baseThroughput = 450;
        
        if (activeScenario === "failure" && currentStep === 2) {
          baseThroughput = 75; // Degraded during OOM failure
        } else if (currentStep === 3) {
          baseThroughput = 580; // Final commit bulk merge speedup
        }
        
        const currentThroughput = Math.floor(baseThroughput + Math.random() * 120 * driftMultiplier);
        setThroughput(currentThroughput);

        // Continuous processed items accumulation
        setProcessedCount((prev) => prev + Math.floor(currentThroughput * 0.5));

        if (activeScenario === "drift" && currentStep === 2 && Math.random() > 0.45) {
          setAnomalyCount((prev) => prev + 1);
        } else if (activeScenario === "normal" && Math.random() > 0.96) {
          setAnomalyCount((prev) => prev + 1);
        }
      }, 500);
    } else {
      setThroughput(0);
    }
    return () => clearInterval(timer);
  }, [isRunning, currentStep, activeScenario]);

  // Handles the automatic looping logic
  useEffect(() => {
    let active = true;
    if (isAutomatic && !isRunning) {
      const timer = setTimeout(() => {
        if (active && isAutomatic && !isRunning) {
          handleRunPipeline(true);
        }
      }, 2000);
      return () => {
        active = false;
        clearTimeout(timer);
      };
    }
  }, [isAutomatic, isRunning]);

  const addLog = (text: string, type: LogMessage["type"] = "info") => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${(now.getMilliseconds() / 10).toFixed(0).padStart(2, "0")}`;
    setLogs((prev) => {
      const next = [...prev, { time: timeStr, type, text }];
      // Maintain last 55 entries to keep rolling loop of data streams performant
      if (next.length > 55) {
        return next.slice(next.length - 55);
      }
      return next;
    });
  };

  const handleRunPipeline = async (isLoopCall: boolean = false) => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(0);
    
    if (!isLoopCall) {
      setAnomalyCount(0);
      setProcessedCount(0);
      setLogs([]);
    } else {
      addLog("🔄 --- INICIANDO NUEVA TRANSMISIÓN (BUCLE AUTOMÁTICO) ---", "info");
    }

    // STEP 0: Ingestion
    addLog("🚀 [ESTADO: INGESTA] Iniciando motor de ingesta de Smart Water IoT Cusco.", "info");
    addLog("📡 Escuchando transmisiones activas en puerto 9092 de telemetría.", "info");
    addLog("📥 Datos capturados de 150 sensores de flujo y presión en tiempo real.", "info");
    addLog("📦 Preparando lote de transacciones ID #8291-CUSCO. Formato: JSON crudo.", "info");
    
    await delay(3500); // Slowed down traversal
    if (!isRunning) return;
    setCurrentStep(1);

    // STEP 1: Kafka Buffer
    addLog("🔥 [ESTADO: KAFKA BUFFER] Levantando brókers de mensajería redundantes.", "kafka");
    addLog("📊 Publicando lote en el tópico 'water-sensors-telemetry' con 3 particiones.", "kafka");
    addLog("⚡ Líderes de partición asignados en el clúster: Broker_A, Broker_B.", "kafka");
    addLog("📥 Mensajes serializados en Avro y encolados con éxito. Kafka Offset actual: 198421.", "kafka");

    await delay(4000); // Slowed down traversal
    if (!isRunning) return;
    setCurrentStep(2);

    // STEP 2: Spark Processing & ML scoring
    addLog("🧠 [ESTADO: SPARK PROCESSING] Iniciando clúster de procesamiento distribuido (16 Cores).", "spark");
    addLog("⚙️ Driver de Spark optimizando el árbol de ejecución (DAG execution plan).", "spark");
    addLog("🤖 Inicializando modelo de Machine Learning 'RandomForestClassifier' (v2.1).", "spark");
    addLog("🔄 Ejecutando transformaciones: Limpieza de valores nulos, escala vectorial MinMaxScaler.", "spark");

    if (activeScenario === "drift") {
      addLog("⚠️ [SCHEMA WATCHDOG] Alerta de desviación de esquema detectada en tiempo real.", "error");
      addLog("🛡️ Activando protocolo de tolerancia a fallas: Desviando datos anómalos hacia S3 DLQ (Dead Letter Queue).", "info");
      addLog("📥 Registros procesados marcados con bandera 'anomaly_drift=true'.", "spark");
    } else if (activeScenario === "failure") {
      addLog("🚨 [SPARK OUT OF MEMORY] Excepción fatal detectada en Executor_3 de Spark (Heap al 100%).", "error");
      addLog("🔄 Supervisor K8s iniciando auto-recuperación: Redirigiendo cargas al nodo secundario.", "info");
      addLog("🩹 Tareas de partición recuperadas. Lote reconstruido de forma transparente.", "spark");
    } else {
      addLog("📥 Predicciones de ML exitosas. Consumo y anomalías hídricas evaluadas con precisión.", "spark");
    }

    await delay(4500); // Slowed down traversal
    if (!isRunning) return;
    setCurrentStep(3);

    // STEP 3: Storage Commit (Snowflake)
    addLog("💾 [ESTADO: STORAGE COMMIT] Abriendo transacción ACID en el Data Warehouse de Snowflake.", "storage");
    addLog("📦 Escribiendo fragmentos parquet optimizados en formato de tabla Delta Lake.", "storage");

    if (activeScenario === "failure") {
      addLog("⚠️ Datos guardados con estado de rendimiento degradado por auto-recuperación.", "error");
      addLog("📥 Confirmación de persistencia exitosa. Registros parciales guardados en Snowflake.", "storage");
    } else {
      addLog("✨ ¡Transacción Snowflake confirmada con éxito de forma atómica!", "success");
      addLog("📥 Lote guardado y optimizado en Delta Lake con compresión Z-Order.", "storage");
    }

    await delay(3200); // Slowed down traversal
    setCurrentStep(4);
    setIsRunning(false);
    addLog("🎉 ¡PROCESO DE TRANSMISIÓN COMPLETADO! Todos los estados se ejecutaron sin pérdida de datos.", "success");
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsAutomatic(false);
    setCurrentStep(-1);
    setLogs([]);
    setThroughput(0);
    setAnomalyCount(0);
    setProcessedCount(0);
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="border-3 border-forest rounded-3xl overflow-hidden bg-cream text-forest shadow-[8px_8px_0px_0px_rgba(33,51,41,1)]">
      {/* Header Banner */}
      <div className="p-5 border-b-3 border-forest bg-forest text-cream flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-display font-bold text-cream flex items-center gap-2">
            <Cpu className="text-terracotta" size={20} /> Simulador de Ejecución de Pipeline
          </h3>
          <p className="text-xs text-moss font-mono mt-0.5">
            Telemetría de transmisión interactiva y simulación de recuperación de fallos.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => handleRunPipeline(false)}
            disabled={isRunning}
            className={`flex-grow sm:flex-none flex items-center justify-center gap-1.5 px-4.5 py-2 border-2 border-forest rounded-xl font-bold font-display text-sm shadow-[3px_3px_0px_0px_rgba(33,51,41,1)] transition-all ${
              isRunning
                ? "bg-olive/40 text-cream/60 cursor-not-allowed shadow-none translate-x-0.5 translate-y-0.5"
                : "bg-terracotta text-forest hover:bg-clay hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            }`}
          >
            <Play size={15} fill="currentColor" /> Ejecutar Pipeline
          </button>
          
          <button
            onClick={() => {
              const nextAuto = !isAutomatic;
              setIsAutomatic(nextAuto);
              if (nextAuto && !isRunning) {
                handleRunPipeline(true);
              }
            }}
            className={`flex-grow sm:flex-none flex items-center justify-center gap-1.5 px-4.5 py-2 border-2 border-forest rounded-xl font-bold font-display text-sm shadow-[3px_3px_0px_0px_rgba(33,51,41,1)] transition-all ${
              isAutomatic
                ? "bg-sage text-cream hover:bg-forest hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                : "bg-cream text-forest hover:bg-forest/5 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            }`}
            title="Bucle automático de ejecución continua"
          >
            <span className="relative flex h-2 w-2 mr-0.5">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isAutomatic ? "animate-ping bg-green-400" : "bg-forest"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isAutomatic ? "bg-green-400" : "bg-forest"}`} />
            </span>
            {isAutomatic ? "Automático: ON" : "Modo Automático"}
          </button>

          <button
            onClick={handleReset}
            className="p-2 border-2 border-forest bg-cream text-forest hover:bg-dark/5 rounded-xl transition-all"
            title="Restablecer simulación"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Control Presets */}
      <div className="p-4 bg-sage/10 border-b-3 border-forest flex flex-wrap items-center gap-4">
        <span className="text-xs font-mono font-bold uppercase opacity-80">Escenario de Transmisión:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => !isRunning && setActiveScenario("normal")}
            disabled={isRunning}
            className={`px-3 py-1 text-xs font-bold border-2 rounded-lg transition-all ${
              activeScenario === "normal"
                ? "border-forest bg-forest text-cream"
                : "border-forest/35 hover:border-forest text-forest bg-cream/50"
            } ${isRunning ? "opacity-55 cursor-not-allowed" : ""}`}
          >
            🟢 Flujo de Producción Normal
          </button>
          <button
            onClick={() => !isRunning && setActiveScenario("drift")}
            disabled={isRunning}
            className={`px-3 py-1 text-xs font-bold border-2 rounded-lg transition-all ${
              activeScenario === "drift"
                ? "border-forest bg-clay text-cream"
                : "border-forest/35 hover:border-forest text-forest bg-cream/50"
            } ${isRunning ? "opacity-55 cursor-not-allowed" : ""}`}
          >
            🟡 Desviación de Esquema (Auto-Recuperable)
          </button>
          <button
            onClick={() => !isRunning && setActiveScenario("failure")}
            disabled={isRunning}
            className={`px-3 py-1 text-xs font-bold border-2 rounded-lg transition-all ${
              activeScenario === "failure"
                ? "border-forest bg-clay/35 text-forest"
                : "border-forest/35 hover:border-forest text-forest bg-cream/50"
            } ${isRunning ? "opacity-55 cursor-not-allowed" : ""}`}
          >
            🔴 Caída de JVM del Ejecutor (Auto-Recuperación)
          </button>
        </div>
      </div>

      {/* Main Grid: Visual Flow & Live Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b-3 border-forest">
        {/* Animated Flow Map */}
        <div className="lg:col-span-8 p-6 flex flex-col justify-between items-center bg-cream/55 min-h-[300px]">
          <div className="w-full flex items-center justify-between gap-1 max-w-lg mb-6 mt-14 relative">
            
            {/* Floating Data Payload Badge centered above active step */}
            <AnimatePresence>
              {isRunning && currentStep >= 0 && currentStep <= 3 && (
                <motion.div
                  key="active-payload"
                  initial={{ y: -12, opacity: 0, scale: 0.85 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    left: `${currentStep * 33.33}%`
                  }}
                  exit={{ y: 12, opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 120, damping: 16 }}
                  className="absolute -top-16 bg-forest text-cream border-2 border-terracotta rounded-xl px-2.5 py-1.5 shadow-[4px_4px_0px_0px_rgba(33,51,41,0.3)] flex flex-col items-center justify-center min-w-[120px] sm:min-w-[140px] z-20 pointer-events-none -translate-x-1/2"
                >
                  {/* Small pointer arrow */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-forest border-r-2 border-b-2 border-terracotta rotate-45" />
                  
                  <span className="text-[8px] font-mono text-moss uppercase tracking-widest font-bold">
                    {currentStep === 0 && "RAW_INGEST_PKT"}
                    {currentStep === 1 && "KAFKA_RECORD"}
                    {currentStep === 2 && "SPARK_RDD_TRANSFORM"}
                    {currentStep === 3 && "SNOWFLAKE_COMMIT"}
                  </span>
                  
                  <span className="text-[10px] font-mono text-terracotta font-semibold mt-0.5 animate-pulse">
                    {currentStep === 0 && "{\"status\":\"RAW\"}"}
                    {currentStep === 1 && "{\"partition\":2}"}
                    {currentStep === 2 && (activeScenario === "drift" ? "{\"drift\":true}" : "{\"scored\":0.99}")}
                    {currentStep === 3 && "{\"acid\":true}"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connection SVG Line */}
            <svg className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2 pointer-events-none z-0" style={{ overflow: "visible" }}>
              <path
                id="flow-path-sandbox"
                d="M 20,16 L 480,16"
                fill="none"
                stroke="#344e41"
                strokeWidth="2.5"
                className={isRunning ? "animate-data-flow" : "stroke-dash-array-[5,5]"}
              />
              {isRunning && (
                <>
                  <circle r="4" fill="#e07a5f">
                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M 20,16 L 480,16" />
                  </circle>
                  <circle r="4.5" fill="#f2cc8f" begin="1.0s">
                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M 20,16 L 480,16" />
                  </circle>
                  <circle r="3.5" fill="#588157" begin="2.0s">
                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M 20,16 L 480,16" />
                  </circle>
                </>
              )}
            </svg>

            {/* Step 1: Ingestion */}
            <div className="flex flex-col items-center z-10 relative">
              <div
                className={`w-12 h-12 rounded-full border-3 border-forest flex items-center justify-center transition-all ${
                  currentStep >= 0 ? "bg-forest text-cream scale-105 shadow-[4px_4px_0px_0px_rgba(224,122,95,0.4)]" : "bg-cream text-forest"
                }`}
              >
                <Database size={18} />
              </div>
              <span className="text-[10px] font-mono font-bold mt-1.5 uppercase">Ingesta</span>
              <div className="absolute -bottom-6 flex items-center justify-center">
                {currentStep >= 0 ? (
                  <CheckCircle2 size={13} className="text-sage fill-cream" />
                ) : (
                  <div className="w-3 h-3 rounded-full border border-forest/50 bg-cream/80" />
                )}
              </div>
            </div>

            {/* Step 2: Kafka */}
            <div className="flex flex-col items-center z-10 relative">
              <div
                className={`w-12 h-12 rounded-full border-3 border-forest flex items-center justify-center transition-all ${
                  currentStep >= 1 ? "bg-forest text-cream scale-105 shadow-[4px_4px_0px_0px_rgba(224,122,95,0.4)]" : "bg-cream text-forest"
                }`}
              >
                <div className="text-[11px] font-bold font-mono">Kafka</div>
              </div>
              <span className="text-[10px] font-mono font-bold mt-1.5 uppercase">Búfer</span>
              <div className="absolute -bottom-6 flex items-center justify-center">
                {currentStep >= 1 ? (
                  <CheckCircle2 size={13} className="text-sage fill-cream" />
                ) : (
                  <div className="w-3 h-3 rounded-full border border-forest/50 bg-cream/80" />
                )}
              </div>
            </div>

            {/* Step 3: Spark ML */}
            <div className="flex flex-col items-center z-10 relative">
              <div
                className={`w-12 h-12 rounded-full border-3 border-forest flex items-center justify-center transition-all ${
                  currentStep >= 2 ? "bg-forest text-cream scale-105 shadow-[4px_4px_0px_0px_rgba(224,122,95,0.4)]" : "bg-cream text-forest"
                }`}
              >
                <Cpu size={18} />
              </div>
              <span className="text-[10px] font-mono font-bold mt-1.5 uppercase">Spark ML</span>
              <div className="absolute -bottom-6 flex items-center justify-center">
                {currentStep >= 2 ? (
                  activeScenario === "drift" ? (
                    <AlertCircle size={13} className="text-clay fill-cream" />
                  ) : activeScenario === "failure" && currentStep === 2 ? (
                    <ShieldAlert size={13} className="text-clay fill-cream animate-bounce" />
                  ) : (
                    <CheckCircle2 size={13} className="text-sage fill-cream" />
                  )
                ) : (
                  <div className="w-3 h-3 rounded-full border border-forest/50 bg-cream/80" />
                )}
              </div>
            </div>

            {/* Step 4: Snowflake */}
            <div className="flex flex-col items-center z-10 relative">
              <div
                className={`w-12 h-12 rounded-full border-3 border-forest flex items-center justify-center transition-all ${
                  currentStep >= 3 ? "bg-forest text-cream scale-105 shadow-[4px_4px_0px_0px_rgba(224,122,95,0.4)]" : "bg-cream text-forest"
                }`}
              >
                <div className="text-[11px] font-bold font-mono">Snow</div>
              </div>
              <span className="text-[10px] font-mono font-bold mt-1.5 uppercase">Almacén</span>
              <div className="absolute -bottom-6 flex items-center justify-center">
                {currentStep >= 3 ? (
                  <CheckCircle2 size={13} className="text-sage fill-cream" />
                ) : (
                  <div className="w-3 h-3 rounded-full border border-forest/50 bg-cream/80" />
                )}
              </div>
            </div>
          </div>

          {/* Sparkline & Stream telemetry widgets */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 border-t-2 border-forest/15 pt-5">
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold uppercase opacity-75">Datos Procesados</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg sm:text-xl font-display font-bold text-terracotta">
                  {processedCount.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono opacity-80">filas</span>
              </div>
            </div>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold uppercase opacity-75">Rendimiento SLA</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg sm:text-xl font-display font-bold text-forest">
                  {throughput.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono opacity-80">eps</span>
              </div>
            </div>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold uppercase opacity-75">Anomalías Esquema</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`text-lg sm:text-xl font-display font-bold ${anomalyCount > 0 ? "text-clay" : "text-forest"}`}>
                  {anomalyCount}
                </span>
                <span className="text-[10px] font-mono opacity-80">filas</span>
              </div>
            </div>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold uppercase opacity-75">Estado SLA Sistema</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    activeScenario === "failure" && currentStep === 2
                      ? "bg-clay"
                      : "bg-sage"
                  }`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    activeScenario === "failure" && currentStep === 2
                      ? "bg-clay"
                      : "bg-sage"
                  }`}></span>
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-forest/90">
                  {activeScenario === "failure" && currentStep === 2 ? "RECUPERANDO" : "ESTABLE"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Console Terminal */}
        <div className="lg:col-span-4 bg-dark text-cream p-4.5 font-mono text-xs flex flex-col h-[280px] border-t-3 lg:border-t-0 lg:border-l-3 border-forest">
          <div className="flex items-center gap-2 border-b border-cream/15 pb-2 mb-2">
            <Terminal size={13} className="text-terracotta" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-moss">Registros de Clúster</span>
          </div>
          
          <div ref={terminalContainerRef} className="flex-grow overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
            {logs.length === 0 ? (
              <div className="text-cream/40 italic flex flex-col items-center justify-center h-full text-center">
                <span>[Esperando Activación]</span>
                <span className="text-[10px] mt-1">Haz clic en "Ejecutar Pipeline" para iniciar la simulación.</span>
              </div>
            ) : (
              logs.map((log, index) => {
                const colors = {
                  info: "text-cream/80",
                  kafka: "text-terracotta",
                  spark: "text-moss",
                  storage: "text-sage",
                  error: "text-clay font-bold",
                  success: "text-green-400 font-bold",
                  current: "text-amber-300 font-semibold",
                };
                return (
                  <div key={index} className="leading-relaxed">
                    <span className="text-cream/35 select-none">[{log.time}] </span>
                    <span className={colors[log.type]}>{log.text}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

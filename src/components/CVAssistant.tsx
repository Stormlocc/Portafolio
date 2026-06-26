import React, { useState, useEffect, useRef } from "react";
import { Message } from "../types";
import { Send, X, MessageSquare, Terminal, HelpCircle, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CHIPS = [
  "🛠️ ¿Qué stack de big data utilizas?",
  "🛰️ ¡Cuéntame sobre el pipeline de agua de Kafka!",
  "🧠 ¿Cómo escalaste el predictor de demanda ML?",
  "⚡ ¿Qué optimización de OOM en Spark has hecho?",
];

export default function CVAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy el clon de IA de Anthony López. ¡Pregúntame lo que quieras sobre mis pipelines de datos, mi vida en Cusco, optimización de rendimiento de Spark, arquitecturas de modelos o cómo resolví grandes desafíos de escalabilidad! 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setErrorMsg(null);

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al obtener respuesta");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Algo salió mal. ¿Está configurada tu clave API de Gemini?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group bg-[#25D366] hover:bg-[#128C7E] text-white border-3 border-forest p-3.5 rounded-full shadow-[5px_5px_0px_0px_rgba(33,51,41,1)] hover:shadow-[3px_3px_0px_0px_rgba(33,51,41,1)] transition-all cursor-pointer flex items-center justify-center"
        >
          {/* Custom SVG WhatsApp Logo */}
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" strokeWidth="0">
            <path d="M12.031 2C6.49 2 2 6.48 2 12.02c0 1.77.46 3.48 1.34 5L2 22l5.12-1.34c1.46.8 3.1 1.22 4.79 1.22 5.54 0 10.03-4.48 10.03-10.02C21.94 6.48 17.47 2 12.03 2zm6.21 14.12c-.25.7-1.42 1.3-1.95 1.38-.48.07-.98.11-3.08-.75-2.69-1.1-4.42-3.83-4.56-4.01-.13-.19-1.09-1.45-1.09-2.77 0-1.32.69-1.97.94-2.23.25-.26.54-.32.72-.32h.5c.16 0 .38-.06.59.43.21.51.72 1.76.78 1.88.06.12.1.26.02.43-.08.17-.18.28-.29.4-.11.12-.22.25-.32.37-.11.11-.23.23-.1.45.13.22.58.95 1.24 1.54.85.76 1.56 1 1.78 1.1.22.1.35.09.48-.06.13-.15.54-.63.69-.85.15-.22.3-.18.5-.1.2.08 1.28.61 1.5.72.22.11.37.17.43.27.06.1.06.59-.19 1.29z"/>
          </svg>
          {/* Notification Alert Dot */}
          <span className="absolute top-0 right-0 h-3 w-3 bg-[#E07A5F] rounded-full border border-forest animate-pulse" />
          <span className="absolute right-15 top-1/2 -translate-y-1/2 bg-forest text-cream text-[11px] font-bold font-display px-3 py-1.5 rounded-xl border-2 border-forest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[2px_2px_0px_0px_rgba(33,51,41,0.2)]">
            ¡Chatea con el Clon de Anthony! ⚡
          </span>
        </motion.button>
      </div>

      {/* Slide-out Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute right-4 bottom-4 top-4 max-w-md w-full bg-[#E5DDD5] border-4 border-forest rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(33,51,41,1)] flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="p-4 bg-[#075E54] text-cream border-b-3 border-forest flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Anthony López"
                    className="w-10 h-10 border-2 border-cream rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base leading-tight text-white">Anthony López</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#A3B18A]">En línea • Clon de IA</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border-2 border-cream bg-[#128C7E] text-cream hover:bg-forest hover:border-forest transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Chat Viewport */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-cream/30 scrollbar-thin">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] border-2 border-forest rounded-2xl p-3.5 text-sm leading-relaxed shadow-[3px_3px_0px_0px_rgba(33,51,41,0.15)] ${
                        msg.role === "user"
                          ? "bg-sage text-cream"
                          : "bg-faf8f5 text-forest"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-faf8f5 text-forest border-2 border-forest rounded-2xl p-3 text-xs flex items-center gap-2">
                      <RefreshCw className="animate-spin text-sage" size={14} />
                      <span className="font-mono opacity-85">El gemelo neuronal de Anthony está compilando la respuesta...</span>
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="border-2 border-clay bg-clay/10 text-forest p-4 rounded-xl flex items-start gap-2 text-xs">
                    <AlertCircle className="text-clay shrink-0 mt-0.5" size={15} />
                    <div className="space-y-1">
                      <span className="font-bold">Error de Compilación del Modelo</span>
                      <p className="opacity-90">{errorMsg}</p>
                      <p className="text-[10px] italic font-mono opacity-70 mt-1">
                        👉 Consejo: Asegúrate de que tu GEMINI_API_KEY esté guardada en "Settings &gt; Secrets".
                      </p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Prompt Suggestions (chips) */}
              <div className="p-3 bg-moss/10 border-t-3 border-forest">
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold opacity-60 flex items-center gap-1 mb-1.5">
                  <HelpCircle size={10} /> Sugerencias de preguntas frecuentes (FAQ):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CHIPS.map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(chip.slice(3))}
                      disabled={isLoading}
                      className="text-[10px] font-medium border-2 border-forest bg-cream hover:bg-terracotta hover:text-forest text-forest px-2.5 py-1 rounded-lg transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-55"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-cream border-t-3 border-forest flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Pregúntame sobre optimización de clústeres Spark..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-grow bg-faf8f5 border-2 border-forest rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-cream text-forest font-sans"
                />
                <button
                  onClick={() => handleSendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 bg-terracotta text-forest border-2 border-forest rounded-xl hover:bg-clay shadow-[2.5px_2.5px_0px_0px_rgba(33,51,41,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-55 cursor-pointer flex items-center justify-center transition-all"
                >
                  <Send size={15} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

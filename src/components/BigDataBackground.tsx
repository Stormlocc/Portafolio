import React, { useEffect, useState } from "react";
import Sparkle from "./Sparkle";

interface StreamColumn {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  chars: string[];
  scale: number; // For depth of field
  opacity: number;
}

interface ClickStream {
  id: string;
  x: number;
  y: number;
  chars: string[];
  color: string;
  scale: number;
}

export default function BigDataBackground() {
  const [streams, setStreams] = useState<StreamColumn[]>([]);
  const [clickStreams, setClickStreams] = useState<ClickStream[]>([]);

  useEffect(() => {
    // Generate random binary data streams representing raw information ingest
    // Distributed throughout the whole page height (85 columns) for high density
    const generatedStreams: StreamColumn[] = Array.from({ length: 85 }).map((_, i) => {
      const charLength = Math.floor(Math.random() * 8) + 6;
      const chars = Array.from({ length: charLength }).map(() => 
        Math.random() > 0.5 ? "1" : "0"
      );
      
      // Determine depth of field properties
      const rand = Math.random();
      let scale = 0.8;
      let opacity = 0.15;
      let duration = 12 + Math.random() * 10;
      
      if (rand > 0.7) {
        // Closer, larger, faster stream
        scale = 1.25;
        opacity = 0.45;
        duration = 6 + Math.random() * 6;
      } else if (rand > 0.3) {
        // Midground stream
        scale = 1.0;
        opacity = 0.28;
        duration = 9 + Math.random() * 8;
      }
      
      return {
        id: i,
        // Distribute columns across the screen width and full height of the page
        left: Math.random() * 94 + 3, 
        top: Math.random() * 100, 
        delay: Math.random() * 12,
        duration,
        chars,
        scale,
        opacity,
      };
    });
    setStreams(generatedStreams);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Check if click was inside any interactive element (buttons, links, textboxes)
      const path = e.composedPath() as HTMLElement[];
      const isInteractive = path.some((el) => {
        if (!el.tagName) return false;
        const tag = el.tagName.toLowerCase();
        const role = el.getAttribute?.("role");
        const hasCursorPointer = el.classList?.contains?.("cursor-pointer");
        return (
          tag === "button" ||
          tag === "a" ||
          tag === "input" ||
          tag === "textarea" ||
          tag === "select" ||
          role === "button" ||
          role === "link" ||
          hasCursorPointer
        );
      });

      if (isInteractive) return;

      // Click location relative to document
      const x = e.pageX;
      const y = e.pageY;

      // Create a fast, prominent binary stream at the clicked point
      const charLength = Math.floor(Math.random() * 5) + 6; // 6 to 10 characters
      const chars = Array.from({ length: charLength }).map(() =>
        Math.random() > 0.5 ? "1" : "0"
      );

      // Random vibrant highlight color for the clicked data stream
      const colors = ["#E07A5F", "#81B29A", "#F2CC8F", "#3D405B", "#F4F1DE", "#E07A5F", "#F2CC8F"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const newStream: ClickStream = {
        id: `${Date.now()}-${Math.random()}`,
        x,
        y,
        chars,
        color: randomColor,
        scale: 1.1 + Math.random() * 0.25,
      };

      setClickStreams((prev) => [...prev, newStream]);

      // Automatically clean up stream after animation completes
      setTimeout(() => {
        setClickStreams((prev) => prev.filter((s) => s.id !== newStream.id));
      }, 1650);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 🟢 DOS BANDAS DE VIENTO NEÓN DE ALTA TRANSPARENCIA (Izquierda y Derecha - Altura desde la posición cero hasta el botón de explorar mi trabajo) */}
      {/* Zona Izquierda: Neón Esmeralda a Teal ultra-suave */}
      <div className="absolute top-0 left-[-15vw] w-[80vw] sm:w-[70vw] h-[650px] rounded-[45%_35%_40%_30%] bg-gradient-to-r from-emerald-500/12 via-teal-400/8 to-transparent mix-blend-screen blur-[125px] sm:blur-[165px] animate-neon-wind-left pointer-events-none" />

      {/* Zona Derecha: Neón Terracota / Fuego Dorado ultra-suave */}
      <div className="absolute top-0 right-[-15vw] w-[80vw] sm:w-[70vw] h-[600px] rounded-[40%_30%_50%_45%] bg-gradient-to-l from-terracotta/14 via-orange-400/8 to-transparent mix-blend-screen blur-[125px] sm:blur-[165px] animate-neon-wind-right pointer-events-none" />

      {/* 🛸 LIVE BINARY DATA STREAMS (Lluvia de bits extendida en toda la página) */}
      <div className="absolute inset-0">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="absolute font-mono leading-none select-none animate-stream-fall flex flex-col items-center"
            style={{
              left: `${stream.left}%`,
              top: `${stream.top}%`,
              animationDelay: `${stream.delay}s`,
              animationDuration: `${stream.duration}s`,
              transform: `scale(${stream.scale})`,
              opacity: stream.opacity,
              fontSize: stream.scale === 1.25 ? "13px" : stream.scale === 1.0 ? "11px" : "8px",
            }}
          >
            {stream.chars.map((char, index) => (
              <span 
                key={index} 
                className="my-0.5 text-sage"
                style={{
                  opacity: (index + 1) / stream.chars.length,
                  color: index === stream.chars.length - 1 ? "#f2cc8f" : undefined, // highlight leading bit with golden/terracotta touch
                }}
              >
                {char}
              </span>
            ))}
            {/* Tiny tag for some streams to feel like data headers */}
            {stream.id % 6 === 0 && (
              <span className="text-[7px] font-bold text-terracotta/60 mt-1 uppercase tracking-widest font-mono">
                DATA_PKT
              </span>
            )}
          </div>
        ))}

        {/* 🚀 CLICK-TRIGGERED DATA CASCADES (Generado donde haces click) */}
        {clickStreams.map((stream) => (
          <div
            key={stream.id}
            className="absolute font-mono leading-none select-none animate-click-stream flex flex-col items-center z-10"
            style={{
              left: `${stream.x}px`,
              top: `${stream.y}px`,
              transform: `scale(${stream.scale}) translateX(-50%)`,
              fontSize: "12px",
            }}
          >
            {stream.chars.map((char, index) => (
              <span 
                key={index} 
                className="my-0.5"
                style={{
                  opacity: (index + 1) / stream.chars.length,
                  color: index === stream.chars.length - 1 ? stream.color : "#81B29A", // Highlight terminal bit with neon color
                  textShadow: index === stream.chars.length - 1 ? `0 0 8px ${stream.color}` : "none",
                }}
              >
                {char}
              </span>
            ))}
            <span 
              className="text-[6.5px] font-bold mt-1 uppercase tracking-widest font-mono"
              style={{ color: stream.color, opacity: 0.8 }}
            >
              SYS_PING
            </span>
          </div>
        ))}
      </div>

      {/* 📡 PIPELINE DATABUS LANES (Horizontal packet transmission animation) */}
      <div className="absolute top-[35%] inset-x-0 h-[1px] bg-forest/10 border-t border-dashed border-forest/15">
        <div className="absolute top-0 left-0 h-[3px] w-12 rounded-full bg-terracotta/70 blur-[1px] animate-horizontal-pulse" />
      </div>
      <div className="absolute top-[55%] inset-x-0 h-[1px] bg-forest/10 border-t border-dashed border-forest/15">
        <div className="absolute top-0 left-0 h-[3px] w-20 rounded-full bg-clay/60 blur-[1.5px] animate-horizontal-pulse" style={{ animationDelay: "1.5s", animationDuration: "5s" }} />
      </div>
      <div className="absolute top-[75%] inset-x-0 h-[1px] bg-forest/10 border-t border-dashed border-forest/15">
        <div className="absolute top-0 left-0 h-[3px] w-16 rounded-full bg-sage/80 blur-[1px] animate-horizontal-pulse" style={{ animationDelay: "0.5s", animationDuration: "6s" }} />
      </div>

      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.06]" />

    </div>
  );
}

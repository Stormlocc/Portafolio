import React from "react";

interface SparkleProps {
  size?: number;
  className?: string;
  delay?: number;
  variant?: "primary" | "secondary" | "accent";
}

export default function Sparkle({
  size = 24,
  className = "",
  delay = 0,
  variant = "primary",
}: SparkleProps) {
  const colorMap = {
    primary: "text-terracotta",
    secondary: "text-clay",
    accent: "text-sage",
  };

  return (
    <svg
      id={`sparkle-${delay}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${colorMap[variant]} animate-float opacity-75 pointer-events-none transition-all duration-1000 ${className}`}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      <path d="M12 0c.34 6.4 5.6 11.66 12 12-.34.34-5.6 5.6-12 12C11.66 17.6 6.4 12.34 0 12c6.4-.34 11.66-5.6 12-12z" />
    </svg>
  );
}

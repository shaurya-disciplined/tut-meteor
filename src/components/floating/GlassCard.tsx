import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className = "", glow = false }: GlassCardProps) {
  return (
    <div
      className={`relative p-6 rounded-3xl bg-surface/80 backdrop-blur-xl border transition-colors duration-500 ${
        glow ? "border-signal/40" : "border-line"
      } ${className}`}
    >
      {children}
    </div>
  );
}

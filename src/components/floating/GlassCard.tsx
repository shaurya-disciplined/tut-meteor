import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className = "", glow = false }: GlassCardProps) {
  return (
    <div 
      className={`relative p-6 rounded-3xl bg-[#0a0a0f]/60 backdrop-blur-xl border border-white/10 shadow-2xl ${
        glow ? "shadow-[0_0_30px_rgba(250,204,21,0.05)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

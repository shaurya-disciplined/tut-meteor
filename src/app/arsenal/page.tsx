"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DriftItem } from "@/components/floating/DriftItem";
import { GlassCard } from "@/components/floating/GlassCard";

const SKILLS = [
  { id: "s1", x: 20, y: 30, label: "Frontend" },
  { id: "s2", x: 80, y: 20, label: "Systems" },
  { id: "s3", x: 50, y: 70, label: "AI Agents" },
  { id: "s4", x: 15, y: 80, label: "Design" },
  { id: "s5", x: 85, y: 80, label: "Backend" },
];

export default function ArsenalPage() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="relative min-h-[100svh] w-full pt-32 pb-32 px-6 lg:px-24 flex flex-col items-center overflow-hidden">
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-20 text-center"
      >
        The <span className="text-accent">Arsenal</span>
      </motion.h1>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Column: Digital Arsenal */}
        <div className="flex flex-col gap-12">
          <DriftItem yDrift={[0, -10, 0]} rotateDrift={[0, 1, 0]}>
            <GlassCard glow>
              <h2 className="text-2xl font-bold text-accent mb-2">Vibe Link</h2>
              <div className="w-full h-[1px] bg-white/10 mb-6" />
              <p className="text-white/80 font-light mb-6">
                [PLACEHOLDER DESCRIPTION FOR VIBE LINK]
              </p>
              <a href="#" className="inline-block px-6 py-2 rounded-lg bg-accent/20 text-accent font-medium hover:bg-accent/30 transition-colors">
                [LIVE SITE LINK]
              </a>
            </GlassCard>
          </DriftItem>

          <DriftItem delay={1} duration={8} yDrift={[0, 8, 0]}>
            <GlassCard>
              <h2 className="text-xl font-bold text-white mb-2">Themegadress</h2>
              <p className="text-white/70 font-light text-sm">
                [PLACEHOLDER DESCRIPTION FOR THEMEGADRESS]
              </p>
            </GlassCard>
          </DriftItem>
        </div>

        {/* Right Column: Physical & Mental */}
        <div className="flex flex-col gap-8 lg:mt-24">
          <DriftItem delay={0.5} yDrift={[0, 12, 0]} rotateDrift={[-1, 0, -1]}>
            <GlassCard>
              <h2 className="text-xl font-bold text-white mb-2">The Vessel</h2>
              <ul className="text-white/70 font-light space-y-2 text-sm">
                <li>• [6'2" FRAME PLACEHOLDER]</li>
                <li>• [OMAD PROTOCOL PLACEHOLDER]</li>
              </ul>
            </GlassCard>
          </DriftItem>

          <DriftItem delay={1.5} duration={7} yDrift={[0, -8, 0]}>
            <GlassCard>
              <h2 className="text-xl font-bold text-white mb-2">Systems & Discipline</h2>
              <p className="text-white/70 font-light text-sm">
                [PLACEHOLDER FOR DISCIPLINE SYSTEMS]
              </p>
            </GlassCard>
          </DriftItem>
        </div>

      </div>

      {/* Skill Constellation (Background Layer) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 mix-blend-screen">
        <svg className="w-full h-full">
          {SKILLS.map((skill, i) => {
            return SKILLS.slice(i + 1).map((target, j) => (
              <motion.line
                key={`${skill.id}-${target.id}`}
                x1={`${skill.x}%`}
                y1={`${skill.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="url(#accent-gradient)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: hoveredSkill === skill.id || hoveredSkill === target.id ? 0.8 : 0.1 
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            ));
          })}
          <defs>
            <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#0a0a0f" />
            </linearGradient>
          </defs>
        </svg>

        {SKILLS.map((skill) => (
          <motion.div
            key={skill.id}
            className="absolute w-4 h-4 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer shadow-[0_0_15px_rgba(250,204,21,0.8)]"
            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
            onHoverStart={() => setHoveredSkill(skill.id)}
            onHoverEnd={() => setHoveredSkill(null)}
            animate={{ scale: hoveredSkill === skill.id ? 1.5 : 1 }}
          >
            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono tracking-widest uppercase">
              {skill.label}
            </span>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

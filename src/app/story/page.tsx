"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DriftItem } from "@/components/floating/DriftItem";
import { GlassCard } from "@/components/floating/GlassCard";

const CHAPTERS = [
  { id: "shadows", title: "Early Shadows", content: "[YOUR PERSONAL TEXT HERE]" },
  { id: "forge", title: "The Forge", content: "[YOUR PERSONAL TEXT HERE]" },
  { id: "awakening", title: "The Awakening", content: "[YOUR PERSONAL TEXT HERE]" },
  { id: "rises", title: "The Signal Rises", content: "[YOUR PERSONAL TEXT HERE]" },
];

export default function StoryPage() {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  return (
    <div className="relative min-h-[100svh] w-full pt-32 pb-48 px-6 lg:px-24 flex flex-col items-center">
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-20 text-center"
      >
        The <span className="text-accent">Story</span>
      </motion.h1>

      {/* Floating Case Files */}
      <div className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
        {CHAPTERS.map((chapter, i) => {
          const isActive = activeChapter === chapter.id || activeChapter === null;
          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-30 scale-95 blur-sm"}`}
            >
              <DriftItem 
                delay={i * 0.5} 
                duration={7 + i} 
                yDrift={[0, i % 2 === 0 ? -15 : 15, 0]}
                rotateDrift={[-1, i % 2 === 0 ? 2 : -2, -1]}
              >
                <motion.div whileHover={{ scale: 1.02, rotate: 0 }}>
                  <GlassCard className="relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="text-accent text-sm tracking-widest uppercase">0{i + 1}</span>
                      {chapter.title}
                    </h2>
                    <p className="text-white/70 leading-relaxed font-light">
                      {chapter.content}
                    </p>
                  </GlassCard>
                </motion.div>
              </DriftItem>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Timeline */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 p-4 rounded-full flex items-center gap-8 shadow-2xl"
      >
        {CHAPTERS.map((chapter, i) => (
          <button
            key={`timeline-${chapter.id}`}
            onClick={() => setActiveChapter(activeChapter === chapter.id ? null : chapter.id)}
            className="group relative flex flex-col items-center"
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeChapter === chapter.id ? "bg-accent shadow-[0_0_15px_rgba(250,204,21,0.8)] scale-150" : "bg-white/20 group-hover:bg-white/50"
            }`} />
            <span className="absolute -top-8 text-xs font-medium text-white/50 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
              {chapter.title}
            </span>
          </button>
        ))}
      </motion.div>

    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DriftItem } from "@/components/floating/DriftItem";
import { GlassCard } from "@/components/floating/GlassCard";

const BOOKS = [
  { id: "b1", title: "[BOOK 1 TITLE]", author: "[AUTHOR]", reflection: "[PLACEHOLDER FOR REFLECTION]" },
  { id: "b2", title: "[BOOK 2 TITLE]", author: "[AUTHOR]", reflection: "[PLACEHOLDER FOR REFLECTION]" },
];

const TRACKS = [
  { id: "t1", title: "[TRACK 1]", artist: "[ARTIST]", reason: "[WHY IT FUELS]" },
  { id: "t2", title: "[TRACK 2]", artist: "[ARTIST]", reason: "[WHY IT FUELS]" },
];

export default function EchoesPage() {
  const [activeBook, setActiveBook] = useState<string | null>(null);

  return (
    <div className="relative min-h-[100svh] w-full pt-32 pb-32 px-6 lg:px-24 flex flex-col items-center">
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-20 text-center"
      >
        The <span className="text-accent">Echoes</span>
      </motion.h1>

      <div className="w-full max-w-7xl flex flex-col gap-32">
        
        {/* Section 1: Library of Shadows */}
        <section className="relative">
          <h2 className="text-2xl font-mono text-white/50 tracking-widest uppercase mb-12 text-center">Library of Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {BOOKS.map((book, i) => (
              <DriftItem key={book.id} delay={i * 0.3} duration={6 + i} yDrift={[0, -10, 0]}>
                <motion.div 
                  whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
                  onClick={() => setActiveBook(book.id)}
                  className="cursor-pointer perspective-1000"
                >
                  <GlassCard className="w-64 h-80 flex flex-col justify-end relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="relative z-20">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{book.title}</h3>
                      <p className="text-sm text-white/60">{book.author}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              </DriftItem>
            ))}
          </div>
        </section>

        {/* Section 2: Fuel Tracks */}
        <section className="relative">
          <h2 className="text-2xl font-mono text-white/50 tracking-widest uppercase mb-12 text-center">Fuel Tracks</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {TRACKS.map((track, i) => (
              <DriftItem key={track.id} delay={i * 0.5} yDrift={[0, 15, 0]} rotateDrift={[0, 0, 0]}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <GlassCard className="flex items-center gap-6 w-[350px]">
                    <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                      <div className="w-4 h-4 bg-accent rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{track.title}</h3>
                      <p className="text-xs text-white/60 mb-2">{track.artist}</p>
                      <p className="text-xs text-accent/80 font-light line-clamp-2">{track.reason}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              </DriftItem>
            ))}
          </div>
        </section>

      </div>

      {/* Book Reflection Modal */}
      <AnimatePresence>
        {activeBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setActiveBook(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full"
            >
              <GlassCard glow>
                <h3 className="text-2xl font-bold text-accent mb-4">
                  {BOOKS.find(b => b.id === activeBook)?.title}
                </h3>
                <p className="text-white/80 leading-relaxed font-light">
                  {BOOKS.find(b => b.id === activeBook)?.reflection}
                </p>
                <button 
                  onClick={() => setActiveBook(null)}
                  className="mt-8 text-sm text-white/40 hover:text-white transition-colors"
                >
                  [CLOSE LOG]
                </button>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

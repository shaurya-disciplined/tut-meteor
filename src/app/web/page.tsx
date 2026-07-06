"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ShootingStars } from "@/components/ShootingStars";

type NodeT = {
  id: string;
  label: string;
  x: number; // % within the stage
  y: number;
  desc: string;
  link?: string;
  linkText?: string;
};

const NODES: NodeT[] = [
  { id: "mission", label: "The Mission", x: 25, y: 24, desc: "JEE 2027. A strategic, multi-year academic challenge. Executed in absolute silence and invisible from the outside. The anchor that takes absolute priority." },
  { id: "building", label: "Building", x: 75, y: 24, desc: "Systems compilation: AI agents, web architectures, and advanced interactive design. Forging ideas directly into production frameworks under midnight hours." },
  { id: "vibe-link", label: "Vibe Link", x: 16, y: 53, desc: "Groq-integrated chat platform. Shipped from concept to release in 10 days, validating my capacity to learn and deploy new technology stacks rapidly.", link: "https://vibe-link-delta.vercel.app", linkText: "Launch" },
  { id: "frame", label: "The Frame", x: 84, y: 53, desc: "Biological systems optimization. Physical conditioning and strict discipline, maintaining physical output to match cognitive capacity." },
  { id: "frequency", label: "The Frequency", x: 33, y: 80, desc: "Kinetic inputs. High-performance automotive design, deep rainfall, ambient frequencies, and technical dialogues on modular architectures." },
  { id: "long-game", label: "The Long Game", x: 67, y: 80, desc: "Long-term compounding. Focusing on structural leverage and core abilities that scale far beyond short-term milestones." },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ConstellationPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const selectedNode = NODES.find((n) => n.id === selected) || null;
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // mouse parallax
  const cx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const cy = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const sx = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const sy = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const px = e.clientX / window.innerWidth - 0.5;
    const py = e.clientY / window.innerHeight - 0.5;
    cx.set(px * -26);
    cy.set(py * -26);
    sx.set(px * -10);
    sy.set(py * -10);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onClick={() => setSelected(null)}
      className="relative w-full h-[100svh] overflow-hidden"
    >
      {/* darken the page video so the constellation reads */}
      <div className="absolute inset-0 bg-void/55" />
      {/* black hole sunk deep behind the center */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmin] h-[120vmin] bg-center bg-contain bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url(/images/black-hole.jpg)", opacity: 0.1, filter: "grayscale(0.5) contrast(1.05)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 30%, rgba(8,8,10,0.85) 100%)" }}
      />

      {/* starfield + meteors (parallax layer) */}
      <motion.div style={{ x: sx, y: sy }} className="absolute inset-0 pointer-events-none">
        <ShootingStars starCount={46} streaks={2} />
      </motion.div>

      {/* header */}
      <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none px-4 w-full max-w-2xl">
        <div className="eyebrow mb-3">04 · THE CONSTELLATION</div>
        <h1 className="font-display text-fluid-display leading-[0.9] text-text">Everything, connected</h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted mt-3">
          Move to explore · tap a node
        </p>
      </div>

      {/* constellation (parallax layer) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div style={{ x: cx, y: cy }} className="relative w-[min(92vw,880px)] aspect-[3/2]">
          {/* connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {NODES.map((n, i) => {
              const dimmed = selected !== null && selected !== n.id;
              return (
                <g key={n.id}>
                  <line
                    x1="50" y1="50" x2={n.x} y2={n.y}
                    stroke="#B0885A" strokeWidth={1} vectorEffect="non-scaling-stroke"
                    opacity={dimmed ? 0.07 : 0.2}
                  />
                  <motion.line
                    x1="50" y1="50" x2={n.x} y2={n.y}
                    stroke="#B0885A" strokeWidth={1.5} vectorEffect="non-scaling-stroke"
                    strokeDasharray="3 11"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{
                      strokeDashoffset: [0, -28],
                      opacity: selected === n.id ? 0.9 : hoveredNode === n.id ? 0.75 : dimmed ? 0.05 : 0.4,
                    }}
                    transition={{
                      strokeDashoffset: { duration: 2.2 + i * 0.25, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 0.5 },
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* center — the beacon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <span className="relative flex items-center justify-center">
              {[0, 1].map((k) => (
                <motion.span
                  key={k}
                  className="absolute rounded-full border border-signal/40"
                  style={{ width: 56, height: 56 }}
                  animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut", delay: k * 1.7 }}
                />
              ))}
              <span className="w-[68px] h-[68px] rounded-full bg-signal/10 border border-signal/50 backdrop-blur-sm flex items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">Meteor</span>
              </span>
            </span>
          </div>

          {/* satellite nodes */}
          {NODES.map((n, i) => {
            const isSel = selected === n.id;
            const dimmed = selected !== null && !isSel;
            return (
              <motion.button
                key={n.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(isSel ? null : n.id);
                }}
                onMouseEnter={() => setHoveredNode(n.id)}
                onMouseLeave={() => setHoveredNode(null)}
                data-cursor="open"
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group flex flex-col items-center gap-2 focus:outline-none"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: dimmed ? 0.4 : 1, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.35 + i * 0.08 }}
              >
                <span className="relative flex items-center justify-center h-10 w-10">
                  {/* breathing halo: each node inhales on its own slow clock */}
                  {!reducedMotion && (
                    <motion.span
                      className="absolute rounded-full border border-signal/30"
                      style={{ width: 28, height: 28 }}
                      animate={{ scale: [1, 1.45, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 4.6 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                    />
                  )}
                  <span
                    className={`absolute rounded-full border transition-all duration-500 ${
                      isSel ? "w-10 h-10 border-signal" : "w-7 h-7 border-line group-hover:border-signal/60"
                    }`}
                  />
                  <span
                    className={`rounded-full transition-all duration-500 ${
                      isSel ? "w-2.5 h-2.5 bg-signal" : "w-1.5 h-1.5 bg-muted group-hover:bg-signal"
                    }`}
                  />
                </span>
                <span
                  className={`font-mono text-[10px] md:text-[11px] uppercase tracking-widest whitespace-nowrap transition-colors duration-500 ${
                    isSel ? "text-text" : "text-muted group-hover:text-text"
                  }`}
                >
                  {n.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* detail panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="fixed z-[60] left-4 right-4 bottom-6 md:left-auto md:right-10 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-80"
          >
            <div className="rounded-2xl border border-signal/30 bg-surface/85 backdrop-blur-xl p-6 shadow-2xl shadow-black/60">
              <div className="eyebrow text-signal/80 mb-3">In the web</div>
              <h3 className="font-display text-2xl text-text mb-3">{selectedNode.label}</h3>
              <p className="text-sm text-muted font-light leading-relaxed mb-5">{selectedNode.desc}</p>
              {selectedNode.link && (
                <a
                  href={selectedNode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="visit"
                  className="flex items-center justify-center gap-2 rounded-xl border border-signal/40 hover:border-signal text-signal text-xs font-mono uppercase tracking-widest py-3 mb-3 transition-colors"
                >
                  {selectedNode.linkText || "Visit"} <span>↗</span>
                </a>
              )}
              <button
                onClick={() => setSelected(null)}
                className="font-mono text-[10px] text-muted hover:text-text uppercase tracking-widest transition-colors"
              >
                close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

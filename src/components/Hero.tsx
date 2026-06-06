"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useCinematic } from "./CinematicOverlay";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActivated, setIsActivated] = useState(false);
  const { triggerSignal } = useCinematic();

  // 3D Tilt setup for character
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };



  const triggerActivation = () => {
    setIsActivated(true);
    setTimeout(() => setIsActivated(false), 2500); // Reset after animation
  };

  return (
    <section 
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#050505]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >

      {/* The Central Subject (Floating Character) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-20 overflow-hidden">
        <motion.div 
          className="relative w-[90%] md:w-[60%] lg:w-[45%] h-[60vh] md:h-[70vh] lg:h-[80vh] pointer-events-auto cursor-pointer"
          style={{ 
            perspective: "1200px",
            x: "10%", // Slightly off-center
            y: "5%",
            rotate: 2 // Gentle 2 degree tilt
          }}
          onClick={triggerActivation}
          animate={{
            y: ["5%", "2%", "5%"],
            rotate: [2, 1, 2]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Activation Glow */}
          <AnimatePresence>
            {isActivated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.8 }}
                exit={{ opacity: 0, scale: 2.5 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 m-auto w-48 h-48 bg-accent/40 rounded-full blur-[100px] pointer-events-none"
              />
            )}
          </AnimatePresence>

          <motion.div
            style={{ rotateX, rotateY }}
            className="w-full h-full preserve-3d"
          >
            <img 
              src="/hero-character.jpg" 
              alt="Catwoman Builder" 
              className="w-full h-full object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_30px_rgba(212,179,199,0.2)]"
              style={{
                WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 80%)",
                maskImage: "radial-gradient(circle at center, black 50%, transparent 80%)",
              }}
            />
          </motion.div>

          {/* Bursting Bats on Click */}
          <AnimatePresence>
            {isActivated && [...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              return (
                <motion.div
                  key={`burst-bat-${i}`}
                  className="absolute m-auto top-1/2 left-1/2 w-8 h-8 text-accent"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    x: Math.cos(angle) * (200 + Math.random() * 100), 
                    y: Math.sin(angle) * (200 + Math.random() * 100) - 100,
                    scale: [0.5, 1.2, 0.5],
                    rotate: Math.random() * 180 - 90
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 6 4 8 2 12C6 11 8 13 10 15C9 13 11 11 12 11C13 11 15 13 14 15C16 13 18 11 22 12C20 8 16 6 12 2Z" />
                  </svg>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating Text Elements */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Headline Part 1 */}
        <motion.div 
          className="absolute top-[20%] lg:top-[30%] left-[5%] lg:left-[10%] w-full max-w-sm lg:max-w-md pointer-events-auto"
          animate={{ y: [0, -10, 0], rotate: [-1, 0, -1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-2xl">
            If you want a <br/>
            <span className="text-accent drop-shadow-[0_0_20px_rgba(212,179,199,0.5)]">Batman</span>
          </h1>
        </motion.div>

        {/* Headline Part 2 */}
        <motion.div 
          className="absolute top-[35%] lg:top-[48%] left-[10%] lg:left-[15%] w-full max-w-sm lg:max-w-md pointer-events-auto"
          animate={{ y: [0, 15, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white/90 drop-shadow-2xl">
            in your corner.. 🦇
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.div 
          className="absolute bottom-[35%] lg:bottom-[40%] right-[5%] lg:right-[15%] w-[80%] max-w-xs lg:max-w-sm pointer-events-auto text-right"
          animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="p-4 bg-background/20 backdrop-blur-sm rounded-2xl border border-white/5 shadow-2xl">
            <p className="text-lg lg:text-xl font-medium text-heading/90">
              17 • Pune • Builder
            </p>
            <p className="text-sm lg:text-base text-body/70 font-light mt-1">
              who loves dark rainy nights and fast cars.
            </p>
          </div>
        </motion.div>

        {/* Invitation Line */}
        <motion.div 
          className="absolute bottom-[20%] lg:bottom-[25%] left-[8%] lg:left-[20%] w-[85%] max-w-md pointer-events-auto"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <p className="text-base md:text-lg text-body/80 font-light leading-relaxed drop-shadow-lg">
            Message me if the vibe hits.. or if you just want to talk cars, code and <span className="text-accent/80 font-medium">Meteor energy</span>
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="absolute bottom-[10%] lg:bottom-[20%] right-[5%] lg:right-[15%] pointer-events-auto"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <motion.button 
            onClick={() => triggerSignal()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-base lg:text-lg px-8 py-3.5 rounded-2xl bg-[#0a0a0f]/80 backdrop-blur-md border border-white/15 text-[#facc15] font-medium tracking-wide shadow-[0_0_20px_rgba(250,204,21,0.15)] hover:shadow-[0_0_35px_rgba(250,204,21,0.35)] transition-shadow duration-300"
          >
            Activate the Signal
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Info Cards */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <motion.div
          className="absolute top-[60%] lg:top-[65%] left-[5%] lg:left-[10%] pointer-events-auto"
          animate={{ y: [0, -5, 0], rotate: [-2, 1, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="px-5 py-3 rounded-2xl bg-[#0a0a0f]/60 backdrop-blur-xl border border-white/10 text-white/80 text-sm font-medium shadow-2xl">
            [HEIGHT: 6'2"] • [BUILD VIBE]
          </div>
        </motion.div>

        <motion.div
          className="absolute top-[50%] lg:top-[20%] right-[5%] lg:right-[10%] pointer-events-auto"
          animate={{ y: [0, 8, 0], rotate: [1, -1, 1] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        >
          <div className="px-5 py-3 rounded-2xl bg-accent/10 backdrop-blur-xl border border-accent/20 text-accent text-sm font-medium shadow-[0_0_30px_rgba(212,179,199,0.1)]">
            CURRENT FOCUS: [YOUR FOCUS HERE]
          </div>
        </motion.div>
      </div>

      {/* Now Broadcasting Strip */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 lg:gap-8 pointer-events-none z-30 px-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`broadcast-${i}`}
            className="pointer-events-auto px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/5 text-white/50 text-xs tracking-wider uppercase hidden md:block"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          >
            [BROADCAST {i}]
          </motion.div>
        ))}
      </div>
      
    </section>
  );
}

// Floating header + improved CTA button complete

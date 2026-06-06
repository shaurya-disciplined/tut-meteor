"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rain } from "./Rain";

export function BackgroundLayer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch for random bats

  return (
    <div className="fixed inset-0 w-full h-full z-[-10] overflow-hidden pointer-events-none bg-[#050505]">
      {/* Background Videos */}
      <video 
        autoPlay loop muted playsInline 
        className="absolute inset-0 w-full h-full object-cover hidden md:block blur-[10px] scale-110 opacity-60"
      >
        <source src="/bg-desktop-1.mp4" type="video/mp4" />
      </video>
      <video 
        autoPlay loop muted playsInline 
        className="absolute inset-0 w-full h-full object-cover block md:hidden blur-[10px] scale-110 opacity-60"
      >
        <source src="/bg-mobile-1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505] z-10"></div>

      {/* Far Background Rain (Soft & Slow) */}
      <Rain dropCount={40} baseOpacity={0.3} speedMultiplier={0.5} sharpness="soft" className="z-10" />

      {/* Foreground Rain (Sharp & Fast) */}
      <Rain dropCount={40} baseOpacity={0.8} speedMultiplier={1.5} sharpness="sharp" className="z-40" />

      {/* Floating Bats Layer (Deep) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => {
          const size = 16 + Math.random() * 24;
          return (
            <motion.div
              key={`global-bat-${i}`}
              className="absolute text-accent/50"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
              }}
              animate={{
                y: [0, -30 + Math.random() * -20, 0],
                x: [0, 20 + Math.random() * 40, -10, 0],
                rotate: [0, -10, 15, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4
              }}
            >
              <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 6 4 8 2 12C6 11 8 13 10 15C9 13 11 11 12 11C13 11 15 13 14 15C16 13 18 11 22 12C20 8 16 6 12 2Z" />
              </svg>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

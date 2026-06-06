"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface CinematicContextType {
  triggerSignal: (targetPath?: string) => void;
}

const CinematicContext = createContext<CinematicContextType>({ triggerSignal: () => {} });

export const useCinematic = () => useContext(CinematicContext);

export function CinematicOverlay({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [typedText, setTypedText] = useState("");
  const router = useRouter();

  const fullText = "THE SIGNAL IS ACTIVE...";

  const triggerSignal = (targetPath?: string) => {
    setIsActive(true);
    setTypedText("");
    
    // Typewriter effect
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 100);

    // End sequence
    setTimeout(() => {
      if (targetPath) {
        router.push(targetPath);
      }
      setIsActive(false);
      setTypedText("");
    }, 4000);
  };

  return (
    <CinematicContext.Provider value={{ triggerSignal }}>
      {children}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black/90 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Red Overlay Tint */}
            <div className="absolute inset-0 bg-red-900/20 mix-blend-color-burn" />

            {/* Glowing Bat-Signal Beam (from bottom) */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: [0, 0.8, 0.4] }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute bottom-0 w-32 md:w-64 bg-gradient-to-t from-[#facc15]/40 via-[#facc15]/10 to-transparent blur-[40px] mix-blend-screen"
            />
            
            {/* Typewriter Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 text-[#facc15] font-mono tracking-[8px] text-xl md:text-3xl font-bold uppercase drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]"
            >
              {typedText}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </CinematicContext.Provider>
  );
}

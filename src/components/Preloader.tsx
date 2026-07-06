"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Ignition Load — Phase 3
 * The intro reads like a cold start instead of a plain fade. 
 * A single needle sweep, a violent flicker, then the wordmark catches and holds.
 */
const SESSION_KEY = "meteor-ignition-1";

export function Preloader() {
  const [show, setShow] = useState(false);
  const [igniting, setIgniting] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    // Ignition sequence timing
    const flickerTimer = setTimeout(() => {
      setIgniting(false);
    }, 1800);

    const finishTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShow(false);
      document.body.style.overflow = "";
    }, 2800);

    return () => {
      clearTimeout(flickerTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center overflow-hidden"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
        >
          {/* The Cold Start Tachometer Needle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150px] w-64 h-64 pointer-events-none opacity-20">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 4"
                className="text-signal"
              />
              <motion.line
                x1="50"
                y1="50"
                x2="15"
                y2="25"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-signal drop-shadow-[0_0_8px_rgba(176,136,90,0.8)]"
                initial={{ rotate: -40, transformOrigin: "50px 50px" }}
                animate={{ rotate: [ -40, 60, 45, 50, 48 ] }}
                transition={{ duration: 1.6, ease: "backOut", times: [0, 0.3, 0.6, 0.8, 1] }}
              />
            </svg>
          </div>

          <div className="relative flex flex-col items-center z-10">
            {/* Flickering Wordmark */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={
                igniting
                  ? { 
                      opacity: [0, 1, 0, 1, 0.3, 1], 
                      filter: ["blur(4px)", "blur(0px)", "blur(2px)", "blur(0px)", "blur(1px)", "blur(0px)"]
                    }
                  : { opacity: 1, letterSpacing: "0.2em", filter: "blur(0px)" }
              }
              transition={
                igniting
                  ? { duration: 1.8, times: [0, 0.1, 0.2, 0.3, 0.5, 1], ease: "linear" }
                  : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }
              className="font-display text-5xl md:text-7xl text-text tracking-[0.2em] uppercase"
              style={{ textShadow: igniting ? "0 0 20px rgba(255,255,255,0.4)" : "none" }}
            >
              Meteor
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8, ease: "circOut" }}
            className="absolute top-[55%] w-px h-32 bg-gradient-to-b from-signal/0 via-signal to-signal/0" 
          />

          <div className="absolute bottom-8 left-8 flex items-center gap-4">
            <motion.div 
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.49, 0.5, 1], ease: "linear" }}
              className="w-2 h-2 rounded-full bg-signal"
            />
            <span className="eyebrow uppercase tracking-widest text-signal/50">Ignition sequence</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

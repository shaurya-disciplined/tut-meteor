"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function NotFound() {
  return (
    <div className="relative w-full min-h-[100svh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* faint static ring, like a tuner that found nothing */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] rounded-full border border-line pointer-events-none"
        animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.25, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="eyebrow mb-6 flex items-center gap-3 text-signal/80">
          <span className="inline-block w-8 h-px bg-signal/40" />
          404 · DEAD AIR
          <span className="inline-block w-8 h-px bg-signal/40" />
        </div>

        <h1 className="font-display text-fluid-display leading-[0.95] text-text max-w-3xl">
          Nothing broadcasts here.
        </h1>

        <p className="mt-6 max-w-md text-fluid-body text-muted font-light leading-relaxed">
          You tuned a frequency that carries only static. The signal lives somewhere else.
        </p>

        <div className="mt-12">
          <Magnetic>
            <Link
              href="/"
              data-cursor="home"
              className="inline-flex items-center gap-3 border border-line hover:border-signal/50 bg-surface/40 backdrop-blur-md rounded-full px-8 py-4 text-sm text-text hover:text-signal transition-all duration-500"
            >
              Back to the signal
              <span className="text-signal">→</span>
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </div>
  );
}

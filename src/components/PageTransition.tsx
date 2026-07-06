"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Curtain-wipe page transition. A void-black panel drops to cover the outgoing
 * page, then lifts to reveal the incoming one. Each route carries its own
 * signature image, ghosted into the black at low opacity.
 */

type Curtain = { img: string; opacity: number };

// opacity tuned per image — darker shots need a stronger ghost to register
const CURTAIN: Record<string, Curtain> = {
  "/": { img: "/transitions/home.jpg", opacity: 0.16 },
  "/story": { img: "/transitions/story.jpg", opacity: 0.32 },
  "/arsenal": { img: "/transitions/arsenal.jpg", opacity: 0.16 },
  "/library": { img: "/transitions/library.jpg", opacity: 0.16 },
  "/signal": { img: "/transitions/signal.jpg", opacity: 0.22 },
  "/codex": { img: "/transitions/codex.jpg", opacity: 0.16 },
  "/web": { img: "/transitions/web.jpg", opacity: 0.16 },
  "/midnight": { img: "/transitions/midnight.jpg", opacity: 0.18 },
};

function curtainFor(path: string): Curtain {
  if (path.startsWith("/library")) return CURTAIN["/library"];
  return CURTAIN[path] ?? CURTAIN["/"];
}


/**
 * Next.js App Router swaps the children prop immediately on route change.
 * This component freezes the outgoing page content so you don't see a glitchy
 * flash of the new page before the curtain finishes dropping.
 */
function FreezeWhenExiting({ children }: { children: React.ReactNode }) {
  const isPresent = useIsPresent();
  const childrenRef = useRef(children);

  if (isPresent) {
    childrenRef.current = children;
  }

  return <>{childrenRef.current}</>;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const curtain = curtainFor(pathname);

  // A gear shift left-to-right wipe.
  // exit: covers screen from left to right
  // initial -> animate: reveals screen from left to right
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="w-full min-h-screen flex flex-col flex-grow">
        {/* Shutter / Gear Shift */}
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none bg-void overflow-hidden"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 100%)" }}
          exit={{ clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"] }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ghosted signature image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${curtain.img})`,
              opacity: curtain.opacity,
              filter: "grayscale(1) contrast(1.05) brightness(0.85)",
            }}
          />
          {/* vignette so edges sink into the void */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 50%, transparent 35%, rgba(8,8,10,0.9) 100%)",
            }}
          />
          
          {/* Motorway Lamp Streaks */}
          <motion.div
            className="absolute top-[30%] left-0 w-[150%] h-1 bg-signal/80 blur-sm"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ x: ["-100%", "100%"] }}
            transition={{ duration: 0.4, ease: "linear" }}
          />
          <motion.div
            className="absolute top-[60%] left-0 w-full h-[2px] bg-white/50 blur-[2px]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ x: ["-100%", "100%"] }}
            transition={{ duration: 0.35, delay: 0.05, ease: "linear" }}
          />
          <motion.div
            className="absolute top-[80%] left-0 w-[200%] h-1 bg-signal/40 blur-md"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ x: ["-100%", "100%"] }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="w-full flex flex-col flex-grow"
          initial={{ opacity: 0, filter: "blur(8px)", x: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <FreezeWhenExiting>{children}</FreezeWhenExiting>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

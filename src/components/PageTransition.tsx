"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Curtain-wipe page transition. A void-black panel drops to cover the outgoing
 * page, then lifts to reveal the incoming one. Each route carries its own
 * signature image, ghosted into the black at low opacity, so navigating the
 * site flashes a different statue / nightscape each time. A bronze hairline
 * rides the panel edge; the incoming page fades in with a subtle blur.
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

const COVER = "inset(0% 0% 0% 0%)";
const LIFTED = "inset(0% 0% 100% 0%)";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const curtain = curtainFor(pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="w-full min-h-screen flex flex-col flex-grow">
        {/* Curtain */}
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none bg-void overflow-hidden"
          initial={{ clipPath: COVER }}
          animate={{ clipPath: LIFTED }}
          exit={{ clipPath: COVER }}
          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
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
          {/* bronze edge */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-signal/40" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="w-full flex flex-col flex-grow"
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

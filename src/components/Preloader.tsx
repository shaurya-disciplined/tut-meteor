"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cinematic first-paint sequence, shown once per browser session.
 * A bronze counter ticks 000 -> 100 while the wordmark resolves, then the
 * whole panel wipes upward to reveal the site.
 *
 * The session flag is only written when the run COMPLETES (not at the start),
 * so React's dev double-invoke of effects can't leave the counter frozen at 0.
 * A safety timer force-finishes if requestAnimationFrame is throttled
 * (e.g. the site was opened in a background tab).
 */
const SESSION_KEY = "meteor-intro-2";

export function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const dur = 1900;
    const start = performance.now();
    let raf = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setCount(100);
      window.setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
      }, 400);
    };

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    // safety net: if rAF is throttled/stalled, force the sequence to complete
    const safety = window.setTimeout(finish, dur + 1500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-void flex items-center justify-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl text-text"
            >
              METEOR
            </motion.div>
            <div className="mt-6 h-px w-40 bg-line overflow-hidden">
              <motion.div className="h-full bg-signal" style={{ width: `${count}%` }} />
            </div>
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-xs text-muted tabular-nums">
            {String(count).padStart(3, "0")}
          </div>
          <div className="absolute bottom-8 left-8 eyebrow">tut.meteor · signal booting</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

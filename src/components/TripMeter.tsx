"use client";

import React, { useEffect, useState } from "react";

/**
 * A quiet trip-meter in the corner that counts how far you have travelled down
 * the page, the way an odometer clocks distance. Accumulates absolute scroll so
 * it only ever climbs.
 */
export function TripMeter() {
  const [dist, setDist] = useState(0);

  useEffect(() => {
    let last = window.scrollY;
    let acc = 0;
    let pending = false;
    let raf = 0;

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        acc += Math.abs(y - last);
        last = y;
        setDist(acc);
        pending = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const miles = (dist * 0.0003).toFixed(1);
  const parts = miles.split("."); // [whole, decimal]
  const whole = parts[0].padStart(4, "0");
  const decimal = parts[1];

  return (
    <div
      aria-hidden
      className="fixed bottom-6 right-6 md:bottom-8 md:right-10 z-[70] hidden md:flex items-center gap-3 pointer-events-none select-none mix-blend-difference"
    >
      <div className="flex flex-col items-end gap-1">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-signal/50">Odometer</span>
        
        <div className="flex items-center bg-void/80 border border-line/20 rounded-sm overflow-hidden px-1 py-0.5 backdrop-blur-md">
          {/* Mechanical rolling digits look */}
          <div className="flex space-x-[1px] bg-line/20 p-[1px]">
            {whole.split("").map((digit, i) => (
              <div key={i} className="bg-void w-4 h-5 flex items-center justify-center shadow-inner">
                <span className="font-mono text-[10px] text-text font-medium">{digit}</span>
              </div>
            ))}
            {/* The decimal is usually a different color on mechanical odometers */}
            <div className="bg-signal/90 w-4 h-5 flex items-center justify-center shadow-inner text-void">
              <span className="font-mono text-[10px] font-bold">{decimal}</span>
            </div>
          </div>
          <span className="font-mono text-[8px] text-muted ml-2 mr-1">MI</span>
        </div>
      </div>
    </div>
  );
}

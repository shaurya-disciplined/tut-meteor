"use client";

import React, { useEffect, useState } from "react";

interface RainProps {
  dropCount?: number;
  className?: string;
  baseOpacity?: number;
  speedMultiplier?: number;
  sharpness?: "soft" | "sharp" | "normal";
}

export function Rain({ 
  dropCount = 50, 
  className = "z-0", 
  baseOpacity = 1,
  speedMultiplier = 1,
  sharpness = "normal"
}: RainProps) {
  const [drops, setDrops] = useState<{ id: number; left: number; delay: number; duration: number; opacity: number }[]>([]);

  useEffect(() => {
    // Generate static rain drops on the client side to avoid hydration mismatch
    const newDrops = Array.from({ length: dropCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random x position (vw)
      delay: Math.random() * 5, // random start delay
      duration: (Math.random() * 1 + 0.8) / speedMultiplier, // adjusted fall duration
      opacity: (Math.random() * 0.4 + 0.1) * baseOpacity, // random opacity
      height: sharpness === "sharp" ? 80 + Math.random() * 40 : sharpness === "soft" ? 40 + Math.random() * 20 : 60,
      width: sharpness === "sharp" ? 1.5 : sharpness === "soft" ? 0.5 : 1,
    }));
    setDrops(newDrops);
  }, [dropCount, baseOpacity, speedMultiplier, sharpness]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
            opacity: drop.opacity,
            height: `${drop.height}px`,
            width: `${drop.width}px`,
            filter: sharpness === "soft" ? "blur(1px)" : "none",
          }}
        />
      ))}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Rain } from "./Rain";

/**
 * Fixed cinematic backdrop: a heavily graded looping video (desaturated,
 * darkened, vignetted) with a whisper of rain over it.
 *
 * Swap the vibe by changing BG_VIDEO. Alternates already in /public:
 *   /bg-street-moody.mp4        — moody wet street w/ reflections (default)
 *   /bg-street-reflections.mp4  — brighter rainy street reflections
 *   /bg-night-drive.mp4         — POV night drive, city lights (more motion)
 * object-cover crops the landscape clip cleanly on mobile, so one file serves
 * every breakpoint.
 */
const BG_VIDEO = "/bg-street-moody.mp4";

export function BackgroundLayer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[-10] overflow-hidden pointer-events-none bg-void">
      {/* Graded video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        style={{ filter: "grayscale(0.6) brightness(0.5) contrast(1.05)" }}
      >
        <source src={BG_VIDEO} type="video/mp4" />
      </video>

      {/* Cinematic grade: vignette + top/bottom crush toward pure void */}
      <div className="absolute inset-0 bg-void/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 30%, rgba(8,8,10,0.85) 100%)",
        }}
      />

      {/* Whisper of rain */}
      {mounted && (
        <>
          <Rain dropCount={30} baseOpacity={0.18} speedMultiplier={0.6} sharpness="soft" className="z-10" />
          <Rain dropCount={24} baseOpacity={0.4} speedMultiplier={1.4} sharpness="sharp" className="z-10" />
        </>
      )}
    </div>
  );
}

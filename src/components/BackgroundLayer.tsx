"use client";

import React, { useEffect, useState } from "react";
import { Rain } from "./Rain";

/**
 * Atmosphere layer that sits over the bespoke WebGL smoke shader (WebGLCanvas).
 * The smoke is now the real backdrop, so this layer stays transparent and only
 * adds a cinematic vignette plus a whisper of rain. No opaque fill, or it would
 * hide the smoke underneath it.
 */
export function BackgroundLayer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[-10] overflow-hidden pointer-events-none">
      {/* top and bottom crush toward pure void for a letterboxed, cinematic frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      {/* soft vignette, transparent through the center so the smoke reads */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 45%, rgba(8,8,10,0.72) 100%)",
        }}
      />

      {/* Whisper of rain over the smoke */}
      {mounted && (
        <>
          <Rain dropCount={30} baseOpacity={0.18} speedMultiplier={0.6} sharpness="soft" className="z-10" />
          <Rain dropCount={24} baseOpacity={0.4} speedMultiplier={1.4} sharpness="sharp" className="z-10" />
        </>
      )}
    </div>
  );
}

"use client";

import React from "react";

/**
 * Fixed film-grain overlay using an inline SVG feTurbulence pattern.
 * Sits above content (z-90), below the cursor, and never intercepts input.
 * Subtle animated jitter gives it a filmic, alive quality.
 */
export function Grain() {
  return (
    <div className="grain-overlay animate-grain" aria-hidden>
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

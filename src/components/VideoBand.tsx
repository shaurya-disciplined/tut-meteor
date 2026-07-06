"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Full-bleed cinematic video band, graded like the site background
 * (desaturated, darkened, vignetted, edges fading into the void).
 * Reduced-motion falls back to a still graded frame via the `poster`.
 * Optional children render centered on top.
 */
export function VideoBand({
  src,
  poster,
  className = "",
  heightClass = "h-[55vh] md:h-[75vh]",
  grade = "grayscale(0.7) brightness(0.5) contrast(1.05)",
  children,
}: {
  src: string;
  poster?: string;
  className?: string;
  heightClass?: string;
  grade?: string;
  children?: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <section className={`relative w-full overflow-hidden ${heightClass} ${className}`}>
      {reduced ? (
        poster && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})`, filter: grade }}
          />
        )
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: grade }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* grade: soft dark wash + top/bottom fade into the void + vignette */}
      <div className="absolute inset-0 bg-void/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% 50%, transparent 45%, rgba(8,8,10,0.7) 100%)" }}
      />

      {children && <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">{children}</div>}
    </section>
  );
}

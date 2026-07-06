"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, SplitText } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { VideoBand } from "@/components/VideoBand";
import { ShootingStars } from "@/components/ShootingStars";

const CARS = [
  { src: "/images/pagani-topdown.jpg", name: "Pagani Huayra", note: "Art you can hear coming.", pos: "center" },
  { src: "/images/car-bugatti-dark.jpg", name: "Bugatti Chiron", note: "Quiet menace, folded in black.", pos: "center 60%" },
  { src: "/images/zonda-studio.jpg", name: "Pagani Zonda", note: "Carbon fiber poetry. The masterpiece.", pos: "center" },
];

export default function MidnightPage() {
  return (
    <div className="relative w-full flex flex-col bg-void">
      {/* ---------- HERO ---------- */}
      <VideoBand src="/videos/night-race.mp4" heightClass="h-[92svh]" grade="grayscale(0.55) brightness(0.55) contrast(1.08)">
        <Reveal>
          <div className="eyebrow mb-6 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-signal" /> 05 · MIDNIGHT
          </div>
        </Reveal>
        <h1 className="font-display text-fluid-display leading-[0.85] text-text">
          <SplitText text="Midnight" />
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            The other frequency
          </p>
        </Reveal>
      </VideoBand>
 
      {/* ---------- STATEMENT ---------- */}
      <section className="relative overflow-hidden px-6 lg:px-12 py-32 md:py-44">
        <ShootingStars starCount={30} streaks={1} className="opacity-70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-display text-fluid-display leading-[1.15] text-muted font-light">
            <span className="text-text">When the compile is clean</span> and the city finally fades out, the mechanics of raw speed take over.
          </p>
          <Reveal delay={0.2} className="mt-10 max-w-xl">
            <p className="text-fluid-subtitle text-muted font-light leading-relaxed">
              Vehicles of pure kinetic intent. Masterpieces engineered for singular performance.. where raw speed serves as absolute structural honesty. These designs map the trajectory; they delineate where we are headed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- CAR FEATURES ---------- */}
      <section className="px-6 lg:px-12 pb-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-10">
          {CARS.map((car, i) => (
            <Reveal key={car.name} y={30}>
              <div className="group relative overflow-hidden rounded-sm ring-1 ring-line">
                <div
                  className="aspect-[16/10] md:aspect-[21/9] bg-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url(${car.src})`, backgroundPosition: car.pos, filter: "brightness(0.82) contrast(1.05)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-signal/80 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl text-text">{car.name}</h2>
                  <p className="mt-2 text-sm md:text-base text-muted font-light">{car.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CLOSING ---------- */}
      <section className="px-6 lg:px-12 pt-16">
        <div className="max-w-6xl mx-auto">
          <VideoBand src="/videos/rain-window.mp4" heightClass="h-[48vh] md:h-[64vh]" className="rounded-sm ring-1 ring-line">
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic text-2xl md:text-4xl text-text"
            >
              Then the rain comes, and it&apos;s back to work.
            </motion.p>
          </VideoBand>
        </div>
      </section>

      <div className="py-10" />
      <Footer />
    </div>
  );
}

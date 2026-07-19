import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOSSIER_FILES } from "@/data/dossier";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";

export async function generateStaticParams() {
  return DOSSIER_FILES.map((file) => ({
    slug: file.slug,
  }));
}

export default function DossierFilePage({ params }: { params: { slug: string } }) {
  const file = DOSSIER_FILES.find((f) => f.slug === params.slug);
  if (!file) notFound();

  return (
    <div className="relative w-full flex flex-col min-h-screen bg-void pt-28 pb-12">
      <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 flex-grow">
        
        {/* Top HUD */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 mb-10 font-mono text-[10px] uppercase tracking-widest text-muted">
          <Link href="/dossier" className="text-signal hover:text-white transition-colors">
            ← Back to Dossier
          </Link>
          <span className="text-signal bg-signal/10 px-2 py-1 rounded animate-pulse">
            CLASSIFICATION: {file.classification}
          </span>
        </div>

        <Reveal>
          <div className="flex flex-col gap-8">
            <header>
              <h1 className="font-display text-5xl md:text-7xl text-text leading-none uppercase">
                <ScrambleText text={file.title} delay={0.2} speed={0.4} />
              </h1>
            </header>

            <div className="relative aspect-[2.39/1] w-full rounded-lg overflow-hidden border border-line">
              <Image
                src={file.image}
                alt={file.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover grayscale contrast-125 brightness-[0.6]"
              />
              <div className="absolute inset-0 bg-signal/10 mix-blend-overlay" />
            </div>

            <div className="border border-line rounded p-6 sm:p-8 bg-surface/30 backdrop-blur-sm relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-signal/30 to-transparent" />
              <div className="flex flex-col gap-6">
                {file.body.split('\\n\\n').map((paragraph, idx) => (
                  <p key={idx} className="font-sans font-light text-lg text-text/90 leading-relaxed">
                    <ScrambleText text={paragraph} delay={0.8 + (idx * 0.15)} speed={1} />
                  </p>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-line">
              <span className="font-mono text-[10px] text-signal uppercase tracking-widest border border-signal/30 px-3 py-1 rounded">
                [ LOG ENTRY CLOSED ]
              </span>
            </div>
          </div>
        </Reveal>

      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}

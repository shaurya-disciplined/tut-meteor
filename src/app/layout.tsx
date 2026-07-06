import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { Headlight } from "@/components/Headlight";
import { TripMeter } from "@/components/TripMeter";
import { Grain } from "@/components/Grain";
import { Navbar } from "@/components/Navbar";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { PageTransition } from "@/components/PageTransition";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

import { WebGLCanvasManager } from "@/components/WebGLCanvas";

export const metadata: Metadata = {
  title: "tut.meteor",
  description: "A builder who works while the city sleeps. Cars, code, and dark rainy nights.",
  authors: [{ name: "Shauryavardhan Mhetre" }],
  openGraph: {
    title: "tut.meteor",
    description: "A builder who works while the city sleeps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-void text-text antialiased min-h-screen flex flex-col cursor-hidden">
        <SmoothScroll>
          <Preloader />
          <BackgroundLayer />
          <Grain />
          <Cursor />
          <Headlight />
          <TripMeter />
          <WebGLCanvasManager>
            <Navbar />
            <PageTransition>
              <main className="flex-grow w-full flex flex-col relative z-20">
                {children}
              </main>
            </PageTransition>
          </WebGLCanvasManager>
        </SmoothScroll>
      </body>
    </html>
  );
}

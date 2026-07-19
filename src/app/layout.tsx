import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope, JetBrains_Mono } from "next/font/google";
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

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

import { WebGLCanvasManager } from "@/components/WebGLCanvas";

// Tints the phone browser chrome (address bar, status area) to the void, so
// the site reads edge to edge on mobile instead of sitting in a white frame.
export const viewport: Viewport = {
  themeColor: "#08080A",
};

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

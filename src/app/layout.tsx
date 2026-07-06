import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { Grain } from "@/components/Grain";
import { Navbar } from "@/components/Navbar";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { PageTransition } from "@/components/PageTransition";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: false,
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
          <Navbar />
          <PageTransition>
            <main className="flex-grow w-full flex flex-col relative z-20">
              {children}
            </main>
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}

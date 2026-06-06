import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { CinematicOverlay } from "@/components/CinematicOverlay";
import { PageTransition } from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const headingFont = Inter({ subsets: ["latin"], variable: "--font-heading", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  title: "tut.meteor | Shauryavardhan",
  description: "Dark rainy nights • fast cars • late-night builds. If you want a Batman in your corner… message me 🦇🌧️",
  openGraph: {
    title: "tut.meteor | Shauryavardhan",
    description: "Dark rainy nights • fast cars • late-night builds. If you want a Batman in your corner… message me 🦇🌧️",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${headingFont.variable} bg-background text-body antialiased min-h-screen flex flex-col`}>
        <CinematicOverlay>
          <BackgroundLayer />
          <Navbar />
          <PageTransition>
            <main className="flex-grow w-full flex flex-col relative z-20">
              {children}
            </main>
          </PageTransition>
        </CinematicOverlay>
      </body>
    </html>
  );
}

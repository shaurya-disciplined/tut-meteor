import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NOCTURNE palette — near-monochrome, one restrained metallic accent, no neon.
        void: "#08080A",
        surface: "#101013",
        line: "rgba(255,255,255,0.08)",
        text: "#EAEAEC",
        muted: "#7C7C85",
        signal: "#B0885A", // matte bronze/ember — the single accent
        steel: "#8FA3AE", // cold rain highlight, whisper only

        // legacy aliases kept so nothing breaks mid-migration
        background: "#08080A",
        heading: "#EAEAEC",
        body: "#EAEAEC",
        accent: "#B0885A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16,1,0.3,1)",
        wipe: "cubic-bezier(0.83,0,0.17,1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-10%)" },
          "30%": { transform: "translate(3%,-15%)" },
          "50%": { transform: "translate(-8%,5%)" },
          "70%": { transform: "translate(6%,10%)" },
          "90%": { transform: "translate(-3%,8%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        grain: "grain 0.6s steps(2) infinite",
      },
    },
  },
  plugins: [],
};
export default config;

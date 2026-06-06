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
        background: "#050505",
        secondary: "#0a0f1a",
        accent: "#d4b3c7", // soft dusty plum/mauve to match the new image
        highlight: "#67e8f9",
        heading: "#f8fafc",
        body: "#e2e8f0",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-heading)"],
      },
    },
  },
  plugins: [],
};
export default config;

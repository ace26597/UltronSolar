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
        solar: {
          yellow: "#FFD700",
          gold: "#FFA500",
          orange: "#FF8C00",
        },
        navy: {
          DEFAULT: "#1a237e",
          dark: "#0d1b2a",
          light: "#2d3a5f",
        },
        eco: {
          green: "#22c55e",
          dark: "#16a34a",
          light: "#4ade80",
        },
      },
    },
  },
  plugins: [],
};
export default config;


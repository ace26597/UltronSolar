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
          red: "#DC2626",
          "red-dark": "#B91C1C",
          "red-light": "#EF4444",
        },
        energy: {
          green: "#22c55e",
          "green-dark": "#16a34a",
          "green-light": "#4ade80",
        },
        primary: {
          blue: "#2563EB",
          "blue-dark": "#1E40AF",
          "blue-light": "#3B82F6",
        },
        navy: {
          DEFAULT: "#1e3a8a",
          dark: "#1e293b",
          light: "#334155",
        },
      },
    },
  },
  plugins: [],
};
export default config;


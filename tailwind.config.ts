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
          green: "#15803d", // Darker green for better contrast with white text (WCAG AA compliant)
          "green-dark": "#166534", // Even darker for hover state
          "green-light": "#22c55e", // Lighter green for accents only
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


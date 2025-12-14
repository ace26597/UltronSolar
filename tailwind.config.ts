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
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          red: "#DC2626",
          "red-dark": "#B91C1C",
          "red-light": "#EF4444",
        },
        eco: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        energy: {
          green: "#15803d",
          "green-dark": "#166534",
          "green-light": "#22c55e",
        },
        primary: {
          blue: "#2563EB",
          "blue-dark": "#1E40AF",
          "blue-light": "#3B82F6",
          "blue-50": "#EFF6FF",
          "blue-100": "#DBEAFE",
        },
        navy: {
          DEFAULT: "#1e3a8a",
          dark: "#1e293b",
          light: "#334155",
          600: "#1e40af",
          700: "#1e3a8a",
          800: "#1e3057",
        },
        neutral: {
          grey: "#6B7280",
          light: "#F3F4F6",
          dark: "#374151",
        },
      },
      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.5rem" }],
        h2: ["1.875rem", { lineHeight: "2.25rem" }],
        h3: ["1.5rem", { lineHeight: "2rem" }],
        h4: ["1.25rem", { lineHeight: "1.75rem" }],
        body: ["1rem", { lineHeight: "1.5rem" }],
        small: ["0.875rem", { lineHeight: "1.25rem" }],
      },
    },
  },
  plugins: [],
};
export default config;


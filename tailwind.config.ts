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
        // Futuristic Theme Colors
        futuristic: {
          "bg-primary": "#0B1120", // Deep Space Blue/Black
          "bg-secondary": "#151E32", // Lighter Slate for cards/sections
          "accent-primary": "#00F0FF", // Neon Cyan/Electric Blue
          "accent-secondary": "#FF4D00", // Magma Orange - CTAs
          "text-main": "#E2E8F0", // Off-white/Silver
          "text-muted": "#94A3B8", // Blue-grey
        },
        // Keep legacy colors for backward compatibility
        solar: {
          red: "#DC2626",
          "red-dark": "#B91C1C",
          "red-light": "#EF4444",
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
        },
        navy: {
          DEFAULT: "#1e3a8a",
          dark: "#1e293b",
          light: "#334155",
        },
        neutral: {
          grey: "#6B7280",
          light: "#F3F4F6",
          dark: "#374151",
        },
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.5rem" }],
        h2: ["1.875rem", { lineHeight: "2.25rem" }],
        h3: ["1.5rem", { lineHeight: "2rem" }],
        h4: ["1.25rem", { lineHeight: "1.75rem" }],
        body: ["1rem", { lineHeight: "1.5rem" }],
        small: ["0.875rem", { lineHeight: "1.25rem" }],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-down": "fade-in-down 0.6s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 5px rgba(0, 240, 255, 0.5), 0 0 10px rgba(0, 240, 255, 0.3)",
          },
          "50%": {
            "box-shadow": "0 0 20px rgba(0, 240, 255, 0.8), 0 0 30px rgba(0, 240, 255, 0.5)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;


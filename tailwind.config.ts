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
          orange: "#FF9933",
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#FF9933", // Primary Brand Orange
          600: "#EA580C",
          700: "#C2410C",
          red: "#DC2626",
          "red-dark": "#B91C1C",
          "red-light": "#EF4444",
        },
        navy: {
          DEFAULT: "#003366", // Primary Brand Navy
          dark: "#001F3F",
          light: "#004080",
          50: "#F0F5FA",
          100: "#E1EBF5",
          200: "#C3D7EB",
          600: "#003366",
          700: "#002B57",
          800: "#002447",
        },
        brand: {
          bg: "#F9F9F9",
          text: "#1E293B",
        },
        eco: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
      },
      fontFamily: {
        sans: ["Open Sans", "Inter", "sans-serif"],
        heading: ["Montserrat", "Poppins", "sans-serif"],
      },
      fontSize: {
        h1: ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.5", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};
export default config;


import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        mist: "#f8fafc",
        clay: "#fff8ef",
        sand: "#f4ede1",
        accent: "#0f766e",
        coral: "#f97316",
        gold: "#f59e0b"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(249, 115, 22, 0.22), transparent 35%), radial-gradient(circle at bottom right, rgba(15, 118, 110, 0.18), transparent 42%)"
      },
      maxWidth: {
        prose: "72ch"
      }
    }
  },
  plugins: []
};

export default config;

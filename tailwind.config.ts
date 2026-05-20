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
        // Jadra design system
        bg: {
          primary: "#0D0F14",
          surface: "#151820",
          card: "#1E2230",
          elevated: "#252A3A",
        },
        brand: {
          coral: "#FF6B4A",
          "coral-light": "#FF8A70",
          "coral-dark": "#E55A39",
          teal: "#00D4B8",
          "teal-light": "#33DECA",
          "teal-dark": "#00B89E",
          gold: "#FFD166",
          "gold-light": "#FFE08A",
          "gold-dark": "#F0BC4A",
          green: "#06FFA5",
          "green-dark": "#04CC84",
          red: "#FF4E6A",
          "red-dark": "#E63E58",
          purple: "#A855F7",
        },
        text: {
          primary: "#F0F2F8",
          secondary: "#8892A4",
          muted: "#4A5568",
          accent: "#FF6B4A",
        },
        border: {
          default: "rgba(255,255,255,0.08)",
          subtle: "rgba(255,255,255,0.04)",
          accent: "rgba(255,107,74,0.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255,107,74,0.25)",
        "glow-teal": "0 0 20px rgba(0,212,184,0.25)",
        "glow-gold": "0 0 20px rgba(255,209,102,0.25)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.4)",
        inner: "inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "gradient-coral": "linear-gradient(135deg, #FF6B4A 0%, #FF4E6A 100%)",
        "gradient-teal": "linear-gradient(135deg, #00D4B8 0%, #00B89E 100%)",
        "gradient-gold": "linear-gradient(135deg, #FFD166 0%, #F0BC4A 100%)",
        "gradient-surface":
          "linear-gradient(180deg, #1E2230 0%, #151820 100%)",
        "gradient-card":
          "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)",
        "gradient-xp":
          "linear-gradient(90deg, #FF6B4A 0%, #FF4E6A 50%, #A855F7 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "bounce-subtle": "bounce-subtle 1s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 0.5s ease-in-out",
        "scale-up": "scale-up 0.2s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-10deg)" },
          "75%": { transform: "rotate(10deg)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.95)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-top": "env(safe-area-inset-top)",
      },
    },
  },
  plugins: [],
};

export default config;

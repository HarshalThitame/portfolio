import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#04050a",
        pearl: "#f8fbff",
        frost: "#c8d7ff",
        cyanflare: "#61f4ff",
        violetflare: "#8b5cf6",
        rosegold: "#ffb2c7",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "Inter", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space)", "var(--font-geist)", "ui-sans-serif"],
      },
      boxShadow: {
        aura: "0 0 90px rgba(97, 244, 255, 0.22)",
        "aura-strong": "0 0 120px rgba(139, 92, 246, 0.3)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

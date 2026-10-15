import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sampled from the logo: navy #1B2A53 (900), red #A80019 (crimson-600).
        navy: {
          50: "#EEF1F8",
          100: "#D9DFEE",
          200: "#B3BDD8",
          300: "#8A99BF",
          600: "#2F4487",
          700: "#25376C",
          800: "#1F2F5C",
          900: "#1B2A53",
          950: "#121B3A",
        },
        // 600 = logo red (text/accents on light). 500 = buttons. 400/300 = accents on dark.
        crimson: {
          300: "#FFA3B0",
          400: "#FF5C72",
          500: "#C8102E",
          600: "#A80019",
          700: "#860015",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};
export default config;

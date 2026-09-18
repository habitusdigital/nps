import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vale: {
          charcoal: "#3E4C51",
          charcoalDark: "#2C373B",
          charcoalDeep: "#212A2D",
          sage: "#9BB093",
          sageLight: "#C4D4BD",
          sageDark: "#7C9574",
          cream: "#F8F4EC",
          creamDark: "#EFE8D9",
          amber: "#D6A257",
          terracotta: "#C06B54",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 9s ease-in-out infinite",
        "float-slower": "float 13s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        "bounce-gentle": "bounceGentle 1.8s ease-in-out infinite",
        steam: "steam 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(12px, -18px) rotate(4deg)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.06)", opacity: "0.85" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "20%": { opacity: "0.5" },
          "100%": { transform: "translateY(-40px) scaleX(1.4)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

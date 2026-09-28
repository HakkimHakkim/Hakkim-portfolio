/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#060308",
          surface: "#0c0714",
          raised: "#120c1e",
        },
        violet: {
          150: "#e7ddff",
          300: "#c4b5fd",
          500: "#8b5cf6",
          700: "#5b21b6",
        },
        bloom: {
          pink: "#f472b6",
        },
        ink: {
          100: "#f5f3ff",
          400: "#a79fc0",
          600: "#6c6483",
        },
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

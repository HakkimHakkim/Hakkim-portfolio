/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#080808",
          surface: "#101010",
          raised: "#171717",
        },
        maroon: {
          100: "#f0dce3",
          200: "#ddb2c0",
          300: "#c47b93",
          400: "#a44864",
          500: "#741b38",
          600: "#5d152d",
          700: "#461022",
        },
        silver: {
          50: "#f5f6f7",
          100: "#eceef1",
          200: "#d8dbe0",
          300: "#c3c7ce",
          400: "#a8adb5",
          500: "#89909a",
          600: "#6c737e",
        },
        ink: {
          100: "#eceef1",
          400: "#b8bbc1",
          600: "#858a93",
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f6dbe3",
          200: "#edb8c7",
          300: "#e394aa",
          400: "#da718e",
          500: "#d14d72",
          600: "#a73e5b",
          700: "#7d2e44",
          800: "#541f2e",
          900: "#2a0f17",
        },
      },
    },
    fontFamily: {
      montserrat: ["'Montserrat'", "sans-serif"],
      "open-sans": ["'Open Sans'", "sans-serif"],
      rubik: ["'Rubik'", "sans-serif"],
    },
  },
  plugins: [],
};

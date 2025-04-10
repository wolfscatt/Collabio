/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        register: "url('/images/bg-register.png')",
      },
      colors: {
        specPurple: {
          100: "#9690c6",
          200: "#8972e6",
          300: "#211759",
        },
        specPink: {
          
          100: "#d6c9f4",
          200: "#b6a8da",
          300: "#ebecfe",
        },
        specGray: {
          100: "#f3f3fb",
          200: "#d5d4e4",
          300: "#c3c1e1",
          400: "#b4b4c4",
          500: "#7c7c94",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        register: "url('/images/bg-register.png')",
      },
      keyframes: {
        wave: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 123, 255, 0.5)' },
          '70%': { boxShadow: '0 0 0 10px rgba(0, 123, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 123, 255, 0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      animation: {
        wave: 'wave 1s ease-out',
        wiggle: 'wiggle 0.3s ease-in-out infinite',
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

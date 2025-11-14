// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ← ESSENCIAL: Habilita dark mode via class
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4169E1',
          dark: '#3151B0',
        },
      },
    },
  },
  plugins: [],
}
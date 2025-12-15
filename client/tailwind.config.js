/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ak-dark': '#121212',
        'ak-gray': '#1f1f1f',
        'ak-accent': '#00d1d1', // Cyan-ish like RHODES ISLAND
        'ak-text': '#e0e0e0',
        'ak-text-muted': '#a0a0a0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C92071',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Define a Inter como fonte principal
      }
    },
  },
  plugins: [],
}
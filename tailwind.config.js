/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stone-bg': '#E3E1DC',
        'dark': '#121212',
        'moss': '#374336',
      },
      fontFamily: {
        display: ['Syncopate', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      }
    }
  },
  plugins: [],
}

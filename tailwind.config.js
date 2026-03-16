/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3e5ff',
          100: '#e6ccff',
          200: '#cc99ff',
          300: '#b366ff',
          400: '#9933ff',
          500: '#8000ff',
          600: '#6600cc',
          700: '#4d0099',
          800: '#330066',
          900: '#1a0033',
        },
        dark: {
          bg: '#030712',
          card: '#111827',
          border: '#1f2937',
          hover: '#1e293b',
          text: '#f9fafb',
        },
        light: {
          bg: '#ffffff',
          card: '#f9fafb',
          border: '#e5e7eb',
          hover: '#f3f4f6',
          text: '#1f2937',
        }
      },
    },
  },
  plugins: [],
}
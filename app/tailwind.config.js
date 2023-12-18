/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '320px' },
      md: { max: '767px' },
      lg: { max: '1280px' },
    },
    extend: {
      colors: {
        'meli-blue': '#3483fa',
        'meli-lighterblue': '#9cc4db',
      },
    },
  },
  plugins: [],
};

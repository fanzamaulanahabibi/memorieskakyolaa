/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    'animate-float-wave',
    'animate-float',
    'animate-fade-in',
    'animate-wave',
    'animate-bounce-in',
    'animate-scale-in',
    'animate-slide-in-left',
    'animate-slide-in-right',
    'animate-sparkle',
    'animate-rotate-3d',
    'animate-pulse-glow'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

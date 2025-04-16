/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#F5F3FF',
            100: '#EDEBFE',
            200: '#DDD6FE',
            300: '#C4B5FD',
            400: '#A78BFA',
            500: '#8B5CF6', // Core color
            600: '#7C3AED',
            700: '#6D28D9',
            800: '#5B21B6',
            900: '#4C1D95',
          },
          economy: '#26A69A', 
          politics: '#EF5350', 
          finance: '#42A5F5', 
          tech: '#AB47BC', 
          highlights: '#FFA000',
        },
        fontFamily: {
          // Main font for headings and UI elements
          sans: ['Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          // Secondary font for body text
          body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          // Serif option if needed
          serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
        },
      },
    },
    plugins: [],
  }
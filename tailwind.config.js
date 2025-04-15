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
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          // Add category-specific colors here
          economy: '#2E7D32', // Green
          politics: '#C62828', // Red
          finance: '#1565C0', // Blue
          tech: '#6A1B9A', // Purple
          highlights: '#F57F17', // Orange
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
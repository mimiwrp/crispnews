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
        // Category base colors
        economy: {
          DEFAULT: '#26A69A', // Core color
          light: '#E0F2F1',   // Light background variant
          dark: '#00796B',    // Dark text variant
        },
        politics: {
          DEFAULT: '#EF5350', // Core color
          light: '#FFEBEE',   // Light background variant
          dark: '#C62828',    // Dark text variant
        },
        finance: {
          DEFAULT: '#42A5F5', // Core color
          light: '#E3F2FD',   // Light background variant
          dark: '#1565C0',    // Dark text variant
        },
        tech: {
          DEFAULT: '#AB47BC', // Core color
          light: '#F3E5F5',   // Light background variant
          dark: '#7B1FA2',    // Dark text variant
        },
        highlights: {
          DEFAULT: '#FFA000', // Core color
          light: '#FFF8E1',   // Light background variant
          dark: '#FF6F00',    // Dark text variant
        },
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        // Create bg- utility classes
        'economy-bg': theme('colors.economy.light'),
        'politics-bg': theme('colors.politics.light'),
        'finance-bg': theme('colors.finance.light'),
        'tech-bg': theme('colors.tech.light'),
        'highlights-bg': theme('colors.highlights.light'),
      }),
      textColor: theme => ({
        ...theme('colors'),
        // Create text- utility classes
        'economy-text': theme('colors.economy.dark'),
        'politics-text': theme('colors.politics.dark'),
        'finance-text': theme('colors.finance.dark'),
        'tech-text': theme('colors.tech.dark'),
        'highlights-text': theme('colors.highlights.dark'),
      }),
      borderColor: theme => ({
        ...theme('colors'),
        // Create border- utility classes
        'economy-border': theme('colors.economy.DEFAULT'),
        'politics-border': theme('colors.politics.DEFAULT'),
        'finance-border': theme('colors.finance.DEFAULT'),
        'tech-border': theme('colors.tech.DEFAULT'),
        'highlights-border': theme('colors.highlights.DEFAULT'),
      }),
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
  // Define custom utilities for category styling
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.category-economy': {
          '--category-color': '#26A69A',
          '--category-bg': '#E0F2F1',
          '--category-text': '#00796B',
        },
        '.category-politics': {
          '--category-color': '#EF5350',
          '--category-bg': '#FFEBEE',
          '--category-text': '#C62828',
        },
        '.category-finance': {
          '--category-color': '#42A5F5',
          '--category-bg': '#E3F2FD',
          '--category-text': '#1565C0',
        },
        '.category-tech': {
          '--category-color': '#AB47BC',
          '--category-bg': '#F3E5F5',
          '--category-text': '#7B1FA2',
        },
        '.category-highlights': {
          '--category-color': '#FFA000',
          '--category-bg': '#FFF8E1',
          '--category-text': '#FF6F00',
        },
      }
      addUtilities(newUtilities)
    }
  ],}
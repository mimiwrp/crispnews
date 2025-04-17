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
          50: '#FDF7E4',   // Lightest Vanilla
          100: '#F5DEB3',  // Warm Vanilla
          200: '#E6C9A8',  // Biscuit
          300: '#D9B38C',  // Light Cookie
          400: '#C28E5E',  // Medium Cookie
          500: '#8B5A2B',  // Cookie Brown (Core color)
          600: '#7C4E27',  // Darker Cookie
          700: '#6B4423',  // Rich Chocolate
          800: '#5C4033',  // Dark Chocolate
          900: '#3A2A21',  // Darkest Chocolate
          // Keep these for backward compatibility
          DEFAULT: '#8B5A2B', // Cookie Brown
          light: '#F5DEB3',   // Warm Vanilla 
          dark: '#5C4033',    // Dark Chocolate
          accent: '#D2691E',  // Caramel
          neutral: '#E6C9A8', // Biscuit
        },
        // Category base colors
        economy: {
          DEFAULT: '#8B5A2B', // Cookie Brown
          light: '#F5DEB3',   // Warm Vanilla
          dark: '#5C4033',    // Dark Chocolate
        },
        politics: {
          DEFAULT: '#D2691E', // Caramel
          light: '#F5DEB3',   // Warm Vanilla
          dark: '#8B4513',    // Darker Caramel
        },
        finance: {
          DEFAULT: '#CD853F', // Peru (lighter brown)
          light: '#F5DEB3',   // Warm Vanilla
          dark: '#8B5A2B',    // Cookie Brown
        },
        tech: {
          DEFAULT: '#A0522D', // Sienna (reddish-brown)
          light: '#F5DEB3',   // Warm Vanilla
          dark: '#5C4033',    // Dark Chocolate
        },
        highlights: {
          DEFAULT: '#D2691E', // Caramel
          light: '#FAEBD7',   // Lighter Warm Vanilla
          dark: '#8B4513',    // Darker Caramel
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
          '--category-color': '#8B5A2B',
          '--category-bg': '#F5DEB3',
          '--category-text': '#5C4033',
        },
        '.category-politics': {
          '--category-color': '#D2691E',
          '--category-bg': '#F5DEB3',
          '--category-text': '#8B4513',
        },
        '.category-finance': {
          '--category-color': '#CD853F',
          '--category-bg': '#F5DEB3',
          '--category-text': '#8B5A2B',
        },
        '.category-tech': {
          '--category-color': '#A0522D',
          '--category-bg': '#F5DEB3',
          '--category-text': '#5C4033',
        },
        '.category-highlights': {
          '--category-color': '#D2691E',
          '--category-bg': '#FAEBD7',
          '--category-text': '#8B4513',
        },
      }
      addUtilities(newUtilities)
    }
  ],}
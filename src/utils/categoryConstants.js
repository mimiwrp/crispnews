// Update utils/categoryConstants.js to include emojis and color themes
export const NEWS_CATEGORIES = [
  {
    id: 'highlights',
    name: 'Daily Highlights',
    emoji: '✨',
    color: 'highlights',
    description: 'A mix of the most important stories across all categories',
    apiParams: { q: 'top headlines', country: 'us' }
  },
  {
    id: 'economy',
    name: 'Economy',
    emoji: '📊',
    color: 'economy',
    description: 'Economic trends, policies, and indicators',
    apiParams: { q: 'economy OR economic OR gdp OR inflation', language: 'en' }
  },
  {
    id: 'politics',
    name: 'Politics',
    emoji: '🏛️',
    color: 'politics',
    description: 'Political developments, policies, and governance',
    apiParams: { q: 'politics OR government OR election OR policy', language: 'en' }
  },
  {
    id: 'finance',
    name: 'Finance',
    emoji: '💹',
    color: 'finance',
    description: 'Market trends, investments, and financial news',
    apiParams: { q: 'finance OR stock market OR investing OR nasdaq OR dow', language: 'en' }
  },
  {
    id: 'tech',
    name: 'Tech',
    emoji: '💻',
    color: 'tech',
    description: 'Innovations and developments in technology',
    apiParams: { q: 'technology OR tech OR innovation OR software OR AI', language: 'en' }
  }
];

// ... rest of your existing code ...
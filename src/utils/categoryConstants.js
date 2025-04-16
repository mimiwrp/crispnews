// Define the categories used throughout the application
export const NEWS_CATEGORIES = [
    {
      id: 'highlights',
      name: 'Daily Highlights',
      color: 'highlights',
      description: 'A mix of the most important stories across all categories',
      apiParams: { q: 'top headlines', country: 'us' }
    },
    {
      id: 'economy',
      name: 'Economy',
      color: 'economy',
      description: 'Economic trends, policies, and indicators',
      apiParams: { q: 'economy OR economic OR gdp OR inflation', language: 'en' }
    },
    {
      id: 'politics',
      name: 'Politics',
      color: 'politics',
      description: 'Political developments, policies, and governance',
      apiParams: { q: 'politics OR government OR election OR policy', language: 'en' }
    },
    {
      id: 'finance',
      name: 'Finance',
      color: 'finance',
      description: 'Market trends, investments, and financial news',
      apiParams: { q: 'finance OR stock market OR investing OR nasdaq OR dow', language: 'en' }
    },
    {
      id: 'tech',
      name: 'Tech',
      color: 'tech',
      description: 'Innovations and developments in technology',
      apiParams: { q: 'technology OR tech OR innovation OR software OR AI', language: 'en' }
    }
  ];
  
  // Get a category by ID
  export const getCategoryById = (categoryId) => {
    return NEWS_CATEGORIES.find(category => category.id === categoryId) || NEWS_CATEGORIES[0];
  };
  
  // Estimate reading time in minutes for a given word count
  export const estimateReadingTime = (wordCount) => {
    // Average reading speed: 250 words per minute
    const avgReadingSpeed = 250;
    return Math.ceil(wordCount / avgReadingSpeed);
  };
  
  // Calculate how many articles can fit in a given time frame
  export const calculateArticlesForTimeFrame = (minutes) => {
    // Average article length after summarization (words)
    const avgArticleLength = 200;
    
    // Calculate how many words can be read in the given time
    const totalWords = minutes * 250; // 250 words per minute
    
    // Calculate how many articles this represents
    return {
      articleCount: Math.floor(totalWords / avgArticleLength),
      wordCount: totalWords
    };
  };
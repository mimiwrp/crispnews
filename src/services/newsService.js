// src/services/newsService.js
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsByCategory = async (categoryId, count = 10) => {
  const categoryParams = {
    highlights: { endpoint: '/top-headlines', country: 'us' },
    economy: { 
      endpoint: '/everything', 
      q: 'economy OR economic OR gdp OR inflation', 
      language: 'en',
      sortBy: 'relevancy'
    },
    politics: { 
      endpoint: '/everything', 
      q: 'politics OR government OR election OR policy', 
      language: 'en',
      sortBy: 'relevancy'
    },
    finance: { 
      endpoint: '/everything', 
      q: 'finance OR stock market OR investing OR nasdaq OR dow', 
      language: 'en',
      sortBy: 'relevancy'
    },
    tech: { 
      endpoint: '/everything', 
      q: 'technology OR tech OR innovation OR software OR AI', 
      language: 'en',
      sortBy: 'relevancy'
    }
  };
  
  const params = categoryParams[categoryId] || categoryParams.highlights;
  const queryParams = new URLSearchParams({
    ...params,
    apiKey: API_KEY,
    pageSize: count
  });
  
  try {
    const response = await fetch(`${BASE_URL}${params.endpoint}?${queryParams}`);
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news');
    }
    
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
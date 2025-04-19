import React, { createContext, useContext, useState } from 'react';
import createNewsService from '../services/newsService';

// Create the briefing context
const BriefingContext = createContext();

// Custom hook to use the briefing context
export const useBriefing = () => {
  return useContext(BriefingContext);
};

// Briefing provider component
export const BriefingProvider = ({ children }) => {
  // State for selected duration and category
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('highlights');
  const [currentBriefing, setCurrentBriefing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_NEWS_API_KEY || 
                 import.meta.env.REACT_APP_NEWS_API_KEY;
  
  // Function to generate a briefing
  const generateBriefing = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create the news service
      const newsService = createNewsService(apiKey);
      
      // Map our category IDs to news API categories
      const categoryMap = {
        highlights: 'general',
        technology: 'technology',
        business: 'business',
        science: 'science',
        sports: 'sports'
      };
      
      // Get news category for API
      const newsCategory = categoryMap[selectedCategory] || 'general';
      
      // Fetch articles
      const response = await newsService.getTimeBasedBriefing(newsCategory, selectedDuration);
      
      if (response.status === 'ok') {
        setCurrentBriefing(response.articles || []);
        return response.articles;
      } else {
        throw new Error(response.message || 'Failed to fetch news');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Context value
  const value = {
    selectedDuration,
    setSelectedDuration,
    selectedCategory,
    setSelectedCategory,
    currentBriefing,
    isLoading,
    error,
    generateBriefing
  };
  
  return (
    <BriefingContext.Provider value={value}>
      {children}
    </BriefingContext.Provider>
  );
};

export default BriefingProvider;
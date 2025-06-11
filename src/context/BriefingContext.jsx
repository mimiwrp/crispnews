import React, { createContext, useContext, useState } from 'react';
import createNewsService from '../services/newsService';
import { generateBriefingSummary } from '../services/summaryService'; // Import the new function

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
  
  // New state for AI-generated content
  const [briefingSummary, setBriefingSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Get API key from environment variables (updated for GNews)
  const apiKey = import.meta.env.VITE_GNEWS_API_KEY ||
                 import.meta.env.REACT_APP_GNEWS_API_KEY;

  // 🎯 Function to get the right number of articles based on duration
  const getArticleCount = (duration) => {
    const articleCounts = {
      1: 3,   // 1 minute = 3 articles
      3: 8,   // 3 minutes = 8 articles  
      5: 12   // 5 minutes = 12 articles
    };
    return articleCounts[duration] || 3;
  };

  // Function to generate a briefing
  const generateBriefing = async () => {
    setIsLoading(true);
    setIsGenerating(true);
    setError(null);
    setBriefingSummary(''); // Clear previous summary

    try {
      console.log(`🚀 Starting ${selectedDuration}-minute briefing generation...`);
      
      // Create the news service
      const newsService = createNewsService(apiKey);

      // Map our category IDs to GNews API categories
      const categoryMap = {
        highlights: 'general',
        technology: 'technology',
        business: 'business',
        science: 'science',
        sports: 'sports',
        economy: 'business',
        politics: 'nation', // GNews uses 'nation' for political news
        finance: 'business',
        tech: 'technology',
        health: 'health',
        entertainment: 'entertainment',
        world: 'world'
      };

      // Get news category for API
      const newsCategory = categoryMap[selectedCategory] || 'general';
      const articleCount = getArticleCount(selectedDuration);

      console.log(`📰 Fetching ${articleCount} ${newsCategory} articles for ${selectedDuration} minutes...`);

      // Fetch articles with the right count
      const response = await newsService.getTimeBasedBriefing(newsCategory, selectedDuration);

      if (response.status === 'ok' && response.articles) {
        // Take only the number of articles we need
        const articles = response.articles.slice(0, articleCount);
        console.log(`📄 Using ${articles.length} articles for briefing`);
        
        setCurrentBriefing(articles);

        // 🎯 Generate ONE cohesive briefing instead of individual summaries
        console.log('🤖 Generating cohesive briefing...');
        
        const cohesiveBriefing = await generateBriefingSummary(
          articles, 
          selectedCategory, 
          selectedDuration
        );

        setBriefingSummary(cohesiveBriefing);
        console.log('📋 Cohesive briefing created successfully');

        return articles;
      } else {
        throw new Error(response.message || 'Failed to fetch news');
      }
    } catch (err) {
      console.error('💥 Briefing generation error:', err);
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
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
    generateBriefing,
    // New values for AI features
    briefingSummary,
    setBriefingSummary,
    isGenerating
  };

  return (
    <BriefingContext.Provider value={value}>
      {children}
    </BriefingContext.Provider>
  );
};

export default BriefingProvider;
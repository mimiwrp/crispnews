import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBriefing } from '../context/BriefingContext';
import { getCategoryById, getCategoryBgClass, getCategoryIconClass, getCategoryTextClass } from '../utils/categoryStyles';

const BriefingPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { 
    currentBriefing, 
    generateBriefing, 
    selectedDuration, 
    setSelectedCategory 
  } = useBriefing();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(15); // Percentage
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get category details from the URL parameter
  const category = getCategoryById(categoryId);
  
  useEffect(() => {
    // If we have the category ID from the URL, update the context
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    
    // Check if we already have a briefing
    if (currentBriefing && currentBriefing.categoryId === categoryId) {
      // Use the existing briefing
      setArticles(currentBriefing.articles);
      setIsLoading(false);
    } else {
      // Generate a new briefing
      const loadBriefing = async () => {
        try {
          setIsLoading(true);
          const briefing = await generateBriefing();
          setArticles(briefing.articles);
        } catch (error) {
          console.error('Error generating briefing:', error);
          // If we can't generate a briefing, redirect to home
          navigate('/');
        } finally {
          setIsLoading(false);
        }
      };
      
      loadBriefing();
    }
  }, [categoryId, currentBriefing, generateBriefing, navigate, setSelectedCategory]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextArticle = () => {
    if (currentArticleIndex < articles.length - 1) {
      setCurrentArticleIndex(currentArticleIndex + 1);
      // Update progress
      setOverallProgress(Math.min(100, overallProgress + (100 / articles.length)));
    }
  };

  const handlePrevArticle = () => {
    if (currentArticleIndex > 0) {
      setCurrentArticleIndex(currentArticleIndex - 1);
      // Update progress
      setOverallProgress(Math.max(0, overallProgress - (100 / articles.length)));
    }
  };

  const handleArticleSelect = (index) => {
    setCurrentArticleIndex(index);
  };

  // If loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center py-12">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${getCategoryIconClass(categoryId)} flex items-center justify-center text-white`}>
          <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold">Generating your {category.name} briefing...</h2>
        <p className="text-gray-600 mt-2">This will just take a moment</p>
      </div>
    );
  }

  // If no articles, show a message
  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center py-12">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${getCategoryIconClass(categoryId)} flex items-center justify-center text-white text-2xl`}>
          {category.emoji}
        </div>
        <h2 className="text-xl font-bold">No articles available</h2>
        <p className="text-gray-600 mt-2 mb-6">We couldn't find any articles for this category right now.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-300"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Duration information for the briefing
  const duration = {
    minutes: selectedDuration,
    articleCount: articles.length,
    progress: overallProgress
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header with category info and progress */}
      <div className={`rounded-lg p-4 mb-6 flex justify-between items-center ${getCategoryBgClass(categoryId)}`}>
        <div className="flex items-center">
          <span className="text-2xl mr-2">{category.emoji}</span>
          <div>
            <h2 className={`font-bold text-xl ${getCategoryTextClass(categoryId)}`}>{category.name} Briefing</h2>
            <p className="text-sm">
              {duration.minutes}-minute briefing • {duration.articleCount} articles
            </p>
          </div>
        </div>
        <div className="w-24 h-8 bg-white rounded-full overflow-hidden">
          <div 
            className={`h-full ${getCategoryIconClass(categoryId)}`} 
            style={{ width: `${duration.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Current Article */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getCategoryIconClass(categoryId)}`}>
              <span>{category.emoji}</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-600">{articles[currentArticleIndex].source}</h3>
              <p className="text-xs text-gray-500">{articles[currentArticleIndex].publishedAt}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{Math.floor(articles[currentArticleIndex].wordCount / 250)} min read</span>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </button>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-3">{articles[currentArticleIndex].title}</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          {articles[currentArticleIndex].summary}
        </p>
        
        {/* Audio controls */}
        <div className="border-t pt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePrevArticle}
              disabled={currentArticleIndex === 0}
              className={`rounded-full p-2 ${currentArticleIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handlePlayPause}
              className={`rounded-full w-12 h-12 flex items-center justify-center ${getCategoryIconClass(categoryId)} text-white`}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
            <button 
              onClick={handleNextArticle}
              disabled={currentArticleIndex === articles.length - 1}
              className={`rounded-full p-2 ${currentArticleIndex === articles.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="text-sm text-gray-600">
            {currentArticleIndex + 1} of {articles.length}
          </div>
        </div>
      </div>

      {/* Article List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold mb-4">All Articles in this Briefing</h3>
        
        {articles.map((article, index) => (
          <div 
            key={article.id}
            onClick={() => handleArticleSelect(index)}
            className={`
              p-3 mb-2 rounded-lg cursor-pointer flex items-center 
              ${currentArticleIndex === index ? getCategoryBgClass(categoryId) : 'hover:bg-gray-50'}
              ${article.isRead ? 'opacity-60' : ''}
            `}
          >
            <div className="mr-3 flex-shrink-0">
              {article.isRead ? (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${getCategoryIconClass(categoryId)}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                  ${currentArticleIndex === index ? getCategoryIconClass(categoryId) + ' text-white' : 'bg-gray-200 text-gray-500'}`
                }>
                  {index + 1}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-medium ${article.isRead ? 'text-gray-500' : 'text-gray-800'} truncate`}>
                {article.title}
              </h4>
              <p className="text-xs text-gray-500 truncate">{article.source} • {Math.ceil(article.wordCount / 250)} min</p>
            </div>
            {currentArticleIndex === index && (
              <div className={`ml-2 flex-shrink-0 w-2 h-2 rounded-full ${getCategoryIconClass(categoryId)}`}></div>
            )}
          </div>
        ))}
        
        <div className="mt-6 flex justify-between items-center">
          <button 
            onClick={() => generateBriefing()}
            className="text-gray-600 text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh Briefing
          </button>
          <button className={`px-4 py-2 rounded-lg text-white font-medium ${getCategoryIconClass(categoryId)}`}>
            Read Full Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BriefingPage;
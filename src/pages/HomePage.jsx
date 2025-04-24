import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeDurationSelector from '../components/TimeDurationSelector';
import CategorySelector from '../components/CategorySelector';
import BriefingHeader from '../components/BriefingHeader';
import NewsContent from '../components/NewsContent';
import {
  getCategoryById,
  getCategoryBgClass,
  getCategoryIconClass,
  getCategoryTextClass,
  getCategoryClassNames,
  getArticleCountForDuration
} from '../utils/categoryStyles';
import { useBriefing } from '../context/BriefingContext';

const HomePage = () => {
  const navigate = useNavigate();
  const {
    selectedDuration,
    setSelectedDuration,
    selectedCategory,
    setSelectedCategory,
    currentBriefing,
    isLoading,
    error,
    generateBriefing
  } = useBriefing();
  
  // State for audio playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  const handleDurationChange = (minutes) => {
    setSelectedDuration(minutes);
  };
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  // Get details of the selected category
  const categoryDetails = getCategoryById(selectedCategory);
  
  // Generate briefing when component mounts or params change
  useEffect(() => {
    // Only generate if we have a category selected and no articles
    if (selectedCategory && currentBriefing.length === 0 && !isLoading) {
      generateBriefing().catch(err => {
        console.error('Error generating briefing:', err);
      });
    }
  }, [selectedCategory, currentBriefing.length, isLoading, generateBriefing]);
  
  // Toggle play/pause for audio version
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const [showBriefing, setShowBriefing] = useState(false);
  
  // Handle the generate briefing button click
  const handleGenerateBriefing = async () => {
    try {
      // Generate the briefing using the context function
      await generateBriefing();
      
      // No longer navigate to the briefing page, just stay on HomePage
      // and the content will be shown below
      setShowBriefing(true);
    } catch (error) {
      console.error('Error generating briefing:', error);
      // You could show an error message to the user here
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      
      {/* Customization + action button box */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="p-3">
          <CategorySelector 
            onCategoryChange={handleCategoryChange}
            initialCategory={selectedCategory}
          />
        </div>
        <div className="p-3">
          <TimeDurationSelector 
            onDurationChange={handleDurationChange}
            initialDuration={selectedDuration}
          />
        </div>
        <div className="text-center p-3">
          <button 
            onClick={handleGenerateBriefing}
            className={`px-8 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all bg-primary-500`}
          >
            Generate {categoryDetails.name} Briefing
          </button>
        </div>
      </div>
      
      {/* Briefing Header Placeholder */}
      {showBriefing && (
        <BriefingHeader 
          isPlaying={isPlaying} 
          togglePlayPause={togglePlayPause} 
          currentBriefing={currentBriefing} 
          currentArticleIndex={currentArticleIndex}
          selectedDuration={selectedDuration}
          selectedCategory={selectedCategory}
          categoryDetails={categoryDetails}
        />
      )}
      
      {/* News Content */}
      <NewsContent 
        isLoading={isLoading}
        error={error}
        currentBriefing={currentBriefing}
      />
    </div>
  );
};

export default HomePage;
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
    generateBriefing,
    // Add the new context values
    briefingSummary,
    isGenerating
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
  
  // Add a state to track if the briefing has been generated
  const [showBriefing, setShowBriefing] = useState(false);

  // Handle the generate briefing button click
  const handleGenerateBriefing = async () => {
    try {
      console.log('🎯 Generate button clicked');
      
      // Generate the briefing using the context function
      await generateBriefing();
      
      // Show the briefing section
      setShowBriefing(true);
      
      console.log('✅ Briefing generation completed');
    } catch (error) {
      console.error('❌ Error generating briefing:', error);
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
            disabled={isLoading || isGenerating}
            className={`px-8 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all ${
              isLoading || isGenerating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary-500 hover:bg-primary-600'
            }`}
          >
            {isLoading || isGenerating 
              ? 'Generating...' 
              : `Generate ${categoryDetails.name} Briefing`
            }
          </button>
        </div>
      </div>
      
      {/* Briefing Header Component - only show after generating */}
      {showBriefing && (
        <BriefingHeader
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          currentBriefing={currentBriefing}
          currentArticleIndex={currentArticleIndex}
          selectedDuration={selectedDuration}
          selectedCategory={selectedCategory}
          categoryDetails={categoryDetails}
          isGenerating={isGenerating}        // New prop
          briefingSummary={briefingSummary}  // New prop
        />
      )}
      
      {/* News Section Heading - conditional text based on whether briefing is shown */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          {showBriefing ? 'In This Briefing' : `${categoryDetails?.name || selectedCategory} News`}
        </h2>
      </div>
      
      {/* News Content Component - always visible but will show loading/empty state as needed */}
      <NewsContent
        isLoading={isLoading}
        error={error}
        currentBriefing={currentBriefing}
      />
    </div>
  );
};

export default HomePage;
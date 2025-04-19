import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeDurationSelector from '../components/TimeDurationSelector';
import CategorySelector from '../components/CategorySelector';
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
    generateBriefing 
  } = useBriefing();
  
  const handleDurationChange = (minutes) => {
    setSelectedDuration(minutes);
  };
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  // Get details of the selected category
  const categoryDetails = getCategoryById(selectedCategory);
  
  // Handle the generate briefing button click
  const handleGenerateBriefing = async () => {
    try {
      // Generate the briefing using the context function
      const briefing = await generateBriefing();
      
      // Navigate to the briefing page with the selected category
      navigate(`/briefing/${selectedCategory}`);
    } catch (error) {
      console.error('Error generating briefing:', error);
      // You could show an error message to the user here
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-8 mt-4">
        <h1 className="text-3xl font-bold">
          <span className="text-gray-800">Crisp</span>
          <span className="text-primary-600">News</span>
        </h1>
        <p className="text-gray-600 mt-2">Get personalized news briefings in the time you have</p>
      </div>
      
      {/* Time Duration Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <TimeDurationSelector 
          onDurationChange={handleDurationChange}
          initialDuration={selectedDuration}
        />
      </div>
      
      {/* Category Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <CategorySelector 
          onCategoryChange={handleCategoryChange}
          initialCategory={selectedCategory}
        />
      </div>
      
      {/* Generate Briefing Button */}
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Your Personalized Briefing</h3>
        
        <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${getCategoryBgClass(selectedCategory)}`}>
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center mr-3 ${getCategoryIconClass(selectedCategory)}`}>
              <span className="text-xl">{categoryDetails.emoji}</span>
            </div>
            <div>
              <h4 className={`font-bold ${getCategoryTextClass(selectedCategory)}`}>{categoryDetails.name}</h4>
              <p className="text-gray-700">
                {selectedDuration} minute briefing • {getArticleCountForDuration(selectedDuration)} articles
              </p>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Updated 15 minutes ago
          </div>
        </div>
        
        <button 
          onClick={handleGenerateBriefing}
          className={`px-8 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all ${getCategoryIconClass(selectedCategory)}`}
        >
          Generate {categoryDetails.name} Briefing
        </button>
        
        <p className="mt-4 text-gray-500 text-sm">
          Your briefing will be tailored to fit your {selectedDuration}-minute timeframe
        </p>
      </div>
    </div>
  );
};

export default HomePage;
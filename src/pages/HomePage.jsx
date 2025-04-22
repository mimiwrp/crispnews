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

      {/* Customization + action button box */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="p-3">
          <TimeDurationSelector 
            onDurationChange={handleDurationChange}
            initialDuration={selectedDuration}
          />
        </div>
        <div className="p-3">
          <CategorySelector 
            onCategoryChange={handleCategoryChange}
            initialCategory={selectedCategory}
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
      
    </div>
  );
};

export default HomePage;
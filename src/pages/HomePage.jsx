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
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Briefing</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper dolor eget arcu laoreet venenatis. Etiam quis tincidunt tortor. In hac habitasse platea dictumst. Vivamus pretium massa eros, id luctus lacus ornare vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam mollis augue libero, ut sagittis mi fermentum eu. Proin nec nibh nisl. Nullam aliquet facilisis nisl. Curabitur nisi justo, interdum at varius sit amet, fermentum et ipsum. Praesent hendrerit ex nisi, et condimentum velit placerat non. Nunc aliquam at diam sed tristique. Duis dictum turpis ex, eget varius velit scelerisque pretium. Praesent ullamcorper turpis pretium consequat aliquet. Cras erat orci, sollicitudin dignissim tempor sit amet, posuere eget quam. Sed faucibus, lacus ut porttitor facilisis, dui massa faucibus nulla, vitae ultricies mi lacus et ante.
        </p>
      </div>
      
      {/* News Content Placeholder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">In This Briefing</h2>
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-500 italic">News articles for your briefing will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
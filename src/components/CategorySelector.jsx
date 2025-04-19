import React from 'react';
import { getAllCategories, getCategoryClassNames } from '../utils/categoryStyles';

const CategorySelector = ({ onCategoryChange, initialCategory = 'highlights' }) => {
  // Get all available categories from the utility function
  const categories = getAllCategories();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">What are you interested in?</h2>
      <p className="text-gray-600 mb-4">Select a category for your news briefing</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((category) => {
          const { bgClass, iconClass, textClass } = getCategoryClassNames(category.id);
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`p-4 rounded-lg transition-all flex items-center ${
                initialCategory === category.id
                  ? bgClass
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                initialCategory === category.id ? iconClass : 'bg-gray-300'
              }`}>
                <span className="text-lg">{category.emoji}</span>
              </div>
              <span className={initialCategory === category.id ? textClass : 'text-gray-700'}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
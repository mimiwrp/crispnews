import React from 'react';
import { getAllCategories } from '../utils/categoryStyles';

const CategorySelector = ({ onCategoryChange, initialCategory = 'highlights' }) => {
  // Get all available categories from the utility function
  const categories = getAllCategories();
  
  return (
    <div className="relative">
      {/* Left gradient overlay */}
      {/* <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div> */}
      
      {/* Right gradient overlay */}
      <div className="absolute right-[-1px] top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex overflow-x-auto pb-0 gap-3 no-scrollbar">
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                initialCategory === category.id
                  ? 'bg-[#F4C44E] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category.emoji}&nbsp;{category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
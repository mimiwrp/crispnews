import React from 'react';
import { getAllCategories } from '../utils/categoryStyles';

const CategorySelector = ({ onCategoryChange, initialCategory = 'highlights' }) => {
  // Get all available categories from the utility function
  const categories = getAllCategories();
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Select Category</h2>
      
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                initialCategory === category.id
                  ? 'bg-[#F4C44E] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
import React, { useState } from 'react';
import { 
  CATEGORY_CONFIG, 
  getCategoryById, 
  getCategoryBgClass,
  getCategoryBorderClass,
  getCategoryIconClass,
  getCategoryTextClass,
  getCategoryClassNames
} from '../utils/categoryStyles';

const CategorySelector = ({ onCategoryChange, initialCategory = 'highlights' }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };
  
  // Get the selected category object
  const selectedCategoryObj = getCategoryById(selectedCategory);
  
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-3">Select a category</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {Object.values(CATEGORY_CONFIG).map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`
              rounded-lg text-center transition-all duration-200 py-3 px-2
              border-2 hover:shadow-md
              ${selectedCategory === category.id
                ? `${getCategoryBorderClass(category.id)} ${getCategoryBgClass(category.id)}`
                : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <div
              className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center
                ${selectedCategory === category.id 
                  ? getCategoryIconClass(category.id) 
                  : 'bg-gray-200'} text-white`}
            >
              <span className="text-xl">{category.emoji}</span>
            </div>
            <div className={`text-sm font-medium ${selectedCategory === category.id ? getCategoryTextClass(category.id) : 'text-gray-800'}`}>
              {category.name}
            </div>
          </button>
        ))}
      </div>
      
      {/* Description with styling based on selected category */}
      <div className={`mt-6 p-4 rounded-lg transition-all duration-300 ${getCategoryClassNames(selectedCategory, 'container')}`}>
        <div className="flex items-center">
          <span className="text-2xl mr-2">{selectedCategoryObj.emoji}</span>
          <h3 className="font-semibold">{selectedCategoryObj.name}</h3>
        </div>
        <p className="mt-1">{selectedCategoryObj.description}</p>
      </div>
    </div>
  );
};

export default CategorySelector;
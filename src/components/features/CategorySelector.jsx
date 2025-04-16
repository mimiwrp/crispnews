import React, { useState } from 'react';

const categories = [
  { id: 'highlights', name: 'Daily Highlights', color: 'highlights' },
  { id: 'economy', name: 'Economy', color: 'economy' },
  { id: 'politics', name: 'Politics', color: 'politics' },
  { id: 'finance', name: 'Finance', color: 'finance' },
  { id: 'tech', name: 'Tech', color: 'tech' }
];

const CategorySelector = ({ onCategoryChange, initialCategory = 'highlights' }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-3">Select a category</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`
              rounded-lg text-center transition-all duration-200 py-3 px-2
              border-2 hover:shadow-md
              ${selectedCategory === category.id 
                ? `border-${category.color} bg-${category.color} bg-opacity-10` 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div 
              className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center
                bg-${category.color} text-white`
              }
            >
              {category.name.charAt(0)}
            </div>
            <div className="text-sm font-medium">{category.name}</div>
          </button>
        ))}
      </div>
      <p className="mt-4 text-gray-600 text-sm">
        {selectedCategory === 'highlights'
          ? "Get a mix of the most important stories across all categories."
          : selectedCategory === 'economy'
          ? "Stay updated on economic trends, policies, and indicators."
          : selectedCategory === 'politics'
          ? "Follow political developments, policies, and governance."
          : selectedCategory === 'finance'
          ? "Track market trends, investments, and financial news."
          : "Discover the latest innovations and developments in technology."}
      </p>
    </div>
  );
};

export default CategorySelector;
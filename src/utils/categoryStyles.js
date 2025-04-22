/**
 * Utility functions for working with news categories
 */

// All available categories
const categories = [
  {
    id: 'highlights',
    name: 'Daily Highlights',
    emoji: '✨',
    description: 'Top stories from various categories'
  },
  {
    id: 'technology',
    name: 'Technology',
    emoji: '💻',
    description: 'Latest tech news and innovations'
  },
  {
    id: 'business',
    name: 'Business',
    emoji: '📊',
    description: 'Business and financial news'
  },
  {
    id: 'science',
    name: 'Science',
    emoji: '🔬',
    description: 'Discoveries and scientific research'
  },
  {
    id: 'sports',
    name: 'Sports',
    emoji: '🏆',
    description: 'Sports news and results'
  }
];

/**
 * Get all available categories
 * @returns {Array} Array of category objects
 */
export const getAllCategories = () => {
  return categories;
};

/**
 * Get a category by its ID
 * @param {string} id Category ID to find
 * @returns {Object} Category object
 */
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id) || categories[0];
};

/**
 * Get background class for a category
 * @param {string} categoryId Category ID
 * @returns {string} CSS class for background
 */
export const getCategoryBgClass = (categoryId) => {
  const bgClasses = {
    highlights: 'bg-blue-50',
    technology: 'bg-purple-50',
    business: 'bg-green-50',
    science: 'bg-amber-50',
    sports: 'bg-red-50'
  };
  
  return bgClasses[categoryId] || bgClasses.highlights;
};

/**
 * Get icon class for a category
 * @param {string} categoryId Category ID
 * @returns {string} CSS class for icon
 */
export const getCategoryIconClass = (categoryId) => {
  const iconClasses = {
    highlights: 'bg-blue-600',
    technology: 'bg-purple-600',
    business: 'bg-green-600',
    science: 'bg-amber-600',
    sports: 'bg-red-600'
  };
  
  return iconClasses[categoryId] || iconClasses.highlights;
};

/**
 * Get text class for a category
 * @param {string} categoryId Category ID
 * @returns {string} CSS class for text
 */
export const getCategoryTextClass = (categoryId) => {
  const textClasses = {
    highlights: 'text-blue-800',
    technology: 'text-purple-800',
    business: 'text-green-800',
    science: 'text-amber-800',
    sports: 'text-red-800'
  };
  
  return textClasses[categoryId] || textClasses.highlights;
};

/**
 * Get all class names for a category
 * @param {string} categoryId Category ID
 * @returns {Object} Object with all class names
 */
export const getCategoryClassNames = (categoryId) => {
  return {
    bgClass: getCategoryBgClass(categoryId),
    iconClass: getCategoryIconClass(categoryId),
    textClass: getCategoryTextClass(categoryId)
  };
};

/**
 * Get the number of articles for a duration
 * @param {number} duration Duration in minutes
 * @returns {number} Number of articles
 */
export const getArticleCountForDuration = (duration) => {
  const articleCounts = {
    1: 5,
    3: 10,
    5: 15
  };
  
  return articleCounts[duration] || articleCounts[1];
};
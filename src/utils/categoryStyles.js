/**
 * Utility functions for handling category styling throughout the application
 */

// Category configuration with visual elements
export const CATEGORY_CONFIG = {
    highlights: {
      id: 'highlights',
      name: 'Daily Highlights',
      emoji: '✨',
      description: 'A mix of the most important stories across all categories'
    },
    economy: {
      id: 'economy',
      name: 'Economy',
      emoji: '📊',
      description: 'Economic trends, policies, and indicators'
    },
    politics: {
      id: 'politics',
      name: 'Politics',
      emoji: '🏛️',
      description: 'Political developments, policies, and governance'
    },
    finance: {
      id: 'finance',
      name: 'Finance', 
      emoji: '💹',
      description: 'Market trends, investments, and financial news'
    },
    tech: {
      id: 'tech',
      name: 'Tech',
      emoji: '💻',
      description: 'Innovations and developments in technology'
    }
  };
  
  /**
   * Get background color class for a category
   * @param {string} categoryId - The category identifier
   * @returns {string} - The CSS class for the category background
   */
  export const getCategoryBgClass = (categoryId) => {
    const bgClasses = {
      highlights: 'bg-highlights-light',
      economy: 'bg-economy-light',
      politics: 'bg-politics-light',
      finance: 'bg-finance-light',
      tech: 'bg-tech-light'
    };
    return bgClasses[categoryId] || 'bg-highlights-light';
  };
  
  /**
   * Get border color class for a category
   * @param {string} categoryId - The category identifier
   * @returns {string} - The CSS class for the category border
   */
  export const getCategoryBorderClass = (categoryId) => {
    const borderClasses = {
      highlights: 'border-highlights',
      economy: 'border-economy',
      politics: 'border-politics',
      finance: 'border-finance',
      tech: 'border-tech'
    };
    return borderClasses[categoryId] || 'border-highlights';
  };
  
  /**
   * Get icon background color class for a category
   * @param {string} categoryId - The category identifier
   * @returns {string} - The CSS class for the category icon
   */
  export const getCategoryIconClass = (categoryId) => {
    const iconClasses = {
      highlights: 'bg-highlights',
      economy: 'bg-economy',
      politics: 'bg-politics',
      finance: 'bg-finance',
      tech: 'bg-tech'
    };
    return iconClasses[categoryId] || 'bg-highlights';
  };
  
  /**
   * Get text color class for a category
   * @param {string} categoryId - The category identifier
   * @returns {string} - The CSS class for the category text
   */
  export const getCategoryTextClass = (categoryId) => {
    const textClasses = {
      highlights: 'text-highlights-dark',
      economy: 'text-economy-dark',
      politics: 'text-politics-dark',
      finance: 'text-finance-dark',
      tech: 'text-tech-dark'
    };
    return textClasses[categoryId] || 'text-highlights-dark';
  };
  
  /**
   * Get a category object by its ID
   * @param {string} categoryId - The category identifier
   * @returns {Object} - The category object with all properties
   */
  export const getCategoryById = (categoryId) => {
    return CATEGORY_CONFIG[categoryId] || CATEGORY_CONFIG.highlights;
  };
  
  /**
   * Get all styling classes for a category as an object
   * @param {string} categoryId - The category identifier
   * @returns {Object} - An object with all styling class properties
   */
  export const getCategoryStyles = (categoryId) => {
    return {
      bgClass: getCategoryBgClass(categoryId),
      borderClass: getCategoryBorderClass(categoryId),
      iconClass: getCategoryIconClass(categoryId),
      textClass: getCategoryTextClass(categoryId),
      ...getCategoryById(categoryId)
    };
  };
  
  /**
   * Get all styling classes for a category as a string
   * @param {string} categoryId - The category identifier
   * @param {string} element - The element type ('card', 'icon', 'text', 'container')
   * @returns {string} - Combined CSS classes for the specified element type
   */
  export const getCategoryClassNames = (categoryId, element) => {
    const styles = getCategoryStyles(categoryId);
    
    switch (element) {
      case 'card':
        return `${styles.bgClass} ${styles.borderClass} rounded-lg`;
      case 'icon':
        return `${styles.iconClass} text-white rounded-full`;
      case 'text':
        return styles.textClass;
      case 'container':
        return `${styles.bgClass} ${styles.borderClass} p-4 rounded-lg`;
      case 'button':
        return `${styles.iconClass} text-white hover:shadow-md`;
      default:
        return '';
    }
  };
  
  /**
   * Get estimated article count based on duration
   * @param {number} minutes - Duration in minutes
   * @returns {string} - Range of article count
   */
  export const getArticleCountForDuration = (minutes) => {
    switch (minutes) {
      case 1:
        return '1-2';
      case 3:
        return '3-5';
      case 5:
        return '5-8';
      default:
        return '3-5';
    }
  };
  
  /**
   * Get estimated word count based on duration
   * @param {number} minutes - Duration in minutes
   * @returns {number} - Approximate word count
   */
  export const getWordCountForDuration = (minutes) => {
    // Assuming average reading speed of 250 words per minute
    return minutes * 250;
  };
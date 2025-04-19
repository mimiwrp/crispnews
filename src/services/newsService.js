/**
 * NewsService - Service to handle API calls to News API
 */

// Base URL for the News API
const API_BASE_URL = 'https://newsapi.org/v2';

// Default parameters for API requests
const DEFAULT_PARAMS = {
  country: 'us',
  pageSize: 5
};

// Available categories for news
const CATEGORIES = ['general', 'technology', 'business', 'science', 'sports'];

/**
 * Creates a NewsService instance for handling News API requests
 * @param {string} apiKey - The API key for News API
 * @returns {Object} - NewsService object with methods for API interaction
 */
function createNewsService(apiKey) {
  if (!apiKey) {
    throw new Error('API key is required for NewsService');
  }

  /**
   * Get top headlines
   * @param {Object} options - Options for the request
   * @param {string} options.category - Category of news (general, technology, business, science, sports)
   * @param {string} options.country - Country code (default: 'us')
   * @param {number} options.pageSize - Number of results per page (default: 5, max: 100)
   * @param {number} options.page - Page number (default: 1)
   * @param {string} options.q - Search query
   * @returns {Promise<Object>} - Promise with the API response
   */
  const getTopHeadlines = async (options = {}) => {
    const params = {
      ...DEFAULT_PARAMS,
      ...options
    };

    // Validate category if provided
    if (params.category && !CATEGORIES.includes(params.category)) {
      throw new Error(`Invalid category. Must be one of: ${CATEGORIES.join(', ')}`);
    }

    // Construct URL with query parameters
    const queryParams = new URLSearchParams();
    
    // Add API key
    queryParams.append('apiKey', apiKey);
    
    // Add other parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    const url = `${API_BASE_URL}/top-headlines?${queryParams.toString()}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`News API Error: ${errorData.message || response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  };

  /**
   * Get headlines by category
   * @param {string} category - Category of news
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - Promise with the API response
   */
  const getHeadlinesByCategory = async (category, options = {}) => {
    return getTopHeadlines({
      category,
      ...options
    });
  };

  /**
   * Get headlines for time-based briefing
   * @param {string} category - Category of news
   * @param {number} duration - Duration in minutes (1, 3, or 5)
   * @returns {Promise<Object>} - Promise with the API response
   */
  const getTimeBasedBriefing = async (category, duration = 1) => {
    // For time-based briefing, we get more articles for longer durations
    // This is a simple implementation - in a real app you might want to 
    // calculate the actual number of articles based on reading time
    const pageSizeMap = {
      1: 5,     // 1 minute: 5 articles
      3: 10,    // 3 minutes: 10 articles
      5: 15     // 5 minutes: 15 articles
    };
    
    const pageSize = pageSizeMap[duration] || DEFAULT_PARAMS.pageSize;
    
    return getHeadlinesByCategory(category, { pageSize });
  };

  // Return the service API
  return {
    getTopHeadlines,
    getHeadlinesByCategory,
    getTimeBasedBriefing
  };
}

export default createNewsService;
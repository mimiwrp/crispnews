/**
 * NewsService - Service to handle API calls to GNews.io API
 */

// Base URL for the GNews API
const API_BASE_URL = 'https://gnews.io/api/v4';

// Default parameters for API requests
const DEFAULT_PARAMS = {
  country: 'us',
  max: 5,
  lang: 'en'
};

// Available categories for news (GNews.io categories)
const CATEGORIES = ['general', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

// Rate limiting (GNews.io free tier: 100 requests/day)
const RATE_LIMIT = {
  requestsPerDay: 100,
  requestsPerMinute: 20 // GNews is more generous with minute limits
};

// Cache configuration
const CACHE_CONFIG = {
  // Cache duration in milliseconds (15 minutes)
  DURATION: 15 * 60 * 1000,
  // Cache key prefix
  PREFIX: 'gnews_cache_'
};

/**
 * Cache utility functions
 */
const cache = {
  /**
   * Generate a cache key from parameters
   * @param {Object} params - Request parameters
   * @returns {string} Cache key
   */
  generateKey: (params) => {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});
    return CACHE_CONFIG.PREFIX + JSON.stringify(sortedParams);
  },

  /**
   * Get cached data
   * @param {string} key - Cache key
   * @returns {Object|null} Cached data or null if expired/invalid
   */
  get: (key) => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is expired
      if (now - timestamp > CACHE_CONFIG.DURATION) {
        localStorage.removeItem(key);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },

  /**
   * Set data in cache
   * @param {string} key - Cache key
   * @param {Object} data - Data to cache
   */
  set: (key, data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  },

  /**
   * Clear all cached news data
   */
  clear: () => {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_CONFIG.PREFIX))
        .forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
};

/**
 * Creates a NewsService instance for handling GNews API requests
 * @param {string} apiKey - The API key for GNews API
 * @returns {Object} - NewsService object with methods for API interaction
 */
function createNewsService(apiKey) {
  if (!apiKey) {
    throw new Error('API key is required for NewsService');
  }

  // Track API usage
  let requestCount = 0;
  let lastRequestTime = Date.now();
  let requestsThisMinute = 0;

  /**
   * Check rate limits
   * @throws {Error} If rate limit is exceeded
   */
  const checkRateLimit = () => {
    const now = Date.now();
    if (now - lastRequestTime >= 60000) {
      requestsThisMinute = 0;
      lastRequestTime = now;
    }
    
    requestsThisMinute++;
    requestCount++;
    
    if (requestsThisMinute > RATE_LIMIT.requestsPerMinute) {
      throw new Error('Rate limit exceeded. Please try again in a minute.');
    }
    
    if (requestCount > RATE_LIMIT.requestsPerDay) {
      throw new Error('Daily request limit exceeded. Please try again tomorrow.');
    }
  };

  /**
   * Get top headlines
   * @param {Object} options - Options for the request
   * @param {string} options.category - Category of news
   * @param {string} options.country - Country code (default: 'us')
   * @param {number} options.max - Number of results (renamed from pageSize for GNews)
   * @param {string} options.q - Search query
   * @param {string} options.lang - Language code (default: 'en')
   * @returns {Promise<Object>} - Promise with the API response
   */
  const getTopHeadlines = async (options = {}) => {
    const params = {
      ...DEFAULT_PARAMS,
      ...options
    };

    // Map pageSize to max for backward compatibility
    if (options.pageSize && !options.max) {
      params.max = options.pageSize;
      delete params.pageSize;
    }

    // Validate category if provided
    if (params.category && !CATEGORIES.includes(params.category)) {
      throw new Error(`Invalid category. Must be one of: ${CATEGORIES.join(', ')}`);
    }

    // Check cache first
    const cacheKey = cache.generateKey(params);
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      if (import.meta.env.DEV) {
        console.log('Serving from cache:', cacheKey);
      }
      return cachedData;
    }

    // If not in cache, make API request
    checkRateLimit();

    // Construct URL with query parameters
    const queryParams = new URLSearchParams();
    
    // Add API token (GNews uses 'token' instead of 'apiKey')
    queryParams.append('token', apiKey);
    
    // Add other parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value && key !== 'pageSize') { // Skip pageSize as we use 'max'
        queryParams.append(key, value);
      }
    });

    const url = `${API_BASE_URL}/top-headlines?${queryParams.toString()}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your GNews API key.');
        }
        if (response.status === 403) {
          throw new Error('API quota exceeded. Please upgrade your GNews plan.');
        }
        
        const errorText = await response.text();
        throw new Error(`GNews API Error: ${errorText || response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform GNews response to match NewsAPI format for compatibility
      const transformedData = {
        status: 'ok',
        totalResults: data.totalArticles || data.articles?.length || 0,
        articles: data.articles || []
      };
      
      // Cache the response
      cache.set(cacheKey, transformedData);
      
      // Check if we're in development mode
      if (import.meta.env.DEV) {
        console.log(`API Usage: ${requestCount}/${RATE_LIMIT.requestsPerDay} requests today`);
      }
      
      return transformedData;
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
    const pageSizeMap = {
      1: 5,     // 1 minute: 5 articles
      3: 10,    // 3 minutes: 10 articles
      5: 15     // 5 minutes: 15 articles
    };
    
    const max = pageSizeMap[duration] || DEFAULT_PARAMS.max;
    
    return getHeadlinesByCategory(category, { max });
  };

  // Return the service API
  return {
    getTopHeadlines,
    getHeadlinesByCategory,
    getTimeBasedBriefing,
    clearCache: cache.clear
  };
}

export default createNewsService;
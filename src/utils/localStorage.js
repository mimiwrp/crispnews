/**
 * Save data to localStorage
 * @param {string} key - The key to store the data under
 * @param {any} value - The data to store
 */
export const saveToLocalStorage = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  /**
   * Load data from localStorage
   * @param {string} key - The key to retrieve data from
   * @param {any} defaultValue - The default value to return if key doesn't exist
   * @returns {any} The stored data or defaultValue
   */
  export const loadFromLocalStorage = (key, defaultValue = null) => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return defaultValue;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  };
import { createContext, useState, useEffect, useContext } from 'react';

// Define the default preferences
const defaultPreferences = {
  briefingDuration: 3, // Default to 3 minutes
  preferredCategories: ['Daily Highlights', 'Tech', 'Economy'], // Default categories
  audioSettings: {
    playbackSpeed: 1.0,
    voice: 'default'
  }
};

// Create the context
const PreferencesContext = createContext();

// Create a provider component
export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    // Load preferences from localStorage, or use defaults
    const saved = localStorage.getItem('crispNewsPreferences');
    const initialValue = saved ? JSON.parse(saved) : defaultPreferences;
    return initialValue;
  });

  // Update preferences function
  const updatePreferences = (newPreferences) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      return updated;
    });
  };

  // Save to localStorage whenever preferences change
  useEffect(() => {
    localStorage.setItem('crispNewsPreferences', JSON.stringify(preferences));
  }, [preferences]);

  // Reset preferences to default
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  // Value provided by context
  const value = {
    preferences,
    updatePreferences,
    resetPreferences
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

// Custom hook to use the preferences context
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
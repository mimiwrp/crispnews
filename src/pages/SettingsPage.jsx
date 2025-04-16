import React, { useState } from 'react';

const SettingsPage = () => {
  // State for selected values
  const [defaultDuration, setDefaultDuration] = useState(3);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0');
  const [voice, setVoice] = useState('default');
  const [categories, setCategories] = useState({
    'Economy': true,
    'Politics': true,
    'Finance': true, 
    'Tech': true,
    'Daily Highlights': true
  });

  // Handle category checkbox changes
  const handleCategoryChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category]
    });
  };

  // Handle form submission
  const handleSave = () => {
    // Here you would save settings to your state management system
    console.log('Saving settings:', { defaultDuration, playbackSpeed, voice, categories });
    // Add logic to save to Context/localStorage
  };

  // Reset to defaults
  const handleReset = () => {
    setDefaultDuration(3);
    setPlaybackSpeed('1.0');
    setVoice('default');
    setCategories({
      'Economy': true,
      'Politics': true,
      'Finance': true,
      'Tech': true,
      'Daily Highlights': true
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Preferences</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Default Briefing Duration</label>
          <div className="flex space-x-4">
            {[1, 3, 5].map((minutes) => (
              <button
                key={minutes}
                className={`px-4 py-2 rounded-md ${
                  minutes === defaultDuration
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setDefaultDuration(minutes)}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Preferred Categories</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.keys(categories).map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  className="h-4 w-4 text-primary-600 rounded"
                  checked={categories[category]}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={`category-${category}`} className="ml-2">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Audio Settings</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Playback Speed</label>
          <select 
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(e.target.value)}
          >
            <option value="0.8">Slow (0.8x)</option>
            <option value="1.0">Normal (1.0x)</option>
            <option value="1.2">Fast (1.2x)</option>
            <option value="1.5">Very Fast (1.5x)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Voice</label>
          <select 
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          className="btn btn-secondary mr-4"
          onClick={handleReset}
        >
          Reset to Defaults
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
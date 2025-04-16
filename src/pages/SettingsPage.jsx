import React from 'react';

const SettingsPage = () => {
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
                  minutes === 3
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Preferred Categories</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {['Economy', 'Politics', 'Finance', 'Tech', 'Daily Highlights'].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  className="h-4 w-4 text-primary-600 rounded"
                  defaultChecked={true}
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
          <select className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md">
            <option value="0.8">Slow (0.8x)</option>
            <option value="1.0" selected>Normal (1.0x)</option>
            <option value="1.2">Fast (1.2x)</option>
            <option value="1.5">Very Fast (1.5x)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Voice</label>
          <select className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md">
            <option value="default" selected>Default</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="btn btn-secondary mr-4">Reset to Defaults</button>
        <button className="btn btn-primary">Save Settings</button>
      </div>
    </div>
  );
};

export default SettingsPage;
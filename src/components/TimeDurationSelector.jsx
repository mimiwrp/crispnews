import React, { useState } from 'react';

const TimeDurationSelector = ({ onDurationChange, initialDuration = 3 }) => {
  const [selectedDuration, setSelectedDuration] = useState(initialDuration);
  
  // Duration options with descriptions
  const durations = [
    { 
      minutes: 1, 
      label: '1 min',
      description: 'Perfect for a quick update (1-2 articles)',
      icon: '⚡' // Lightning - quick
    },
    { 
      minutes: 3, 
      label: '3 min',
      description: 'Ideal for a coffee break (3-5 articles)',
      icon: '☕' // Coffee - medium
    },
    { 
      minutes: 5, 
      label: '5 min',
      description: 'Comprehensive briefing (5-8 articles)',
      icon: '📚' // Books - comprehensive
    }
  ];
  
  const handleDurationSelect = (minutes) => {
    setSelectedDuration(minutes);
    if (onDurationChange) {
      onDurationChange(minutes);
    }
  };
  
  // Find the selected duration object
  const selectedDurationObj = durations.find(d => d.minutes === selectedDuration);
  
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-3">How much time do you have?</h3>
      
      <div className="flex flex-wrap gap-3">
        {durations.map((duration) => (
          <button
            key={duration.minutes}
            onClick={() => handleDurationSelect(duration.minutes)}
            className={`
              rounded-lg text-center transition-all duration-200 py-3 px-6 
              ${selectedDuration === duration.minutes
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            <span className="font-medium">{duration.label}</span>
          </button>
        ))}
      </div>
      
      {/* Selected duration info */}
      <div className="mt-4 bg-primary-50 border border-primary-100 rounded-lg p-4 text-primary-800 flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center mr-3 text-xl">
          {selectedDurationObj.icon}
        </div>
        <div>
          <h4 className="font-semibold">{selectedDuration}-Minute Briefing</h4>
          <p className="text-sm">{selectedDurationObj.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TimeDurationSelector;
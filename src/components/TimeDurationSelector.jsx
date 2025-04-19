import React from 'react';

const TimeDurationSelector = ({ onDurationChange, initialDuration = 1 }) => {
  const durations = [
    { value: 1, label: '1 Minute' },
    { value: 3, label: '3 Minutes' },
    { value: 5, label: '5 Minutes' }
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">How much time do you have?</h2>
      <p className="text-gray-600 mb-4">Select a duration for your news briefing</p>
      
      <div className="flex flex-wrap gap-3">
        {durations.map((duration) => (
          <button
            key={duration.value}
            onClick={() => onDurationChange(duration.value)}
            className={`px-4 py-2 rounded-lg transition-all ${
              initialDuration === duration.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {duration.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeDurationSelector;
import React from 'react';

const TimeDurationSelector = ({ onDurationChange, initialDuration = 1 }) => {
  const durations = [
    { value: 1, label: '1 min' },
    { value: 3, label: '3 min' },
    { value: 5, label: '5 min' }
  ];

  return (
    <div class="flex items-center gap-10">
      <div className="text-lg font-semibold">Catch me up in</div>

      
      <div className="flex flex-wrap gap-3">
        {durations.map((duration) => (
          <button
            key={duration.value}
            onClick={() => onDurationChange(duration.value)}
            className={`px-4 py-2 rounded-lg transition-all ${
              initialDuration === duration.value
                ? 'bg-[#F4C44E] text-white'
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
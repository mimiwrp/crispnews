import React from 'react';

const TimeDurationSelector = ({ onDurationChange, initialDuration = 1 }) => {
  const durations = [
    { value: 1, label: '1 min' },
    { value: 3, label: '3 min' },
    { value: 5, label: '5 min' }
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
      <div className="text-lg font-semibold whitespace-nowrap">Catch me up in</div>
      
      <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
        {durations.map((duration) => (
          <button
            key={duration.value}
            onClick={() => onDurationChange(duration.value)}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
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
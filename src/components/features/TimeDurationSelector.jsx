import React, { useState } from'react';

const TimeDurationSelector = ({ onDurationChange, initialDuration = 3 }) => {
    const [ selectedDuration, setSelectedDuration ] = useState(initialDuration);
    const duration = [1, 3, 5]; //first initiative is 1 minute, then 3 minutes, then 5 minutes

    const handleDurationSelect = (duration) => {
        setSelectedDuration(duration);
        if (onDurationChange) {
            onDurationChange(duration);
        }
    };

    return (
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-3">I have time for a ...</h3>
            <div className="flex space-x-4">
                {duration.map((duration) => (
                    <button
                        key={duration}
                        onClick={() => handleDurationSelect(duration)}
                        className={`px-6 py-3 rounded-lg text-center transition-colors duration-200 ${
                            selectedDuration === duration
                                ? 'bg-primary-600 text-white font-medium shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <div className="text-xl font-bold">{duration}</div>
                        <div className="text-sm">minute briefing</div>
                    </button>
                ))}
            </div>
            <p className="mt-4 text-gray-600 text-sm">
                {selectedDuration === 1
                ? "Perfect for a quick update while waiting in line."
                : selectedDuration === 3
                ? "Ideal for a coffee break or short commute."
                : "Great for a deeper understanding of today's top stories."}
            </p>
        </div>
    );
};

export default TimeDurationSelector;
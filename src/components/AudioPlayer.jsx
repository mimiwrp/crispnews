import React, { useState, useEffect } from 'react';

const AudioPlayer = ({
  isPlaying,
  togglePlayPause,
  currentArticleIndex,
  totalArticles,
  selectedDuration,
  categoryDetails,
  briefingSummary,
  onClose
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Show player when playing starts, hide when playing stops
  useEffect(() => {
    if (isPlaying) {
      setIsVisible(true);
    }
  }, [isPlaying]);

  // Calculate progress percentage
  useEffect(() => {
    if (totalArticles > 0) {
      setProgress((currentArticleIndex / totalArticles) * 100);
    }
  }, [currentArticleIndex, totalArticles]);

  if (!isVisible || !briefingSummary) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  // Format time as MM:SS
  const formatTime = (minutes) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-primary-600 transition-all duration-300 relative"
          style={{ width: `${progress}%` }}
        >
          {/* Progress indicator dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-600 rounded-full shadow-md"></div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side - Category and Progress */}
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${categoryDetails?.bgClass || 'bg-primary-600'}`}>
            <span>{categoryDetails?.emoji || '📰'}</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {categoryDetails?.name || 'Briefing'} • {selectedDuration} min
            </h3>
            <div className="text-xs text-gray-500">
              {currentArticleIndex} of {totalArticles} articles
            </div>
          </div>
        </div>

        {/* Center - Time Progress */}
        <div className="flex-1 mx-8 flex items-center justify-center">
          <div className="text-sm text-gray-600">
            {formatTime(currentArticleIndex / totalArticles * selectedDuration)} / {formatTime(selectedDuration)}
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={togglePlayPause}
            className="btn flex items-center justify-center w-20 h-20 rounded-full hover:bg-gray-100 transition-colors"
            title={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="Close player"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer; 
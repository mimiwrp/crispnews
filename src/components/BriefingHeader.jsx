import React, { useState } from 'react';

const BriefingHeader = ({
  isPlaying,
  togglePlayPause,
  currentBriefing,
  currentArticleIndex,
  selectedDuration,
  selectedCategory,
  categoryDetails,
  isGenerating,
  briefingSummary,
  isTTSSupported = true // New prop for TTS support
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log('Saving briefing:', currentBriefing);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="text-xl sm:text-2xl font-bold flex-shrink-0">Briefing</h2>
        
        {/* Audio Controls and Save Button */}
        {currentBriefing.length > 0 && briefingSummary && (
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 absolute sm:relative top-0 right-0 sm:top-auto sm:right-auto">
            {isTTSSupported ? (
              <button 
                onClick={togglePlayPause}
                className="btn flex items-center gap-1 sm:gap-2 text-sm sm:text-base px-2 sm:px-4 py-2"
                title={isPlaying ? "Pause audio" : "Listen to briefing"}
              >
                {isPlaying ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden sm:inline">Listen</span>
                  </>
                )}
              </button>
            ) : (
              <div className="text-xs sm:text-sm text-gray-500 italic">
                Audio not supported
              </div>
            )}
            <button 
              onClick={handleSave}
              className="btn btn-icon transition-colors duration-200 p-2"
              title={isSaved ? "Unsave briefing" : "Save briefing"}
            >
              {isSaved ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m17 21-5-4-5 4V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v18z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Dynamic content based on briefing state */}
      {isGenerating ? (
        <div className="flex items-center gap-3 text-gray-600">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
          <p className="text-sm sm:text-base">Generating your personalized {categoryDetails?.name || selectedCategory} briefing...</p>
        </div>
      ) : briefingSummary ? (
        <div className="space-y-4">
          {/* Process briefing content - split by bullet points and paragraphs */}
          {(() => {
            // Split by double newlines first (paragraphs)
            const paragraphs = briefingSummary.split('\n\n').filter(paragraph => paragraph.trim());
            
            return paragraphs.map((paragraph, paragraphIndex) => {
              // Check if this paragraph contains bullet points (only •)
              const hasBullets = paragraph.includes('•');
              
              if (hasBullets) {
                // Split bullet points and display each on its own line
                const bullets = paragraph
                  .split(/(?=\s*•)/) // Split only on • bullet indicators
                  .filter(bullet => bullet.trim())
                  .map(bullet => bullet.trim());
                
                return (
                  <div key={paragraphIndex} className="space-y-2 sm:space-y-3">
                    {bullets.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex items-start gap-2 sm:gap-3">
                        <div className="text-gray-800 leading-relaxed text-sm sm:text-base flex-1">
                          {bullet}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              } else {
                // Regular paragraph without bullets
                return (
                  <p key={paragraphIndex} className="text-gray-800 leading-relaxed text-sm sm:text-base">
                    {paragraph.trim()}
                  </p>
                );
              }
            });
          })()}
          <div className="text-xs sm:text-sm text-gray-500 mt-3 pt-3 border-t border-gray-200">
            {selectedDuration} minute {categoryDetails?.name || selectedCategory} briefing • {currentBriefing.length} articles
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-sm sm:text-base">
          Your personalized {categoryDetails?.name || selectedCategory} briefing will provide you with the most important news in just {selectedDuration} minute{selectedDuration > 1 ? 's' : ''}. Select your options above and click "Generate" to create your briefing.
        </p>
      )}

      {/* Progress Bar (for audio) */}
      {isPlaying && currentBriefing.length > 0 && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 rounded-full"
              style={{ width: `${(currentArticleIndex / currentBriefing.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs sm:text-sm text-gray-500 flex justify-between">
            <span>{currentArticleIndex} of {currentBriefing.length} articles</span>
            <span>
              {Math.floor(currentArticleIndex / currentBriefing.length * selectedDuration)} min of {selectedDuration} min
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BriefingHeader;
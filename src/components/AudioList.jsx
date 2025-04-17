const AudioPlayer = ({ article, categoryId, onPlay, onPause, isPlaying }) => {
    const categoryClasses = getCategoryIconClass(categoryId);
    
    return (
      <div className="flex items-center space-x-3">
        <button 
          onClick={isPlaying ? onPause : onPlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${categoryClasses} text-white`}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <div className="text-sm font-medium">{article.title}</div>
          <div className="text-xs text-gray-500">{Math.ceil(article.wordCount / 250)} min</div>
        </div>
      </div>
    );
  };
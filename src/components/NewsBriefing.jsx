import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBriefing } from '../context/BriefingContext';
import { getCategoryById, getCategoryIconClass } from '../utils/categoryStyles';

/**
 * NewsBriefing component for displaying news articles
 * Uses the BriefingContext to manage state
 */
function NewsBriefing() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  // Get briefing data from context
  const { 
    selectedDuration,
    setSelectedDuration,
    selectedCategory,
    setSelectedCategory,
    currentBriefing,
    isLoading,
    error,
    generateBriefing
  } = useBriefing();
  
  // State for audio playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  
  // Update selected category when route param changes
  // But only if they're actually different to prevent loops
  useEffect(() => {
    if (categoryId && categoryId !== selectedCategory) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);  // Remove selectedCategory from dependencies
  
  // Update route when category changes manually (from button click)
  // This should not respond to the selectedCategory state changes from the above effect
  const handleCategoryChange = (newCategory) => {
    if (newCategory !== selectedCategory) {
      setSelectedCategory(newCategory);
      navigate(`/briefing/${newCategory}`);
      setCurrentArticleIndex(0);
    }
  };
  
  // Generate briefing when component mounts or params change
  useEffect(() => {
    // Only generate if we have a category selected and no articles
    if (selectedCategory && currentBriefing.length === 0 && !isLoading) {
      generateBriefing().catch(err => {
        console.error('Error generating briefing:', err);
      });
    }
  }, [selectedCategory, currentBriefing.length, isLoading, generateBriefing]);
  
  // Toggle play/pause for audio version
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Handle duration change
  const handleDurationChange = (newDuration) => {
    if (newDuration !== selectedDuration) {
      setSelectedDuration(newDuration);
      setCurrentArticleIndex(0);
      generateBriefing().catch(err => {
        console.error('Error generating briefing:', err);
      });
    }
  };
  
  // Available categories
  const categories = [
    { id: 'highlights', label: 'Daily Highlights' },
    { id: 'technology', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'science', label: 'Science' },
    { id: 'sports', label: 'Sports' }
  ];
  
  // Available durations
  const durations = [
    { value: 1, label: '1 Minute' },
    { value: 3, label: '3 Minutes' },
    { value: 5, label: '5 Minutes' }
  ];

  // Display loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="card p-8 text-center">
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-700">Loading news briefing...</p>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="card bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Get current category details
  const categoryDetails = getCategoryById(selectedCategory);

  // Display articles
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Briefing Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-700">
          {categoryDetails?.name || selectedCategory} Briefing
          <span className="ml-2 text-sm text-gray-500 font-normal">
            {selectedDuration} minute{selectedDuration > 1 ? 's' : ''}
          </span>
        </h1>
        
        {/* Audio Controls */}
        <div className="mt-3 sm:mt-0 flex items-center">
          <button 
            onClick={togglePlayPause}
            className="btn flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Listen
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Category & Duration Selectors */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {durations.map((dur) => (
            <button
              key={dur.value}
              className={`btn ${selectedDuration === dur.value ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleDurationChange(dur.value)}
            >
              {dur.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Progress Bar (for audio) */}
      {isPlaying && currentBriefing.length > 0 && (
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 rounded-full" 
              style={{ width: `${(currentArticleIndex / currentBriefing.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-500 flex justify-between">
            <span>{currentArticleIndex} of {currentBriefing.length} articles</span>
            <span>
              {Math.floor(currentArticleIndex / currentBriefing.length * selectedDuration)} min of {selectedDuration} min
            </span>
          </div>
        </div>
      )}
      
      {currentBriefing.length === 0 ? (
        <p className="card p-6 text-center text-gray-600">No articles found for this category.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {currentBriefing.map((article, index) => (
            <article key={index} className="card flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow">
              {article.urlToImage && (
                <div className="w-full md:w-48 flex-shrink-0">
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-full h-48 md:h-32 object-cover rounded-md"
                  />
                </div>
              )}
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-primary-600"
                  >
                    {article.title}
                  </a>
                </h3>
                
                {article.description && (
                  <p className="text-gray-700 mb-4 line-clamp-3">{article.description}</p>
                )}
                
                <div className="mt-auto flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                  {article.author && (
                    <span className="font-medium">
                      By {article.author}
                    </span>
                  )}
                  {article.publishedAt && (
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                  <span className="font-medium text-primary-600">
                    {article.source.name}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsBriefing;
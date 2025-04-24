import React from 'react';

const NewsContent = ({ 
  isLoading,
  error,
  currentBriefing
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Display loading state */}
      {isLoading && (
        <div className="card p-8 text-center">
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-700">Loading news briefing...</p>
        </div>
      )}
      
      {/* Display error state */}
      {error && (
        <div className="card bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}
      
      {/* Display articles */}
      {!isLoading && !error && (
        <>
          {currentBriefing.length === 0 ? (
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-gray-500 italic">News articles for your briefing will appear here.</p>
            </div>
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
        </>
      )}
    </div>
  );
};

export default NewsContent;
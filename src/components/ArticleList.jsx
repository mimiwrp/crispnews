const ArticleList = ({ articles, categoryId }) => {
    // Get category styling
    const categoryStyles = getCategoryStyles(categoryId);
    
    return (
      <div className="space-y-3">
        {articles.map((article, index) => (
          <div 
            key={article.id}
            className={`p-4 rounded-lg border ${index === 0 ? categoryStyles.bgClass : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className={`w-8 h-8 rounded-full flex-shrink-0 ${categoryStyles.iconClass} text-white flex items-center justify-center mr-3`}>
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{article.title}</h3>
                  <p className="text-sm text-gray-500">{article.source} • {article.publishedAt}</p>
                </div>
              </div>
              <div className={`text-sm ${categoryStyles.textClass} font-medium`}>
                {Math.ceil(article.wordCount / 250)} min
              </div>
            </div>
            
            <p className="mt-2 text-gray-700">{article.summary}</p>
            
            <div className="mt-3 flex justify-between items-center">
              <button className={`text-sm ${categoryStyles.textClass} font-medium flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Listen
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Read full article
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
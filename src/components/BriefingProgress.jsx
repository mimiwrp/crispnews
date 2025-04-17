const BriefingProgress = ({ duration, elapsed, categoryId }) => {
    // Calculate percentage
    const percentage = Math.min(100, Math.round((elapsed / (duration * 60)) * 100));
    
    // Get styling based on category
    const categoryClasses = getCategoryIconClass(categoryId);
    
    return (
      <div className="flex flex-col">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${categoryClasses}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>
            {Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, '0')}
          </span>
          <span>
            {duration}:00
          </span>
        </div>
      </div>
    );
  };
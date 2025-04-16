import React from 'react';

const BriefingPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your News Briefing</h1>
        <div className="flex space-x-4">
          <button className="btn btn-primary">
            Play All
          </button>
          <div className="bg-gray-200 rounded-full px-4 py-2 flex items-center">
            <span className="mr-2">3min</span>
            <span className="block w-2 h-2 rounded-full bg-primary-600"></span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary-600 w-1/3"></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>0:00</span>
          <span>3:00</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* ArticleList component will go here */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Loading news articles...</h2>
          <p className="text-gray-600">Your briefing is being prepared.</p>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
        {/* AudioPlayer component will go here */}
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button className="bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4">
              ▶
            </button>
            <div>
              <div className="font-bold">Now playing...</div>
              <div className="text-sm text-gray-600">Loading article title</div>
            </div>
          </div>
          <div className="flex-1 mx-6">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary-600 w-1/4"></div>
            </div>
          </div>
          <div className="text-sm text-gray-600">0:30 / 2:15</div>
        </div>
      </div>
    </div>
  );
};

export default BriefingPage;
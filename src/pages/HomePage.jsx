import React, { useState } from 'react';
import { Link } from 'react-router-dom';   
import TimeDurationSelector from '../components/features/TimeDurationSelector';
import CategorySelector from '../components/features/CategorySelector';
import { NEWS_CATEGORIES } from '../utils/categoryConstants';

const HomePage = () => {
    const [ selectedDuration, setSelectedDuration ] = useState(3);
    const [ selectedCategory, setSelectedCategory ] = useState('highlights');

    const handleStartBriefing = () => {
        // This would typically navigate to the briefing page with the selected options
        // For now, we'll just log the selections
        console.log(`Starting ${selectedDuration} minute briefing on ${selectedCategory}`);
    };

    return (
        <div>
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-6">Stay Informed, Efficiently</h1>
            <p className="text-lg mb-6 text-gray-600">
                Get personalized news briefings in just 1, 3, or 5 minutes. Choose your categories
                and let our AI do the rest.
            </p>
            <Link
                to="/briefing"
                className="btn btn-primary inline-block"
                onClick={handleStartBriefing}
            >
                Start My Briefing
            </Link>
          </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-lg shadow-md p-6">
                <TimeDurationSelector 
                    onDurationChange={setSelectedDuration} 
                    initialDuration={selectedDuration} 
                />
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                <CategorySelector 
                    onCategoryChange={setSelectedCategory} 
                    initialCategory={selectedCategory} 
                />
                </div>
            </div>
          
            <section className="mb-8">
                <h2 className="section-title">Featured Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* FeaturedCategories component will go here */}
                    {NEWS_CATEGORIES.map((category) => (
                        <div 
                            key={category.id} 
                            className={`bg-white rounded-lg shadow-md p-4 text-center cursor-pointer 
                                hover:shadow-lg transition-shadow border-t-4 border-${category.color}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-${category.color} text-white`}>
                                {category.name.charAt(0)}
                            </div>
                            <h3 className="font-bold mb-1">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                <h2 className="text-xl font-bold mb-3">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-700 font-bold">1</div>
                        <h3 className="font-bold mb-2">Select Your Time</h3>
                        <p className="text-sm text-gray-600">Choose how much time you have available for your news briefing.</p>
                    </div>
                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-700 font-bold">2</div>
                        <h3 className="font-bold mb-2">Pick a Category</h3>
                        <p className="text-sm text-gray-600">Select from our curated news categories or view daily highlights.</p>
                    </div>
                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-700 font-bold">3</div>
                        <h3 className="font-bold mb-2">Enjoy Your Briefing</h3>
                        <p className="text-sm text-gray-600">Read or listen to AI-summarized news tailored to your preferences.</p>
                    </div>
                </div>
            </section>

        </div>
      );
};

export default HomePage;
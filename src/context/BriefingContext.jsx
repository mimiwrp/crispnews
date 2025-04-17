import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const BriefingContext = createContext();

// Sample mock articles for demo purposes
const MOCK_ARTICLES = {
  highlights: [
    {
      id: 1,
      title: "Global Leaders Agree on New Climate Initiative",
      source: "World News",
      publishedAt: "2 hours ago",
      summary: "Representatives from 40 countries have agreed to a new climate initiative that aims to reduce carbon emissions by 50% before 2035. The agreement includes funding mechanisms for developing nations.",
      wordCount: 145,
      isRead: false
    },
    {
      id: 2,
      title: "Major Tech Company Unveils Breakthrough AI Model",
      source: "Tech Today",
      publishedAt: "3 hours ago",
      summary: "A leading technology company has announced a new AI model capable of solving complex scientific problems that previously required months of supercomputer time. Researchers say this could accelerate discoveries in medicine and materials science.",
      wordCount: 168,
      isRead: false
    },
    {
      id: 3,
      title: "Stock Markets Rally on Economic Recovery Signs",
      source: "Financial Times",
      publishedAt: "Yesterday",
      summary: "Global stock markets rallied today following better-than-expected job numbers and manufacturing data. Analysts suggest this could indicate the economy is recovering faster than initially predicted.",
      wordCount: 126,
      isRead: false
    }
  ],
  economy: [
    {
      id: 1,
      title: "Inflation Rate Drops to 3-Year Low",
      source: "Economic Review",
      publishedAt: "1 hour ago",
      summary: "The latest inflation figures show a significant drop to a three-year low of 2.1%, suggesting that central bank policies are beginning to have their intended effect. Economists predict this may lead to interest rate cuts in the coming months.",
      wordCount: 152,
      isRead: false
    },
    {
      id: 2,
      title: "Housing Market Showing Signs of Stability",
      source: "Property Insights",
      publishedAt: "5 hours ago",
      summary: "After months of volatility, the housing market is showing signs of stabilization with steady prices and increased transaction volumes. Real estate experts attribute this to improved mortgage accessibility and balanced supply-demand dynamics.",
      wordCount: 143,
      isRead: false
    },
    {
      id: 3,
      title: "Small Business Confidence Index Reaches Post-Pandemic High",
      source: "Business Daily",
      publishedAt: "Yesterday",
      summary: "The Small Business Confidence Index has reached its highest level since the pandemic began, with owners reporting increased sales, hiring plans, and capital expenditure intentions. This positive outlook may signal broader economic strengthening.",
      wordCount: 159,
      isRead: false
    }
  ],
  politics: [
    {
      id: 1,
      title: "Senate Passes Comprehensive Infrastructure Bill",
      source: "Capitol Report",
      publishedAt: "3 hours ago",
      summary: "The Senate has passed a comprehensive infrastructure bill with bipartisan support, allocating $1.2 trillion for roads, bridges, public transit, broadband, and other critical infrastructure projects nationwide. The bill now moves to the House for final approval.",
      wordCount: 162,
      isRead: false
    },
    {
      id: 2,
      title: "New Polling Shows Shifting Voter Priorities",
      source: "Political Pulse",
      publishedAt: "Yesterday",
      summary: "Recent national polling indicates a significant shift in voter priorities, with economic concerns and healthcare overtaking immigration as top issues. Analysts suggest this could reshape campaign strategies for upcoming elections.",
      wordCount: 135,
      isRead: false
    },
    {
      id: 3,
      title: "International Diplomatic Summit Announced",
      source: "Global Affairs",
      publishedAt: "Yesterday",
      summary: "World leaders will convene next month for a major diplomatic summit addressing global security challenges, trade relationships, and climate cooperation. The meeting is expected to result in several multilateral agreements.",
      wordCount: 140,
      isRead: false
    }
  ],
  finance: [
    {
      id: 1,
      title: "Major Bank Announces Digital Currency Initiative",
      source: "Banking Times",
      publishedAt: "4 hours ago",
      summary: "One of the world's largest banks has announced plans to launch its own digital currency platform, allowing institutional clients to settle transactions instantly. This move signals growing mainstream acceptance of blockchain technology in financial services.",
      wordCount: 175,
      isRead: false
    },
    {
      id: 2,
      title: "Investment in Sustainable Funds Reaches Record High",
      source: "Investment Daily",
      publishedAt: "Yesterday",
      summary: "Global investment in sustainable and ESG-focused funds has reached a record $1.2 trillion, reflecting growing investor commitment to environmental and social governance factors. Fund managers report increasing client demand for green investment options.",
      wordCount: 168,
      isRead: false
    },
    {
      id: 3,
      title: "New Regulations for Cryptocurrency Markets Proposed",
      source: "Crypto News",
      publishedAt: "Yesterday",
      summary: "Financial regulators have proposed a new framework for cryptocurrency markets, aiming to protect investors while encouraging innovation. The proposed rules address market manipulation, custody standards, and disclosure requirements.",
      wordCount: 145,
      isRead: false
    }
  ],
  tech: [
    {
      id: 1,
      title: "AI Makes Breakthrough in Quantum Computing Problem",
      source: "Tech Chronicle",
      publishedAt: "2 hours ago",
      summary: "Researchers have announced that a new AI system has solved a previously intractable quantum computing optimization problem, potentially speeding up the development of practical quantum computers by several years.",
      wordCount: 133,
      isRead: false
    },
    {
      id: 2,
      title: "Major Browser Update Introduces Enhanced Privacy Features",
      source: "Digital Trends",
      publishedAt: "4 hours ago",
      summary: "The latest update to one of the world's most popular web browsers includes new features that block advanced tracking techniques and give users more control over their privacy settings.",
      wordCount: 156,
      isRead: false
    },
    {
      id: 3,
      title: "Startup Unveils Revolutionary Battery Technology",
      source: "Innovation Daily",
      publishedAt: "Yesterday",
      summary: "A Silicon Valley startup has demonstrated a new battery technology that promises to double the energy density of current lithium-ion batteries while reducing charging time by 80%. Industry experts say this could accelerate EV adoption.",
      wordCount: 178,
      isRead: false
    },
    {
      id: 4,
      title: "Tech Giants Announce Interoperability Standards",
      source: "TechWire",
      publishedAt: "Yesterday",
      summary: "Several major technology companies have agreed to new interoperability standards that will allow their smart home devices to work together seamlessly, potentially ending years of compatibility issues for consumers.",
      wordCount: 145,
      isRead: false
    }
  ]
};

// Provider component
export const BriefingProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('highlights');
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [currentBriefing, setCurrentBriefing] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  
  // Load from localStorage on initial render
  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    const savedDuration = localStorage.getItem('selectedDuration');
    
    if (savedCategory) setSelectedCategory(savedCategory);
    if (savedDuration) setSelectedDuration(parseInt(savedDuration, 10));
  }, []);
  
  // Save to localStorage when preferences change
  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
    localStorage.setItem('selectedDuration', selectedDuration.toString());
  }, [selectedCategory, selectedDuration]);
  
  // Function to generate a new briefing
  const generateBriefing = async () => {
    // In a real app, this would fetch from your API and use AI for summarization
    // Here we're just using mock data based on the selected category

    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get articles for the selected category
    const categoryArticles = MOCK_ARTICLES[selectedCategory] || MOCK_ARTICLES.highlights;
    
    // Adjust the number of articles based on duration
    let articlesToInclude;
    if (selectedDuration === 1) {
      articlesToInclude = categoryArticles.slice(0, 2); // 1-2 articles for 1 min
    } else if (selectedDuration === 3) {
      articlesToInclude = categoryArticles.slice(0, Math.min(4, categoryArticles.length)); // 3-4 articles for 3 min
    } else {
      articlesToInclude = categoryArticles; // All articles for 5 min
    }
    
    // Create the briefing
    const briefing = {
      id: Date.now(),
      categoryId: selectedCategory,
      duration: selectedDuration,
      createdAt: new Date(),
      articles: articlesToInclude,
      progress: 0
    };
    
    setCurrentBriefing(briefing);
    return briefing;
  };
  
  // Mark an article as read
  const markArticleAsRead = (articleId) => {
    if (!currentBriefing) return;
    
    const updatedBriefing = {
      ...currentBriefing,
      articles: currentBriefing.articles.map(article => 
        article.id === articleId ? { ...article, isRead: true } : article
      )
    };
    
    setCurrentBriefing(updatedBriefing);
  };
  
  // Update briefing progress
  const updateProgress = (progress) => {
    if (!currentBriefing) return;
    
    setCurrentBriefing({
      ...currentBriefing,
      progress
    });
  };
  
  // Reset the briefing
  const resetBriefing = () => {
    setCurrentBriefing(null);
    setCurrentArticleIndex(0);
  };
  
  return (
    <BriefingContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedDuration,
        setSelectedDuration,
        currentBriefing,
        generateBriefing,
        isPlaying,
        setIsPlaying,
        currentArticleIndex,
        setCurrentArticleIndex,
        markArticleAsRead,
        updateProgress,
        resetBriefing
      }}
    >
      {children}
    </BriefingContext.Provider>
  );
};

// Custom hook to use the briefing context
export const useBriefing = () => {
  const context = useContext(BriefingContext);
  if (!context) {
    throw new Error('useBriefing must be used within a BriefingProvider');
  }
  return context;
};

export default BriefingContext;
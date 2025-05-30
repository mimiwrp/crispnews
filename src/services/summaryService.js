// Updated summaryService.js with better briefing approach

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 🎯 NEW: Generate a cohesive briefing from multiple articles
export const generateBriefingSummary = async (articles, categoryId, selectedDuration) => {
  console.log(`🎯 Generating ${selectedDuration}-minute briefing for ${articles.length} articles`);

  // Define word limits based on reading time (250 words per minute)
  const wordLimits = {
    1: 200,  // 1 minute = ~200 words
    3: 600,  // 3 minutes = ~600 words  
    5: 1000  // 5 minutes = ~1000 words
  };

  const targetWords = wordLimits[selectedDuration] || 200;

  const categoryContext = {
    highlights: "the most important news of the day",
    economy: "economic developments and market trends",
    politics: "political developments and policy changes",
    finance: "financial markets and investment news",
    tech: "technology innovations and industry updates",
    business: "business developments and corporate news",
    science: "scientific discoveries and research",
    sports: "sports news and highlights"
  };

  // Create article summaries for the prompt
  const articleSummaries = articles.map((article, index) => 
    `${index + 1}. ${article.title}\n${article.description || article.content?.substring(0, 200) || 'No description available'}`
  ).join('\n\n');

  const prompt = `
Create a smooth, cohesive news briefing about ${categoryContext[categoryId] || 'current news'} in exactly ${targetWords} words.

Write this as a single flowing narrative that transitions naturally between topics. Use phrases like "Meanwhile," "In other news," "Additionally," and "On the business front" to connect stories.

Structure:
- Start with the most important story
- Flow naturally to the next most important stories
- End with a brief outlook or summary statement

Tone: Professional but conversational, like a skilled news anchor

Here are the ${articles.length} articles to include:

${articleSummaries}

Write a ${targetWords}-word briefing that flows as one cohesive piece, not separate summaries.`;

  try {
    console.log('🚀 Generating cohesive briefing...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: Math.ceil(targetWords * 1.5), // Dynamic token limit
          topP: 0.8,
          topK: 10
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const briefing = data.candidates[0].content.parts[0].text.trim();
      console.log('✅ Generated cohesive briefing:', briefing.substring(0, 100) + '...');
      return briefing;
    } else {
      throw new Error('Invalid response structure from Gemini API');
    }
  } catch (error) {
    console.error('💥 Error generating briefing:', error);
    return `Unable to generate briefing. Here are the key stories: ${articles.map(a => a.title).join('; ')}`;
  }
};

// 🎯 KEEP the original function for individual article summaries (if needed elsewhere)
export const generateSummary = async (article, categoryId, targetLength = 'short') => {
  const lengthGuides = {
    short: "about 30 words",     // Much shorter
    medium: "about 50 words",    // Shorter
    long: "about 80 words"       // Still shorter
  };

  const prompt = `Summarize this in ${lengthGuides[targetLength]}: ${article.title}. ${article.description || article.content}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 120, // Much smaller limit
          topP: 0.8,
          topK: 10
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error generating summary:', error);
    return article.description || 'Summary unavailable';
  }
};
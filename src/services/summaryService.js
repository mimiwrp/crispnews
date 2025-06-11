// Updated summaryService.js with bullet point briefing approach

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 🎯 NEW: Generate a cohesive briefing from multiple articles
export const generateBriefingSummary = async (articles, categoryId, selectedDuration) => {
  console.log(`🎯 Generating ${selectedDuration}-minute briefing for ${articles.length} articles`);

  // Define bullet point structure based on duration
  const briefingConfig = {
    1: {
      bulletPoints: 3,
      wordsPerBullet: 25,
      totalWords: 75,
      structure: "3 bullet points covering the most important news"
    },
    3: {
      bulletPoints: 6,
      wordsPerBullet: 30,
      totalWords: 180,
      structure: "6 bullet points covering key stories and developments"
    },
    5: {
      bulletPoints: 10,
      wordsPerBullet: 35,
      totalWords: 350,
      structure: "10 bullet points providing comprehensive coverage"
    }
  };

  const config = briefingConfig[selectedDuration] || briefingConfig[1];

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
Create a concise news briefing about ${categoryContext[categoryId] || 'current news'} in bullet point format.

STRUCTURE REQUIREMENTS:
- Write exactly ${config.bulletPoints} bullet points
- Each bullet point should be ${config.wordsPerBullet}-${config.wordsPerBullet + 10} words
- Total length: approximately ${config.totalWords} words
- Order by importance (most newsworthy first)

FORMATTING REQUIREMENTS:
- Use bullet points (•) not numbers
- Each bullet point should be one clear, complete sentence
- Start each point with the key fact or development
- Include specific details like numbers, names, locations when relevant
- Write in active voice and present tense when possible

CONTENT GUIDELINES:
- Focus on what happened, who was involved, and why it matters
- Include the most impactful and newsworthy information first
- Be specific and factual
- Avoid redundancy between bullet points
- Each point should cover a distinct story or angle

Here are the ${articles.length} articles to synthesize:

${articleSummaries}

Generate exactly ${config.bulletPoints} bullet points, each ${config.wordsPerBullet}-${config.wordsPerBullet + 10} words.`;

  try {
    console.log('🚀 Generating bullet point briefing...');
    
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
          maxOutputTokens: Math.ceil(config.totalWords * 1.4), // Dynamic token limit with buffer
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
      console.log(`✅ Generated ${config.bulletPoints}-point briefing:`, briefing.substring(0, 100) + '...');
      return briefing;
    } else {
      throw new Error('Invalid response structure from Gemini API');
    }
  } catch (error) {
    console.error('💥 Error generating briefing:', error);
    return `• ${articles.map(a => a.title).slice(0, config.bulletPoints).join('\n• ')}`;
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
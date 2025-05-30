// Updated summaryService.js with better briefing approach

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 🎯 NEW: Generate a cohesive briefing from multiple articles
export const generateBriefingSummary = async (articles, categoryId, selectedDuration) => {
  console.log(`🎯 Generating ${selectedDuration}-minute briefing for ${articles.length} articles`);

  // Define paragraph structure and word limits based on duration
  const briefingConfig = {
    1: {
      paragraphs: 1,
      wordsPerParagraph: 180,
      totalWords: 180,
      structure: "Write as 1 comprehensive paragraph that covers the most important story with key context."
    },
    3: {
      paragraphs: 3,
      wordsPerParagraph: 180,
      totalWords: 540,
      structure: "Write as exactly 3 paragraphs:\n- Paragraph 1: Most important/breaking news story\n- Paragraph 2: Second most significant story\n- Paragraph 3: Additional important developments and brief outlook"
    },
    5: {
      paragraphs: 5,
      wordsPerParagraph: 160,
      totalWords: 800,
      structure: "Write as exactly 5 paragraphs:\n- Paragraph 1: Most important/breaking news story\n- Paragraph 2: Second most significant story\n- Paragraph 3: Third important story or related developments\n- Paragraph 4: Additional news items and market/political context\n- Paragraph 5: Summary and outlook"
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
Create a professional news briefing about ${categoryContext[categoryId] || 'current news'}.

STRUCTURE REQUIREMENTS:
${config.structure}

FORMATTING REQUIREMENTS:
- Write exactly ${config.paragraphs} paragraph${config.paragraphs > 1 ? 's' : ''}
- Each paragraph should be approximately ${config.wordsPerParagraph} words
- Total length: approximately ${config.totalWords} words
- Use smooth transitions between paragraphs with phrases like "Meanwhile," "In related news," "Additionally," etc.
- Start each paragraph with a clear topic sentence
- Write in a professional, news anchor style

CONTENT GUIDELINES:
- Focus on the most newsworthy and impactful stories first
- Include specific details, numbers, and context where available
- Connect related stories logically
- End with forward-looking context or implications

Here are the ${articles.length} articles to synthesize:

${articleSummaries}

Remember: Write exactly ${config.paragraphs} paragraph${config.paragraphs > 1 ? 's' : ''}, approximately ${config.totalWords} words total.`;

  try {
    console.log('🚀 Generating structured briefing...');
    
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
      console.log(`✅ Generated ${config.paragraphs}-paragraph briefing:`, briefing.substring(0, 100) + '...');
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
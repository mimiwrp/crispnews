// src/services/summaryService.js
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateSummary = async (article, categoryId, targetLength = 'medium') => {
  const lengthGuides = {
    short: "about 50 words",
    medium: "about 100 words",
    long: "about 150 words"
  };
  
  const categoryPrompts = {
    highlights: "Focus on the key events and why they matter",
    economy: "Focus on economic impacts, numbers, and trends",
    politics: "Focus on policy implications and political context",
    finance: "Focus on market impacts and investment implications",
    tech: "Focus on innovations, technical details, and industry impact"
  };
  
  const prompt = `
    Summarize this news article in ${lengthGuides[targetLength]}. 
    ${categoryPrompts[categoryId] || categoryPrompts.highlights}
    Keep the tone informative and concise.
    
    Article: ${article.title}
    
    ${article.content || article.description}
  `;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 200
      })
    });
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating summary:', error);
    return article.description || 'Summary unavailable';
  }
};
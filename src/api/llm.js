import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_API_KEY; 

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true, 
  defaultHeaders: {
    "HTTP-Referer": window.location.origin,
    "X-Title": "Scaler Assignment" 
  }
});

export const fetchChatResponseStream = async function* (chatHistory, systemPrompt) {
  const messages = [{ role: "system", content: systemPrompt }, ...chatHistory];

  const completion = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free", 
    messages: messages,
    temperature: 0.7,
    stream: true
  });

  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || '';
    yield { reasoning: '', content: content };
  }
};
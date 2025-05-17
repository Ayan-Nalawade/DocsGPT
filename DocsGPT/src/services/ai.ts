import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with your API key
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export async function generateResponse(messages: ChatMessage[]): Promise<string> {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Convert our messages to the format expected by the API
    const chatHistory = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    // Start a chat session
    const chat = model.startChat({
      history: chatHistory.slice(0, -1), // All messages except the latest one
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Send the most recent message
    const latestMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(latestMessage.content);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Sorry, I encountered an error while processing your request. Please try again.';
  }
}
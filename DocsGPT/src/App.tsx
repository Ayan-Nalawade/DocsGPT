import React from 'react';
import Chat from './components/Chat';
import { Bot } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col">
        <header className="mb-4">
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
              <Bot size={24} className="text-white" />
            </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-800">Gemini Chatbot</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Ask me anything! I'm powered by Google's Gemini AI and I'm here to help answer your questions related to your work.
          </p>
        </header>
        
        <div className="bg-white rounded-xl shadow-lg flex-1 overflow-hidden flex flex-col border border-gray-200">
          <Chat />
        </div>
        
        <footer className="mt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Made by devs of DocsGPT
        </footer>
      </div>
    </div>
  );
}

export default App;
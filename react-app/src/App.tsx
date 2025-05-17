import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Home, Menu, X, Sun, Moon } from 'lucide-react';
import DocViewer from './components/DocViewer';
import DocEditor from './components/DocEditor';
import CommentingSystem from './components/CommentingSystem';
import AIAssistant from './components/AIAssistant';
import FlashcardStudy from './components/FlashcardStudy';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        theme === 'dark' 
          ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
          : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
      } transition-colors`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

const AppContent = () => {
  const [docContent, setDocContent] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const handleDocumentLoaded = (content: string) => {
    setDocContent(content);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'} flex`}>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`md:hidden fixed top-4 left-4 z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-2 rounded-md shadow-md`}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.div
        className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-800'} text-white w-64 p-6 flex flex-col fixed h-full z-40 md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -256 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className={`h-10 w-10 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-white/20'} flex items-center justify-center mr-3`}>
              <FileText size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">DocsGPT</h1>
          </div>
          <ThemeToggle />
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center py-2 px-4 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-indigo-700'} transition-colors`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Home size={18} className="mr-3" />
                Home
              </Link>
            </li>
          </ul>
        </nav>

        <div className={`mt-auto pt-6 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-indigo-300'}`}>
          <p>© {new Date().getFullYear()} DocsGPT</p>
          <p>Version 1.0.0</p>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-8 flex justify-between items-center">
                  <div>
                    <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-2`}>Google Docs + AI</h1>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl`}>
                      Load your Google Docs, edit them, add comments, and get AI assistance - all in one place.
                    </p>
                  </div>
                  <div className="md:hidden">
                    <ThemeToggle />
                  </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <DocViewer onDocumentLoaded={handleDocumentLoaded} />
                    {docContent && <DocEditor initialContent={docContent} />}
                    {docContent && <CommentingSystem />}
                    {docContent && <FlashcardStudy documentContent={docContent} />}
                  </div>
                  <div>
                    <AIAssistant documentContent={docContent} />
                  </div>
                </div>
              </motion.div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;

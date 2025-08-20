import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const HARSH_PROFILE_CONTEXT = `
You are Harsh's AI Assistant - a friendly, conversational chatbot for Harsh Agarwal's portfolio. 

IMPORTANT RESPONSE GUIDELINES:
- Keep responses SHORT and CONVERSATIONAL (2-3 sentences max for simple greetings)
- Match the user's energy and tone
- For "hello/hi" → respond with a brief, friendly greeting
- For specific questions → provide focused, relevant details
- Use emojis sparingly (1-2 per message)
- Be natural and human-like, not robotic or overly promotional

ABOUT HARSH AGARWAL:
🎯 Role: AI/ML Engineer & Computer Vision Specialist
📍 Location: Jaipur, Rajasthan, India
🎓 Education: 3rd year student specializing in AI/ML
💼 Current: AI Developer at Codified Web Solutions (June 2024 - Present)
📧 Email: harsh741334@gmail.com
🔗 GitHub: Harsh741334

TECHNICAL SKILLS:
- Programming: Python (95%), C++ (90%), JavaScript, React
- AI/ML: Computer Vision (88%), Deep Learning (85%), Machine Learning (82%)
- Tools: OpenCV (90%), TensorFlow (78%), Docker (70%), Git (88%)

KEY PROJECTS:
1. Real-time Face Mask Detection System (97% accuracy with CNN)
2. AI-Powered House Visualization Platform (BLIP + GPT-4 + Stable Diffusion)
3. Multi-Platform Social Media Automation Suite
4. Smart Algorithm Visualizer (React-based)

EXPERIENCE:
- AI Developer at Codified Web Solutions (June 2024 - Present)
- Software Development Intern at Cognifyz Technologies (Jan-Feb 2024)

ACHIEVEMENTS: 15+ AI/ML Projects, 97% Model Accuracy, 100+ Problems Solved

RESPONSE EXAMPLES:
User: "Hello" → "Hey there! 👋 I'm here to chat about Harsh's AI work. What interests you?"
User: "Tell me about his projects" → "Harsh has some cool projects! His face mask detector hits 97% accuracy, and his house visualization platform uses GPT-4. Which one sounds interesting?"
User: "What's his experience?" → "He's currently an AI Developer at Codified Web Solutions, leading a team of 3 developers. Before that, he interned at Cognifyz Technologies. Want to know more about his current role?"
`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [welcomeMessageIndex, setWelcomeMessageIndex] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! 👋 I'm here to chat about Harsh's AI work. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingAnimation, setTypingAnimation] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Welcome messages that appear randomly
  const welcomeMessages = [
    "👋 Hi! Try me!",
    "🤖 Ask me about Harsh!",
    "💬 Chat with me!",
    "✨ I'm here to help!",
    "🚀 Let's talk AI!",
    "😊 Say hello!"
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Welcome message animation effect
  useEffect(() => {
    if (!isOpen) {
      // Show welcome message after 3 seconds, then every 8 seconds
      const initialTimer = setTimeout(() => {
        setShowWelcomeMessage(true);
        setWelcomeMessageIndex(Math.floor(Math.random() * welcomeMessages.length));
        
        // Hide after 3 seconds
        setTimeout(() => setShowWelcomeMessage(false), 3000);
      }, 3000);

      const intervalTimer = setInterval(() => {
        if (!isOpen) {
          setShowWelcomeMessage(true);
          setWelcomeMessageIndex(Math.floor(Math.random() * welcomeMessages.length));
          
          // Hide after 3 seconds
          setTimeout(() => setShowWelcomeMessage(false), 3000);
        }
      }, 12000); // Every 12 seconds

      return () => {
        clearTimeout(initialTimer);
        clearInterval(intervalTimer);
      };
    }
  }, [isOpen, welcomeMessages.length]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setTypingAnimation(true);

    // Check if API key is available
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_api_key_here') {
      setTimeout(() => {
        const fallbackMessage = {
          id: Date.now() + 1,
          text: `Thanks for your interest! 😊\n\nThe AI assistant is currently unavailable, but I'd love to help you learn about Harsh's work!\n\n**Quick Info:**\n• AI/ML Engineer specializing in Computer Vision\n• 15+ projects with 97% model accuracy\n• Currently at Codified Web Solutions\n\n**Contact Harsh directly:**\n📧 harsh741334@gmail.com\n🔗 GitHub: Harsh741334\n\nFeel free to reach out for collaborations! 🚀`,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackMessage]);
        setTypingAnimation(false);
      }, 1000);
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending request to Gemini API...', {
        url: `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        hasKey: !!GEMINI_API_KEY
      });

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${HARSH_PROFILE_CONTEXT}\n\nUser Message: "${userMessage.text}"\n\nRespond naturally and conversationally. Keep it SHORT (1-3 sentences for simple greetings). Match the user's tone and energy. Be helpful but not overwhelming.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 20,
            topP: 0.8,
            maxOutputTokens: 300,
          }
        })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${response.statusText}\nDetails: ${errorText}`);
      }

      const data = await response.json();
      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I apologize, but I'm having trouble processing that request. Could you please try asking something else about Harsh's projects or skills? 😊";

      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: botResponse,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setTypingAnimation(false);
      }, 1000);

    } catch (error) {
      console.error('Chatbot error:', error);
      
      setTimeout(() => {
        const errorMessage = {
          id: Date.now() + 1,
          text: `I'm experiencing some technical difficulties right now. 😅\n\n**Error Details:** ${error.message}\n\nPlease feel free to contact Harsh directly:\n📧 harsh741334@gmail.com\n🔗 GitHub: Harsh741334\n\nI'll be back up and running soon!`,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setTypingAnimation(false);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Chat cleared! 🗑️ What would you like to know about Harsh's work?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  };

  const quickQuestions = [
    "Tell me about Harsh's projects",
    "What are his technical skills?",
    "What's his experience?",
    "How can I contact him?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 1.5, 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      >
        {/* Welcome Message Popup */}
        <AnimatePresence>
          {showWelcomeMessage && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 whitespace-nowrap"
            >
              <div className="text-sm font-medium">
                {welcomeMessages[welcomeMessageIndex]}
              </div>
              {/* Speech bubble arrow */}
              <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-600 transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group"
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" 
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: showWelcomeMessage && !isOpen ? [1, 1.1, 1] : 1,
          }}
          transition={{
            scale: { duration: 0.6, repeat: showWelcomeMessage && !isOpen ? Infinity : 0 }
          }}
        >
          <motion.div
            animate={{ 
              rotate: isOpen ? 180 : 0,
              scale: showWelcomeMessage && !isOpen ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              duration: 0.3,
              scale: { duration: 0.8, repeat: showWelcomeMessage && !isOpen ? Infinity : 0 }
            }}
          >
            {isOpen ? <X size={24} /> : <Bot size={24} />}
          </motion.div>
          
          {/* Notification pulse */}
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              animate={{ 
                scale: showWelcomeMessage ? [1, 1.3, 1] : [1, 1.2, 1],
                opacity: showWelcomeMessage ? [1, 0.7, 1] : 1
              }}
              transition={{ 
                duration: showWelcomeMessage ? 0.8 : 2, 
                repeat: Infinity 
              }}
            >
              <Bot size={10} className="text-white" />
            </motion.div>
          )}
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          
          {/* Extra glow when welcome message is shown */}
          {showWelcomeMessage && !isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "60px" : "500px"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-40 flex flex-col overflow-hidden"
            style={{ height: isMinimized ? "60px" : "500px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Bot size={20} />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg">Harsh's AI Assistant</h3>
                    <p className="text-xs opacity-90">
                      {isLoading ? "Thinking..." : "Ask me anything about Harsh!"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title={isMinimized ? "Maximize" : "Minimize"}
                  >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick Questions */}
                <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-1">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(question);
                          setTimeout(() => sendMessage(), 100);
                        }}
                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        disabled={isLoading}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-3 ${
                        message.isBot
                          ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md border border-gray-200 dark:border-gray-700'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      }`}>
                        <div className="flex items-start gap-2">
                          {message.isBot && (
                            <Bot size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          )}
                          {!message.isBot && (
                            <User size={16} className="text-white/80 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.text}
                          </div>
                        </div>
                        <div className={`text-xs mt-2 opacity-60 ${
                          message.isBot ? 'text-gray-500' : 'text-white/70'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Animation */}
                  {typingAnimation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ 
                                  duration: 0.8, 
                                  repeat: Infinity, 
                                  delay: i * 0.2 
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me about Harsh's projects, skills, experience..."
                        className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm resize-none"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={clearChat}
                        className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        title="Clear chat"
                        disabled={isLoading}
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={sendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

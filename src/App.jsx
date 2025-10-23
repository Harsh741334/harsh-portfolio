import React, { useState, useEffect, Suspense, lazy, useMemo, useCallback } from "react";
import { Github, Linkedin, Mail, MapPin, Calendar, ExternalLink, Instagram, Twitter, Sparkles, Code, Brain, Zap, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from '/profile.jpg'

// Lazy load heavy components
const VisitorStats = lazy(() => import('./components/charts').then(module => ({ default: module.VisitorStats })));
const GitHubStats = lazy(() => import('./components/charts').then(module => ({ default: module.GitHubStats })));
const SkillsProgress = lazy(() => import('./components/charts').then(module => ({ default: module.SkillsProgress })));
const SkillsLineChart = lazy(() => import('./components/charts').then(module => ({ default: module.SkillsLineChart })));
const Scene3DSimple = lazy(() => import('./components/3d').then(module => ({ default: module.Scene3DSimple })));

// Regular imports for lightweight components
import { PWAInstaller, ChatBot, LazyComponent, ChartSkeleton, Scene3DSkeleton } from './components/ui';
import { BasicBlog } from './components/blog';

// SEO Meta tags component for better Google indexing
const SEOHead = () => {
  useEffect(() => {
    // Update meta tags for better SEO
    document.title = "Harsh Agarwal - AI/ML Engineer | Computer Vision Specialist | Deep Learning Expert";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Harsh Agarwal - Expert AI/ML Engineer specializing in Computer Vision, Deep Learning, and Intelligent Systems. 3rd year student with 15+ AI projects and 97% model accuracy.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Harsh Agarwal - Expert AI/ML Engineer specializing in Computer Vision, Deep Learning, and Intelligent Systems. 3rd year student with 15+ AI projects and 97% model accuracy.';
      document.head.appendChild(meta);
    }

    // Add keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'AI Engineer, Machine Learning, Computer Vision, Deep Learning, Python, TensorFlow, OpenCV, Data Science, Neural Networks, Portfolio';
      document.head.appendChild(meta);
    }

    // Add author meta tag
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      const meta = document.createElement('meta');
      meta.name = 'author';
      meta.content = 'Harsh Agarwal';
      document.head.appendChild(meta);
    }
  }, []);
  
  return null;
};

export default function App() {
  const [currentRole, setCurrentRole] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiAgentActive, setAiAgentActive] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [agentPosition, setAgentPosition] = useState(0);
  const [agentMessage, setAgentMessage] = useState("🚀 Welcome aboard! Let's explore together!");
  const [showAgentMessage, setShowAgentMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // UI Theme Mode State (Dark, Night, Colorful)
  const [uiThemeMode, setUiThemeMode] = useState('dark');
  
  // Memoized UI Theme Configurations for better performance
  const uiThemes = useMemo(() => ({
    dark: {
      name: "Dark Mode",
      icon: "🌙",
      background: "bg-gray-900",
      text: "text-white",
      cardBg: "bg-gray-800/90",
      borderColor: "border-gray-700",
      navBg: "bg-gray-900/90",
      gradients: {
        primary: "from-blue-600 via-purple-600 to-indigo-600",
        button: "from-blue-600 to-indigo-600",
        card: "from-gray-800 to-gray-900"
      }
    },
    night: {
      name: "Night Mode",
      icon: "🌚",
      background: "bg-black",
      text: "text-gray-100",
      cardBg: "bg-gray-900/95",
      borderColor: "border-gray-800",
      navBg: "bg-black/95",
      gradients: {
        primary: "from-purple-500 via-blue-500 to-cyan-500",
        button: "from-purple-600 to-cyan-600",
        card: "from-gray-900 to-black"
      }
    },
    colorful: {
      name: "Colorful Mode",
      icon: "🌈",
      background: "bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100",
      text: "text-gray-800",
      cardBg: "bg-white/80 backdrop-blur-sm",
      borderColor: "border-purple-200",
      navBg: "bg-white/90 backdrop-blur-md",
      gradients: {
        primary: "from-pink-500 via-purple-500 to-indigo-500",
        button: "from-pink-500 to-purple-600",
        card: "from-white to-purple-50"
      }
    }
  }), []);
  
  // Memoized theme switcher function
  const cycleTheme = useCallback(() => {
    const modes = ['dark', 'night', 'colorful'];
    const currentIndex = modes.indexOf(uiThemeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setUiThemeMode(modes[nextIndex]);
  }, [uiThemeMode]);
  
  // Memoized current theme config
  const currentUITheme = useMemo(() => uiThemes[uiThemeMode], [uiThemes, uiThemeMode]);
  
  // Notification function for YouTube channel
  const handleNotifyMe = () => {
    // You can replace this with your preferred notification method
    const email = 'harsh741334@gmail.com';
    const subject = 'YouTube Channel Launch Notification Request';
    const body = `Hi Harsh,

I'm excited about your upcoming YouTube channel! Please notify me when it launches.

Here are my interests:
□ AI/ML Tutorials
□ Coding Tips  
□ Project Demos
□ Tech Insights

Thanks!`;
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };
  
  // Different themes for the AI agent journey
  const themes = [
    {
      name: "Railway Journey",
      colors: {
        primary: "from-blue-900 via-slate-800 to-gray-900",
        track: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400",
        agent: "🚂",
        particles: "🌟⭐✨",
        message: "🚂 All aboard the AI Express! Choo choo!"
      }
    },
    {
      name: "River Adventure",
      colors: {
        primary: "from-cyan-900 via-blue-800 to-teal-900",
        track: "bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400",
        agent: "🚤",
        particles: "💧🌊🐟",
        message: "🚤 Sailing through the data streams!"
      }
    },
    {
      name: "Highway Ride",
      colors: {
        primary: "from-gray-900 via-slate-800 to-zinc-900",
        track: "bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400",
        agent: "🏎️",
        particles: "💨🔥⚡",
        message: "🏎️ Speeding through the code highway!"
      }
    },
    {
      name: "Space Journey",
      colors: {
        primary: "from-purple-900 via-indigo-900 to-black",
        track: "bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400",
        agent: "🚀",
        particles: "🌟🛸👽",
        message: "🚀 Launching into the AI universe!"
      }
    },
    {
      name: "Sky Adventure",
      colors: {
        primary: "from-sky-900 via-blue-800 to-cyan-900",
        track: "bg-gradient-to-r from-white via-blue-200 to-white",
        agent: "✈️",
        particles: "☁️🌤️⛅",
        message: "✈️ Flying high with machine learning!"
      }
    }
  ];

  const roles = [
    "AI/ML Engineer",
    "Computer Vision Specialist", 
    "Deep Learning Expert",
    "Data Scientist",
    "Neural Network Architect",
    "ML Research Enthusiast"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      if (typeof window !== 'undefined') {
        const currentProgress = window.pageYOffset;
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        if (scrollHeight) {
          setScrollProgress((currentProgress / scrollHeight) * 100);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updateScrollProgress);
      return () => window.removeEventListener('scroll', updateScrollProgress);
    }
  }, []);

  // Welcome modal timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // AI Agent Animation System
  useEffect(() => {
    // Start AI agent journey after welcome modal closes
    const startAgent = setTimeout(() => {
      setAiAgentActive(true);
      setAgentMessage(themes[currentTheme]?.message || "🚀 Welcome aboard! Let's explore together!");
      setShowAgentMessage(true);
      
      // Hide welcome message after 3 seconds
      setTimeout(() => setShowAgentMessage(false), 3000);
    }, 5000);

    return () => clearTimeout(startAgent);
  }, []);

  // Handle scroll-based agent movement
  useEffect(() => {
    if (!aiAgentActive || typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setAgentPosition(scrollPercent);

      // Change message based on scroll position
      if (scrollPercent > 90) {
        setAgentMessage("🎉 Thanks for the journey! Happy to be at your service!");
        setShowAgentMessage(true);
      } else if (scrollPercent > 70) {
        setAgentMessage("🏁 Almost at the destination!");
        setShowAgentMessage(true);
      } else if (scrollPercent > 40) {
        setAgentMessage("🌟 Halfway through the adventure!");
        setShowAgentMessage(true);
      } else {
        setShowAgentMessage(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [aiAgentActive]);

  // Random theme selection on page load
  useEffect(() => {
    const randomTheme = Math.floor(Math.random() * themes.length);
    setCurrentTheme(randomTheme);
  }, []);

  // Auto-hide agent messages
  useEffect(() => {
    if (showAgentMessage) {
      const timer = setTimeout(() => setShowAgentMessage(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showAgentMessage, agentPosition]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && ['dark', 'night', 'colorful'].includes(savedTheme)) {
      setUiThemeMode(savedTheme);
    }
  }, []);

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem('portfolio-theme', uiThemeMode);
  }, [uiThemeMode]);

  // Mobile detection and responsive agent behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills = [
    { name: "Python", level: 95, category: "Programming" },
    { name: "C++", level: 90, category: "Programming" },
    { name: "Computer Vision", level: 88, category: "AI/ML" },
    { name: "Deep Learning", level: 85, category: "AI/ML" },
    { name: "Machine Learning", level: 82, category: "AI/ML" },
    { name: "OpenCV", level: 90, category: "AI/ML" },
    { name: "TensorFlow", level: 78, category: "AI/ML" },
    { name: "Scrapy", level: 85, category: "AI/ML" },
    { name: "Roboflow", level: 80, category: "AI/ML" },
    { name: "Data Structures & Algorithms", level: 85, category: "Core CS" },
    { name: "Git & GitHub", level: 88, category: "Tools" },
    { name: "Docker", level: 70, category: "Tools" },
    { name: "Jupyter", level: 90, category: "Tools" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      <SEOHead />
      
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWelcome(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ 
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                👋
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Welcome to My Portfolio!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Hello! I'm Harsh, an AI/ML Engineer passionate about creating intelligent systems. 
                Thanks for visiting my digital space!
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                🕒 {currentTime.toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWelcome(false)}
              >
                Explore Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    <main className={`min-h-screen font-sans ${currentUITheme.background} ${currentUITheme.text} transition-all duration-1000 relative overflow-x-hidden z-20`}>
      {/* Scroll Progress Bar */}
      <div className={`fixed top-0 left-0 w-full h-1 ${uiThemeMode === 'colorful' ? 'bg-purple-100' : 'bg-gray-200 dark:bg-gray-700'} z-50`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${currentUITheme.gradients.button}`}
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </div>

      {/* AI Agent Track System - Mobile optimized to stay behind text */}
      <AnimatePresence>
        {aiAgentActive && (
          <>
            {/* Desktop: Left side track */}
            {!isMobile && (
              <>
                <div className="fixed left-8 top-0 w-2 h-full z-0 opacity-60">
                  <div className={`w-full h-full ${themes[currentTheme]?.colors?.track || 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400'} shadow-lg rounded-full`}>
                    {[...Array(20)].map((_, index) => (
                      <motion.div
                        key={index}
                        className="w-full h-12 border-b border-white/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: index * 0.1 
                        }}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  className="fixed left-4 z-0 text-4xl opacity-80 pointer-events-none"
                  style={{ 
                    top: `${Math.min(agentPosition, 95)}%`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: agentPosition > 90 ? [0, 360] : 0,
                  }}
                  transition={{
                    scale: { duration: 1.5, repeat: Infinity },
                    rotate: { duration: 3, ease: "easeInOut" }
                  }}
                >
                  <div className="transform -translate-x-1/2 -translate-y-1/2">
                    {themes[currentTheme]?.agent || '🚀'}
                  </div>
                </motion.div>
              </>
            )}

            {/* Mobile: Subtle corner indicator that stays out of the way */}
            {isMobile && (
              <motion.div
                className="fixed bottom-20 right-4 z-0 text-2xl opacity-40 pointer-events-none"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity },
                  opacity: { duration: 3, repeat: Infinity }
                }}
              >
                {themes[currentTheme]?.agent || '🚀'}
              </motion.div>
            )}

            {/* Particles background effect (behind all content) */}
            <div className="fixed inset-0 pointer-events-none z-0">
              {(themes[currentTheme]?.particles || '🌟⭐✨').split('').map((particle, index) => {
                const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
                const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
                
                return (
                  <motion.div
                    key={`${currentTheme}-${index}`}
                    className="absolute text-xl opacity-20"
                    initial={{ 
                      x: Math.random() * screenWidth,
                      y: -50,
                      rotate: 0,
                      scale: 0
                    }}
                    animate={{ 
                      y: screenHeight + 50,
                      rotate: 360,
                      scale: [0, 1, 0],
                      x: Math.random() * screenWidth
                    }}
                    transition={{ 
                      duration: Math.random() * 8 + 5,
                      repeat: Infinity,
                      delay: index * 2,
                      ease: "linear"
                    }}
                  >
                    {particle}
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </AnimatePresence>
      
      {/* Enhanced Animated background elements with theme colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse`}
          animate={{
            background: [
              "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse`}
          animate={{
            background: [
              "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        <motion.div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse`}
          animate={{
            background: [
              "radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 4 }}
        />
        {/* Additional floating elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-70"></div>
      </div>
      
      {/* Navbar with enhanced design and theme switcher */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md ${currentUITheme.navBg} border-b ${currentUITheme.borderColor} shadow-lg transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Harsh Agarwal
            </motion.h1>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className={`${currentUITheme.text} opacity-80 hover:opacity-100 transition-all font-medium hover:scale-105`}>About</a>
              <a href="#projects" className={`${currentUITheme.text} opacity-80 hover:opacity-100 transition-all font-medium hover:scale-105`}>Projects</a>
              <a href="#3d-elements" className={`${currentUITheme.text} opacity-80 hover:opacity-100 transition-all font-medium hover:scale-105 flex items-center gap-1`}>
                3D <span className="text-xs">✨</span>
              </a>
              <a href="#experience" className={`${currentUITheme.text} opacity-80 hover:opacity-100 transition-all font-medium hover:scale-105`}>Experience</a>
              <a href="#blog" className={`${currentUITheme.text} opacity-80 hover:opacity-100 transition-all font-medium hover:scale-105`}>
                Blog
              </a>
              <a href="#youtube" className={`${currentUITheme.text} opacity-80 hover:opacity-100 transition-all font-medium hover:scale-105 flex items-center gap-1`}>
                YouTube <span className="text-xs">🔥</span>
              </a>
              <a href="#learning" className={`${currentUITheme.text} opacity-80 hover:opacity-100 transition-all font-medium hover:scale-105`}>Resources</a>
              <a href="#contact" className={`${currentUITheme.text} opacity-80 hover:opacity-100 transition-all font-medium hover:scale-105`}>Contact</a>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Theme Switcher Button */}
              <motion.button
                onClick={cycleTheme}
                className={`p-3 rounded-full ${currentUITheme.cardBg} ${currentUITheme.borderColor} border-2 hover:scale-110 transition-all duration-300 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                title={`Switch to ${uiThemes[['dark', 'night', 'colorful'][(Object.keys(uiThemes).indexOf(uiThemeMode) + 1) % 3]].name}`}
              >
                <span className="text-2xl">{currentUITheme.icon}</span>
              </motion.button>
              
              <motion.a
                href="/Resume.pdf"
                download="Resume.pdf"
                className={`px-6 py-2.5 bg-gradient-to-r ${currentUITheme.gradients.button} text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Enhanced Hero Section */}
        <motion.section
          className="py-20 lg:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                  <span className={currentUITheme.text}>Hi, I'm</span>
                  <br />
                  <span className={`bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}>
                    Harsh
                  </span>
                  <motion.span 
                    className="text-4xl ml-4"
                    animate={{ 
                      rotate: [0, 14, -8, 14, -4, 10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  >
                    👋
                  </motion.span>
                </h1>
                <p className={`text-xl lg:text-2xl ${currentUITheme.text} opacity-80 mt-6 leading-relaxed`}>
                  <motion.span
                    key={currentRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-block font-semibold bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}
                  >
                    {roles[currentRole]}
                  </motion.span>
                  {" "}specializing in 
                  <span className={`font-semibold bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}> computer vision</span>, 
                  <span className={`font-semibold bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}> deep learning</span>, and 
                  <span className={`font-semibold bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}> intelligent systems</span>
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.a 
                  href="#contact" 
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
                <motion.a 
                  href="#projects" 
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
                <motion.a 
                  href="#3d-elements" 
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✨ Explore 3D
                </motion.a>
              </motion.div>
            </div>
            
            {/* Enhanced Profile Image Section */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative group">
                {/* Multiple animated gradient backgrounds */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-2xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
                
                {/* Rotating border animations */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-spin opacity-75 blur-sm" style={{animationDuration: '8s'}}></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 animate-spin opacity-50 blur-sm" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
                <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full"></div>
                
                {/* Profile image with enhanced effects */}
                <motion.img
                  src={profileImg}
                  alt="Harsh Agarwal - AI/ML Engineer"
                  className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700 group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
                  }}
                />
                
                {/* Enhanced floating particles */}
                <motion.div 
                  className="absolute top-10 left-10 w-3 h-3 bg-blue-500 rounded-full opacity-70"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="absolute top-20 right-10 w-2 h-2 bg-purple-500 rounded-full opacity-60"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-20 left-20 w-4 h-4 bg-indigo-500 rounded-full opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-32 right-16 w-1 h-1 bg-cyan-400 rounded-full opacity-80"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Stats Section */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "15+", label: "AI/ML Projects", icon: "🤖", color: "from-blue-500 to-cyan-500" },
              { number: "97%", label: "Model Accuracy", icon: "🎯", color: "from-purple-500 to-pink-500" },
              { number: "3+", label: "Years Learning", icon: "📚", color: "from-green-500 to-teal-500" },
              { number: "100+", label: "Problems Solved", icon: "💡", color: "from-orange-500 to-red-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className="text-4xl mb-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Rest of the sections remain the same but I'll add them... */}
        {/* About Section - Enhanced */}
        <motion.section
          id="about"
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">About Me</span>
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I'm a third-year Computer Science student at <span className="font-semibold text-indigo-600">JECRC University</span>, 
                with a deep passion for artificial intelligence, machine learning, and computer vision systems.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                My expertise spans across <span className="font-semibold">Python, C++, and advanced AI frameworks</span> like TensorFlow, PyTorch, and OpenCV. 
                I specialize in building intelligent systems, implementing deep learning models, and solving complex computer vision problems.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                With hands-on experience in neural networks, image processing, and algorithm optimization, I excel at transforming 
                theoretical AI concepts into practical, real-world solutions. I'm passionate about pushing the boundaries of artificial intelligence.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-indigo-600">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Jaipur, Rajasthan, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>3rd Year CS Student</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>harsh741334@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-center text-blue-600 font-bold">🏆</span>
                  <span>Competitive Programming Enthusiast</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section - Enhanced */}
        <motion.section
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Skills & Expertise</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Programming", "AI/ML", "Core CS", "Tools"].map((category, categoryIndex) => (
              <motion.div 
                key={category} 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{category}</h3>
                <div className="space-y-3">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-800 dark:text-white text-sm">{skill.name}</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <motion.div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: categoryIndex * 0.2 + index * 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Blog Section */}
        <BasicBlog />

        {/* Projects Section - Enhanced */}
        <motion.section
          id="projects"
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Featured Projects</span>
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "Real-time Face Mask Detection System",
                description: "Built a production-ready face mask detection system using OpenCV and deep learning. Implemented CNN architecture with 97% accuracy, optimized for real-time processing with multi-threading support.",
                tech: ["Python", "OpenCV", "TensorFlow", "CNN", "Real-time Processing"],
                link: "https://github.com/Harsh741334/FaceFeatureDetecction",
                featured: true,
                icon: "🎭"
              },
              {
                title: "AI-Powered House Visualization Platform",
                description: "Developed an intelligent system that transforms house images into detailed architectural insights using BLIP vision model, GPT-4 API integration, and Stable Diffusion for enhanced visualizations.",
                tech: ["Python", "BLIP", "GPT-4 API", "Stable Diffusion", "Computer Vision"],
                link: "https://github.com/Harsh741334/AI-Powered-House-Prompt-Enhancer-Generator",
                featured: true,
                icon: "🏠"
              },
              {
                title: "Multi-Platform Social Media Automation Suite",
                description: "Engineered a comprehensive automation solution for social media management across multiple platforms. Implemented robust API integrations, rate limiting, and error handling for enterprise-level reliability.",
                tech: ["Python", "REST APIs", "Automation", "Web Scraping", "Multithreading"],
                link: "https://github.com/Harsh741334/Multi-Platform-Social-Media-Automation",
                featured: false,
                icon: "📱"
              },
              {
                title: "Malaria Cell Image Classification Using CNN",
                description: "Advanced deep learning model for automated malaria detection from blood cell images. Implemented CNN architecture with high accuracy for medical diagnosis, featuring data preprocessing, model training, and deployment pipeline.",
                tech: ["Python", "TensorFlow", "OpenCV", "CNN", "Medical AI", "Image Processing"],
                link: "https://github.com/Harsh741334/MalariaDetectionModel",
                featured: true,
                icon: "🔬"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border ${
                  project.featured ? 'border-2 border-indigo-200 dark:border-indigo-700' : 'border-gray-100 dark:border-gray-700'
                }`}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                {project.featured && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-sm font-medium">
                    ⭐ Featured Project
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{project.icon}</span>
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {project.link === "#" ? "🚧 Coming Soon" : "🚀 View Project"} <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section - Enhanced */}
        <motion.section
          id="experience"
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Professional Experience</span>
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                company: "Codified Web Solutions",
                role: "AI Developer",
                duration: "June 2024 - Present",
                location: "Jaipur, Rajasthan, India",
                current: true,
                description: "Developing machine learning models for client projects, implementing computer vision solutions, and contributing to AI-powered applications using Python, TensorFlow, and OpenCV. Leading a team of 3 developers on AI integration projects.",
                achievements: ["Built 5+ ML models with >95% accuracy", "Reduced processing time by 40%", "Implemented CI/CD for ML pipelines"],
                icon: "💼"
              },
              {
                company: "Cognifyz Technologies",
                role: "Software Development Intern",
                duration: "January 2024 - February 2024",
                location: "Remote",
                current: false,
                description: "Built responsive web applications, implemented machine learning algorithms, and collaborated with cross-functional teams to deliver AI-powered software solutions. Worked on full-stack development projects.",
                achievements: ["Developed 3 web applications", "Improved user engagement by 25%", "Collaborated with 10+ team members"],
                icon: "🚀"
              }
            ].map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{exp.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.company}</h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">{exp.role}</p>
                    </div>
                  </div>
                  {exp.current && (
                    <motion.span 
                      className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🟢 Current
                    </motion.span>
                  )}
                </div>
                <div className="text-gray-600 dark:text-gray-400 mb-4">
                  <p className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" />
                    {exp.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Comments/Feedback Section - Enhanced */}
        <motion.section
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Share Your Thoughts</span>
            </h2>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                💭 I'd love to hear your feedback, suggestions, or just connect with fellow AI enthusiasts! 
                Drop me a message and let's discuss exciting opportunities in AI and machine learning.
              </p>
              
              <motion.a
                href="mailto:harsh741334@gmail.com?subject=Feedback%20on%20Your%20Portfolio&body=Hi%20Harsh,%0A%0AI%20wanted%20to%20share%20my%20thoughts%20about%20your%20portfolio:%0A%0A"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Send Your Feedback
              </motion.a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { icon: "💬", title: "General Feedback", desc: "Share your thoughts about my portfolio and projects" },
                { icon: "🤝", title: "Collaboration", desc: "Interested in working together on AI projects?" },
                { icon: "🚀", title: "Opportunities", desc: "Let's discuss internships or job opportunities" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* YouTube Channel Section - Coming Soon */}
        <motion.section
          id="youtube"
          className={`py-20 ${currentUITheme.background} relative overflow-hidden`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Festive Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              className="absolute top-10 left-10 text-6xl opacity-20"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🎬
            </motion.div>
            <motion.div 
              className="absolute top-20 right-20 text-4xl opacity-30"
              animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎥
            </motion.div>
            <motion.div 
              className="absolute bottom-20 left-1/4 text-5xl opacity-25"
              animate={{ scale: [1, 1.3, 1], rotate: 180 }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              📺
            </motion.div>
            <motion.div 
              className="absolute bottom-10 right-1/3 text-3xl opacity-20"
              animate={{ x: [-5, 5, -5], y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎭
            </motion.div>
          </div>

          <motion.div 
            className="text-center relative z-10"
            variants={itemVariants}
          >
            <motion.div
              className="inline-block mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`${currentUITheme.cardBg} ${currentUITheme.borderColor} border-2 rounded-3xl p-12 shadow-2xl backdrop-blur-sm`}>
                <motion.div
                  className="text-8xl mb-6"
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotateY: { duration: 3, repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  🚀
                </motion.div>
                
                <h2 className={`text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}>
                  YouTube Channel
                </h2>
                
                <motion.div
                  className="text-3xl lg:text-4xl font-bold mb-8"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: ["0 0 0px rgba(147, 51, 234, 0)", "0 0 20px rgba(147, 51, 234, 0.5)", "0 0 0px rgba(147, 51, 234, 0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className={`bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}>
                    🎉 COMING SOON! 🎉
                  </span>
                </motion.div>
                
                <p className={`text-xl ${currentUITheme.text} opacity-80 mb-8 max-w-3xl mx-auto`}>
                  Get ready for exclusive AI/ML tutorials, project walkthroughs, and tech insights! 
                  Subscribe now to be the first to know when we launch! 🔔
                </p>
                
                <motion.div
                  className="flex flex-wrap justify-center gap-4 mb-8"
                  variants={containerVariants}
                >
                  {['🤖 AI Tutorials', '💻 Coding Tips', '🎨 Project Demos', '🧠 Tech Insights'].map((feature, index) => (
                    <motion.div
                      key={feature}
                      className={`px-6 py-3 ${currentUITheme.cardBg} ${currentUITheme.borderColor} border rounded-full text-sm font-medium ${currentUITheme.text}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature}
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.button
                  onClick={handleNotifyMe}
                  className={`px-8 py-4 bg-gradient-to-r ${currentUITheme.gradients.button} text-white font-bold rounded-full text-lg shadow-lg transform transition-all duration-300 hover:shadow-xl`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    boxShadow: [
                      "0 10px 30px rgba(59, 130, 246, 0.3)",
                      "0 10px 30px rgba(147, 51, 234, 0.3)",
                      "0 10px 30px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔔 Notify Me When Ready!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Live Analytics & Activity */}
        <motion.section
          className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Live Analytics & Activity
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Real-time portfolio metrics, GitHub activity, and skills progression
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <LazyComponent component={VisitorStats} fallback={<ChartSkeleton />} />
              <LazyComponent component={GitHubStats} fallback={<ChartSkeleton />} />
              <LazyComponent component={SkillsLineChart} fallback={<ChartSkeleton />} />
            </div>
          </div>
        </motion.section>

        {/* Learning Resources Section */}
        <motion.section
          id="learning"
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}>
              📚 Learning Resources
            </h2>
            
            <p className={`text-xl ${currentUITheme.text} opacity-80 text-center mb-16 max-w-3xl mx-auto`}>
              Curated YouTube videos and tutorials that helped shape my AI/ML journey. 
              Perfect for beginners and advanced learners alike! 🎯
            </p>

            {/* Video Grid */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              variants={containerVariants}
            >
              {/* Featured YouTube Video - Enhanced */}
              <motion.div
                className={`${currentUITheme.cardBg} ${currentUITheme.borderColor} border-2 rounded-xl p-6 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Featured badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  FEATURED
                </div>
                {/* Video Thumbnail */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                    {/* YouTube-style thumbnail */}
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="text-center text-white z-10">
                      <div className="text-6xl mb-2">🎥</div>
                      <p className="text-sm font-medium">Deep Learning Tutorial</p>
                      <p className="text-xs opacity-80">Computer Vision & TensorFlow</p>
                    </div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    3:39:46
                  </span>
                </div>

                {/* Video Details */}
                <div>
                  <h3 className={`text-lg font-bold ${currentUITheme.text} mb-2`}>
                    Deep Learning for Computer Vision with Python and TensorFlow
                  </h3>
                  <p className={`${currentUITheme.text} opacity-70 text-sm mb-3 flex items-center gap-2`}>
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">YouTube</span>
                    by FreeCodeCamp
                  </p>
                  <p className={`${currentUITheme.text} opacity-60 text-sm mb-4`}>
                    Comprehensive 3+ hour tutorial covering deep learning fundamentals for computer vision applications using Python and TensorFlow. Perfect for beginners and intermediate learners.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
                        Computer Vision
                      </span>
                      <span className="text-xs bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full">
                        Deep Learning
                      </span>
                    </div>
                    <a
                      href="https://www.youtube.com/watch?v=IA3WxTTPXqQ&t=14s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Second Featured Video */}
              <motion.div
                className={`${currentUITheme.cardBg} ${currentUITheme.borderColor} border-2 rounded-xl p-6 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Video Thumbnail */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="text-center text-white z-10">
                      <div className="text-6xl mb-2">🧠</div>
                      <p className="text-sm font-medium">Machine Learning</p>
                      <p className="text-xs opacity-80">Python & TensorFlow</p>
                    </div>
                    
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    Coming Soon
                  </span>
                </div>

                <div>
                  <h3 className={`text-lg font-bold ${currentUITheme.text} mb-2`}>
                    More Learning Resources Coming Soon!
                  </h3>
                  <p className={`${currentUITheme.text} opacity-70 text-sm mb-3`}>
                    Stay tuned for more curated content
                  </p>
                  <p className={`${currentUITheme.text} opacity-60 text-sm mb-4`}>
                    I'm continuously adding high-quality learning resources to help you on your AI/ML journey.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Placeholder cards for future content */}
              {[2, 3, 4, 5].map((index) => (
                <motion.div
                  key={index}
                  className={`${currentUITheme.cardBg} ${currentUITheme.borderColor} border-2 rounded-xl p-6 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Video Thumbnail Placeholder */}
                  <div className="relative mb-4">
                    <div className={`w-full h-48 ${uiThemeMode === 'colorful' ? 'bg-gradient-to-br from-purple-100 to-pink-100' : 'bg-gray-700'} rounded-lg flex items-center justify-center`}>
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎬</div>
                        <p className={`text-sm ${currentUITheme.text} opacity-60`}>
                          Video Coming Soon
                        </p>
                      </div>
                    </div>
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        animate={{ 
                          scale: [1, 1.05, 1],
                          boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 10px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <h3 className={`font-bold text-lg ${currentUITheme.text} mb-2`}>
                    Coming Soon...
                  </h3>
                  <p className={`text-sm ${currentUITheme.text} opacity-70 mb-3`}>
                    Exciting learning content will be added here soon!
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 bg-gradient-to-r ${currentUITheme.gradients.primary} bg-opacity-20 text-xs rounded-full ${currentUITheme.text}`}>
                      #ComingSoon
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div 
              className="text-center"
              variants={itemVariants}
            >
              <div className={`${currentUITheme.cardBg} ${currentUITheme.borderColor} border-2 rounded-2xl p-8 shadow-lg backdrop-blur-sm inline-block`}>
                <div className="text-4xl mb-4">📖</div>
                <h3 className={`text-2xl font-bold ${currentUITheme.text} mb-4`}>
                  Have a Great Resource to Share?
                </h3>
                <p className={`${currentUITheme.text} opacity-80 mb-6`}>
                  I'm always looking for amazing learning content to share with the community!
                </p>
                <motion.button
                  className={`px-6 py-3 bg-gradient-to-r ${currentUITheme.gradients.button} text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📧 Suggest a Resource
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* 3D Interactive Elements Section */}
        <motion.section
          id="3d-elements"
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className={`text-5xl font-bold mb-6 bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}>
                3D Interactive Elements
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Explore immersive 3D visualizations powered by Three.js, WebGL, and cutting-edge web technologies.
                From neural networks to particle systems, experience interactive 3D graphics in your browser.
              </p>
              
              {/* Animation Philosophy */}
              <motion.div 
                className={`max-w-4xl mx-auto p-6 rounded-xl ${currentUITheme.cardBg} border ${currentUITheme.borderColor} backdrop-blur-sm mb-8`}
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center text-center justify-center">
                  <span className="mr-2">🎭</span>
                  Animation Philosophy & Design Principles
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                  Each 3D element is designed with <strong>educational storytelling</strong> in mind. The animations don't just look impressive—they 
                  <em> visualize complex concepts</em> to make abstract ideas tangible. Neural networks show actual data flow, 
                  particle systems demonstrate emergent behavior, and parallax effects explain depth perception. 
                  Every movement has meaning, every transition teaches something new about computer graphics, AI, or human perception.
                </p>
              </motion.div>
            </motion.div>
            
            {/* 3D Scene Container */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
              style={{ height: '80vh', minHeight: '600px' }}
            >
              <LazyComponent 
                component={Scene3DSimple} 
                fallback={<Scene3DSkeleton />} 
              />
            </motion.div>

            {/* 3D Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            >
              {[
                {
                  icon: "🧠",
                  title: "Neural Networks 3D Visualization",
                  description: "Interactive 3D representation of artificial neural networks showing layers, nodes, and connections. Watch data flow through the network with animated signals and understand deep learning architectures visually.",
                  tech: "Three.js + WebGL",
                  paperTitle: "Visualizing and Understanding Convolutional Networks",
                  paperUrl: "https://arxiv.org/abs/1311.2901",
                  concepts: [
                    "Forward propagation visualization",
                    "Layer-wise feature extraction",
                    "Gradient flow animation",
                    "Network topology mapping"
                  ],
                  animation: "Animated data packets flow from input layer through hidden layers to output, with nodes lighting up as they process information. Connection weights are visualized through line thickness and color intensity."
                },
                {
                  icon: "✨",
                  title: "Particle Systems & Physics",
                  description: "GPU-accelerated particle simulations with real-time physics, collision detection, and environmental forces. Experience fluid dynamics, gravitational fields, and emergent behaviors.",
                  tech: "GLSL Shaders + WebGL",
                  paperTitle: "Particle Systems—A Technique for Modeling Fuzzy Objects",
                  paperUrl: "https://dl.acm.org/doi/10.1145/357318.357320",
                  concepts: [
                    "GPU-based physics simulation",
                    "Emergent behavior patterns",
                    "Force field interactions",
                    "Collision response systems"
                  ],
                  animation: "Thousands of particles respond to mouse movement, gravity, and wind forces. They exhibit flocking behavior, collision avoidance, and form dynamic patterns that evolve in real-time."
                },
                {
                  icon: "🎯",
                  title: "3D Skills Visualization",
                  description: "Interactive skill network displayed as a 3D constellation where skills are nodes connected by expertise relationships. Explore proficiency levels through dynamic scaling and color coding.",
                  tech: "React Three Fiber",
                  paperTitle: "Node-Link Diagrams for Network Visualization",
                  paperUrl: "https://www.cs.ubc.ca/~tmm/vadbook/",
                  concepts: [
                    "Graph-based data representation",
                    "Force-directed layouts",
                    "Interactive node exploration",
                    "Hierarchical clustering visualization"
                  ],
                  animation: "Skills float in 3D space connected by glowing links. Hovering reveals detailed information while the entire network rotates gently. Related skills cluster together and pulse with synchronized animations."
                },
                {
                  icon: "🌊",
                  title: "Mouse Parallax & Depth",
                  description: "Advanced parallax scrolling with multiple depth layers responding to mouse movement. Creates immersive depth perception through differential motion and perspective shifts.",
                  tech: "Framer Motion + CSS3D",
                  paperTitle: "Parallax Scrolling: A Simple Way to Add Depth",
                  paperUrl: "https://uxplanet.org/parallax-scrolling-a-simple-way-to-add-depth-to-your-web-design-df7b9d1e8c5f",
                  concepts: [
                    "Perspective projection",
                    "Motion parallax effects",
                    "Depth layer separation",
                    "Smooth interpolation algorithms"
                  ],
                  animation: "Background elements move at different speeds based on their virtual distance. Mouse movement creates a 3D perspective effect where closer objects move more than distant ones, simulating depth perception."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-8 rounded-xl ${currentUITheme.cardBg} border ${currentUITheme.borderColor} backdrop-blur-sm`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${currentUITheme.gradients.button} text-white`}>
                      {feature.tech}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Animation Explanation */}
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 text-sm mb-2">🎬 Animation Details:</h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                      {feature.animation}
                    </p>
                  </div>

                  {/* Key Concepts */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">🔍 Key Concepts:</h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {feature.concepts.map((concept, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {concept}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Research Paper Link */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">📚 Related Research:</h4>
                    <a 
                      href={feature.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <span className="mr-1">📄</span>
                      {feature.paperTitle}
                      <span className="ml-1">↗</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Technical Implementation & Research */}
            <motion.div
              variants={itemVariants}
              className={`mt-12 p-8 rounded-xl ${currentUITheme.cardBg} border ${currentUITheme.borderColor} backdrop-blur-sm`}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">⚡</span>
                Technical Implementation & Research Foundation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-400 flex items-center">
                    <span className="mr-2">🚀</span>Performance Optimization
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>60 FPS WebGL rendering</strong> - Hardware-accelerated graphics pipeline</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>GPU particle computation</strong> - Compute shaders for physics simulation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Memory pool management</strong> - Efficient object reuse and garbage collection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Adaptive quality scaling</strong> - Dynamic LOD based on device capabilities</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-purple-400 flex items-center">
                    <span className="mr-2">🛠️</span>Technology Stack
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Three.js & React Three Fiber</strong> - Declarative 3D scene management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Custom GLSL shaders</strong> - Vertex and fragment shader programming</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>WebGL 2.0 features</strong> - Transform feedback and uniform buffer objects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Post-processing pipeline</strong> - Bloom, SSAO, and temporal anti-aliasing</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-green-400 flex items-center">
                    <span className="mr-2">✨</span>Interactive Features
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Real-time user interaction</strong> - Mouse and touch event handling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Physics-based animations</strong> - Spring dynamics and easing functions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Multi-scene architecture</strong> - Scene graph management and transitions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><strong>Cross-platform compatibility</strong> - Desktop and mobile optimization</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Research Papers & Educational Resources */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="font-semibold mb-4 text-lg flex items-center">
                  <span className="mr-2">📚</span>
                  Additional Research & Learning Resources
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-medium text-blue-400">Computer Graphics & WebGL</h5>
                    <div className="space-y-2 text-sm">
                      <a href="https://learnopengl.com/" target="_blank" rel="noopener noreferrer" 
                         className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        📖 Learn OpenGL - Comprehensive 3D Graphics Tutorial
                      </a>
                      <a href="https://webglfundamentals.org/" target="_blank" rel="noopener noreferrer"
                         className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        🌐 WebGL Fundamentals - Browser-based 3D Graphics
                      </a>
                      <a href="https://threejs.org/docs/" target="_blank" rel="noopener noreferrer"
                         className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        📘 Three.js Documentation - 3D Library Reference
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-medium text-purple-400">Animation & Physics Simulation</h5>
                    <div className="space-y-2 text-sm">
                      <a href="https://en.wikipedia.org/wiki/Verlet_integration" target="_blank" rel="noopener noreferrer"
                         className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        🔬 Verlet Integration - Physics Simulation Method
                      </a>
                      <a href="https://gamedevelopment.tutsplus.com/tutorials/simulate-tearable-cloth-and-ragdolls-with-simple-verlet-integration--gamedev-519" target="_blank" rel="noopener noreferrer"
                         className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        🎮 Cloth Simulation - Advanced Physics Tutorial
                      </a>
                      <a href="https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations" target="_blank" rel="noopener noreferrer"
                         className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        🌿 Nature of Code - Simulation and Animation Patterns
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section - Enhanced */}
        <motion.section
          id="contact"
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-center">
              <span className={`bg-gradient-to-r ${currentUITheme.gradients.primary} bg-clip-text text-transparent`}>Let's Connect</span>
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants} className="mb-12">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                🚀 I'm always open to discussing new opportunities, collaborations, or just having a chat about AI and technology.
              </p>
              <motion.a 
                href="mailto:harsh741334@gmail.com" 
                className="inline-flex items-center gap-3 text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-8 h-8" />
                harsh741334@gmail.com
              </motion.a>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-12">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/harsh-agarwal-608626243/", color: "hover:text-blue-700", label: "LinkedIn" },
                { icon: Github, href: "https://github.com/Harsh741334", color: "hover:text-gray-800 dark:hover:text-white", label: "GitHub" },
                { icon: Instagram, href: "https://www.instagram.com/h_ars_a/", color: "hover:text-pink-600", label: "Instagram" },
                { icon: Twitter, href: "https://x.com/Harsh741334", color: "hover:text-blue-500", label: "Twitter" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg ${social.color} transition-all duration-300 transform hover:scale-110 border border-gray-100 dark:border-gray-700`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                >
                  <social.icon className="w-8 h-8" />
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-gray-100 dark:border-gray-600"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🌟 Quick Contact Options</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.a
                  href="mailto:harsh741334@gmail.com?subject=Job%20Opportunity&body=Hi%20Harsh,%0A%0AI%20have%20a%20job%20opportunity%20that%20might%20interest%20you..."
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-left"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-2xl mb-2 block">💼</span>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Job Opportunities</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Interested in hiring me?</p>
                </motion.a>
                <motion.a
                  href="mailto:harsh741334@gmail.com?subject=Project%20Collaboration&body=Hi%20Harsh,%0A%0AI%20would%20like%20to%20collaborate%20on%20a%20project..."
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-left"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-2xl mb-2 block">🤝</span>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Project Collaboration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Let's build something amazing!</p>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Back to Top Button */}
      {scrollProgress > 20 && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 z-50 p-4 bg-gray-800 dark:bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}

      {/* Enhanced Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Harsh Agarwal</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                AI/ML Engineer passionate about creating intelligent systems and pushing the boundaries of artificial intelligence.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/Harsh741334" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/harsh-agarwal-608626243/" },
                  { icon: Mail, href: "mailto:harsh741334@gmail.com" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: "About", href: "#about" },
                  { name: "Projects", href: "#projects" },
                  { name: "Experience", href: "#experience" },
                  { name: "Blog", href: "#blog" },
                  { name: "YouTube 🔥", href: "#youtube" },
                  { name: "Resources", href: "#learning" },
                  { name: "Contact", href: "#contact" }
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-800 dark:text-white">Contact Info</h4>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  harsh741334@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Jaipur, Rajasthan, India
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Available for opportunities
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Harsh Agarwal. All rights reserved. Built with ❤️ using React & Tailwind CSS.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              🚀 Optimized for performance • 🎨 Designed for accessibility • 📱 Mobile-first approach
            </p>
          </div>
        </div>
      </footer>
    </main>
    
    {/* AI ChatBot */}
    <ChatBot />
    
    {/* PWA Features */}
    <PWAInstaller />
    </>
  );
}

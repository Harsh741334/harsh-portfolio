import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, MapPin, Calendar, ExternalLink, Instagram, Twitter, BookOpen, Sparkles, Code, Brain, Zap, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import profileIm from '/profile.jpg'

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
  
  const roles = [
    "AI/ML Engineer",
    "Computer Vision Specialist", 
    "Deep Learning Expert",
    "Data Scientist",
    "Neural Network Architect",
    "ML Research Enthusiast"
  ];

  // Blog posts data (you can add your actual blog posts here)
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Computer Vision: From Theory to Practice",
      excerpt: "Exploring the fundamentals of computer vision and how to implement object detection using OpenCV and deep learning...",
      date: "2025-08-15",
      readTime: "8 min read",
      category: "Computer Vision",
      image: "https://via.placeholder.com/400x200/3B82F6/ffffff?text=Computer+Vision"
    },
    {
      id: 2,
      title: "Building Your First Neural Network with TensorFlow",
      excerpt: "A comprehensive guide to creating, training, and deploying neural networks for beginners in machine learning...",
      date: "2025-08-10", 
      readTime: "12 min read",
      category: "Deep Learning",
      image: "https://via.placeholder.com/400x200/8B5CF6/ffffff?text=Neural+Networks"
    },
    {
      id: 3,
      title: "Web Scraping for ML: Collecting Data with Scrapy",
      excerpt: "Learn how to efficiently collect and preprocess data from websites using Scrapy for your machine learning projects...",
      date: "2025-08-05",
      readTime: "10 min read", 
      category: "Data Science",
      image: "https://via.placeholder.com/400x200/10B981/ffffff?text=Web+Scraping"
    }
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
      const currentProgress = window.pageYOffset;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentProgress / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Welcome modal timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);
    return () => clearTimeout(timer);
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

    <main className="min-h-screen font-sans bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 dark:text-white transition-colors duration-500 relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </div>
      
      {/* Enhanced Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        {/* Additional floating elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-70"></div>
      </div>
      
      {/* Navbar with enhanced design */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Harsh Agarwal
            </motion.h1>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">About</a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Projects</a>
              <a href="#experience" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Experience</a>
              <a href="#blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Blog</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Contact</a>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.a
                href="/Resume.pdf"
                download="Resume.pdf"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                  <span className="text-gray-900 dark:text-white">Hi, I'm</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
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
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
                  <motion.span
                    key={currentRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    {roles[currentRole]}
                  </motion.span>
                  {" "}specializing in 
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400"> computer vision</span>, 
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400"> deep learning</span>, and 
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400"> intelligent systems</span>
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
                  src={profileIm}
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

        {/* Continue with rest of sections... */}
      </div>
    </main>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, MapPin, Calendar, ExternalLink, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import profileIm from '/profile.jpg'


export default function App() {
  // Removed dark mode functionality as requested
  const [currentRole, setCurrentRole] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const roles = [
    "AI/ML Engineer",
    "Computer Vision Specialist",
    "Deep Learning Expert",
    "Data Scientist"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
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
    <main className="min-h-screen font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 dark:text-white transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </div>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Harsh Agarwal
            </motion.h1>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
              <a href="#experience" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Resume download commented out for manual path update */}
              {/* 
              <motion.a
                href="/Resume.pdf"
                download="Harsh_Agarwal_Resume.pdf"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
              */}
              
              {/* Dark mode toggle removed as requested */}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Hero Section */}
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
                  <span className="text-4xl">�</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
                  <motion.span
                    key={currentRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
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
                <a 
                  href="#contact" 
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get In Touch
                </a>
                <a 
                  href="#projects" 
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300"
                >
                  View Projects
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative group">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-2xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
                
                {/* Rotating border animation */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-spin opacity-75 blur-sm"></div>
                <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full"></div>
                
                {/* Profile image */}
                <motion.img
                  src={profileIm}
                  alt="Harsh Agarwal"
                  className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700 group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
                  }}
                />
                
                {/* Floating particles */}
                <div className="absolute top-10 left-10 w-3 h-3 bg-blue-500 rounded-full animate-bounce opacity-70"></div>
                <div className="absolute top-20 right-10 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-20 left-20 w-4 h-4 bg-indigo-500 rounded-full animate-pulse opacity-50"></div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "15+", label: "AI/ML Projects", icon: "🤖" },
              { number: "97%", label: "Model Accuracy", icon: "🎯" },
              { number: "3+", label: "Years Learning", icon: "📚" },
              { number: "100+", label: "Problems Solved", icon: "💡" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-indigo-600 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* About Section */}
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
            
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
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

        {/* Skills Section */}
        <motion.section
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Skills</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Programming", "AI/ML", "Core CS", "Tools"].map((category) => (
              <div key={category} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
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
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      {/* Projects */}
      <motion.section
        id="projects"
        className="max-w-6xl mx-auto py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-10 text-indigo-600">Projects</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {[
            {
              title: "Real-time Face Mask Detection System",
              description: "Built a production-ready face mask detection system using OpenCV and deep learning. Implemented CNN architecture with 97% accuracy, optimized for real-time processing with multi-threading support.",
              tech: ["Python", "OpenCV", "TensorFlow", "CNN", "Real-time Processing"],
              link: "https://github.com/Harsh741334/FaceFeatureDetecction",
              featured: true
            },
            {
              title: "AI-Powered House Visualization Platform",
              description: "Developed an intelligent system that transforms house images into detailed architectural insights using BLIP vision model, GPT-4 API integration, and Stable Diffusion for enhanced visualizations.",
              tech: ["Python", "BLIP", "GPT-4 API", "Stable Diffusion", "Computer Vision"],
              link: "https://github.com/Harsh741334/AI-Powered-House-Prompt-Enhancer-Generator",
              featured: true
            },
            {
              title: "Multi-Platform Social Media Automation Suite",
              description: "Engineered a comprehensive automation solution for social media management across multiple platforms. Implemented robust API integrations, rate limiting, and error handling for enterprise-level reliability.",
              tech: ["Python", "REST APIs", "Automation", "Web Scraping", "Multithreading"],
              link: "https://github.com/Harsh741334/Multi-Platform-Social-Media-Automation",
              featured: false
            },
            {
              title: "Smart Algorithm Visualizer",
              description: "Interactive web application for visualizing sorting and pathfinding algorithms. Built with React.js and custom animation engine for educational purposes.",
              tech: ["React.js", "JavaScript", "CSS3", "Algorithms", "Data Visualization"],
              link: "#",
              featured: false
            }
          ].map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                project.featured ? 'border-2 border-indigo-200 dark:border-indigo-700' : ''
              }`}
              whileHover={{ 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              {project.featured && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-sm font-medium">
                  Featured Project
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {project.link === "#" ? "Coming Soon" : "View Project"} <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

        {/* Experience Section */}
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
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Experience</span>
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
                description: "Developing machine learning models for client projects, implementing computer vision solutions, and contributing to AI-powered applications using Python, TensorFlow, and OpenCV."
              },
              {
                company: "Cognifyz Technologies",
                role: "Software Development Intern",
                duration: "January 2024 - February 2024",
                location: "Remote",
                current: false,
                description: "Built responsive web applications, implemented machine learning algorithms, and collaborated with cross-functional teams to deliver AI-powered software solutions."
              }
            ].map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-blue-600"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.company}</h3>
                    <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">{exp.role}</p>
                  </div>
                  {exp.current && (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mt-2 md:mt-0">
                      Current
                    </span>
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Blog Section */}
        <motion.section
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Technical Blog</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
                Optimizing Computer Vision Models for Real-Time Processing
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Deep dive into performance optimization techniques for computer vision applications, including model quantization, 
                multi-threading, and hardware acceleration strategies.
              </p>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">Computer Vision</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">Performance</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Coming Soon...</div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
                Building Scalable React Applications: Lessons Learned
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Best practices for structuring large React applications, state management strategies, 
                and performance optimization techniques for modern web development.
              </p>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">React.js</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">Web Development</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Coming Soon...</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Comments/Feedback Section */}
        <motion.section
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Share Your Thoughts</span>
            </h2>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          >
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                I'd love to hear your feedback, suggestions, or just connect with fellow AI enthusiasts! 
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
              <div className="text-center p-6 bg-blue-50 dark:bg-gray-700 rounded-xl">
                <div className="text-2xl mb-3">💬</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">General Feedback</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Share your thoughts about my portfolio and projects</p>
              </div>
              <div className="text-center p-6 bg-purple-50 dark:bg-gray-700 rounded-xl">
                <div className="text-2xl mb-3">🤝</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Collaboration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Interested in working together on AI projects?</p>
              </div>
              <div className="text-center p-6 bg-indigo-50 dark:bg-gray-700 rounded-xl">
                <div className="text-2xl mb-3">🚀</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Opportunities</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Let's discuss internships or job opportunities</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Let's Connect</span>
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                I'm always open to discussing new opportunities, collaborations, or just having a chat about AI and technology.
              </p>
              <a 
                href="mailto:harsh741334@gmail.com" 
                className="inline-flex items-center gap-2 text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <Mail className="w-6 h-6" />
                harsh741334@gmail.com
              </a>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-center gap-8">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/harsh-agarwal-608626243/", color: "hover:text-blue-700" },
                { icon: Github, href: "https://github.com/Harsh741334", color: "hover:text-gray-800 dark:hover:text-white" },
                { icon: Instagram, href: "https://www.instagram.com/h_ars_a/", color: "hover:text-pink-600" },
                { icon: Twitter, href: "https://x.com/Harsh741334", color: "hover:text-blue-500" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg ${social.color} transition-all duration-300 transform hover:scale-110`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-8 h-8" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Floating Contact Button */}
      <motion.a
        href="mailto:harsh741334@gmail.com"
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <Mail className="w-6 h-6" />
      </motion.a>

      {/* Back to Top Button */}
      {scrollProgress > 20 && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 z-50 p-4 bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              © {new Date().getFullYear()} Harsh Agarwal. All rights reserved. Built with React & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}


















































// import React, { useState, useEffect } from "react";
// // remove both, or use HTML tags instead (see below)

// import { Github, Linkedin, Sun, Moon } from "lucide-react";
// import { motion } from "framer-motion";
// // import resume from "public/Harsh_Agarwal_Resume.pdf";

// export default function App() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   return (
//     <main className="min-h-screen p-8 font-sans bg-gray-100 dark:bg-gray-900 dark:text-white">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center mb-12">
//         <h1 className="text-2xl font-bold">Harsh Agarwal</h1>
//         <div className="flex gap-4 items-center">
//           <a
//            href="/Harsh_Agarwal_Resume.pdf"
//            download
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//               Download Resume
//           </a>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
//           >
//             {darkMode ? <Sun /> : <Moon />}
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <motion.section 
//         className="text-center mb-16"
//         initial={{ opacity: 0, y: -20 }} 
//         whileInView={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//       >
//         <h1 className="text-4xl font-bold mb-2">Harsh Agarwal</h1>
//         <p className="text-xl">AI Developer</p>
//       </motion.section>

//       {/* About Section */}
//       <motion.section 
//         className="max-w-3xl mx-auto mb-16"
//         initial={{ opacity: 0 }} 
//         whileInView={{ opacity: 1 }} 
//         transition={{ delay: 0.2, duration: 0.6 }}
//         viewport={{ once: true }}
//       >
//         <h2 className="text-2xl font-semibold mb-4">About Me</h2>
//         <p className="leading-relaxed">
//           Hi, I'm Harsh — a first-year Computer Science undergraduate at JECRC University with a growing passion for AI,
//           computer vision, and deep learning. I'm currently building a strong foundation in C, C++, DSA, and Python
//           while exploring real-time image processing with OpenCV and neural networks for intelligent systems.
//           <br /><br />
//           Driven by curiosity and problem-solving, I enjoy applying theory to hands-on projects and thrive in collaborative,
//           fast-paced environments. I'm actively seeking opportunities to learn, build, and contribute in the AI and tech space.
//           Let's connect and innovate together!
//         </p>
//       </motion.section>

//       {/* Projects */}
//       {/* Projects */}
// <motion.section 
//   className="max-w-3xl mx-auto mb-16"
//   initial={{ opacity: 0 }} 
//   whileInView={{ opacity: 1 }} 
//   transition={{ delay: 0.4, duration: 0.6 }}
//   viewport={{ once: true }}
// >
//   <h2 className="text-2xl font-semibold mb-4">Projects</h2>

//   <div className="mb-4 p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
//     <h3 className="text-xl font-semibold">Real-time Face Mask Detection</h3>
//     <p>
//       Built using OpenCV and a CNN-based classifier to detect if people are wearing masks in real-time video feeds.
//     </p>
//   </div>

//   <div className="mb-4 p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
//     <h3 className="text-xl font-semibold">AI-based Traffic Sign Recognition</h3>
//     <p>
//       Uses a convolutional neural network to recognize and classify traffic signs from input images.
//     </p>
//   </div>

//   <div className="mb-4 p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
//     <h3 className="text-xl font-semibold">Web Scraper using Scrapy</h3>
//     <p>
//       Developed a custom scraper to extract product data from e-commerce websites using Python and Scrapy.
//     </p>
//   </div>
// </motion.section>


//       {/* Skills */}
//       <motion.section 
//         className="max-w-3xl mx-auto mb-16"
//         initial={{ opacity: 0 }} 
//         whileInView={{ opacity: 1 }} 
//         transition={{ delay: 0.6, duration: 0.6 }}
//         viewport={{ once: true }}
//       >
//         <h2 className="text-2xl font-semibold mb-4">Skills</h2>
//         <ul className="grid grid-cols-2 gap-4">
//           <li>Python</li>
//           <li>C++</li>
//           <li>DSA</li>
//           <li>Scrapy</li>
//           <li>MongoDB</li>
//           <li>CNN</li>
//           <li>RNN</li>
//           <li>Segmentation in AI</li>
//           <li>Semantic Segmentation</li>
//           <li>Instance Segmentation</li>
//           <li>Prompt Engineering</li>
//         </ul>
//       </motion.section>

//       {/* Contact */}
//       <motion.section 
//         className="max-w-3xl mx-auto text-center"
//         initial={{ opacity: 0 }} 
//         whileInView={{ opacity: 1 }} 
//         transition={{ delay: 0.8, duration: 0.6 }}
//         viewport={{ once: true }}
//       >
//         <h2 className="text-2xl font-semibold mb-4">Contact</h2>
//         <p className="mb-2">Email: <a href="mailto:harsh741334@gmail.com" className="text-blue-500">harsh741334@gmail.com</a></p>
//         <div className="flex justify-center gap-6 mt-4">
//           <a href="https://www.linkedin.com/in/harsh-agarwal-608626243/" target="_blank" rel="noopener noreferrer">
//             <Linkedin className="w-6 h-6 text-blue-700" />
//           </a>
//           <a href="https://github.com/Harsh741334" target="_blank" rel="noopener noreferrer">
//             <Github className="w-6 h-6 text-gray-800 dark:text-white" />
//           </a>
//         </div>
//       </motion.section>
//     </main>
//   );
// }

// export const metadata = {
//   title: "Harsh Agarwal | AI Developer",
//   description: "Portfolio of Harsh Agarwal - AI Developer with projects in Computer Vision, Deep Learning, and Web Scraping.",
//   openGraph: {
//     title: "Harsh Agarwal | AI Developer",
//     description: "Projects in AI, Deep Learning, CV and more. Portfolio website.",
//     url: "https://harsh-portfolio.vercel.app",
//     type: "website",
//     images: [
//       {
//         url: "https://harsh-portfolio.vercel.app/preview.png",
//         width: 1200,
//         height: 630,
//         alt: "Harsh Agarwal Portfolio"
//       }
//     ]
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Harsh Agarwal | AI Developer",
//     description: "AI and Deep Learning Portfolio",
//     images: ["https://harsh-portfolio.vercel.app/preview.png"]
//   }
// };

// */

import React, { useState, useEffect, Suspense, lazy, memo } from "react";
import { Github, Linkedin, Mail, MapPin, Calendar, ExternalLink, Instagram, Twitter, Menu, X, ArrowUp, Download, Briefcase, GraduationCap, Award, Code2, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from '/profile.jpg';

// Lazy load heavy components for better performance
const VisitorStats = lazy(() => import('./components/charts').then(module => ({ default: module.VisitorStats })));
const GitHubStats = lazy(() => import('./components/charts').then(module => ({ default: module.GitHubStats })));
const SkillsLineChart = lazy(() => import('./components/charts').then(module => ({ default: module.SkillsLineChart })));
const BasicBlog = lazy(() => import('./components/blog').then(module => ({ default: module.BasicBlog })));

// Regular imports for lightweight components
import { PWAInstaller, ChatBot, ChartSkeleton } from './components/ui';

// ============ CONSTANTS ============
const ROLES = [
  "AI/ML Engineer",
  "Computer Vision Specialist",
  "Deep Learning Expert",
  "Data Scientist",
  "ML Research Enthusiast"
];

const SKILLS = {
  "Languages": [
    { name: "Python", level: 95, icon: "🐍" },
    { name: "C++", level: 90, icon: "⚡" },
    { name: "SQL & MongoDB", level: 80, icon: "🗃️" }
  ],
  "AI & ML": [
    { name: "Computer Vision", level: 88, icon: "👁️" },
    { name: "Deep Learning", level: 85, icon: "🧠" },
    { name: "Machine Learning", level: 82, icon: "📊" },
    { name: "Neural Networks", level: 84, icon: "🔗" }
  ],
  "Frameworks": [
    { name: "TensorFlow", level: 82, icon: "🔥" },
    { name: "PyTorch", level: 78, icon: "🔦" },
    { name: "OpenCV", level: 90, icon: "📷" },
    { name: "Scikit-learn", level: 85, icon: "📈" }
  ],
  "Tools": [
    { name: "Git & GitHub", level: 88, icon: "🔀" },
    { name: "Docker", level: 72, icon: "🐳" },
    { name: "Jupyter", level: 90, icon: "📓" },
    { name: "VS Code", level: 92, icon: "💻" }
  ]
};

const PROJECTS = [
  {
    title: "Student Mental Health Predictor",
    description: "ML-powered web app predicting depression risk in students using Keras neural networks with an intuitive Streamlit interface.",
    tech: ["Python", "TensorFlow", "Keras", "Streamlit"],
    github: "https://github.com/Harsh741334/student-mental-health-predictor",
    demo: "https://studenthealthpridiction.streamlit.app/",
    category: "Healthcare AI",
    gradient: "from-violet-600 to-indigo-600",
    icon: "🧠",
    stats: { accuracy: "94%", users: "500+" },
    featured: true
  },
  {
    title: "Car Price Prediction",
    description: "Deep learning regression model with 15+ layer neural network architecture for accurate automotive price predictions.",
    tech: ["Python", "TensorFlow", "Keras", "Pandas"],
    github: "https://github.com/Harsh741334/HousePridictionModel",
    category: "Deep Learning",
    gradient: "from-orange-500 to-red-600",
    icon: "🚗",
    stats: { accuracy: "89%", layers: "15+" }
  },
  {
    title: "Heart Disease Prediction",
    description: "Intelligent prediction system with Streamlit web interface for real-time heart disease risk assessment using multiple ML algorithms.",
    tech: ["Python", "Scikit-learn", "Streamlit", "Pandas"],
    github: "https://github.com/Harsh741334/heart-disease-prediction",
    demo: "https://heart-disease-prediction-bq4ucs4cpp7swtcyeebegn.streamlit.app/",
    category: "Healthcare AI",
    gradient: "from-red-500 to-pink-600",
    icon: "❤️",
    stats: { accuracy: "92%", features: "13" },
    featured: true
  },
  {
    title: "Malaria Cell Classification",
    description: "CNN-based automated malaria detection system analyzing blood cell images with state-of-the-art diagnostic accuracy.",
    tech: ["Python", "TensorFlow", "OpenCV", "CNN"],
    github: "https://github.com/Harsh741334/MalariaDetectionModel",
    category: "Computer Vision",
    gradient: "from-green-500 to-emerald-600",
    icon: "🔬",
    stats: { accuracy: "96%", images: "27K+" }
  },
  {
    title: "Face Mask Detection",
    description: "Real-time face mask detection system leveraging OpenCV with exceptional accuracy and multi-threading for production use.",
    tech: ["Python", "OpenCV", "TensorFlow", "CNN"],
    github: "https://github.com/Harsh741334/FaceFeatureDetecction",
    category: "Computer Vision",
    gradient: "from-cyan-500 to-blue-600",
    icon: "🎭",
    stats: { accuracy: "97%", fps: "30+" }
  },
  {
    title: "AI House Visualization",
    description: "Transform house images into stunning architectural insights using BLIP, GPT-4, and Stable Diffusion AI models.",
    tech: ["Python", "BLIP", "GPT-4", "Stable Diffusion"],
    github: "https://github.com/Harsh741334/AI-Powered-House-Prompt-Enhancer-Generator",
    category: "Generative AI",
    gradient: "from-amber-500 to-orange-600",
    icon: "🏠",
    stats: { models: "3", quality: "HD" }
  },
  {
    title: "Social Media Automation",
    description: "Enterprise-grade multi-platform automation suite with robust API integrations and scheduled posting capabilities.",
    tech: ["Python", "REST APIs", "Automation", "Threading"],
    github: "https://github.com/Harsh741334/Multi-Platform-Social-Media-Automation",
    category: "Automation",
    gradient: "from-purple-500 to-pink-600",
    icon: "📱",
    stats: { platforms: "5+", posts: "1000+" }
  }
];

const EXPERIENCES = [
  {
    company: "Codified Web Solutions",
    role: "AI Developer",
    period: "June 2025 - December 2025",
    location: "Jaipur, Rajasthan",
    type: "Full-time",
    description: "Led AI/ML development for client projects, implemented computer vision solutions, and managed a team of 3 developers.",
    highlights: [
      "Built 5+ ML models achieving >95% accuracy",
      "Reduced processing time by 40% through optimization",
      "Implemented CI/CD pipelines for ML deployments"
    ],
    current: false
  },
  {
    company: "Cognifyz Technologies",
    role: "Software Development Intern",
    period: "January - February 2024",
    location: "Remote",
    type: "Internship",
    description: "Developed responsive web applications and implemented machine learning algorithms for AI-powered software solutions.",
    highlights: [
      "Developed 3 production-ready web applications",
      "Improved user engagement metrics by 25%",
      "Collaborated with cross-functional teams of 10+ members"
    ],
    current: false
  }
];

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/Harsh741334", label: "GitHub", color: "hover:text-gray-100" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/harsh-agarwal-608626243/", label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: Instagram, href: "https://www.instagram.com/h_ars_a/", label: "Instagram", color: "hover:text-pink-400" },
  { icon: Twitter, href: "https://x.com/Harsh741334", label: "Twitter", color: "hover:text-sky-400" }
];

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "LeetCode", href: "#leetcode" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" }
];

// LeetCode Profile Data (Static)
const LEETCODE_PROFILE = {
  username: "ld52jn1bE8",
  profileUrl: "https://leetcode.com/u/ld52jn1bE8/",
  totalSolved: 41,
  easySolved: 22,
  mediumSolved: 14,
  hardSolved: 5,
  easyTotal: 850,
  mediumTotal: 1800,
  hardTotal: 800,
  ranking: 2500000,
  streak: 13,
  activeDays: 20,
  acceptanceRate: "52.3%"
};

const DSA_TOPICS = [
  { name: "Arrays & Strings", solved: 12, icon: "📊", color: "from-blue-500 to-cyan-500" },
  { name: "Two Pointers", solved: 5, icon: "👆", color: "from-purple-500 to-pink-500" },
  { name: "Sliding Window", solved: 3, icon: "🪟", color: "from-green-500 to-emerald-500" },
  { name: "Hashing", solved: 6, icon: "#️⃣", color: "from-yellow-500 to-orange-500" },
  { name: "Binary Search", solved: 4, icon: "🔍", color: "from-red-500 to-pink-500" },
  { name: "Trees & BST", solved: 5, icon: "🌳", color: "from-teal-500 to-cyan-500" },
  { name: "Graphs & BFS/DFS", solved: 2, icon: "🕸️", color: "from-indigo-500 to-purple-500" },
  { name: "Dynamic Programming", solved: 3, icon: "📈", color: "from-orange-500 to-red-500" },
  { name: "Stack & Queue", solved: 4, icon: "📚", color: "from-violet-500 to-purple-500" },
  { name: "Linked List", solved: 3, icon: "🔗", color: "from-sky-500 to-blue-500" }
];

// ============ HELPER COMPONENTS ============
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center p-12">
    <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
  </div>
));

const SectionBadge = memo(({ children }) => (
  <motion.span
    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-4"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.span>
));

const SectionTitle = memo(({ children, className = "" }) => (
  <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${className}`}>
    <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
      {children}
    </span>
  </h2>
));

const GradientButton = memo(({ children, href, onClick, variant = "primary", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300";
  const variants = {
    primary: "px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40",
    secondary: "px-8 py-4 border-2 border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-400",
    ghost: "px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5"
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </Component>
  );
});

// ============ MAIN COMPONENTS ============

// Animated Background
const AnimatedBackground = memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Gradient Orbs */}
    <motion.div
      className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    <motion.div
      className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)" }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 10, repeat: Infinity, delay: 2 }}
    />
    <motion.div
      className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full"
      style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
      animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }}
      transition={{ duration: 15, repeat: Infinity }}
    />
    
    {/* Grid Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />
  </div>
));

// Navigation Component
const Navigation = memo(({ scrollProgress }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <motion.nav
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-black/20' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Harsh Agarwal
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                href="/harsh resume 3.0.pdf"
                download
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-6 space-y-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="/Resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
});

// Hero Section
const HeroSection = memo(() => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Available for opportunities</span>
            </motion.div>

            <div>
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-white">Hi, I'm</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Harsh Agarwal
                </span>
              </motion.h1>

              <motion.div
                className="mt-6 h-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentRole}
                    className="text-xl md:text-2xl text-indigo-400 font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {ROLES[currentRole]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              <motion.p
                className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Passionate about building intelligent systems that solve real-world problems.
                Specializing in <span className="text-indigo-400">Computer Vision</span>,{" "}
                <span className="text-purple-400">Deep Learning</span>, and{" "}
                <span className="text-pink-400">ML Research</span>.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GradientButton href="#contact">
                Get In Touch
              </GradientButton>
              <GradientButton href="#projects" variant="secondary">
                View Projects
              </GradientButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/5 rounded-xl border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:border-white/20 hover:bg-white/10`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow Effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-20" />
              
              {/* Image Container */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <img
                  src={profileImg}
                  alt="Harsh Agarwal - AI/ML Engineer"
                  className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-gray-900"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 bg-gray-900/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="text-2xl">🚀</span>
                <span className="ml-2 text-sm font-medium text-white">15+ Projects</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-gray-900/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-2xl">🎯</span>
                <span className="ml-2 text-sm font-medium text-white">41+ LeetCode</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

// Stats Section
const StatsSection = memo(() => {
  const stats = [
    { value: "15+", label: "AI/ML Projects", icon: Brain, color: "from-indigo-500 to-blue-500" },
    { value: "41+", label: "LeetCode Solved", icon: Award, color: "from-purple-500 to-pink-500" },
    { value: "6+", label: "Months Experience", icon: Briefcase, color: "from-emerald-500 to-teal-500" },
    { value: "41+", label: "Problems Solved", icon: Code2, color: "from-orange-500 to-red-500" }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300">
                <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// About Section
const AboutSection = memo(() => (
  <section id="about" className="py-24 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <SectionBadge>👋 About Me</SectionBadge>
          <SectionTitle>Building the Future with AI</SectionTitle>
          
          <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>
              I'm a third-year Computer Science student at{" "}
              <span className="text-indigo-400 font-semibold">JECRC University</span>,
              with a deep passion for artificial intelligence and its potential to transform our world.
            </p>
            <p>
              My expertise spans <span className="text-purple-400">Computer Vision</span>,{" "}
              <span className="text-pink-400">Deep Learning</span>, and{" "}
              <span className="text-indigo-400">Machine Learning</span>, with hands-on experience
              building production-ready AI systems that solve real problems.
            </p>
            <p>
              When I'm not training neural networks, you'll find me exploring the latest in AI research,
              contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { icon: GraduationCap, label: "Education", value: "3rd Year CS", color: "from-indigo-500 to-blue-500" },
            { icon: MapPin, label: "Location", value: "Jaipur, India", color: "from-purple-500 to-pink-500" },
            { icon: Mail, label: "Email", value: "harsh741334@gmail.com", color: "from-emerald-500 to-teal-500" },
            { icon: Briefcase, label: "Status", value: "Open to Work", color: "from-orange-500 to-red-500" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="p-6 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-10 h-10 mb-3 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm text-gray-400 mb-1">{item.label}</div>
              <div className="text-white font-semibold text-sm">{item.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
));

// Skills Section
const SkillsSection = memo(() => (
  <section id="skills" className="py-24 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionBadge>💻 Tech Stack</SectionBadge>
        <SectionTitle>Skills & Expertise</SectionTitle>
        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
          A comprehensive toolkit for building intelligent systems
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(SKILLS).map(([category, skills], categoryIndex) => (
          <motion.div
            key={category}
            className="p-6 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h3 className="text-lg font-bold text-white mb-6">{category}</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-xs text-indigo-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: categoryIndex * 0.1 + index * 0.05 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

// LeetCode Section
const LeetCodeSection = memo(() => (
  <section id="leetcode" className="py-24 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionBadge>🏆 Competitive Coding</SectionBadge>
        <SectionTitle>LeetCode Journey</SectionTitle>
        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
          Solving problems, one algorithm at a time
        </p>
      </motion.div>

      {/* Main Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <motion.div
          className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl font-bold text-green-400 mb-2">{LEETCODE_PROFILE.totalSolved}</div>
          <div className="text-gray-400">Problems Solved</div>
        </motion.div>

        <motion.div
          className="p-6 bg-gradient-to-br from-orange-500/20 to-amber-600/20 border border-orange-500/30 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-4xl font-bold text-orange-400 mb-2">{LEETCODE_PROFILE.streak}</div>
          <div className="text-gray-400">Day Streak 🔥</div>
        </motion.div>

        <motion.div
          className="p-6 bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-500/30 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-4xl font-bold text-purple-400 mb-2">{LEETCODE_PROFILE.activeDays}</div>
          <div className="text-gray-400">Active Days 📅</div>
        </motion.div>

        <motion.div
          className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-4xl font-bold text-blue-400 mb-2">{(LEETCODE_PROFILE.ranking / 1000000).toFixed(1)}M+</div>
          <div className="text-gray-400">Global Ranking</div>
        </motion.div>
      </div>

      {/* Problem Difficulty Breakdown */}
      <motion.div
        className="mb-12 p-8 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Problem Solving Progress</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Easy */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="#1f2937" strokeWidth="8" fill="none" />
                <circle
                  cx="64" cy="64" r="56"
                  stroke="#22c55e"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(LEETCODE_PROFILE.easySolved / LEETCODE_PROFILE.easyTotal) * 351.86} 351.86`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-400">{LEETCODE_PROFILE.easySolved}</span>
              </div>
            </div>
            <div className="text-green-400 font-semibold">Easy</div>
            <div className="text-gray-500 text-sm">{LEETCODE_PROFILE.easySolved}/{LEETCODE_PROFILE.easyTotal}</div>
          </div>

          {/* Medium */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="#1f2937" strokeWidth="8" fill="none" />
                <circle
                  cx="64" cy="64" r="56"
                  stroke="#f59e0b"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(LEETCODE_PROFILE.mediumSolved / LEETCODE_PROFILE.mediumTotal) * 351.86} 351.86`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-400">{LEETCODE_PROFILE.mediumSolved}</span>
              </div>
            </div>
            <div className="text-amber-400 font-semibold">Medium</div>
            <div className="text-gray-500 text-sm">{LEETCODE_PROFILE.mediumSolved}/{LEETCODE_PROFILE.mediumTotal}</div>
          </div>

          {/* Hard */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="#1f2937" strokeWidth="8" fill="none" />
                <circle
                  cx="64" cy="64" r="56"
                  stroke="#ef4444"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(LEETCODE_PROFILE.hardSolved / LEETCODE_PROFILE.hardTotal) * 351.86} 351.86`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-400">{LEETCODE_PROFILE.hardSolved}</span>
              </div>
            </div>
            <div className="text-red-400 font-semibold">Hard</div>
            <div className="text-gray-500 text-sm">{LEETCODE_PROFILE.hardSolved}/{LEETCODE_PROFILE.hardTotal}</div>
          </div>
        </div>
      </motion.div>

      {/* DSA Topics Grid */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">DSA Topics Covered</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DSA_TOPICS.map((topic, index) => (
            <motion.div
              key={topic.name}
              className={`p-4 bg-gradient-to-br ${topic.color} bg-opacity-10 border border-white/10 rounded-xl hover:border-white/30 transition-all duration-300`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{topic.icon}</span>
                <div>
                  <div className="font-semibold text-white text-sm">{topic.name}</div>
                  <div className="text-xs text-gray-400">{topic.solved} solved</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements & CTA */}
      <motion.div
        className="p-8 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm">🔥 {LEETCODE_PROFILE.streak} Day Streak</span>
          <span className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">✅ {LEETCODE_PROFILE.acceptanceRate} Acceptance</span>
          <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm">📅 {LEETCODE_PROFILE.activeDays} Active Days</span>
        </div>
        <a
          href={LEETCODE_PROFILE.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300"
        >
          <Code2 size={20} />
          View Full LeetCode Profile
          <ExternalLink size={16} />
        </a>
      </motion.div>
    </div>
  </section>
));

// Project Card Component
const ProjectCard = memo(({ project, index }) => (
  <motion.div
    className="group relative h-full"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="relative h-full bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500">
      {/* Gradient Bar */}
      <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />
      
      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.gradient} flex items-center justify-center text-2xl shadow-lg`}>
              {project.icon}
            </div>
            <div>
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h3>
            </div>
          </div>
          {project.featured && (
            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-medium rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mb-4">
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className={`text-lg font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                {value}
              </div>
              <div className="text-xs text-gray-500 capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-lg border border-gray-700/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-xl border border-gray-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-4 h-4" />
            Code
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r ${project.gradient} text-white text-sm font-medium rounded-xl shadow-lg transition-all`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
    </div>
  </motion.div>
));

// Projects Section
const ProjectsSection = memo(() => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionBadge>🚀 Portfolio</SectionBadge>
          <SectionTitle>Featured Projects</SectionTitle>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my AI/ML projects showcasing deep learning, computer vision, and intelligent systems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Show More Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GradientButton onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : `View All ${PROJECTS.length} Projects`}
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ↓
            </motion.span>
          </GradientButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { value: "7+", label: "Total Projects", icon: "📦" },
            { value: "95%", label: "Avg Accuracy", icon: "🎯" },
            { value: "3", label: "Live Apps", icon: "🌐" },
            { value: "100%", label: "Open Source", icon: "💻" }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

// Experience Section
const ExperienceSection = memo(() => (
  <section id="experience" className="py-24 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionBadge>💼 Career</SectionBadge>
        <SectionTitle>Work Experience</SectionTitle>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={exp.company}
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Timeline Line */}
            {index < EXPERIENCES.length - 1 && (
              <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-indigo-500 to-transparent" />
            )}

            <div className="relative flex gap-6">
              {/* Timeline Dot */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${exp.current ? 'from-green-500 to-emerald-500' : 'from-indigo-500 to-purple-500'} flex items-center justify-center shadow-lg`}>
                <Briefcase className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    <p className="text-indigo-400 font-medium">{exp.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {exp.current && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full animate-pulse">
                        Current
                      </span>
                    )}
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{exp.description}</p>

                <div className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-indigo-400 mt-1">▸</span>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

// Analytics Section
const AnalyticsSection = memo(() => (
  <section className="py-24 relative z-10 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionBadge>📊 Analytics</SectionBadge>
        <SectionTitle>Live Statistics</SectionTitle>
        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
          Real-time portfolio metrics and GitHub activity
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Suspense fallback={<ChartSkeleton />}>
          <VisitorStats />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <GitHubStats />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <SkillsLineChart />
        </Suspense>
      </div>
    </div>
  </section>
));

// Contact Section
const ContactSection = memo(() => (
  <section id="contact" className="py-24 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionBadge>📬 Contact</SectionBadge>
        <SectionTitle>Let's Connect</SectionTitle>
        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Let's talk!
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Mail, label: "Email", value: "harsh741334@gmail.com", href: "mailto:harsh741334@gmail.com", color: "from-indigo-500 to-blue-500" },
            { icon: MapPin, label: "Location", value: "Jaipur, India", href: "#", color: "from-purple-500 to-pink-500" },
            { icon: Briefcase, label: "Status", value: "Available", href: "#", color: "from-emerald-500 to-teal-500" }
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="p-6 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-400 mb-1">{item.label}</div>
              <div className="text-white font-semibold">{item.value}</div>
            </motion.a>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {SOCIAL_LINKS.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-indigo-500/30 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GradientButton href="mailto:harsh741334@gmail.com?subject=Project%20Inquiry">
            <Mail className="w-5 h-5" />
            Send Message
          </GradientButton>
        </motion.div>
      </div>
    </div>
  </section>
));

// Footer
const Footer = memo(() => (
  <footer className="py-12 border-t border-white/10 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Harsh Agarwal
          </h3>
          <p className="text-gray-400 mb-4">
            AI/ML Engineer passionate about building intelligent systems that solve real-world problems.
          </p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.slice(0, 3).map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <div className="space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4">Contact</h4>
          <div className="space-y-2 text-gray-400">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              harsh741334@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Jaipur, Rajasthan, India
            </p>
            <p className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Open to Opportunities
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Harsh Agarwal. Built with React & Tailwind CSS ❤️
        </p>
      </div>
    </div>
  </footer>
));

// Back to Top Button
const BackToTop = memo(({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/25"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    )}
  </AnimatePresence>
));

// ============ MAIN APP ============
export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update document title and meta
  useEffect(() => {
    document.title = "Harsh Agarwal | AI/ML Engineer & Computer Vision Specialist";
    
    // Add meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Portfolio of Harsh Agarwal - AI/ML Engineer specializing in Computer Vision, Deep Learning, and Machine Learning. View projects, skills, and experience.';
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white antialiased">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navigation scrollProgress={scrollProgress} />

      {/* Main Content */}
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <SkillsSection />
        <LeetCodeSection />
        <ProjectsSection />
        <ExperienceSection />
        
        {/* Blog Section */}
        <section id="blog" className="py-24 relative z-10">
          <Suspense fallback={<LoadingSpinner />}>
            <BasicBlog />
          </Suspense>
        </section>

        <AnalyticsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTop show={scrollProgress > 20} />

      {/* Chatbot */}
      <ChatBot />

      {/* PWA Installer */}
      <PWAInstaller />
    </div>
  );
}

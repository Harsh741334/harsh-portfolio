import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsProgress = () => {
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [animatedValues, setAnimatedValues] = useState({});

  // Skills data with recent project-based updates
  const skillsData = {
    technical: [
      { name: 'Python', level: 95, color: 'from-blue-500 to-blue-700', projects: 15, growth: '+5%' },
      { name: 'Machine Learning', level: 92, color: 'from-purple-500 to-purple-700', projects: 12, growth: '+8%' },
      { name: 'Computer Vision', level: 90, color: 'from-green-500 to-green-700', projects: 10, growth: '+12%' },
      { name: 'Deep Learning', level: 88, color: 'from-red-500 to-red-700', projects: 8, growth: '+15%' },
      { name: 'TensorFlow/PyTorch', level: 85, color: 'from-orange-500 to-orange-700', projects: 9, growth: '+10%' },
      { name: 'React.js', level: 82, color: 'from-cyan-500 to-cyan-700', projects: 6, growth: '+7%' },
      { name: 'Node.js', level: 78, color: 'from-emerald-500 to-emerald-700', projects: 5, growth: '+6%' },
      { name: 'Docker', level: 75, color: 'from-indigo-500 to-indigo-700', projects: 4, growth: '+9%' },
    ],
    soft: [
      { name: 'Problem Solving', level: 96, color: 'from-violet-500 to-violet-700', projects: 18, growth: '+4%' },
      { name: 'Team Collaboration', level: 90, color: 'from-pink-500 to-pink-700', projects: 8, growth: '+6%' },
      { name: 'Project Management', level: 85, color: 'from-teal-500 to-teal-700', projects: 7, growth: '+8%' },
      { name: 'Communication', level: 88, color: 'from-rose-500 to-rose-700', projects: 10, growth: '+5%' },
      { name: 'Research & Analysis', level: 93, color: 'from-amber-500 to-amber-700', projects: 12, growth: '+7%' },
      { name: 'Adaptability', level: 91, color: 'from-lime-500 to-lime-700', projects: 15, growth: '+9%' },
    ],
    domains: [
      { name: 'Artificial Intelligence', level: 94, color: 'from-blue-600 to-purple-600', projects: 14, growth: '+11%' },
      { name: 'Data Science', level: 89, color: 'from-green-600 to-blue-600', projects: 11, growth: '+9%' },
      { name: 'Web Development', level: 80, color: 'from-orange-600 to-red-600', projects: 7, growth: '+6%' },
      { name: 'Cloud Computing', level: 72, color: 'from-cyan-600 to-teal-600', projects: 4, growth: '+13%' },
      { name: 'Mobile Development', level: 68, color: 'from-purple-600 to-pink-600', projects: 3, growth: '+15%' },
      { name: 'DevOps', level: 70, color: 'from-indigo-600 to-blue-600', projects: 3, growth: '+12%' },
    ]
  };

  const categories = [
    { id: 'technical', name: 'Technical Skills', icon: '⚡' },
    { id: 'soft', name: 'Soft Skills', icon: '🧠' },
    { id: 'domains', name: 'Domain Expertise', icon: '🎯' }
  ];

  // Animate progress bars on mount and category change
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimatedValues = {};
      skillsData[selectedCategory].forEach(skill => {
        newAnimatedValues[skill.name] = skill.level;
      });
      setAnimatedValues(newAnimatedValues);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Reset animations when category changes
  useEffect(() => {
    setAnimatedValues({});
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const SkillBar = ({ skill, index }) => {
    const animatedLevel = animatedValues[skill.name] || 0;
    
    return (
      <motion.div
        className="mb-6"
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <h4 className="text-white font-medium">{skill.name}</h4>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              {skill.growth}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-white/70">
            <span>{skill.projects} projects</span>
            <span className="text-white font-semibold">{skill.level}%</span>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
              initial={{ width: 0 }}
              animate={{ width: `${animatedLevel}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
          
          {/* Skill level indicator */}
          <motion.div
            className="absolute top-0 h-3 w-1 bg-white/80 rounded-full shadow-lg"
            initial={{ left: '0%' }}
            animate={{ left: `${animatedLevel}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
          />
        </div>
        
        {/* Hover effect overlay */}
        <motion.div
          className="mt-2 text-xs text-white/50 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          Used in {skill.projects} recent projects • Improving {skill.growth} this quarter
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="mr-2 text-2xl"
          >
            📊
          </motion.span>
          Skills Progress
        </h3>
        <motion.div 
          className="text-sm text-white/70"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Live Updates
        </motion.div>
      </div>

      {/* Category Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Skills Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 max-h-96 overflow-y-auto"
        >
          {skillsData[selectedCategory].map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Summary Stats */}
      <motion.div 
        className="mt-6 grid grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
          <motion.div 
            className="text-2xl font-bold text-purple-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            {skillsData[selectedCategory].length}
          </motion.div>
          <div className="text-xs text-white/70">Skills</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
          <motion.div 
            className="text-2xl font-bold text-green-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
          >
            {Math.round(skillsData[selectedCategory].reduce((acc, skill) => acc + skill.level, 0) / skillsData[selectedCategory].length)}%
          </motion.div>
          <div className="text-xs text-white/70">Avg Level</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
          <motion.div 
            className="text-2xl font-bold text-blue-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          >
            {skillsData[selectedCategory].reduce((acc, skill) => acc + skill.projects, 0)}
          </motion.div>
          <div className="text-xs text-white/70">Projects</div>
        </div>
      </motion.div>

      {/* Growth Indicator */}
      <motion.div 
        className="mt-4 p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-green-400 text-sm font-medium">📈 Overall Growth</span>
          <motion.span 
            className="text-green-300 font-bold"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            +{Math.round(skillsData[selectedCategory].reduce((acc, skill) => 
              acc + parseInt(skill.growth.replace('%', '').replace('+', '')), 0
            ) / skillsData[selectedCategory].length)}% this quarter
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsProgress;

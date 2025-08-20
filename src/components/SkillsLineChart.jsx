import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SkillsLineChart = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState('level');

  // Skills data with time-series progression
  const skillsData = [
    { name: 'AI/ML', level: 95, growth: 12, projects: 15, color: '#8B5CF6' },
    { name: 'Python', level: 94, growth: 8, projects: 18, color: '#3B82F6' },
    { name: 'Computer Vision', level: 90, growth: 15, projects: 12, color: '#10B981' },
    { name: 'Deep Learning', level: 88, growth: 18, projects: 10, color: '#F59E0B' },
    { name: 'React', level: 82, growth: 10, projects: 8, color: '#06B6D4' },
    { name: 'Node.js', level: 78, growth: 12, projects: 6, color: '#84CC16' },
  ];

  // Generate time-series data for the line chart
  const generateTimeSeriesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => {
      const dataPoint = { month };
      skillsData.forEach(skill => {
        const baseValue = skill[selectedMetric];
        const growth = skill.growth;
        // Simulate progressive growth over months
        const progressValue = Math.max(0, baseValue - (growth * (5 - index) / 5));
        dataPoint[skill.name] = Math.round(progressValue);
      });
      return dataPoint;
    });
  };

  const timeSeriesData = generateTimeSeriesData();

  // Chart dimensions - Responsive
  const chartWidth = 320;
  const chartHeight = 160;
  const padding = 30;

  // Calculate scales
  const maxValue = Math.max(...timeSeriesData.flatMap(d => 
    skillsData.map(skill => d[skill.name])
  ));
  const minValue = Math.min(...timeSeriesData.flatMap(d => 
    skillsData.map(skill => d[skill.name])
  ));

  const xScale = (index) => (index * (chartWidth - padding * 2)) / (timeSeriesData.length - 1) + padding;
  const yScale = (value) => chartHeight - padding - ((value - minValue) / (maxValue - minValue)) * (chartHeight - padding * 2);

  // Generate SVG path for each skill
  const generatePath = (skillName) => {
    const points = timeSeriesData.map((d, index) => 
      `${xScale(index)},${yScale(d[skillName])}`
    );
    return `M ${points.join(' L ')}`;
  };

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { id: 'level', name: 'Skill Level', icon: '📊', suffix: '%' },
    { id: 'growth', name: 'Growth Rate', icon: '📈', suffix: '%' },
    { id: 'projects', name: 'Projects', icon: '🚀', suffix: '' },
  ];

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mr-2 text-2xl"
          >
            📈
          </motion.span>
          Skills Progress Chart
        </h3>
        <motion.div 
          className="flex items-center text-sm text-green-400"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          Live Data
        </motion.div>
      </div>

      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => (
          <motion.button
            key={metric.id}
            onClick={() => setSelectedMetric(metric.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedMetric === metric.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-1">{metric.icon}</span>
            {metric.name}
          </motion.button>
        ))}
      </div>

      {/* Live Line Chart */}
      <div className="relative bg-black/20 rounded-lg p-3 mb-4 overflow-hidden">
        <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="max-w-full">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width={chartWidth} height={chartHeight} fill="url(#grid)" />

          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((value) => (
            <g key={value}>
              <line 
                x1={padding} 
                y1={yScale(value)} 
                x2={chartWidth - padding} 
                y2={yScale(value)} 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="1"
              />
              <text 
                x={padding - 10} 
                y={yScale(value) + 4} 
                fill="rgba(255,255,255,0.6)" 
                fontSize="10" 
                textAnchor="end"
              >
                {value}{metrics.find(m => m.id === selectedMetric)?.suffix}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {timeSeriesData.map((d, index) => (
            <text 
              key={d.month}
              x={xScale(index)} 
              y={chartHeight - 10} 
              fill="rgba(255,255,255,0.6)" 
              fontSize="10" 
              textAnchor="middle"
            >
              {d.month}
            </text>
          ))}

          {/* Skill lines */}
          {skillsData.map((skill, index) => (
            <g key={skill.name}>
              {/* Line path */}
              <motion.path
                d={generatePath(skill.name)}
                fill="none"
                stroke={skill.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: index * 0.2, ease: "easeInOut" }}
              />
              
              {/* Animated glow effect */}
              <motion.path
                d={generatePath(skill.name)}
                fill="none"
                stroke={skill.color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
                filter="blur(2px)"
                animate={{ 
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />

              {/* Data points */}
              {timeSeriesData.map((d, pointIndex) => (
                <motion.circle
                  key={`${skill.name}-${pointIndex}`}
                  cx={xScale(pointIndex)}
                  cy={yScale(d[skill.name])}
                  r="4"
                  fill={skill.color}
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + pointIndex * 0.1 }}
                  whileHover={{ scale: 1.5 }}
                >
                  <title>{`${skill.name}: ${d[skill.name]}${metrics.find(m => m.id === selectedMetric)?.suffix}`}</title>
                </motion.circle>
              ))}
            </g>
          ))}

          {/* Live animation line */}
          <motion.line
            x1={padding + (animationProgress * (chartWidth - padding * 2)) / 100}
            y1={padding}
            x2={padding + (animationProgress * (chartWidth - padding * 2)) / 100}
            y2={chartHeight - padding}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
            strokeDasharray="4,4"
            animate={{ strokeDashoffset: [0, -8] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Skills Legend */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: skill.color }}
            />
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{skill.name}</div>
              <div className="text-white/60 text-xs">
                {skill[selectedMetric]}{metrics.find(m => m.id === selectedMetric)?.suffix}
                <motion.span 
                  className="text-green-400 ml-2"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  +{skill.growth}%
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Real-time Updates Indicator */}
      <motion.div 
        className="mt-4 text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-white/50">
          🔄 Updates every 30 seconds • Last update: {new Date().toLocaleTimeString()}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SkillsLineChart;

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Calendar, Clock } from 'lucide-react';

const BasicBlog = () => {
  const upcomingBlogs = [
    {
      id: 1,
      title: "TensorFlow Deep Learning Fundamentals",
      description: "Comprehensive guide to building neural networks with TensorFlow, covering model architecture and optimization techniques.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&crop=center",
      category: "Deep Learning",
      estimatedDate: "Coming Soon"
    },
    {
      id: 2,
      title: "Computer Vision with Image Verification",
      description: "Building robust computer vision systems for image verification and authentication using OpenCV and deep learning.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center",
      category: "Computer Vision",
      estimatedDate: "Coming Soon"
    },
    {
      id: 3,
      title: "Understanding Activation Functions in Neural Networks",
      description: "Deep dive into activation functions: ReLU, Sigmoid, Tanh, and their impact on neural network performance.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop&crop=center",
      category: "Neural Networks",
      estimatedDate: "Coming Soon"
    }
  ];

  return (
    <section id="blog" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sharing insights about AI, machine learning, and computer vision
          </p>
        </motion.div>

        {/* Upcoming Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Upcoming Articles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {blog.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blog.estimatedDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      5-8 min read
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* External Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Follow My Writing Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              I'll be publishing these articles on my preferred platforms. Stay connected for the latest updates!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Medium
              </a>
              <a
                href="https://dev.to"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Dev.to
              </a>
              <a
                href="https://hashnode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Hashnode
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BasicBlog;

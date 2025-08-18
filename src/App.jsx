import React, { useState, useEffect } from "react";
import { Github, Linkedin, Sun, Moon, Mail, MapPin, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import profileIm from '../images/profile.jpg'
import { Instagram, Twitter } from "lucide-react";


export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const skills = [
    { name: "Python", level: 90 },
    { name: "C++", level: 85 },
    { name: "Computer Vision", level: 80 },
    { name: "Deep Learning", level: 75 },
    { name: "OpenCV", level: 85 },
    { name: "Machine Learning", level: 70 },
    { name: "Data Structures", level: 80 },
    { name: "React", level: 65 }
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
    <main className="min-h-screen font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 dark:text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Harsh Agarwal</h1>
        <div className="flex items-center gap-4">
          <a
            href="/Harsh_Agarwal_Resume.pdf"
            download
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition"
          >
            Download Resume
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
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
                  <span className="text-4xl">👋</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
                  AI Developer passionate about building intelligent systems with 
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400"> computer vision</span> and 
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400"> deep learning</span>
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <img
                  src={profileIm}
                  alt="Harsh Agarwal"
                  className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700"
                />
              </div>
            </motion.div>
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
                I'm a first-year Computer Science undergraduate at <span className="font-semibold text-indigo-600">JECRC University</span>, 
                deeply passionate about artificial intelligence, computer vision, and deep learning.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                My learning journey revolves around mastering <span className="font-semibold">C, C++, Python, and DSA</span>, 
                with hands-on projects in OpenCV and neural networks that bring real-world ideas to life.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I thrive in collaborative environments and love turning complex ideas into elegant, functioning solutions. 
                Let's innovate together!
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
                  <span>1st Year CS Student</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>harsh741334@gmail.com</span>
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
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800 dark:text-white">{skill.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      {/* Projects */}
      <motion.section
        className="max-w-6xl mx-auto py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-10 text-indigo-600">Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{
            title: "Real-time Face Mask Detection",
            description: "OpenCV + CNN-based model for mask detection in real-time video streams."
          }, {
            title: "AI-based Traffic Sign Recognition",
            description: "CNN-powered traffic sign classifier trained on real-world datasets."
          }, {
            title: "Web Scraper using Scrapy",
            description: "Python-based e-commerce scraper with custom pipelines and selectors."
          }].map((project, index) => (
           <a
  key={index}
  href={
    project.title === "Real-time Face Mask Detection"
      ? "https://github.com/Harsh741334/FaceFeatureDetecction"
      : "#"
  }
  target="_blank"
  rel="noopener noreferrer"
  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 block"
>
  <h3 className="text-2xl font-semibold mb-2 text-indigo-700 dark:text-indigo-400">{project.title}</h3>
  <p className="text-gray-700 dark:text-gray-300 text-base">{project.description}</p>
  {/* TODO: Add link for this project later */}
</a>

          ))}
        </div>
      </motion.section>

        {/* Experience Section */}
        <motion.section
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
                role: "AI Developer Intern",
                duration: "June 2025 - Present",
                location: "Jaipur, Rajasthan, India",
                current: true
              },
              {
                company: "Cognifyz Technologies",
                role: "Software Development Intern",
                duration: "January 2025 - February 2025",
                location: "Remote",
                current: false
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
                <div className="text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" />
                    {exp.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </p>
                </div>
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
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Blog</span>
            </h2>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              Understanding AI with Real World Projects
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This is placeholder text for a future blog post where I will share insights from my projects, 
              learning experiences, and thoughts on the evolving field of AI and computer vision. Stay tuned 
              for deep dives into practical applications and emerging technologies!
            </p>
            <div className="mt-6">
              <span className="text-sm text-gray-500 dark:text-gray-400">Coming Soon...</span>
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

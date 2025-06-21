import React, { useState, useEffect } from "react";
import { Github, Linkedin, Sun, Moon, FileText } from "lucide-react";
import { motion } from "framer-motion";
import profileIm from '../images/profile.jpg'
import { Instagram, Twitter } from "lucide-react";


export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main className="min-h-screen font-sans bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white px-6 sm:px-12">
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

      {/* Hero Section */}
      <motion.section
        className="text-center py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100 via-white to-transparent dark:from-gray-800 dark:via-gray-900 dark:to-transparent rounded-xl shadow-inner"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src={profileIm}
          alt="Harsh Agarwal"
          className="w-40 h-40 rounded-full mx-auto mb-6 shadow-lg border-4 border-white dark:border-gray-700"
        />
        <h1 className="text-5xl font-extrabold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          Hi, I'm Harsh 👋
        </h1>
        <p className="text-xl max-w-xl mx-auto text-gray-700 dark:text-gray-300">
          I'm an AI Developer passionate about building intelligent systems with computer vision and deep learning.
        </p>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="max-w-4xl mx-auto py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6 text-indigo-600">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          I'm a first-year Computer Science undergraduate at JECRC University, deeply interested in artificial intelligence,
          computer vision, and deep learning. My learning journey revolves around mastering C, C++, Python, and DSA, with
          projects in OpenCV and neural networks that bring real-world ideas to life.
          <br /><br />
          I thrive in collaborative environments and love turning complex ideas into elegant, functioning solutions.
          Let's innovate together!
        </p>
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
        className="max-w-4xl mx-auto py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6 text-indigo-600">Experience</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold">Codified Web Solutions</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Developer Intern · June 2025 - Present</p>
            <p className="text-gray-700 dark:text-gray-300">Jaipur, Rajasthan, India</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold">Cognifyz Technologies</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Software Development Intern · January 2025 - February 2025</p>
          </div>
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        className="max-w-4xl mx-auto py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6 text-indigo-600">Blog</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-2 text-indigo-700">Understanding AI with Real World Projects</h3>
          <p className="text-gray-700 dark:text-gray-300">This is placeholder text for a future blog post where I will share insights from my projects, learning experiences, and thoughts on the evolving field of AI and computer vision.</p>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        className="max-w-4xl mx-auto py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6 text-indigo-600">Contact</h2>
        <p className="mb-4 text-lg">Email: <a href="mailto:harsh741334@gmail.com" className="text-blue-600 dark:text-blue-400">harsh741334@gmail.com</a></p>
        <div className="flex justify-center gap-6">
  <a href="https://www.linkedin.com/in/harsh-agarwal-608626243/" target="_blank" rel="noopener noreferrer">
    <Linkedin className="w-7 h-7 hover:text-blue-700 transition" />
  </a>
  <a href="https://github.com/Harsh741334" target="_blank" rel="noopener noreferrer">
    <Github className="w-7 h-7 hover:text-black dark:hover:text-white transition" />
  </a>
  <a href="https://www.instagram.com/h_ars_a/" target="_blank" rel="noopener noreferrer">
    <Instagram className="w-7 h-7 hover:text-pink-600 transition" />
  </a>
  <a href="https://x.com/Harsh741334" target="_blank" rel="noopener noreferrer">
    <Twitter className="w-7 h-7 hover:text-blue-500 transition" />
  </a>
</div>

      </motion.section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} Harsh Agarwal. All rights reserved.
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
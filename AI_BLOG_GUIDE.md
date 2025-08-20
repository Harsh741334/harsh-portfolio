# AI Blog Guide 🤖

## How to Add Your Blog Posts

When you're ready to add your AI/ML blog posts, simply edit the `src/constants/blogData.js` file.

### Quick Steps:

1. **Open** `src/constants/blogData.js`
2. **Uncomment and edit** the example posts in the `blogPosts` array
3. **Add your details**:

```javascript
export const blogPosts = [
  {
    id: 1,
    title: "Your AI Article Title",
    description: "Brief description of your AI/ML article content.",
    link: "https://medium.com/@yourusername/your-article", // Your external blog link
    image: "/images/blog/your-image.jpg", // Add image to public/images/blog/
    date: "2024-08-21", // YYYY-MM-DD format
    readTime: "8 min read",
    category: "Computer Vision" // Pick from available categories
  }
  // Add more posts here...
];
```

### Required Fields:
- **id**: Unique number for each post
- **title**: Your article title
- **description**: Brief summary (2-3 sentences)
- **link**: URL to your Medium/Dev.to/other blog post
- **date**: Publication date (YYYY-MM-DD)
- **readTime**: How long it takes to read (e.g., "5 min read")
- **category**: Choose from AI categories

### Optional Fields:
- **image**: Path to featured image (put images in `public/images/blog/`)

### Available Categories:
- Artificial Intelligence
- Computer Vision
- Deep Learning
- Neural Networks
- Machine Learning
- Python AI
- AI Projects

### Image Setup:
1. Add your blog images to `public/images/blog/`
2. Reference them as `/images/blog/your-image.jpg`
3. Recommended size: 800x400px

### Example Complete Entry:
```javascript
{
  id: 1,
  title: "Building a Computer Vision Model with TensorFlow",
  description: "Step-by-step guide to creating an image classification model using TensorFlow and Python for real-world applications.",
  link: "https://medium.com/@harsh/computer-vision-tensorflow",
  image: "/images/blog/tensorflow-cv.jpg",
  date: "2024-08-21",
  readTime: "12 min read",
  category: "Computer Vision"
}
```

## Current Status: Coming Soon 🚀

Your blog currently shows a beautiful "Coming Soon" page with AI-focused content. When you add posts to the array, it will automatically switch to the full blog interface with:

- ✅ Search functionality
- ✅ Category filtering  
- ✅ External link buttons
- ✅ Professional AI-themed design
- ✅ Responsive layout

The blog automatically detects when you have posts and switches from "Coming Soon" to the full blog view!

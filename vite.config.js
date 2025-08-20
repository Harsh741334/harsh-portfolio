import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better dev experience
      fastRefresh: true,
      // Optimize bundle size
      babel: {
        plugins: [
          // Remove console.log in production
          process.env.NODE_ENV === 'production' && ['babel-plugin-transform-remove-console']
        ].filter(Boolean)
      }
    }),
    tailwindcss()
  ],
  
  // Optimize build
  build: {
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    // Optimize CSS
    cssMinify: true,
    // Split chunks for better caching
    rollupOptions: {
      output: {
        // Separate vendor chunks
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          icons: ['lucide-react']
        }
      }
    }
  },
  
  // Optimize dev server
  server: {
    // Enable HMR
    hmr: true,
    // Optimize deps pre-bundling
    force: true,
    // Enable caching
    fs: {
      cachedChecks: false
    }
  },
  
  // Pre-bundle dependencies for faster dev startup
  optimizeDeps: {
    include: [
      'react',
      'react-dom', 
      'framer-motion',
      'lucide-react',
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ],
    exclude: ['@react-three/postprocessing'] // Heavy package, load on demand
  },
  
  // Enable CSS code splitting
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        // Optimize CSS in production
        process.env.NODE_ENV === 'production' && require('cssnano')({
          preset: 'default'
        })
      ].filter(Boolean)
    }
  }
})

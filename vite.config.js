import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better dev experience
      fastRefresh: true
    }),
    tailwindcss()
  ],
  
  // Optimize build
  build: {
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
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
    ]
  }
})

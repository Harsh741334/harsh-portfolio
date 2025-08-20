import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          icons: ['lucide-react']
        }
      }
    }
  },
  
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

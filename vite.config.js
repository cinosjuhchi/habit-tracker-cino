import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Baris ajaib 1

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Baris ajaib 2
  ],
  // Handle client-side routing untuk SPA
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase-core': ['firebase/app', 'firebase/app-check'],
          'vendor-firebase-services': ['firebase/auth', 'firebase/firestore'],
          'vendor-ui': ['lucide-react'],
        },
      },
    },
  },
})
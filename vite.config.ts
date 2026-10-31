import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['gsap', 'lenis'],
          'vendor-three': ['three'],
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
  preview: {
    allowedHosts: ["dat-porfolio-web.onrender.com"],
  },
  server: {
    allowedHosts: ["dat-porfolio-web.onrender.com"],
  },
})

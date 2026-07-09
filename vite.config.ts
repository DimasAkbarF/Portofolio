import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: '/',
  plugins: [
    command === 'serve' ? inspectAttr() : null,
    react(),
  ].filter(Boolean),
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'react-dom';
            if (id.includes('node_modules/react/')) return 'react';
            if (id.includes('gsap') || id.includes('@gsap')) return 'gsap';
            if (id.includes('simple-icons')) return 'simple-icons';
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'icons';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));

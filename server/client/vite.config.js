import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {outDir: 'dist'},
  server: {
    proxy: {
      // Proxy API requests
      '/api': {
        target: 'http://localhost:3000', // Backend server port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {outDir: 'dist'},
  define: {'process.env': process.env},
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
});

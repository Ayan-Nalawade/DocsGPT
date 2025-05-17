import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Only expose environment variables that start with VITE_
    // This ensures API keys without the VITE_ prefix remain private
    ...Object.fromEntries(
      Object.entries(process.env)
        .filter(([key]) => key.startsWith('VITE_'))
        .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
    )
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Configure proxy for API requests if needed
    proxy: {
      // Example: '/api': {
      //   target: 'https://api.example.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  }
})

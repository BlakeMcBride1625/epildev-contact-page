import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 100,
    host: true,
    https: false, // Set to true if you want HTTPS in development
    cors: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})

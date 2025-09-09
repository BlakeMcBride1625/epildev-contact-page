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
    port: parseInt(process.env.VITE_LOCALHOST_FE || '1001'),
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})



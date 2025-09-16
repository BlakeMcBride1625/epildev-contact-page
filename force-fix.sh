#!/bin/bash

echo "🔥 FORCE FIXING EVERYTHING TO PORTS 100 AND 200"

# Kill everything
echo "Killing all processes..."
pkill -f node
pkill -f vite
pkill -f tsx
sleep 2

# Create .env file
echo "Creating .env file..."
cat > .env << 'EOF'
# Server Configuration
PORT=200
NODE_ENV=development
FRONTEND_URL=http://localhost:100

# Local Development Ports
localhost_fe=100
localhost_be=200

# Frontend Environment Variables
VITE_API_URL=http://localhost:200

# Email Configuration (SMTP)
SMTP_HOST=smtp.livemail.co.uk
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=connectwithme@epildevconnect.uk
SMTP_PASS=25Floyd2017).
ADMIN_EMAIL=connectwithme@epildevconnect.uk

# Security
JWT_SECRET=your-super-secret-jwt-key-here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
EOF

# Update package.json
echo "Updating package.json..."
cat > package.json << 'EOF'
{
  "name": "epildev-contact-page",
  "version": "1.0.0",
  "description": "Quantum-inspired futuristic contact page for EpilDev",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && VITE_LOCALHOST_FE=100 npm run dev",
    "dev:backend": "cd backend && LOCALHOST_BE=200 LOCALHOST_FE=100 npm run dev",
    "build": "cd frontend && npm run build",
    "start": "cd backend && npm start",
    "docker:build": "docker-compose build",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f",
    "docker:restart": "docker-compose restart",
    "docker:prod:build": "docker-compose -f docker-compose.prod.yml build",
    "docker:prod:up": "docker-compose -f docker-compose.prod.yml up -d",
    "docker:prod:down": "docker-compose -f docker-compose.prod.yml down",
    "docker:prod:logs": "docker-compose -f docker-compose.prod.yml logs -f",
    "docker:clean": "docker-compose down -v && docker system prune -f"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
EOF

# Update frontend vite config
echo "Updating frontend vite config..."
cat > frontend/vite.config.ts << 'EOF'
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
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
EOF

echo "✅ ALL FILES FIXED!"
echo "🚀 Starting servers on ports 100 and 200..."

# Start the servers
npm run dev



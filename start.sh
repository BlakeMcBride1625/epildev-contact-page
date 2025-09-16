#!/bin/bash

# EpilDev Contact Page Startup Script

echo "🚀 Starting EpilDev Contact Page..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please edit .env file with your SMTP credentials before running again."
    echo "   Required: SMTP_USER, SMTP_PASS, ADMIN_EMAIL"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Create data directory for backend
mkdir -p data

echo "✅ Dependencies installed successfully!"
echo ""
echo "🌐 Starting development servers..."
echo "   Frontend: http://localhost:${localhost_fe:-100}"
echo "   Backend:  http://localhost:${localhost_be:-200}"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start both servers concurrently
npm run dev



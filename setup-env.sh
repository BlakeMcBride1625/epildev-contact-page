#!/bin/bash

# Setup script for environment variables
echo "🔧 Setting up environment variables for local development..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from env.example..."
    cp env.example .env
    echo "✅ .env file created!"
else
    echo "✅ .env file already exists"
fi

# Set default values if not already set
if ! grep -q "localhost_fe=" .env; then
    echo "localhost_fe=1001" >> .env
    echo "✅ Added localhost_fe=1001 to .env"
fi

if ! grep -q "localhost_be=" .env; then
    echo "localhost_be=1002" >> .env
    echo "✅ Added localhost_be=1002 to .env"
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

echo ""
echo "🌐 Environment variables configured:"
echo "   Frontend port: ${localhost_fe:-1001}"
echo "   Backend port:  ${localhost_be:-1002}"
echo ""
echo "🚀 You can now run: npm run dev"
echo "   Or modify the ports in .env and restart the servers"


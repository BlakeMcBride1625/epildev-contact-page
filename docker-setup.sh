#!/bin/bash

# EpilDev Contact Page Docker Setup Script

echo "🐳 Setting up Docker for EpilDev Contact Page..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please edit .env file with your SMTP credentials before running Docker."
    echo "   Required: SMTP_USER, SMTP_PASS, ADMIN_EMAIL"
    echo ""
    echo "   After editing .env, run: npm run docker:build"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo "✅ .env file found"

# Function to build and start development environment
start_dev() {
    echo ""
    echo "🚀 Building and starting development environment..."
    docker-compose build
    docker-compose up -d
    echo ""
    echo "✅ Development environment is running!"
    echo "   Frontend: http://localhost:1001"
    echo "   Backend:  http://localhost:1002"
    echo "   API via Frontend: http://localhost:1001/api"
    echo ""
    echo "📋 Useful commands:"
    echo "   View logs:    npm run docker:logs"
    echo "   Stop:         npm run docker:down"
    echo "   Restart:      npm run docker:restart"
}

# Function to build and start production environment
start_prod() {
    echo ""
    echo "🚀 Building and starting production environment..."
    docker-compose -f docker-compose.prod.yml build
    docker-compose -f docker-compose.prod.yml up -d
    echo ""
    echo "✅ Production environment is running!"
    echo "   Frontend: http://localhost:1001"
    echo "   Backend:  http://localhost:1002"
    echo "   API via Frontend: http://localhost:1001/api"
    echo ""
    echo "📋 Useful commands:"
    echo "   View logs:    npm run docker:prod:logs"
    echo "   Stop:         npm run docker:prod:down"
}

# Function to stop all containers
stop_all() {
    echo ""
    echo "🛑 Stopping all containers..."
    docker-compose down
    docker-compose -f docker-compose.prod.yml down
    echo "✅ All containers stopped"
}

# Function to clean up
cleanup() {
    echo ""
    echo "🧹 Cleaning up Docker resources..."
    docker-compose down -v
    docker-compose -f docker-compose.prod.yml down -v
    docker system prune -f
    echo "✅ Cleanup completed"
}

# Main menu
echo ""
echo "What would you like to do?"
echo "1) Start development environment"
echo "2) Start production environment"
echo "3) Stop all containers"
echo "4) Clean up Docker resources"
echo "5) Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        start_dev
        ;;
    2)
        start_prod
        ;;
    3)
        stop_all
        ;;
    4)
        cleanup
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

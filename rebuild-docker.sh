#!/bin/bash

echo "🐳 Rebuilding Docker containers with all updates..."

# Stop existing containers
echo "📦 Stopping existing containers..."
docker-compose down

# Remove old images to force rebuild
echo "🗑️  Removing old images..."
docker rmi $(docker images -q epildev-contact-page_app) 2>/dev/null || true

# Rebuild and start containers
echo "🔨 Rebuilding and starting containers..."
docker-compose up --build -d

# Show container status
echo "📊 Container status:"
docker-compose ps

# Show logs
echo "📝 Recent logs:"
docker-compose logs --tail=20

echo "✅ Docker rebuild complete!"
echo "🌐 Frontend: http://localhost:100"
echo "🔧 Backend API: http://localhost:200"
echo "📧 Contact Page: http://localhost:100/contact"

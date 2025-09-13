#!/bin/bash

# EpilDev Contact Page - VPS Deployment Script
# Usage: ./deploy-vps.sh [domain] [email]

set -e

DOMAIN=${1:-"your-domain.com"}
EMAIL=${2:-"your-email@example.com"}

echo "🚀 EpilDev Contact Page - VPS Deployment"
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "❌ Please don't run as root. Use a regular user with sudo access."
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    echo "✅ Docker already installed"
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "✅ Docker Compose already installed"
fi

# Install Node.js
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js already installed"
fi

# Install Certbot
if ! command -v certbot &> /dev/null; then
    echo "🔒 Installing Certbot..."
    sudo apt install certbot -y
else
    echo "✅ Certbot already installed"
fi

## SSL certificates and reverse proxy are now managed by Cloudflare

# Update docker-compose.prod.yml
echo "⚙️ Updating production configuration..."
sed -i "s/8bp.epildevconnect.uk/$DOMAIN/g" docker-compose.prod.yml

# Set up environment
if [ ! -f .env ]; then
    echo "⚙️ Setting up environment file..."
    cp env.example .env
    echo "📝 Please edit .env file with your SMTP credentials:"
    echo "   nano .env"
    echo ""
    echo "Required variables:"
    echo "   SMTP_HOST=your-smtp-host"
    echo "   SMTP_PORT=587"
    echo "   SMTP_USER=your-email"
    echo "   SMTP_PASS=your-password"
    echo "   ADMIN_EMAIL=your-admin-email"
    echo ""
    read -p "Press Enter after editing .env file..."
fi

# Build and start services
echo "🚀 Building and starting services..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Check status
echo "📊 Service status:"
docker-compose -f docker-compose.prod.yml ps

# Test endpoints
echo "🧪 Testing endpoints..."
if curl -s -f http://localhost/api/health > /dev/null; then
    echo "✅ Backend API is responding"
else
    echo "❌ Backend API is not responding"
fi

if curl -s -f http://localhost/ > /dev/null; then
    echo "✅ Frontend is responding"
else
    echo "❌ Frontend is not responding"
fi

echo ""
echo "🎉 Deployment complete!"
echo "🌐 Your site should be available at: https://$DOMAIN"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "   Restart: docker-compose -f docker-compose.prod.yml restart"
echo "   Stop: docker-compose -f docker-compose.prod.yml down"
echo "   Update: git pull && docker-compose -f docker-compose.prod.yml up --build -d"
echo ""
echo "🔒 SSL certificate will auto-renew via cron job"
echo "📧 Don't forget to configure your SMTP settings in .env"

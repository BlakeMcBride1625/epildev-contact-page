# Multi-stage Dockerfile for EpilDev Contact App
# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend source code
COPY frontend/ ./

# Build frontend
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend source code
COPY backend/ ./

# Build backend
RUN npm run build

# Stage 3: Production Image
FROM node:18-alpine AS production

# Install nginx and curl for health checks
RUN apk add --no-cache nginx curl

# Create app directory
WORKDIR /app

# Copy built backend
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/package*.json ./backend/
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules

# Copy built frontend to nginx directory
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create startup script
RUN cat > /app/start.sh << 'EOF'
#!/bin/sh

echo "🚀 Starting EpilDev Contact Page..."

# Start nginx in background
echo "🌐 Starting nginx..."
nginx -g "daemon off;" &

# Start backend
echo "🔧 Starting backend..."
cd /app/backend
PORT=200 node dist/index.js &

# Wait for any process to exit
wait
EOF

RUN chmod +x /app/start.sh

# Create data directory for backend
RUN mkdir -p /app/data

# Expose ports
EXPOSE 80 200

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Start the application
CMD ["/app/start.sh"]

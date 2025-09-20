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

# Create nginx configuration
RUN echo 'events { worker_connections 1024; } http { include /etc/nginx/mime.types; default_type application/octet-stream; access_log /var/log/nginx/access.log; error_log /var/log/nginx/error.log; gzip on; gzip_vary on; gzip_min_length 1024; gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json; server { listen 80; server_name localhost; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { expires 1y; add_header Cache-Control "public, immutable"; } location /health { access_log off; return 200 "healthy\n"; add_header Content-Type text/plain; } } }' > /etc/nginx/nginx.conf

# Create startup script
RUN echo '#!/bin/sh\n\n# Start nginx in background\nnginx -g "daemon off;" &\n\n# Start backend\ncd /app/backend\nPORT=200 node dist/index.js &\n\n# Wait for any process to exit\nwait' > /app/start.sh

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

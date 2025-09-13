# Docker Setup for EpilDev Contact Page

This document explains how to run the EpilDev Contact Page application using Docker.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- `.env` file with SMTP configuration

## Quick Start

1. **Setup environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your SMTP credentials
   ```

2. **Run the setup script:**
   ```bash
   ./docker-setup.sh
   ```

3. **Or use npm scripts directly:**
   ```bash
   # Development
   npm run docker:build
   npm run docker:up
   
   # Production
   npm run docker:prod:build
   npm run docker:prod:up
   ```

## Available Commands

### Development Environment
- `npm run docker:build` - Build Docker image
- `npm run docker:up` - Start container in background
- `npm run docker:down` - Stop container
- `npm run docker:logs` - View container logs
- `npm run docker:restart` - Restart container

### Production Environment
- `npm run docker:prod:build` - Build production image
- `npm run docker:prod:up` - Start production container
- `npm run docker:prod:down` - Stop production container
- `npm run docker:prod:logs` - View production logs

### Maintenance
- `npm run docker:clean` - Clean up Docker resources

## Architecture

The application runs in a single container with both services:

### Unified Application Container
- **Frontend Port:** 1001 (nginx serving React app)
- **Backend Port:** 1002 (Express API)
- **Technology Stack:**
  - Frontend: React + Vite + Nginx
  - Backend: Node.js 18 + Express + TypeScript
- **Health Check:** `/health` endpoint
- **Data Persistence:** Volume mounted at `/app/data`
- **API Proxy:** Nginx proxies `/api` requests to backend

## Environment Variables

Required environment variables in `.env`:

```env
# Server Configuration
PORT=1002
NODE_ENV=development
FRONTEND_URL=http://localhost:1001

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@epildevconnect.uk

# Security
JWT_SECRET=your-super-secret-jwt-key-here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

## Accessing the Application

- **Frontend:** http://localhost:1001
- **Backend API:** http://localhost:1002
- **API via Frontend:** http://localhost:1001/api (proxied to backend)
- **Health Check:** http://localhost:1001/health

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   lsof -i :1001
   lsof -i :1002
   
   # Stop conflicting services or change ports in docker-compose.yml
   ```

2. **Environment variables not loading:**
   - Ensure `.env` file exists in project root
   - Check that all required variables are set
   - Restart containers after changing `.env`

3. **Build failures:**
   ```bash
   # Clean and rebuild
   npm run docker:clean
   npm run docker:build
   ```

4. **Container health check failures:**
   ```bash
   # Check container logs
   npm run docker:logs
   
   # Check container status
   docker ps
   docker-compose ps
   ```

### Logs and Debugging

```bash
# View all logs
npm run docker:logs

# View container logs
docker-compose logs app

# Follow logs in real-time
docker-compose logs -f

# Access container shell
docker exec -it epildev-app sh
```

## Production Deployment

For production deployment:

1. **Update environment variables for production:**
   ```env
   NODE_ENV=production
   FRONTEND_URL=https://your-domain.com
   ```

2. **Build and start production containers:**
   ```bash
   npm run docker:prod:build
   npm run docker:prod:up
   ```

3. **Configure reverse proxy (optional):**
   - Use nginx or traefik to handle SSL termination
   - Configure custom domains
   - Set up load balancing if needed

## Data Persistence

- Backend data is stored in `./backend/data` directory
- This directory is mounted as a volume in the container
- Data persists between container restarts

## Security Considerations

- Environment variables are loaded from `.env` file
- Never commit `.env` file to version control
- Use strong passwords and secrets
- Regularly update base images
- Monitor container logs for security issues

## Performance Optimization

- Frontend uses nginx with gzip compression
- Static assets are cached with appropriate headers
- Multi-stage builds reduce image sizes
- Health checks ensure service availability

## Monitoring

- Health checks run every 30 seconds
- Logs are configured with rotation
- Container restart policies ensure availability
- Resource limits can be added to docker-compose files

# Docker Deployment Guide

## Quick Start

### Development
```bash
# Build and start development environment
npm run docker:build
npm run docker:up

# View logs
npm run docker:logs

# Stop containers
npm run docker:down
```

### Production
```bash
# Build and start production environment
npm run docker:prod:build
npm run docker:prod:up

# View logs
npm run docker:prod:logs

# Stop containers
npm run docker:prod:down
```

## Port Configuration

- **Port 100**: Frontend (Main Contact Page) - http://localhost:100
- **Port 300**: Frontend (Management Page) - http://localhost:300  
- **Port 200**: Backend API - http://localhost:200

## Environment Variables

Copy `env.example` to `.env` and configure:

```bash
cp env.example .env
```

Key variables to set:
- `FRONTEND_DOMAIN_1`: Your main domain
- `FRONTEND_DOMAIN_2`: Your management domain
- `API_ENDPOINTS`: Your API endpoint
- `SMTP_*`: Email configuration
- `JWT_SECRET`: Security secret

## Docker Architecture

### Multi-stage Build
1. **Frontend Builder**: Builds React/Vite frontend
2. **Backend Builder**: Builds Node.js/Express backend
3. **Production**: Combines both with nginx

### Security Features
- Non-root user for backend process
- Optimized .dockerignore for smaller build context
- Health checks for container monitoring
- Proper file permissions

### Nginx Configuration
- Serves static frontend files
- Handles SPA routing
- Static asset caching
- Health check endpoint

## Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs -f

# Rebuild from scratch
npm run docker:clean
npm run docker:build
```

### Port Conflicts
```bash
# Check what's using ports
lsof -i :100
lsof -i :200
lsof -i :300

# Stop conflicting services
sudo kill -9 <PID>
```

### Permission Issues
```bash
# Fix data directory permissions
sudo chown -R 1001:1001 ./backend/data
```

## Production Deployment

### VPS Deployment
1. Clone repository
2. Copy and configure `.env`
3. Run production commands
4. Set up reverse proxy (nginx/Apache)
5. Configure SSL certificates
6. Set up monitoring

### Docker Compose Override
Create `docker-compose.override.yml` for custom configurations:

```yaml
version: '3.8'
services:
  app:
    environment:
      - NODE_ENV=production
    volumes:
      - ./custom-data:/app/data
```

## Monitoring

### Health Checks
- Frontend: `http://localhost:100/health`
- Backend: `http://localhost:200/health`

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app

# Last 100 lines
docker-compose logs --tail=100 app
```

### Resource Usage
```bash
# Container stats
docker stats

# Disk usage
docker system df
```

## Maintenance

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
npm run docker:prod:build
npm run docker:prod:up
```

### Cleanup
```bash
# Remove unused containers/images
docker system prune -f

# Remove volumes (WARNING: deletes data)
docker-compose down -v
```

### Backup
```bash
# Backup data directory
tar -czf backup-$(date +%Y%m%d).tar.gz ./backend/data

# Restore data
tar -xzf backup-20240101.tar.gz
```

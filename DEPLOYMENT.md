# EpilDev Contact Page - Deployment Guide

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit .env with your SMTP credentials
nano .env
```

**Required Environment Variables:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@epildevconnect.uk
```

### 2. Development Mode

```bash
# Start both frontend and backend
./start.sh

# Or manually:
npm run dev
```

**Access Points:**
- Frontend: http://localhost:${localhost_fe:-1001}
- Backend API: http://localhost:${localhost_be:-1002}

### 3. Production with Docker

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🌐 Production Deployment

### Domain Configuration
**Cloudflare**: Handles reverse proxy and SSL termination

### Cloudflare Setup

1. **DNS Configuration:**
   - A Record: `8bp.epildevconnect.uk` → Your server IP
   - CNAME: `www.8bp.epildevconnect.uk` → `8bp.epildevconnect.uk`

2. **SSL/TLS Settings:**
   - SSL/TLS encryption mode: Full (strict)
   - Edge Certificates: Always Use HTTPS
   - Minimum TLS Version: 1.2

3. **Performance Settings:**
   - Caching Level: Standard
   - Browser Cache TTL: 4 hours
   - Always Online: On

4. **Security Settings:**
   - Security Level: Medium
   - Bot Fight Mode: On
   - DDoS Protection: On

### Server Requirements

**Minimum Specifications:**
- CPU: 2 cores
- RAM: 4GB
- Storage: 20GB SSD
- OS: Ubuntu 20.04+ or CentOS 8+

**Recommended:**
- CPU: 4 cores
- RAM: 8GB
- Storage: 50GB SSD
- OS: Ubuntu 22.04 LTS

### SSL Certificate Setup

```bash
# Generate SSL certificates (Let's Encrypt)
sudo certbot certonly --standalone -d 8bp.epildevconnect.uk

# SSL certificates are managed by Cloudflare
```

## 📧 Email Configuration

### Gmail SMTP Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update .env file:**
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   ```

### Alternative SMTP Providers

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-smtp-username
SMTP_PASS=your-mailgun-smtp-password
```

## 🔧 Monitoring & Maintenance

### Health Checks

```bash
# Check API health
curl https://8bp.epildevconnect.uk/api/health

# Check frontend
curl https://8bp.epildevconnect.uk/

# Check Docker containers
docker-compose ps
```

### Log Monitoring

```bash
# View application logs
docker-compose logs -f backend

# View backend logs
docker-compose logs -f backend

# View all logs
docker-compose logs -f
```

### Backup Strategy

```bash
# Backup ticket data
cp data/tickets.json backups/tickets-$(date +%Y%m%d).json

# Backup environment
cp .env backups/env-$(date +%Y%m%d).backup
```

## 🚨 Troubleshooting

### Common Issues

**1. Email Not Sending:**
- Check SMTP credentials in .env
- Verify firewall allows port 587
- Check Gmail app password is correct

**2. Frontend Not Loading:**
- Check if backend is running on port ${localhost_be:-1002}
- Verify CORS settings
- Check browser console for errors

**3. Docker Issues:**
- Ensure Docker and Docker Compose are installed
- Check if ports 80, 443, ${localhost_fe:-1001}, ${localhost_be:-1002} are available
- Run `docker-compose down` and `docker-compose up --build`

**4. SSL Certificate Issues:**
- Verify domain DNS is pointing to server
- Check Cloudflare SSL settings

### Performance Optimization

**1. Enable Gzip Compression:**
- Already configured via Cloudflare

**2. Static Asset Caching:**
- Already configured with 1-year cache headers

**3. Database Optimization:**
- Consider migrating to PostgreSQL for production
- Implement connection pooling

**4. CDN Integration:**
- Configure Cloudflare for static assets
- Enable Cloudflare caching

## 📊 Analytics & Monitoring

### Cloudflare Analytics
- Monitor traffic, threats, and performance
- Set up alerts for unusual activity
- Track response times and error rates

### Application Monitoring
- Monitor email delivery rates
- Track form submission success rates
- Log ticket generation and processing

### Security Monitoring
- Monitor failed login attempts
- Track rate limiting triggers
- Watch for suspicious traffic patterns

## 🔄 Updates & Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Rebuild and redeploy
docker-compose down
docker-compose up --build -d
```

### Security Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose pull
docker-compose up -d
```

### Backup & Recovery

```bash
# Full backup
tar -czf epildev-backup-$(date +%Y%m%d).tar.gz .

# Restore from backup
tar -xzf epildev-backup-YYYYMMDD.tar.gz
```

---

**EpilDev Contact Page** - Ready for production deployment! 🚀



# EpilDev Contact Page

A quantum-inspired futuristic contact page built with React, Node.js, and advanced UI effects.

## 🌟 Features

- **Quantum-Inspired Design**: Multi-layer glowing particle effects with tsParticles/WebGL
- **Interactive 3D Elements**: React Three Fiber for immersive 3D quantum orb
- **Advanced Animations**: Framer Motion for smooth transitions and holographic effects
- **Contact Form**: Real-time validation with glowing neon effects
- **Email System**: NodeMailer with styled HTML email responses
- **Ticketing System**: Sequential ticket ID generation and tracking
- **Security**: Rate limiting, CORS, helmet, and comprehensive logging
- **Docker Support**: Full containerization with docker-compose
- **Responsive Design**: Mobile-first approach with Safari optimization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (optional)
- SMTP email credentials

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd epildev-contact-page
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Configure environment:**
   ```bash
   cp env.example .env
   # Edit .env with your SMTP credentials
   ```

3. **Start development servers:**
   ```bash
   # From project root
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:${localhost_fe:-100}
   - Backend: http://localhost:${localhost_be:-200}

### Docker Setup

1. **Build and start with Docker:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:${localhost_fe:-100}
   - Backend API: http://localhost:${localhost_be:-200}

## 📁 Project Structure

```
epildev-contact-page/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── lib/            # Utilities
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   └── package.json
<!-- Nginx configuration removed; now using Cloudflare -->
├── docker-compose.yml      # Docker services
└── README.md
```

## 🎨 Design Features

### Quantum Theme
- Deep space gradient background (black → indigo → violet)
- Neon cyan, purple, and orange accents
- Electric white glows for depth
- Holographic text effects

### Interactive Elements
- Cursor ripple effects on interaction
- Glowing input fields with real-time validation
- Animated buttons with gradient flows
- Social icons with hover animations
- Particle field responding to mouse movement

### Animations
- Smooth Framer Motion transitions
- Holographic fade-ins and slides
- Floating quantum orb with distortion effects
- Confetti celebration on form submission

## 📧 Email System

The contact form sends styled HTML emails with:
- Quantum-themed design matching the website
- Unique ticket ID for tracking
- Response time information
- Social media links
- Professional branding

### SMTP Configuration

Set up your SMTP credentials in `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@epildevconnect.uk
```

## 🔧 API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/ticket/:ticketId` - Get ticket status
- `GET /api/health` - Health check

## 🛡️ Security Features

- Rate limiting (5 requests per 15 minutes for contact form)
- CORS protection
- Helmet security headers
- Input validation with Joi
- IP and user agent logging
- Request sanitization

## 🚀 Deployment

### Production with Docker

1. **Configure production environment:**
   ```bash
   # Set production environment variables
   export NODE_ENV=production
   export SMTP_USER=your-production-email
   export SMTP_PASS=your-production-password
   ```

2. **Deploy with Docker Compose:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Cloudflare Integration

The project is configured for Cloudflare with:
- DNS management
- SSL/TLS certificates
- Caching and performance optimization
- WAF and bot protection
- Analytics monitoring

## 🎯 Contact Information

- **Email**: connectwithme@epildevconnect.uk
- **Phone**: +44 07777 943 997
- **Discord**: https://discord.gg/qG59XaRWnf
- **Instagram**: https://www.instagram.com/adb.epildev
- **TikTok**: https://www.tiktok.com/@epildev
- **Facebook**: https://www.facebook.com/AD.Blake.Evan.McBride

## 📄 License

This project is proprietary software developed for EpilDev.

## 🤝 Contributing

This is a private project. For questions or support, please contact EpilDev directly.

---

**EpilDev - Connect with the Future** 🚀



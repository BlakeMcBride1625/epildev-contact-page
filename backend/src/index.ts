import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes'
import { EmailService } from './services/emailService'

// Load environment variables
dotenv.config({ path: '../.env' })

const app = express()
const PORT = process.env.LOCALHOST_BE || process.env.PORT || 200

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',')
  : [
      process.env.FRONTEND_URL || `http://localhost:${process.env.LOCALHOST_FE || 100}`,
      `https://localhost:${process.env.LOCALHOST_FE || 100}`,
      'http://localhost:100',
      'https://localhost:100',
      'http://127.0.0.1:100',
      'https://127.0.0.1:100',
      process.env.FRONTEND_DOMAIN_1 ? `https://${process.env.FRONTEND_DOMAIN_1}` : 'https://8bp.epildevconnect.uk',
      process.env.FRONTEND_DOMAIN_1 ? `http://${process.env.FRONTEND_DOMAIN_1}` : 'http://8bp.epildevconnect.uk',
      process.env.FRONTEND_DOMAIN_2 ? `https://${process.env.FRONTEND_DOMAIN_2}` : 'https://8bp.management.epildevconnect.uk',
      process.env.FRONTEND_DOMAIN_2 ? `http://${process.env.FRONTEND_DOMAIN_2}` : 'http://8bp.management.epildevconnect.uk',
      process.env.API_ENDPOINTS ? `https://${process.env.API_ENDPOINTS}` : 'https://api.config-8bp.epildevconnect.uk/point',
      process.env.API_ENDPOINTS ? `http://${process.env.API_ENDPOINTS}` : 'http://api.config-8bp.epildevconnect.uk/point'
    ]

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging middleware
app.use(morgan('combined'))

// Trust proxy for accurate IP addresses
app.set('trust proxy', true)

// Routes
app.use('/api', contactRoutes)

// Root endpoint - redirect to contact page
app.get('/', (req, res) => {
  const frontendDomain1 = process.env.FRONTEND_DOMAIN_1 || '8bp.epildevconnect.uk'
  const protocol = req.secure ? 'https' : 'http'
  res.redirect(`${protocol}://${frontendDomain1}/contact`)
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
})

// Initialize email service and start server
const startServer = async () => {
  try {
    // Verify email service connection
    const emailService = new EmailService()
    const emailConnected = await emailService.verifyConnection()
    
    if (!emailConnected) {
      console.warn('Warning: Email service connection failed. Email functionality may not work.')
    }

    app.listen(PORT, () => {
      console.log(`🚀 EpilDev Contact API running on port ${PORT}`)
      console.log(`📧 Email service: ${emailConnected ? 'Connected' : 'Failed'}`)
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...')
  process.exit(0)
})

startServer()


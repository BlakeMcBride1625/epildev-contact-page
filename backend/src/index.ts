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
const PORT = process.env.LOCALHOST_BE || process.env.PORT || 1002

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
app.use(cors({
  origin: process.env.FRONTEND_URL || `http://localhost:${process.env.LOCALHOST_FE || 1001}`,
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

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'EpilDev Contact API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  })
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


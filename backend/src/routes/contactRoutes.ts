import { Router } from 'express'
import { ContactController } from '../controllers/contactController'
import { validateContactForm, validateTicketId } from '../middleware/validation'
import { rateLimiter, logRequest, securityHeaders } from '../middleware/security'

const router = Router()
const contactController = new ContactController()

// Apply security middleware to all routes
router.use(securityHeaders)
router.use(logRequest)

// Contact form submission
router.post('/contact', rateLimiter, validateContactForm, (req, res) => {
  contactController.submitContactForm(req, res)
})

// Get ticket status
router.get('/ticket/:ticketId', validateTicketId, (req, res) => {
  contactController.getTicketStatus(req, res)
})

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'EpilDev Contact API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  })
})

export default router








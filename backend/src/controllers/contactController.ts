import { Request, Response } from 'express'
import Joi from 'joi'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { TicketGenerator } from '../utils/ticketGenerator'
import { EmailService } from '../services/emailService'
import { ContactFormData, ContactResponse, TicketData } from '../types'

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().max(200).optional().allow(''),
  message: Joi.string().min(10).max(2000).required(),
})

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|txt|jpg|jpeg|png|gif|zip|rar/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, TXT, Images, and Archives are allowed.'))
    }
  }
})

export class ContactController {
  private ticketGenerator: TicketGenerator
  private emailService: EmailService

  constructor() {
    this.ticketGenerator = TicketGenerator.getInstance()
    this.emailService = new EmailService()
  }

  public async submitContactForm(req: Request, res: Response): Promise<void> {
    try {
      // Check if request has file (FormData) or is JSON
      const isFormData = req.headers['content-type']?.includes('multipart/form-data')
      
      if (isFormData) {
        // Handle file upload
        upload.single('file')(req, res, async (err) => {
          if (err) {
            res.status(400).json({
              success: false,
              message: err.message,
            })
            return
          }

          // Validate request data
          const { error, value } = contactSchema.validate(req.body)
          if (error) {
            res.status(400).json({
              success: false,
              message: error.details[0].message,
            })
            return
          }

        const formData: ContactFormData = value
        const uploadedFile = req.file
        
        // Generate ticket ID
        const ticketId = await this.ticketGenerator.generateTicketId()
        
        // Create ticket data
        const ticketData: TicketData = {
          ...formData,
          id: ticketId,
          timestamp: new Date(),
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.get('User-Agent'),
          attachment: uploadedFile ? {
            filename: uploadedFile.originalname,
            path: uploadedFile.path,
            size: uploadedFile.size,
            mimetype: uploadedFile.mimetype
          } : undefined
        }

        // Save ticket to file system
        await this.ticketGenerator.saveTicket(ticketData)

        // Send confirmation email to user
        const emailSent = await this.emailService.sendConfirmationEmail(ticketData)
        
        // Send notification email to admin
        await this.emailService.sendNotificationEmail(ticketData)

        // Log the submission
        console.log(`Contact form submitted - Ticket #${ticketId}:`, {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          timestamp: ticketData.timestamp,
          ipAddress: ticketData.ipAddress,
          userAgent: ticketData.userAgent,
          hasAttachment: !!uploadedFile,
          attachmentName: uploadedFile?.originalname
        })

        const response: ContactResponse = {
          success: true,
          ticketId,
          message: emailSent 
            ? 'Message sent successfully! Check your email for confirmation.'
            : 'Message received! We\'ll get back to you soon.',
        }

          res.status(200).json(response)
        })
      } else {
        // Handle JSON request (no file)
        const { error, value } = contactSchema.validate(req.body)
        if (error) {
          res.status(400).json({
            success: false,
            message: error.details[0].message,
          })
          return
        }

        const formData: ContactFormData = value
        
        // Generate ticket ID
        const ticketId = await this.ticketGenerator.generateTicketId()
        
        // Create ticket data
        const ticketData: TicketData = {
          ...formData,
          id: ticketId,
          timestamp: new Date(),
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.get('User-Agent'),
        }

        // Save ticket to file system
        await this.ticketGenerator.saveTicket(ticketData)

        // Send confirmation email to user
        const emailSent = await this.emailService.sendConfirmationEmail(ticketData)
        
        // Send notification email to admin
        await this.emailService.sendNotificationEmail(ticketData)

        // Log the submission
        console.log(`Contact form submitted - Ticket #${ticketId}:`, {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          timestamp: ticketData.timestamp,
          ipAddress: ticketData.ipAddress,
          userAgent: ticketData.userAgent,
          hasAttachment: false
        })

        const response: ContactResponse = {
          success: true,
          ticketId,
          message: emailSent 
            ? 'Message sent successfully! Check your email for confirmation.'
            : 'Message received! We\'ll get back to you soon.',
        }

        res.status(200).json(response)
      }
    } catch (error) {
      console.error('Error processing contact form:', error)
      
      const response: ContactResponse = {
        success: false,
        message: 'Internal server error. Please try again later.',
      }

      res.status(500).json(response)
    }
  }

  public async getTicketStatus(req: Request, res: Response): Promise<void> {
    try {
      const { ticketId } = req.params
      
      if (!ticketId || !/^\d{6}$/.test(ticketId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid ticket ID format',
        })
        return
      }

      // In a real application, you would query a database here
      // For now, we'll just return a basic response
      res.status(200).json({
        success: true,
        ticketId,
        status: 'received',
        message: 'Ticket found in system',
      })
    } catch (error) {
      console.error('Error getting ticket status:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  }
}








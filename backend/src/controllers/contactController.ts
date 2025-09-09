import { Request, Response } from 'express'
import Joi from 'joi'
import { TicketGenerator } from '../utils/ticketGenerator'
import { EmailService } from '../services/emailService'
import { ContactFormData, ContactResponse, TicketData } from '../types'

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().max(200).optional().allow(''),
  message: Joi.string().min(10).max(2000).required(),
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
      })

      const response: ContactResponse = {
        success: true,
        ticketId,
        message: emailSent 
          ? 'Message sent successfully! Check your email for confirmation.'
          : 'Message received! We\'ll get back to you soon.',
      }

      res.status(200).json(response)
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




import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const validateContactForm = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().max(200).optional().allow(''),
    message: Joi.string().min(10).max(2000).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
    return
  }

  next()
}

export const validateTicketId = (req: Request, res: Response, next: NextFunction): void => {
  const { ticketId } = req.params
  
  if (!ticketId || !/^\d{6}$/.test(ticketId)) {
    res.status(400).json({
      success: false,
      message: 'Invalid ticket ID format. Must be 6 digits.',
    })
    return
  }

  next()
}








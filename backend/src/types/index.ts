export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

export interface ContactResponse {
  success: boolean
  ticketId?: string
  message: string
}

export interface Attachment {
  filename: string
  path: string
  size: number
  mimetype: string
}

export interface TicketData extends ContactFormData {
  id: string
  timestamp: Date
  ipAddress?: string
  userAgent?: string
  attachment?: Attachment
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}








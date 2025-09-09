import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { TicketData, EmailTemplate } from '../types'
import { generateConfirmationEmail } from '../utils/emailTemplates'

// Load environment variables
dotenv.config({ path: '../.env' })

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    console.log('🔍 EmailService - Environment variables:')
    console.log('  SMTP_HOST:', process.env.SMTP_HOST)
    console.log('  SMTP_PORT:', process.env.SMTP_PORT)
    console.log('  SMTP_SECURE:', process.env.SMTP_SECURE)
    console.log('  SMTP_USER:', process.env.SMTP_USER)
    console.log('  SMTP_PASS:', process.env.SMTP_PASS ? '***SET***' : 'NOT SET')
    
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.livemail.co.uk',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'connectwithme@epildevconnect.uk',
        pass: process.env.SMTP_PASS,
      },
    })
  }

  public async sendConfirmationEmail(ticketData: TicketData): Promise<boolean> {
    try {
      const emailTemplate = generateConfirmationEmail(ticketData)
      
      const mailOptions = {
        from: `"EpilDev" <${process.env.SMTP_USER}>`,
        to: ticketData.email,
        subject: emailTemplate.subject,
        text: emailTemplate.text,
        html: emailTemplate.html,
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log('Confirmation email sent:', result.messageId)
      return true
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      return false
    }
  }

  public async sendNotificationEmail(ticketData: TicketData): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"EpilDev Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `🔔 New Contact Form Submission - Ticket #${ticketData.id}`,
        html: this.generateNotificationEmailHTML(ticketData),
        text: this.generateNotificationEmailText(ticketData),
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log('Notification email sent:', result.messageId)
      return true
    } catch (error) {
      console.error('Error sending notification email:', error)
      return false
    }
  }

  private generateNotificationEmailHTML(ticketData: TicketData): string {
    const { name, email, subject, message, id: ticketId, timestamp, ipAddress, userAgent } = ticketData
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - EpilDev</title>
        <style>
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
                margin: 0;
                padding: 20px;
                color: #ffffff;
            }
            .container {
                max-width: 700px;
                margin: 0 auto;
                background: rgba(26, 26, 46, 0.9);
                border-radius: 20px;
                border: 1px solid rgba(0, 255, 255, 0.3);
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(45deg, #ff6b35, #8b5cf6, #00ffff);
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 800;
                color: #0a0a0f;
            }
            .alert-badge {
                background: rgba(255, 107, 53, 0.2);
                border: 2px solid #ff6b35;
                border-radius: 50px;
                padding: 10px 20px;
                display: inline-block;
                margin-top: 10px;
                font-weight: bold;
                color: #ff6b35;
            }
            .content {
                padding: 40px 30px;
            }
            .ticket-info {
                background: rgba(0, 255, 255, 0.1);
                border: 1px solid rgba(0, 255, 255, 0.3);
                border-radius: 15px;
                padding: 25px;
                margin: 20px 0;
            }
            .ticket-id {
                text-align: center;
                margin-bottom: 20px;
            }
            .ticket-number {
                font-family: 'Courier New', monospace;
                font-size: 36px;
                font-weight: bold;
                color: #00ffff;
                letter-spacing: 2px;
                text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            }
            .contact-details {
                background: rgba(139, 92, 246, 0.1);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 15px;
                padding: 25px;
                margin: 20px 0;
            }
            .contact-details h3 {
                margin: 0 0 20px 0;
                color: #8b5cf6;
                font-size: 20px;
            }
            .detail-row {
                display: flex;
                margin: 15px 0;
                align-items: center;
            }
            .detail-label {
                font-weight: bold;
                color: #00ffff;
                min-width: 120px;
                margin-right: 15px;
            }
            .detail-value {
                color: #ffffff;
                flex: 1;
            }
            .message-content {
                background: rgba(255, 107, 53, 0.1);
                border-left: 4px solid #ff6b35;
                padding: 25px;
                margin: 20px 0;
                border-radius: 0 15px 15px 0;
            }
            .message-content h3 {
                margin: 0 0 15px 0;
                color: #ff6b35;
            }
            .message-text {
                background: rgba(0, 0, 0, 0.3);
                padding: 20px;
                border-radius: 10px;
                border: 1px solid rgba(255, 107, 53, 0.2);
                white-space: pre-wrap;
                line-height: 1.6;
            }
            .technical-details {
                background: rgba(0, 0, 0, 0.4);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 20px;
                margin: 20px 0;
            }
            .technical-details h3 {
                margin: 0 0 15px 0;
                color: #ffffff;
                font-size: 16px;
            }
            .tech-row {
                display: flex;
                margin: 10px 0;
                font-size: 14px;
            }
            .tech-label {
                color: #00ffff;
                min-width: 100px;
                margin-right: 15px;
            }
            .tech-value {
                color: #cccccc;
                flex: 1;
                word-break: break-all;
            }
            .action-buttons {
                text-align: center;
                margin: 30px 0;
            }
            .action-btn {
                display: inline-block;
                margin: 0 10px;
                padding: 15px 30px;
                background: linear-gradient(45deg, #00ffff, #8b5cf6);
                border: none;
                border-radius: 25px;
                color: #0a0a0f;
                text-decoration: none;
                font-weight: bold;
                font-size: 16px;
                transition: all 0.3s ease;
            }
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 255, 255, 0.4);
            }
            .footer {
                background: rgba(0, 0, 0, 0.5);
                padding: 20px 30px;
                text-align: center;
                border-top: 1px solid rgba(0, 255, 255, 0.2);
            }
            .priority-high {
                background: rgba(255, 0, 0, 0.1);
                border: 2px solid #ff0000;
                border-radius: 10px;
                padding: 15px;
                margin: 20px 0;
                text-align: center;
            }
            .priority-high h3 {
                margin: 0;
                color: #ff0000;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔔 New Contact Form Submission</h1>
                <div class="alert-badge">URGENT ATTENTION REQUIRED</div>
            </div>
            
            <div class="content">
                <div class="ticket-info">
                    <div class="ticket-id">
                        <h2 style="margin: 0 0 10px 0; color: #00ffff;">Ticket ID</h2>
                        <div class="ticket-number">#${ticketId}</div>
                    </div>
                </div>
                
                <div class="contact-details">
                    <h3>👤 Contact Information</h3>
                    <div class="detail-row">
                        <div class="detail-label">Name:</div>
                        <div class="detail-value">${name}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Email:</div>
                        <div class="detail-value">
                            <a href="mailto:${email}" style="color: #00ffff; text-decoration: none;">${email}</a>
                        </div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Subject:</div>
                        <div class="detail-value">${subject || 'No subject provided'}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Time:</div>
                        <div class="detail-value">${timestamp.toLocaleString('en-GB', { 
                            timeZone: 'Europe/London',
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        })} GMT</div>
                    </div>
                </div>
                
                <div class="message-content">
                    <h3>💬 Message Content</h3>
                    <div class="message-text">${message}</div>
                </div>
                
                <div class="technical-details">
                    <h3>🔧 Technical Details</h3>
                    <div class="tech-row">
                        <div class="tech-label">IP Address:</div>
                        <div class="tech-value">${ipAddress || 'Unknown'}</div>
                    </div>
                    <div class="tech-row">
                        <div class="tech-label">User Agent:</div>
                        <div class="tech-value">${userAgent || 'Unknown'}</div>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <a href="mailto:${email}?subject=Re: ${subject || 'Your message to EpilDev'}&body=Hi ${name},%0A%0AThank you for contacting EpilDev. I received your message regarding: ${subject || 'your inquiry'}%0A%0A" class="action-btn">📧 Reply Directly</a>
                    <a href="https://discord.gg/qG59XaRWnf" class="action-btn">💬 Discord</a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>EpilDev Contact System</strong> - Automated Notification</p>
                <p>This email was generated automatically when someone submitted a contact form on your website.</p>
            </div>
        </div>
    </body>
    </html>
    `
  }

  private generateNotificationEmailText(ticketData: TicketData): string {
    const { name, email, subject, message, id: ticketId, timestamp, ipAddress, userAgent } = ticketData
    
    return `
🔔 NEW CONTACT FORM SUBMISSION - EpilDev

Ticket ID: #${ticketId}
Timestamp: ${timestamp.toLocaleString('en-GB', { timeZone: 'Europe/London' })} GMT

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
Subject: ${subject || 'No subject provided'}

MESSAGE:
${message}

TECHNICAL DETAILS:
IP Address: ${ipAddress || 'Unknown'}
User Agent: ${userAgent || 'Unknown'}

QUICK ACTIONS:
- Reply directly: mailto:${email}?subject=Re: ${subject || 'Your message to EpilDev'}
- Discord: https://discord.gg/qG59XaRWnf

---
EpilDev Contact System - Automated Notification
This email was generated automatically when someone submitted a contact form on your website.
    `
  }

  public async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      console.log('Email service connection verified')
      return true
    } catch (error) {
      console.error('Email service connection failed:', error)
      return false
    }
  }
}

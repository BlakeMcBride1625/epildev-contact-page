import { EmailTemplate, TicketData } from '../types'

export const generateConfirmationEmail = (ticketData: TicketData): EmailTemplate => {
  const { name, id: ticketId } = ticketData
  
  const subject = `Message Received - Ticket #${ticketId} | EpilDev`
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received - EpilDev</title>
        <style>
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
                margin: 0;
                padding: 20px;
                color: #ffffff;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: rgba(26, 26, 46, 0.8);
                border-radius: 20px;
                border: 1px solid rgba(0, 255, 255, 0.3);
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(45deg, #00ffff, #8b5cf6, #ff6b35);
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 32px;
                font-weight: 800;
                color: #0a0a0f;
                text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            }
            .content {
                padding: 40px 30px;
            }
            .ticket-id {
                background: rgba(0, 255, 255, 0.1);
                border: 1px solid rgba(0, 255, 255, 0.3);
                border-radius: 10px;
                padding: 20px;
                text-align: center;
                margin: 20px 0;
            }
            .ticket-id h2 {
                margin: 0 0 10px 0;
                color: #00ffff;
                font-size: 24px;
            }
            .ticket-number {
                font-family: 'Courier New', monospace;
                font-size: 36px;
                font-weight: bold;
                color: #ffffff;
                letter-spacing: 3px;
                text-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .message {
                background: rgba(139, 92, 246, 0.1);
                border-left: 4px solid #8b5cf6;
                padding: 20px;
                margin: 20px 0;
                border-radius: 0 10px 10px 0;
            }
            .response-time {
                background: rgba(255, 107, 53, 0.1);
                border: 1px solid rgba(255, 107, 53, 0.3);
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
                text-align: center;
            }
            .response-time h3 {
                margin: 0 0 10px 0;
                color: #ff6b35;
            }
            .footer {
                background: rgba(0, 0, 0, 0.3);
                padding: 20px 30px;
                text-align: center;
                border-top: 1px solid rgba(0, 255, 255, 0.2);
            }
            .social-links {
                margin: 20px 0;
            }
            .social-links a {
                display: inline-block;
                margin: 0 10px;
                padding: 10px 20px;
                background: rgba(0, 255, 255, 0.1);
                border: 1px solid rgba(0, 255, 255, 0.3);
                border-radius: 25px;
                color: #00ffff;
                text-decoration: none;
                transition: all 0.3s ease;
            }
            .social-links a:hover {
                background: rgba(0, 255, 255, 0.2);
                box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 EpilDev</h1>
            </div>
            
            <div class="content">
                <h2 style="color: #00ffff; font-size: 24px; margin-bottom: 20px;">Hello ${name}! 👋</h2>
                
                <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">Thank you for reaching out to <strong>EpilDev</strong>! We've successfully received your message and it's now in our quantum processing queue. Your inquiry is important to us and we'll get back to you as soon as possible.</p>
                
                <div class="ticket-id">
                    <h2>Your Ticket ID</h2>
                    <div class="ticket-number">#${ticketId}</div>
                </div>
                
                <div class="message">
                    <h3 style="margin: 0 0 15px 0; color: #8b5cf6; font-size: 20px;">🚀 What happens next?</h3>
                    <p style="margin: 10px 0; font-size: 16px;">Your message has been logged in our system and will be processed by our development team. We'll review your inquiry and get back to you as soon as possible.</p>
                    <p style="margin: 10px 0; font-size: 16px;">Keep this ticket ID handy for any future reference: <strong style="color: #00ffff;">#${ticketId}</strong></p>
                </div>
                
                <div class="response-time">
                    <h3 style="margin: 0 0 15px 0; color: #ff6b35; font-size: 20px;">⏰ Response Time</h3>
                    <p style="margin: 10px 0; font-size: 16px;">I usually respond within <strong style="color: #ff6b35;">24 hours</strong> on weekdays (Monday to Friday, 9:00am - 5:30pm GMT).</p>
                    <p style="margin: 10px 0; font-size: 16px;">For urgent matters, please don't hesitate to reach out via phone at <strong style="color: #ff6b35;">+44 07777 943 997</strong>.</p>
                    <p style="margin: 10px 0; font-size: 14px; color: #cccccc;">📧 You can also reply directly to this email if you have any additional questions.</p>
                </div>
                
                <div class="social-links">
                    <p>Stay connected:</p>
                    <a href="https://discord.gg/qG59XaRWnf">Discord</a>
                    <a href="https://www.instagram.com/adb.epildev">Instagram</a>
                    <a href="https://www.tiktok.com/@epildev">TikTok</a>
                    <a href="https://www.facebook.com/AD.Blake.Evan.McBride">Facebook</a>
                </div>
            </div>
            
            <div class="footer">
                <p>© 2024 EpilDev - Connect with the Future</p>
                <p>This is an automated response. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `
  
  const text = `
Hello ${name}!

Thank you for reaching out to EpilDev. We've successfully received your message.

Your Ticket ID: #${ticketId}

What happens next?
Your message has been logged in our system and will be processed by our development team. We'll review your inquiry and get back to you as soon as possible.

Response Time:
I usually respond within 24 hours on weekdays (Monday to Friday, 9:00am - 5:30pm GMT).
For urgent matters, please don't hesitate to reach out via phone at +44 07777 943 997.

Stay connected:
- Discord: https://discord.gg/qG59XaRWnf
- Instagram: https://www.instagram.com/adb.epildev
- TikTok: https://www.tiktok.com/@epildev
- Facebook: https://www.facebook.com/AD.Blake.Evan.McBride

© 2024 EpilDev - Connect with the Future
This is an automated response. Please do not reply to this email.
  `
  
  return { subject, html, text }
}

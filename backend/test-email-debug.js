// Test email service directly
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../.env' });

async function testEmailService() {
  console.log('🔍 Testing Email Service Configuration...');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***SET***' : 'NOT SET');
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.livemail.co.uk',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || 'connectwithme@epildevconnect.uk',
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    console.log('📧 Sending test email...');
    const result = await transporter.sendMail({
      from: `"EpilDev Test" <${process.env.SMTP_USER}>`,
      to: 'test@example.com',
      subject: 'Test Email from EpilDev',
      text: 'This is a test email to verify the email service is working.',
      html: '<p>This is a test email to verify the email service is working.</p>'
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    
  } catch (error) {
    console.error('❌ Email service error:', error);
  }
}

testEmailService();

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../.env' });

console.log('🔍 Testing email configuration...');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***SET***' : 'NOT SET');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.livemail.co.uk',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'connectwithme@epildevconnect.uk',
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email verification failed:', error.message);
  } else {
    console.log('✅ Email service is ready!');
  }
});

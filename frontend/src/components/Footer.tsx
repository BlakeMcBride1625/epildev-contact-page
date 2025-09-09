import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Eye, Lock, FileText, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="relative z-10 mt-20 border-t border-quantum-cyan/20"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Information Collection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-quantum-cyan" />
                <h3 className="text-xl font-bold text-quantum-electric">Data Collection</h3>
              </div>
              <div className="space-y-3 text-quantum-electric/80">
                <div className="flex items-start gap-2">
                  <Eye className="w-4 h-4 text-quantum-cyan mt-1 flex-shrink-0" />
                  <p className="text-sm">
                    <strong>Contact Information:</strong> Name, email address, and message content are collected when you submit the contact form.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-quantum-cyan mt-1 flex-shrink-0" />
                  <p className="text-sm">
                    <strong>Technical Data:</strong> IP address, browser information, and timestamp are automatically logged for security purposes.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-quantum-cyan mt-1 flex-shrink-0" />
                  <p className="text-sm">
                    <strong>Purpose:</strong> Data is used solely to respond to your inquiry and improve our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-6 h-6 text-quantum-purple" />
                <h3 className="text-xl font-bold text-quantum-electric">Privacy & Security</h3>
              </div>
              <div className="space-y-3 text-quantum-electric/80">
                <p className="text-sm">
                  <strong>Data Protection:</strong> All information is encrypted in transit and stored securely.
                </p>
                <p className="text-sm">
                  <strong>No Sharing:</strong> Your personal information is never sold or shared with third parties.
                </p>
                <p className="text-sm">
                  <strong>Retention:</strong> Data is kept only as long as necessary to fulfill your request.
                </p>
                <p className="text-sm">
                  <strong>Your Rights:</strong> You can request data deletion or modification at any time.
                </p>
              </div>
            </div>

            {/* Legal & Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-quantum-orange" />
                <h3 className="text-xl font-bold text-quantum-electric">Legal & Contact</h3>
              </div>
              <div className="space-y-3 text-quantum-electric/80">
                <p className="text-sm">
                  <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:30 PM GMT
                </p>
                <p className="text-sm">
                  <strong>Response Time:</strong> Within 24 hours on weekdays
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> +44 07777 943 997
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> connectwithme@epildevconnect.uk
                </p>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="border-t border-quantum-cyan/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-6 text-sm">
                <Link 
                  to="/privacy-policy" 
                  className="flex items-center gap-1 text-quantum-cyan hover:text-quantum-electric transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Privacy Policy
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link 
                  to="/terms-of-service" 
                  className="flex items-center gap-1 text-quantum-cyan hover:text-quantum-electric transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Terms of Service
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link 
                  to="/cookie-policy" 
                  className="flex items-center gap-1 text-quantum-cyan hover:text-quantum-electric transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Cookie Policy
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <a 
                  href="mailto:connectwithme@epildevconnect.uk?subject=Data Retention Inquiry" 
                  className="flex items-center gap-1 text-quantum-cyan hover:text-quantum-electric transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Data Retention
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="text-sm text-quantum-electric/60">
                © 2024 EpilDev. All rights reserved.
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 p-6 bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg">
            <div className="text-center">
              <h4 className="text-lg font-bold text-quantum-electric mb-3">
                🔒 Your Privacy Matters
              </h4>
              <p className="text-sm text-quantum-electric/80 max-w-3xl mx-auto">
                This website uses industry-standard security measures to protect your information. 
                We are committed to transparency and will never use your data for purposes other than 
                responding to your inquiry. For any questions about data handling, please contact us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer

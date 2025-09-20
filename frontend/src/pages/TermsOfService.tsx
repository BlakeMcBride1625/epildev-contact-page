import { motion } from 'framer-motion'
import { ArrowLeft, FileText, AlertTriangle, Shield, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-quantum-gradient quantum-aura">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-quantum-cyan hover:text-quantum-electric transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Contact Form
            </Link>
            <h1 className="text-4xl font-bold text-quantum-electric mb-4">Terms of Service</h1>
            <p className="text-quantum-electric/80">Last updated: September 9, 2024</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Introduction */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-quantum-cyan" />
                Agreement to Terms
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed">
                By accessing and using the EpilDev contact form and website, you accept and agree to be 
                bound by the terms and provision of this agreement. If you do not agree to abide by the 
                above, please do not use this service.
              </p>
            </div>

            {/* Use License */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-quantum-cyan" />
                Use License
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                Permission is granted to temporarily use the EpilDev contact form for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer 
                of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-quantum-electric/80 space-y-1 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            {/* User Conduct */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-quantum-cyan" />
                User Conduct
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                When using our contact form, you agree to:
              </p>
              <ul className="list-disc list-inside text-quantum-electric/80 space-y-1 ml-4">
                <li>Provide accurate and truthful information</li>
                <li>Not submit spam, malicious content, or inappropriate material</li>
                <li>Respect our response time and communication policies</li>
                <li>Not use the service for any unlawful purpose</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
              </ul>
            </div>

            {/* Service Availability */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Service Availability</h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                We strive to maintain high availability of our contact form and services, but we do not 
                guarantee uninterrupted access. The service may be temporarily unavailable due to:
              </p>
              <ul className="list-disc list-inside text-quantum-electric/80 space-y-1 ml-4">
                <li>Scheduled maintenance</li>
                <li>Technical difficulties</li>
                <li>Force majeure events</li>
                <li>Security updates</li>
              </ul>
            </div>

            {/* Response Times */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Response Times</h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                We aim to respond to all inquiries within 24 hours during business hours 
                (Monday - Friday, 9:00 AM - 5:30 PM GMT). However, response times may vary based on:
              </p>
              <ul className="list-disc list-inside text-quantum-electric/80 space-y-1 ml-4">
                <li>Complexity of your inquiry</li>
                <li>Current workload</li>
                <li>Holiday periods</li>
                <li>Technical issues</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-quantum-orange" />
                Limitation of Liability
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed">
                In no event shall EpilDev, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses, resulting from your use of the service.
              </p>
            </div>

            {/* Privacy */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Privacy</h2>
              <p className="text-quantum-electric/80 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the service, to understand our practices. By using our service, you agree 
                to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Contact Information</h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-quantum-electric/80">
                <p><strong>Email:</strong> legal@epildevconnect.uk</p>
                <p><strong>Phone:</strong> +44 07777 943 997</p>
                <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:30 PM GMT</p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Changes to Terms</h2>
              <p className="text-quantum-electric/80 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms of Service 
                at any time. If a revision is material, we will try to provide at least 30 days notice 
                prior to any new terms taking effect. Your continued use of the service after any such 
                changes constitutes your acceptance of the new Terms of Service.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService






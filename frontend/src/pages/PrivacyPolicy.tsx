import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
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
            <h1 className="text-4xl font-bold text-quantum-electric mb-4">Privacy Policy</h1>
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
                <Shield className="w-6 h-6 text-quantum-cyan" />
                Introduction
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed">
                EpilDev ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our 
                contact form and website.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-quantum-cyan" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-quantum-electric mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-quantum-electric/80 space-y-1 ml-4">
                    <li>Name (as provided in contact form)</li>
                    <li>Email address</li>
                    <li>Message content and subject</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-quantum-electric mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside text-quantum-electric/80 space-y-1 ml-4">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Timestamp of form submission</li>
                    <li>User agent string</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-quantum-cyan" />
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-quantum-electric/80 space-y-2 ml-4">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website and services</li>
                <li>To prevent fraud and ensure security</li>
                <li>To comply with legal obligations</li>
                <li>To maintain records of communications</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-quantum-cyan" />
                Data Security
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="list-disc list-inside text-quantum-electric/80 space-y-1 ml-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure server infrastructure</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited access to personal data</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Your Rights</h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-quantum-electric/80 space-y-1 ml-4">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to request deletion of your data</li>
                <li>Right to object to processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Contact Us</h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-quantum-electric/80">
                <p><strong>Email:</strong> connectwithme@epildevconnect.uk</p>
                <p><strong>Phone:</strong> +44 07777 943 997</p>
                <p><strong>Response Time:</strong> Within 24 hours on weekdays</p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Changes to This Policy</h2>
              <p className="text-quantum-electric/80 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy


import { motion } from 'framer-motion'
import { ArrowLeft, Cookie, Settings, Shield, Info } from 'lucide-react'
import { Link } from 'react-router-dom'

const CookiePolicy = () => {
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
            <h1 className="text-4xl font-bold text-quantum-electric mb-4">Cookie Policy</h1>
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
                <Cookie className="w-6 h-6 text-quantum-cyan" />
                What Are Cookies?
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit a website. They are widely used to make websites work more efficiently and to 
                provide information to website owners.
              </p>
            </div>

            {/* How We Use Cookies */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-quantum-cyan" />
                How We Use Cookies
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                EpilDev uses cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-quantum-electric/80 space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Security Cookies:</strong> Protect against spam and malicious activity</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>

            {/* Types of Cookies */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-quantum-electric mb-2">Essential Cookies</h3>
                  <p className="text-quantum-electric/80 text-sm">
                    These cookies are necessary for the website to function and cannot be switched off. 
                    They are usually only set in response to actions made by you which amount to a request 
                    for services, such as setting your privacy preferences or filling in forms.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-quantum-electric mb-2">Analytics Cookies</h3>
                  <p className="text-quantum-electric/80 text-sm">
                    These cookies allow us to count visits and traffic sources so we can measure and 
                    improve the performance of our site. They help us to know which pages are the most 
                    and least popular and see how visitors move around the site.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-quantum-electric mb-2">Functional Cookies</h3>
                  <p className="text-quantum-electric/80 text-sm">
                    These cookies enable the website to provide enhanced functionality and personalisation. 
                    They may be set by us or by third party providers whose services we have added to our pages.
                  </p>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-quantum-cyan" />
                Managing Cookies
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                You can control and/or delete cookies as you wish. You can delete all cookies that are 
                already on your computer and you can set most browsers to prevent them from being placed. 
                If you do this, however, you may have to manually adjust some preferences every time you 
                visit a site and some services and functionalities may not work.
              </p>
              <div className="space-y-2 text-quantum-electric/80">
                <p><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings preferences.</p>
                <p><strong>Opt-out Tools:</strong> You can opt out of certain third-party cookies using industry opt-out tools.</p>
                <p><strong>Contact Us:</strong> If you have questions about our cookie usage, please contact us directly.</p>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Third-Party Cookies</h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                Some cookies on our site are set by third-party services. We use these services to:
              </p>
              <ul className="list-disc list-inside text-quantum-electric/80 space-y-1 ml-4">
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide security features and spam protection</li>
                <li>Enable social media integration</li>
                <li>Improve website performance</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-quantum-cyan" />
                Contact Us
              </h2>
              <p className="text-quantum-electric/80 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="space-y-2 text-quantum-electric/80">
                <p><strong>Email:</strong> connectwithme@epildevconnect.uk</p>
                <p><strong>Phone:</strong> +44 07777 943 997</p>
                <p><strong>Subject Line:</strong> Cookie Policy Inquiry</p>
              </div>
            </div>

            {/* Updates */}
            <div className="bg-quantum-violet/10 border border-quantum-cyan/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-quantum-electric mb-4">Updates to This Policy</h2>
              <p className="text-quantum-electric/80 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy 
                regularly to stay informed about our use of cookies and related technologies.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicy






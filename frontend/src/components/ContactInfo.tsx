import { motion } from 'framer-motion'
import { Mail, Phone, Users, ExternalLink } from 'lucide-react'
import { SocialLink } from '@/types'

// Social Media Icons as SVG Components
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const socialLinks: SocialLink[] = [
  {
    name: 'Discord',
    url: 'https://discord.gg/qG59XaRWnf',
    icon: 'discord',
    color: 'hover:text-[#5865F2] hover:bg-[#5865F2]/10'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/adb.epildev',
    icon: 'instagram',
    color: 'hover:text-[#E4405F] hover:bg-[#E4405F]/10'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@epildev',
    icon: 'tiktok',
    color: 'hover:text-[#E4405F] hover:bg-gradient-to-r hover:from-[#E4405F]/20 hover:to-[#00F2EA]/20'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/AD.Blake.Evan.McBride',
    icon: 'facebook',
    color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@Epildev',
    icon: 'youtube',
    color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10'
  },
  {
    name: 'X',
    url: 'https://x.com/epildev_ad?s=21',
    icon: 'twitter',
    color: 'hover:text-[#000000] hover:bg-[#000000]/10'
  }
]

const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="quantum-card rounded-2xl p-8 hover:shadow-quantum-cyan/20 hover:shadow-3xl transition-all duration-500"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-quantum-cyan/20 rounded-lg">
          <Users className="w-6 h-6 text-quantum-cyan" />
        </div>
        <h2 className="text-2xl font-bold text-quantum-electric">Get in Touch</h2>
      </div>

      <div className="space-y-6">
        {/* Email - Secret Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-quantum-violet/30 rounded-lg border border-quantum-cyan/20 hover:border-quantum-cyan/50 transition-all duration-300 group secret-reveal"
        >
          <label className="text-quantum-electric/70 text-sm font-medium mb-2 block">Email</label>
          <div className="flex items-center gap-3 min-w-0">
            <Mail className="w-5 h-5 text-quantum-cyan group-hover:text-quantum-orange transition-colors duration-300 flex-shrink-0" />
            <div className="relative flex-1 min-w-0 overflow-hidden">
              <div className="classified-text font-mono text-sm group-hover:opacity-0 transition-opacity duration-500 whitespace-nowrap bg-quantum-violet/30">
                [ENCRYPTED]
              </div>
              <a
                href="mailto:connectwithme@epildevconnect.uk"
                className="absolute inset-0 text-quantum-cyan hover:text-quantum-orange transition-colors duration-300 font-mono text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap bg-quantum-violet/30 flex items-center"
              >
                connectwithme@epildevconnect.uk
              </a>
            </div>
            <div className="ml-auto status-indicator flex-shrink-0">
              <div className="w-2 h-2 bg-quantum-cyan/50 rounded-full group-hover:bg-quantum-orange group-hover:shadow-lg group-hover:shadow-quantum-orange/50 transition-all duration-300 animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        {/* Phone - Secret Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-quantum-violet/30 rounded-lg border border-quantum-cyan/20 hover:border-quantum-cyan/50 transition-all duration-300 group secret-reveal"
        >
          <label className="text-quantum-electric/70 text-sm font-medium mb-2 block">Phone</label>
          <div className="flex items-center gap-3 min-w-0">
            <Phone className="w-5 h-5 text-quantum-cyan group-hover:text-quantum-orange transition-colors duration-300 flex-shrink-0" />
            <div className="relative flex-1 min-w-0 overflow-hidden">
              <div className="classified-text font-mono text-sm group-hover:opacity-0 transition-opacity duration-500 whitespace-nowrap bg-quantum-violet/30">
                [CLASSIFIED]
              </div>
              <a
                href="tel:+4407777943997"
                className="absolute inset-0 text-quantum-cyan hover:text-quantum-orange transition-colors duration-300 font-mono text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap bg-quantum-violet/30 flex items-center"
              >
                +44 07777 943 997
              </a>
            </div>
            <div className="ml-auto status-indicator flex-shrink-0">
              <div className="w-2 h-2 bg-quantum-cyan/50 rounded-full group-hover:bg-quantum-orange group-hover:shadow-lg group-hover:shadow-quantum-orange/50 transition-all duration-300 animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-quantum-cyan font-semibold text-xl mb-6">Follow Me</h3>
          <div className="grid grid-cols-2 gap-6">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon === 'discord' ? DiscordIcon :
                                  social.icon === 'instagram' ? InstagramIcon :
                                  social.icon === 'tiktok' ? TikTokIcon :
                                  social.icon === 'facebook' ? FacebookIcon :
                                  social.icon === 'youtube' ? YouTubeIcon :
                                  social.icon === 'twitter' ? TwitterIcon : null

              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 bg-quantum-violet/30 rounded-xl border-2 border-quantum-cyan/20 hover:border-quantum-cyan/60 transition-all duration-300 group ${social.color} hover:shadow-2xl hover:shadow-current/30 min-h-[80px] backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-center gap-3 h-full">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-quantum-electric group-hover:text-current transition-colors duration-300" />
                    )}
                    <span className="text-quantum-electric group-hover:text-current transition-colors duration-300 font-medium text-lg">
                      {social.name}
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ContactInfo

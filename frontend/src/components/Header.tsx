import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <Rocket className="w-8 h-8 text-quantum-cyan animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold holographic-text">
          EpilDev
        </h1>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl font-bold text-quantum-electric mb-4"
      >
        Connect with the Future
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-quantum-electric/70 text-lg max-w-2xl mx-auto"
      >
        Connect with the future of content creation and development.
      </motion.p>
    </motion.header>
  )
}

export default Header








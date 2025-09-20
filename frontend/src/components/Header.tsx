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
        <Rocket className="w-10 h-10 md:w-12 md:h-12 text-quantum-cyan animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold holographic-text leading-tight">
          Epildevconnect
        </h1>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl font-bold text-quantum-electric mb-4"
      >
        Get In Touch
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-quantum-electric/70 text-lg max-w-2xl mx-auto"
      >
        Ready to start a conversation? Drop me a message and let's connect.
      </motion.p>
    </motion.header>
  )
}

export default Header








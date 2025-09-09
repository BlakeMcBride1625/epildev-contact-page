import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import ContactInfo from './components/ContactInfo'
import ContactForm from './components/ContactForm'

function App() {

  return (
    <div className="min-h-screen bg-quantum-gradient relative overflow-hidden">
      {/* Simple background instead of particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-quantum-black via-quantum-indigo to-quantum-violet opacity-50" />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Header />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          <ContactInfo />
          <ContactForm />
        </motion.div>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a2e',
            color: '#ffffff',
            border: '1px solid #00ffff',
            borderRadius: '8px',
          },
        }}
      />
    </div>
  )
}

export default App




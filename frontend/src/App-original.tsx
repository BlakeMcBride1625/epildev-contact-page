import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Toaster } from 'react-hot-toast'
import ParticleBackground from './components/ParticleBackground'
import QuantumOrb from './components/QuantumOrb'
import Header from './components/Header'
import ContactInfo from './components/ContactInfo'
import ContactForm from './components/ContactForm'
import ConfettiEffect from './components/Confetti'

function App() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.1) {
        setRipples(prev => [
          ...prev.slice(-5),
          { id: Date.now(), x: e.clientX, y: e.clientY }
        ])
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleConfettiComplete = () => {
    setShowConfetti(false)
  }

  return (
    <div className="min-h-screen bg-quantum-gradient relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* 3D Quantum Orb */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <QuantumOrb />
        </Canvas>
      </div>

      {/* Cursor Ripples */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute w-4 h-4 border border-quantum-cyan/50 rounded-full pointer-events-none"
          style={{ left: ripple.x - 8, top: ripple.y - 8 }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id))
          }}
        />
      ))}

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

      {/* Confetti Effect */}
      <ConfettiEffect show={showConfetti} onComplete={handleConfettiComplete} />
      
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

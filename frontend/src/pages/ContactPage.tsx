import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Toaster } from 'react-hot-toast'
import Header from '../components/Header'
import ParticleBackground from '../components/ParticleBackground'
import FloatingParticles from '../components/FloatingParticles'
import QuantumField from '../components/QuantumField'
import QuantumEffects from '../components/QuantumEffects'
import QuantumOrb from '../components/QuantumOrb'
import ContactInfo from '../components/ContactInfo'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import ConfettiEffect from '../components/Confetti'

const ContactPage = () => {
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
    <div className="min-h-screen bg-quantum-gradient quantum-aura relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Quantum Field */}
      <QuantumField />
      
      {/* Quantum Effects */}
      <QuantumEffects />
      
      {/* 3D Quantum Orbs - Multiple shapes and colors */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-25 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
          <QuantumOrb position={[0, 0, 0]} color="#00ffff" scale={1.2} type="sphere" />
        </Canvas>
      </div>

      {/* Secondary 3D Orb - Top Left */}
      <div className="absolute top-32 left-10 w-24 h-24 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#ff6b35" />
          <QuantumOrb position={[0, 0, 0]} color="#ff6b35" scale={0.8} type="torus" />
        </Canvas>
      </div>

      {/* Tertiary 3D Orb - Bottom Right */}
      <div className="absolute bottom-32 right-20 w-20 h-20 opacity-15 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={0.6} color="#8b5cf6" />
          <QuantumOrb position={[0, 0, 0]} color="#8b5cf6" scale={0.6} type="box" />
        </Canvas>
      </div>

      {/* Floating 3D Orb - Center Left */}
      <div className="absolute top-1/2 left-8 w-16 h-16 opacity-18 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 4, 4]} intensity={0.7} color="#00ffff" />
          <QuantumOrb position={[0, 0, 0]} color="#00ffff" scale={0.7} type="sphere" />
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

      {/* Footer */}
      <Footer />

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

export default ContactPage

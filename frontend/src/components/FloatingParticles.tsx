import { useEffect, useRef } from 'react'

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Floating particle system
    const floatingParticles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
      life: number
      maxLife: number
    }> = []

    const colors = ['#00ffff', '#8b5cf6', '#ff6b35', '#f59e0b', '#10b981']
    
    // Create floating particles
    const createFloatingParticle = () => {
      floatingParticles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.8 - 0.2,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
        life: 0,
        maxLife: Math.random() * 300 + 200
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create new particles occasionally
      if (Math.random() < 0.02) {
        createFloatingParticle()
      }
      
      // Update and draw floating particles
      for (let i = floatingParticles.length - 1; i >= 0; i--) {
        const particle = floatingParticles[i]
        
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++
        
        // Remove particles that are off screen or have lived too long
        if (particle.y < -10 || particle.life > particle.maxLife) {
          floatingParticles.splice(i, 1)
          continue
        }
        
        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife
        const currentOpacity = particle.opacity * (1 - lifeRatio * 0.7)
        
        // Draw particle with enhanced glow
        ctx.save()
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 20
        ctx.globalAlpha = currentOpacity
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
        
        // Add inner bright core
        ctx.shadowBlur = 0
        ctx.globalAlpha = currentOpacity * 0.8
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
        
        // Add outer ring
        ctx.globalAlpha = currentOpacity * 0.3
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
        ctx.strokeStyle = particle.color
        ctx.lineWidth = 1
        ctx.stroke()
        
        ctx.restore()
      }
      
      requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none floating-particles"
      style={{ zIndex: 1 }}
    />
  )
}

export default FloatingParticles






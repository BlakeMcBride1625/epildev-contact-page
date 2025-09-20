import { useEffect, useRef } from 'react'

const ParticleBackground = () => {
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

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
    }> = []

    const colors = ['#00ffff', '#8b5cf6', '#ff6b35']
    
    // Create particles (optimized for performance)
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.2
      })
    }

    // Animation loop
    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position with wave motion
        particle.x += particle.vx + Math.sin(time + i * 0.1) * 0.2
        particle.y += particle.vy + Math.cos(time + i * 0.1) * 0.2
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle with pulsing glow effect
        ctx.save()
        const pulse = 1 + Math.sin(time * 2 + i * 0.2) * 0.3
        const currentSize = particle.size * pulse
        const currentOpacity = particle.opacity * (0.8 + Math.sin(time * 3 + i * 0.3) * 0.2)
        
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 20 * pulse
        ctx.globalAlpha = currentOpacity
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
        
        // Add inner pulsing glow
        ctx.shadowBlur = 0
        ctx.globalAlpha = currentOpacity * 0.6
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
        
        // Add outer ring
        ctx.globalAlpha = currentOpacity * 0.3
        ctx.strokeStyle = particle.color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize * 1.5, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
        
        // Draw connections (optimized for performance)
        if (i % 4 === 0) { // Check fewer particles for connections
          particles.forEach((otherParticle, j) => {
            if (i !== j && j % 4 === 0) {
              const dx = particle.x - otherParticle.x
              const dy = particle.y - otherParticle.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              if (distance < 120) {
                ctx.save()
                const connectionOpacity = 0.2 * (1 - distance / 120)
                
                ctx.shadowColor = particle.color
                ctx.shadowBlur = 8
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(otherParticle.x, otherParticle.y)
                ctx.strokeStyle = particle.color
                ctx.globalAlpha = connectionOpacity
                ctx.lineWidth = 1.5
                ctx.stroke()
                ctx.restore()
              }
            }
          })
        }
      })
      
      // Draw floating geometric shapes (reduced for performance)
      for (let i = 0; i < 4; i++) {
        const shapeX = (canvas.width / 4) * i + Math.sin(time + i) * 30
        const shapeY = canvas.height / 2 + Math.cos(time * 0.5 + i) * 80
        const shapeSize = 15 + Math.sin(time * 2 + i) * 5
        const shapeRotation = time + i
        
        ctx.save()
        ctx.translate(shapeX, shapeY)
        ctx.rotate(shapeRotation)
        ctx.globalAlpha = 0.08 + Math.sin(time * 3 + i) * 0.03
        
        // Draw only squares for better performance
        ctx.strokeRect(-shapeSize/2, -shapeSize/2, shapeSize, shapeSize)
        ctx.strokeStyle = colors[i % colors.length]
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      }
      
      ctx.globalAlpha = 1
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
      className="absolute inset-0 w-full h-full pointer-events-none particle-canvas"
    />
  )
}

export default ParticleBackground

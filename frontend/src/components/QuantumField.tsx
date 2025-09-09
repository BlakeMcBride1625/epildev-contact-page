import { useEffect, useRef } from 'react'

const QuantumField = () => {
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

    // Quantum field system
    const fieldPoints: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
      phase: number
    }> = []

    const colors = ['#00ffff', '#8b5cf6', '#ff6b35']
    
    // Create field points
    for (let i = 0; i < 60; i++) {
      fieldPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw field points
      fieldPoints.forEach((point, i) => {
        // Update position with wave motion
        point.x += point.vx + Math.sin(point.phase) * 0.1
        point.y += point.vy + Math.cos(point.phase) * 0.1
        point.phase += 0.02
        
        // Wrap around screen
        if (point.x < 0) point.x = canvas.width
        if (point.x > canvas.width) point.x = 0
        if (point.y < 0) point.y = canvas.height
        if (point.y > canvas.height) point.y = 0
        
        // Draw field point with pulsing effect
        const pulse = Math.sin(point.phase) * 0.3 + 0.7
        const currentSize = point.size * pulse
        const currentOpacity = point.opacity * pulse
        
        ctx.save()
        ctx.shadowColor = point.color
        ctx.shadowBlur = 15
        ctx.globalAlpha = currentOpacity
        ctx.beginPath()
        ctx.arc(point.x, point.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = point.color
        ctx.fill()
        
        // Add energy rings
        ctx.shadowBlur = 0
        ctx.globalAlpha = currentOpacity * 0.4
        ctx.beginPath()
        ctx.arc(point.x, point.y, currentSize * 2, 0, Math.PI * 2)
        ctx.strokeStyle = point.color
        ctx.lineWidth = 0.5
        ctx.stroke()
        
        ctx.restore()
        
        // Draw energy connections between nearby points
        fieldPoints.forEach((otherPoint, j) => {
          if (i !== j) {
            const dx = point.x - otherPoint.x
            const dy = point.y - otherPoint.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 100) {
              ctx.save()
              ctx.shadowColor = point.color
              ctx.shadowBlur = 8
              ctx.beginPath()
              ctx.moveTo(point.x, point.y)
              ctx.lineTo(otherPoint.x, otherPoint.y)
              ctx.strokeStyle = point.color
              ctx.globalAlpha = 0.1 * (1 - distance / 100) * pulse
              ctx.lineWidth = 0.8
              ctx.stroke()
              ctx.restore()
            }
          }
        })
      })
      
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
      className="absolute inset-0 w-full h-full pointer-events-none quantum-field"
    />
  )
}

export default QuantumField


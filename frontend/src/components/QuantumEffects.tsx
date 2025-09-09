import { useEffect, useRef } from 'react'

const QuantumEffects = () => {
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

    // Quantum energy waves
    const waves: Array<{
      x: number
      y: number
      radius: number
      maxRadius: number
      speed: number
      opacity: number
      color: string
    }> = []

    // Create initial waves
    for (let i = 0; i < 5; i++) {
      waves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: Math.random() * 200 + 100,
        speed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.3 + 0.1,
        color: ['#00ffff', '#8b5cf6', '#ff6b35'][Math.floor(Math.random() * 3)]
      })
    }

    // Floating geometric shapes
    const shapes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number
      color: string
      type: 'triangle' | 'square' | 'hexagon'
    }> = []

    // Create floating shapes (reduced for better performance)
    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 15 + 8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.3 + 0.1,
        color: ['#00ffff', '#8b5cf6', '#ff6b35'][Math.floor(Math.random() * 3)],
        type: ['triangle', 'square', 'hexagon'][Math.floor(Math.random() * 3)] as 'triangle' | 'square' | 'hexagon'
      })
    }

        // Draw geometric shapes
        const drawShape = (shape: typeof shapes[0]) => {
          ctx.save()
          ctx.translate(shape.x, shape.y)
          ctx.rotate(shape.rotation)
          ctx.globalAlpha = shape.opacity
          ctx.shadowColor = shape.color
          ctx.shadowBlur = 20
          ctx.fillStyle = shape.color
          ctx.strokeStyle = shape.color
          ctx.lineWidth = 2

      switch (shape.type) {
        case 'triangle':
          ctx.beginPath()
          ctx.moveTo(0, -shape.size / 2)
          ctx.lineTo(-shape.size / 2, shape.size / 2)
          ctx.lineTo(shape.size / 2, shape.size / 2)
          ctx.closePath()
          ctx.stroke()
          break
        case 'square':
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break
        case 'hexagon':
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const x = Math.cos(angle) * shape.size / 2
            const y = Math.sin(angle) * shape.size / 2
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.stroke()
          break
      }
      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw waves
      waves.forEach((wave) => {
        wave.radius += wave.speed
        if (wave.radius > wave.maxRadius) {
          wave.radius = 0
          wave.x = Math.random() * canvas.width
          wave.y = Math.random() * canvas.height
        }
        
        ctx.save()
        ctx.shadowColor = wave.color
        ctx.shadowBlur = 25
        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.strokeStyle = wave.color
        ctx.globalAlpha = wave.opacity * (1 - wave.radius / wave.maxRadius)
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.restore()
      })
      
      // Update and draw shapes
      shapes.forEach(shape => {
        shape.x += shape.vx
        shape.y += shape.vy
        shape.rotation += shape.rotationSpeed
        
        // Wrap around screen
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size
        
        drawShape(shape)
      })
      
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
      className="absolute inset-0 w-full h-full pointer-events-none quantum-effects-canvas"
    />
  )
}

export default QuantumEffects

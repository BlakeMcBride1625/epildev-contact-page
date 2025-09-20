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

    // Create initial waves (optimized for performance)
    for (let i = 0; i < 6; i++) {
      waves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: Math.random() * 200 + 100,
        speed: Math.random() * 0.03 + 0.015,
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

    // Create floating shapes (optimized for performance)
    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 15 + 8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
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
    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01
      
      // Update and draw waves
      waves.forEach((wave, i) => {
        wave.radius += wave.speed
        if (wave.radius > wave.maxRadius) {
          wave.radius = 0
          wave.x = Math.random() * canvas.width
          wave.y = Math.random() * canvas.height
        }
        
        // Add wave motion to position
        const waveX = wave.x + Math.sin(time * 2 + i) * 20
        const waveY = wave.y + Math.cos(time * 1.5 + i) * 15
        
        ctx.save()
        ctx.shadowColor = wave.color
        ctx.shadowBlur = 30
        ctx.beginPath()
        ctx.arc(waveX, waveY, wave.radius, 0, Math.PI * 2)
        ctx.strokeStyle = wave.color
        ctx.globalAlpha = wave.opacity * (1 - wave.radius / wave.maxRadius)
        ctx.lineWidth = 4
        ctx.stroke()
        
        // Add pulsing effect
        const pulse = 1 + Math.sin(time * 3 + i) * 0.3
        ctx.globalAlpha = wave.opacity * (1 - wave.radius / wave.maxRadius) * pulse * 0.5
        ctx.beginPath()
        ctx.arc(waveX, waveY, wave.radius * 0.7, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      })
      
      // Update and draw shapes
      shapes.forEach((shape, i) => {
        // Add wave motion to movement
        shape.x += shape.vx + Math.sin(time + i * 0.1) * 0.3
        shape.y += shape.vy + Math.cos(time * 0.8 + i * 0.1) * 0.3
        shape.rotation += shape.rotationSpeed
        
        // Add pulsing size
        const pulse = 1 + Math.sin(time * 2 + i * 0.2) * 0.2
        const currentSize = shape.size * pulse
        
        // Wrap around screen
        if (shape.x < -currentSize) shape.x = canvas.width + currentSize
        if (shape.x > canvas.width + currentSize) shape.x = -currentSize
        if (shape.y < -currentSize) shape.y = canvas.height + currentSize
        if (shape.y > canvas.height + currentSize) shape.y = -currentSize
        
        // Draw with pulsing size
        const originalSize = shape.size
        shape.size = currentSize
        drawShape(shape)
        shape.size = originalSize
      })
      
      // Add floating orbs (reduced for performance)
      for (let i = 0; i < 3; i++) {
        const orbX = (canvas.width / 3) * i + Math.sin(time * 1.5 + i) * 80
        const orbY = canvas.height / 2 + Math.cos(time * 0.8 + i) * 120
        const orbSize = 6 + Math.sin(time * 2 + i) * 3
        const orbOpacity = 0.08 + Math.sin(time * 3 + i) * 0.03
        
        ctx.save()
        ctx.globalAlpha = orbOpacity
        ctx.shadowColor = '#00ffff'
        ctx.shadowBlur = 15
        ctx.beginPath()
        ctx.arc(orbX, orbY, orbSize, 0, Math.PI * 2)
        ctx.fillStyle = '#00ffff'
        ctx.fill()
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
      className="absolute inset-0 w-full h-full pointer-events-none quantum-effects-canvas"
    />
  )
}

export default QuantumEffects

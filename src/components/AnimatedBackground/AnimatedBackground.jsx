import { useEffect, useRef } from 'react'
import './AnimatedBackground.css'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    const getAccentRgb = () => {
      const style = getComputedStyle(document.documentElement)
      const rgb = style.getPropertyValue('--accent-primary-rgb').trim()
      return rgb || '99, 102, 241'
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 1
        this.speedX = (Math.random() - 0.5) * 0.6
        this.speedY = (Math.random() - 0.5) * 0.6
        this.opacity = Math.random() * 0.6 + 0.3
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.pulsePhase += this.pulseSpeed

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        const rgb = getAccentRgb()
        const pulseOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.2
        ctx.fillStyle = `rgba(${rgb}, ${Math.max(0.1, Math.min(0.8, pulseOpacity))})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Добавляем свечение
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(${rgb}, ${pulseOpacity * 0.5})`
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    initParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.update()
        particle.draw()

        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const rgb = getAccentRgb()
            const opacity = 0.15 * (1 - distance / 150)
            ctx.strokeStyle = `rgba(${rgb}, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="animated-background">
      <canvas ref={canvasRef} className="particles-canvas" />
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
      <div className="gradient-orb gradient-orb-4" />
    </div>
  )
}

export default AnimatedBackground


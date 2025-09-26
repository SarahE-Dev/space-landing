"use client"

import { useEffect, useRef, useState } from "react"

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas && ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        canvas.style.width = window.innerWidth + 'px'
        canvas.style.height = window.innerHeight + 'px'
      }
    }

    setCanvasDimensions()

    // Only add event listener if window is defined (client-side)
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        setCanvasDimensions()
        // Recreate stars and nebulae for new canvas size
        stars.length = 0
        nebulae.length = 0
        
        // Recreate stars
        for (let i = 0; i < starCount; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.3,
            color: starColors[Math.floor(Math.random() * starColors.length)],
            speed: Math.random() * 0.08 + 0.01,
            twinkle: Math.random() * Math.PI * 2,
          })
        }
        
        // Recreate nebulae
        for (let i = 0; i < nebulaCount; i++) {
          nebulae.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 400 + 150,
            color:
              i % 3 === 0
                ? `rgba(${0 + Math.random() * 30}, ${255 + Math.random() * 30}, ${255 + Math.random() * 30}, 0.08)` // Cyan
                : i % 3 === 1
                ? `rgba(${255 + Math.random() * 30}, ${0 + Math.random() * 30}, ${128 + Math.random() * 30}, 0.06)` // Hot pink
                : `rgba(${128 + Math.random() * 30}, ${0 + Math.random() * 30}, ${255 + Math.random() * 30}, 0.04)`, // Purple
            speed: Math.random() * 0.15 + 0.03,
            pulse: Math.random() * Math.PI * 2,
          })
        }
      })
    }

    // Star properties
    const stars: Star[] = []
    const starCount = 300
    const starColors = ["#00ffff", "#ff0080", "#8000ff", "#00ff41", "#ffff00", "#ffffff"]

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.3,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        speed: Math.random() * 0.08 + 0.01,
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    // Shooting stars
    const shootingStars: ShootingStar[] = []
    const createShootingStar = () => {
      if (Math.random() < 0.008) { // Increased chance to 0.8% per frame
        const colors = ["#00ffff", "#ff0080", "#8000ff", "#00ff41", "#ffff00"]
        shootingStars.push({
          x: -50, // Start from left edge
          y: Math.random() * canvas.height,
          speedX: Math.random() * 12 + 6, // Faster speed
          speedY: (Math.random() - 0.5) * 6, // More vertical variation
          trail: [],
          life: 1,
          decay: Math.random() * 0.015 + 0.008,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      
      // Also create diagonal shooting stars
      if (Math.random() < 0.004) {
        const colors = ["#00ffff", "#ff0080", "#8000ff", "#00ff41"]
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: -50, // Start from top
          speedX: (Math.random() - 0.5) * 8,
          speedY: Math.random() * 10 + 5,
          trail: [],
          life: 1,
          decay: Math.random() * 0.02 + 0.01,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }

    // Create nebula clouds
    const nebulae: Nebula[] = []
    const nebulaCount = 7

    for (let i = 0; i < nebulaCount; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 400 + 150,
        color:
          i % 3 === 0
            ? `rgba(${0 + Math.random() * 30}, ${255 + Math.random() * 30}, ${255 + Math.random() * 30}, 0.08)` // Cyan
            : i % 3 === 1
            ? `rgba(${255 + Math.random() * 30}, ${0 + Math.random() * 30}, ${128 + Math.random() * 30}, 0.06)` // Hot pink
            : `rgba(${128 + Math.random() * 30}, ${0 + Math.random() * 30}, ${255 + Math.random() * 30}, 0.04)`, // Purple
        speed: Math.random() * 0.15 + 0.03,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Animation
    let animationFrameId: number

    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient with subtle animation
      const time = Date.now() * 0.0001
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0a0118")
      gradient.addColorStop(0.5, `rgba(26, 10, 46, ${0.8 + Math.sin(time) * 0.2})`)
      gradient.addColorStop(1, "#1a0a2e")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create shooting stars
      createShootingStar()

      // Draw and update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const shootingStar = shootingStars[i]
        
        // Add current position to trail
        shootingStar.trail.push({ x: shootingStar.x, y: shootingStar.y })
        if (shootingStar.trail.length > 20) {
          shootingStar.trail.shift()
        }

        // Draw trail with shooting star's color
        const rgb = shootingStar.color === "#00ffff" ? "0, 255, 255" :
                   shootingStar.color === "#ff0080" ? "255, 0, 128" :
                   shootingStar.color === "#8000ff" ? "128, 0, 255" :
                   shootingStar.color === "#00ff41" ? "0, 255, 65" :
                   "255, 255, 0" // yellow
        
        ctx.lineWidth = 3
        ctx.beginPath()
        
        for (let j = 0; j < shootingStar.trail.length; j++) {
          const point = shootingStar.trail[j]
          const alpha = (j / shootingStar.trail.length) * shootingStar.life * 0.8
          ctx.strokeStyle = `rgba(${rgb}, ${alpha})`
          
          if (j === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        }
        ctx.stroke()
        
        // Add a bright core
        ctx.beginPath()
        ctx.arc(shootingStar.x, shootingStar.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${shootingStar.life})`
        ctx.fill()
        
        // Add glow effect
        ctx.beginPath()
        ctx.arc(shootingStar.x, shootingStar.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${shootingStar.life * 0.3})`
        ctx.fill()

        // Update position
        shootingStar.x += shootingStar.speedX
        shootingStar.y += shootingStar.speedY
        shootingStar.life -= shootingStar.decay

        // Remove if dead or off screen
        if (shootingStar.life <= 0 || shootingStar.x > canvas.width + 100 || shootingStar.y > canvas.height + 100) {
          shootingStars.splice(i, 1)
        }
      }

      // Draw nebulae with pulsing effect
      nebulae.forEach((nebula) => {
        nebula.pulse += 0.02
        const pulseFactor = 1 + Math.sin(nebula.pulse) * 0.2
        const currentRadius = nebula.radius * pulseFactor

        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, currentRadius)
        gradient.addColorStop(0, nebula.color)
        gradient.addColorStop(0.7, nebula.color.replace(/[\d\.]+\)$/g, '0.02)'))
        gradient.addColorStop(1, "rgba(10, 1, 24, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(nebula.x, nebula.y, currentRadius, 0, Math.PI * 2)
        ctx.fill()

        // Move nebulae
        nebula.x += nebula.speed * Math.sin(time + nebula.pulse)
        nebula.y -= nebula.speed / 3

        // Reset position if off screen
        if (nebula.x - currentRadius > canvas.width) {
          nebula.x = -currentRadius
        }
        if (nebula.y + currentRadius < 0) {
          nebula.y = canvas.height + currentRadius
        }
      })

      // Draw stars with twinkling effect
      stars.forEach((star) => {
        star.twinkle += 0.05
        const twinkleFactor = 0.5 + Math.sin(star.twinkle) * 0.5
        const currentRadius = star.radius * twinkleFactor

        ctx.beginPath()
        ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()

        // Add enhanced glow effect
        const glowSize = currentRadius * (4 + Math.sin(star.twinkle * 0.5) * 2)
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowSize)
        gradient.addColorStop(0, star.color)
        gradient.addColorStop(0.3, star.color.replace('rgb', 'rgba').replace(')', ', 0.3)'))
        gradient.addColorStop(1, "rgba(10, 1, 24, 0)")

        ctx.beginPath()
        ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Move stars
        star.y += star.speed

        // Reset position if off screen
        if (star.y - star.radius > canvas.height) {
          star.y = -star.radius
          star.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation immediately
    animate()

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", () => {})
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isMounted])

  return <canvas 
    ref={canvasRef} 
    className="fixed top-0 left-0 w-screen h-screen z-0" 
    style={{ 
      display: 'block',
      background: '#0a0118',
      pointerEvents: 'none'
    }} 
  />
}

interface Star {
  x: number
  y: number
  radius: number
  color: string
  speed: number
  twinkle: number
}

interface Nebula {
  x: number
  y: number
  radius: number
  color: string
  speed: number
  pulse: number
}

interface ShootingStar {
  x: number
  y: number
  speedX: number
  speedY: number
  trail: { x: number; y: number }[]
  life: number
  decay: number
  color: string
}


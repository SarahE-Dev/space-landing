"use client"

import { useEffect, useRef } from "react"

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Star properties
    const stars: Star[] = []
    const starCount = 200
    const starColors = ["#ff69b4", "#8a2be2", "#9370db", "#1e90ff", "#00bfff", "#ffffff"]

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        speed: Math.random() * 0.05 + 0.01,
      })
    }

    // Create nebula clouds
    const nebulae: Nebula[] = []
    const nebulaCount = 5

    for (let i = 0; i < nebulaCount; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 200,
        color:
          i % 2 === 0
            ? `rgba(${138 + Math.random() * 30}, ${43 + Math.random() * 30}, ${226 + Math.random() * 30}, 0.05)`
            : `rgba(${255 + Math.random() * 30}, ${105 + Math.random() * 30}, ${180 + Math.random() * 30}, 0.05)`,
        speed: Math.random() * 0.1 + 0.05,
      })
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0a0118")
      gradient.addColorStop(1, "#1a0a2e")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebulae
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        gradient.addColorStop(0, nebula.color)
        gradient.addColorStop(1, "rgba(10, 1, 24, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fill()

        // Move nebulae
        nebula.x += nebula.speed
        nebula.y -= nebula.speed / 2

        // Reset position if off screen
        if (nebula.x - nebula.radius > canvas.width) {
          nebula.x = -nebula.radius
        }
        if (nebula.y + nebula.radius < 0) {
          nebula.y = canvas.height + nebula.radius
        }
      })

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()

        // Add glow effect
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4)
        gradient.addColorStop(0, star.color)
        gradient.addColorStop(1, "rgba(10, 1, 24, 0)")

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2)
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

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
}

interface Star {
  x: number
  y: number
  radius: number
  color: string
  speed: number
}

interface Nebula {
  x: number
  y: number
  radius: number
  color: string
  speed: number
}


"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import * as THREE from "three"
import { useResponsiveScale } from "./hooks/use-responsive-scale"

export default function PlanetSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ff69b4] to-[#1e90ff]">
            Explore Our Planets
          </h2>
          <p className="text-lg text-[#e0e0ff]/70 max-w-2xl mx-auto">
            Discover the beauty of our cosmic collection, each with unique features and characteristics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] md:h-[500px]">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
              <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff69b4" />
              <ColorfulSaturn position={[-.2, -1, -5]} />
            </Canvas>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8a2be2] to-[#1e90ff]">
              Celestia Prime
            </h3>
            <p className="text-[#e0e0ff]/80">
              A magnificent ringed planet with vibrant purple hues and stunning pink rings. Celestia Prime is known for
              its breathtaking ring system and colorful atmospheric patterns that create a mesmerizing visual display.
            </p>
            <ul className="space-y-2 text-[#e0e0ff]/70">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#ff69b4] mr-2"></div>
                Stunning pink ring system with crystalline particles
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#8a2be2] mr-2"></div>
                Vibrant purple atmosphere with swirling patterns
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#1e90ff] mr-2"></div>
                Floating cities within the upper atmosphere
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#ff1493] mr-2"></div>
                Unique gravitational properties for exploration
              </li>
            </ul>
            <Button className="bg-gradient-to-r from-[#8a2be2] to-[#1e90ff] hover:opacity-90 text-white border-0">
              Explore Celestia Prime
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


function ColorfulSaturn({ position }: { position: [number, number, number] }) {
  const planetRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Mesh>(null)
  const scale = useResponsiveScale(1, 0.6, 0.8)

  // Create a canvas for the planet texture
  const createPlanetTexture = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Create a purple gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#8a2be2") // Purple
    gradient.addColorStop(0.5, "#9370db") // Medium purple
    gradient.addColorStop(1, "#8a2be2") // Purple
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add stripes to make rotation visible
    ctx.strokeStyle = "#b19cd9" // Lighter purple
    ctx.lineWidth = 15
    for (let i = 0; i < 20; i++) {
      const y = i * 30
      ctx.beginPath()
      ctx.moveTo(0, y)
      // Create wavy lines
      for (let x = 0; x < canvas.width; x += 20) {
        const height = Math.sin(x * 0.01 + i * 0.5) * 10
        ctx.lineTo(x, y + height)
      }
      ctx.stroke()
    }

    // Add some spots/storms
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 20 + 10

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = i % 2 === 0 ? "#ff69b4" : "#1e90ff" // Pink or blue spots
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }

  // Create a canvas for the rings texture
  const createRingsTexture = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 128
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Create a pink gradient for the rings
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop(0, "#ff69b4") // Pink
    gradient.addColorStop(0.3, "#ff1493") // Deep pink
    gradient.addColorStop(0.6, "#ff69b4") // Pink
    gradient.addColorStop(1, "#ff1493") // Deep pink
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some texture/gaps to the rings
    for (let i = 0; i < canvas.width; i += 20) {
      const width = Math.random() * 10 + 5
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(i, 0, width, canvas.height)
    }

    // Add some sparkles
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 2 + 1

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = "#ffffff" // White sparkles
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01 // Faster rotation to be more visible
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.005 // Rotate rings independently
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Saturn planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={createPlanetTexture()} emissive="#8a2be2" emissiveIntensity={0.2} />
      </mesh>

      {/* Saturn rings */}
      <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 4, 128]} />
        <meshStandardMaterial
          map={createRingsTexture()}
          emissive="#ff69b4"
          emissiveIntensity={0.5}
          transparent={true}
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}


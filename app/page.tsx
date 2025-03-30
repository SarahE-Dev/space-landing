"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Stars, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sparkles, Star } from "lucide-react"
import SpaceNav from "./space-nav"
import PlanetSection from "./planet-section"
import FeatureCard from "./feature-card"
import GalaxyBackground from "./galaxy-background"
import * as THREE from "three"
import { useResponsiveScale } from "./hooks/use-responsive-scale"

export default function SpaceLanding() {
  return (
    <div className="min-h-screen bg-[#0a0118] text-white overflow-hidden">
      <GalaxyBackground />

      <div className="relative z-10">
        <SpaceNav />

        <main>
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff69b4" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ColorfulSaturn position={[3, -1, -5]} />
              </Canvas>
            </div>

            <div className="container relative z-10 mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Sparkles className="h-16 w-16 mx-auto text-[#ff69b4]" />
                </motion.div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff69b4] via-[#8a2be2] to-[#1e90ff]">
                  Explore The Universe
                </h1>

                <p className="text-xl md:text-2xl max-w-2xl mx-auto text-[#e0e0ff]/80">
                  Journey through the cosmos with our immersive digital experience
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <Button className="bg-gradient-to-r from-[#8a2be2] to-[#1e90ff] hover:opacity-90 text-white border-0 h-12 px-8 text-lg">
                    Begin Journey
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#ff69b4] text-[#ff69b4] hover:bg-[#ff69b4]/10 h-12 px-8 text-lg"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              initial={{ y: 0 }}
              animate={{ y: 10 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Star className="h-8 w-8 text-[#ff69b4]" />
            </motion.div>
          </section>

          {/* Rest of the content remains the same */}
          {/* Features Section */}
          <section className="relative py-24 px-4">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1e90ff] to-[#8a2be2]">
                  Discover Cosmic Features
                </h2>
                <p className="text-lg text-[#e0e0ff]/70 max-w-2xl mx-auto">
                  Our platform offers a range of stellar features to enhance your journey through the digital cosmos
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  title="Interstellar Navigation"
                  description="Navigate through our digital universe with intuitive controls and seamless transitions"
                  icon="navigation"
                  color="#ff69b4"
                />
                <FeatureCard
                  title="Cosmic Customization"
                  description="Personalize your experience with a range of themes and settings to match your preferences"
                  icon="settings"
                  color="#8a2be2"
                />
                <FeatureCard
                  title="Galactic Performance"
                  description="Experience lightning-fast loading times and smooth animations throughout your journey"
                  icon="zap"
                  color="#1e90ff"
                />
                <FeatureCard
                  title="Nebula Security"
                  description="Your data is protected with advanced encryption and security measures"
                  icon="shield"
                  color="#ff1493"
                />
                <FeatureCard
                  title="Stellar Support"
                  description="Our team of experts is always ready to assist you with any questions or issues"
                  icon="headphones"
                  color="#9370db"
                />
                <FeatureCard
                  title="Universal Compatibility"
                  description="Access our platform from any device, anywhere in the universe"
                  icon="globe"
                  color="#00bfff"
                />
              </div>
            </div>
          </section>

          {/* Planet Showcase Section */}
          <PlanetSection />

          {/* Call to Action */}
          <section className="relative py-24 px-4">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#0f0f3a]/40 to-[#2a0e38]/40 p-8 md:p-12 rounded-2xl border border-[#8a2be2]/30 backdrop-blur-sm"
              >
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ff69b4] to-[#1e90ff]">
                    Ready to Explore the Cosmos?
                  </h2>
                  <p className="text-lg text-[#e0e0ff]/80 mb-8">
                    Join thousands of explorers already navigating our digital universe. Begin your journey today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-[#ff69b4] to-[#8a2be2] hover:opacity-90 text-white border-0 h-12 px-8 text-lg">
                      Launch Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#1e90ff] text-[#1e90ff] hover:bg-[#1e90ff]/10 h-12 px-8 text-lg"
                    >
                      Take a Tour
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="border-t border-[#8a2be2]/20 py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <Sparkles className="h-8 w-8 text-[#ff69b4] mr-2" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff69b4] to-[#1e90ff]">
                  CosmicUI
                </span>
              </div>

              <nav className="flex gap-8 mb-6 md:mb-0">
                <Link href="#" className="text-[#e0e0ff]/70 hover:text-[#ff69b4] transition-colors">
                  Features
                </Link>
                <Link href="#" className="text-[#e0e0ff]/70 hover:text-[#ff69b4] transition-colors">
                  Showcase
                </Link>
                <Link href="#" className="text-[#e0e0ff]/70 hover:text-[#ff69b4] transition-colors">
                  Pricing
                </Link>
                <Link href="#" className="text-[#e0e0ff]/70 hover:text-[#ff69b4] transition-colors">
                  Contact
                </Link>
              </nav>

              <div className="text-sm text-[#e0e0ff]/50">
                © {new Date().getFullYear()} CosmicUI. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
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


"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, useTexture } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import type * as THREE from "three"

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
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} color="#ff69b4" intensity={0.5} />
              <RotatingPlanet />
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
              Terra Nova
            </h3>
            <p className="text-[#e0e0ff]/80">
              A beautiful planet with vast oceans and lush landscapes. Terra Nova is home to diverse ecosystems and
              breathtaking natural wonders. Explore its mountains, forests, and underwater caves.
            </p>
            <ul className="space-y-2 text-[#e0e0ff]/70">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#ff69b4] mr-2"></div>
                Breathable atmosphere with optimal conditions
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#8a2be2] mr-2"></div>
                Rich biodiversity with unique species
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#1e90ff] mr-2"></div>
                Advanced civilization with stunning architecture
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#ff1493] mr-2"></div>
                Spectacular natural phenomena and weather patterns
              </li>
            </ul>
            <Button className="bg-gradient-to-r from-[#8a2be2] to-[#1e90ff] hover:opacity-90 text-white border-0">
              Explore Terra Nova
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function RotatingPlanet() {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture("/assets/3d/texture_earth.jpg")

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}


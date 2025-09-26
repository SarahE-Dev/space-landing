"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface GalaxyStreakProps {
  count: number
}

function GalaxyStreaks({ count }: GalaxyStreakProps) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      temp[i3] = (Math.random() - 0.5) * 30 // x
      temp[i3 + 1] = (Math.random() - 0.5) * 20 // y
      temp[i3 + 2] = (Math.random() - 0.5) * 10 // z
    }
    return temp
  }, [count])

  const colors = useMemo(() => {
    const temp = new Float32Array(count * 3)
    const colorPalette = [
      [0, 1, 1], // cyan
      [1, 0, 0.5], // hot pink  
      [0.5, 0, 1], // electric purple
      [0, 1, 0.25], // neon green
      [1, 1, 0], // yellow
    ]
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const color = colorPalette[i % colorPalette.length]
      temp[i3] = color[0]
      temp[i3 + 1] = color[1]
      temp[i3 + 2] = color[2]
    }
    return temp
  }, [count])

  const velocities = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      temp[i3] = (Math.random() - 0.5) * 0.03 // x velocity
      temp[i3 + 1] = (Math.random() - 0.5) * 0.02 // y velocity
      temp[i3 + 2] = (Math.random() - 0.5) * 0.01 // z velocity
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        
        // Move particles with some randomness
        positionsArray[i3] += velocities[i3] + Math.sin(state.clock.elapsedTime + i) * 0.001
        positionsArray[i3 + 1] += velocities[i3 + 1] + Math.cos(state.clock.elapsedTime + i) * 0.001
        positionsArray[i3 + 2] += velocities[i3 + 2]
        
        // Reset particle when it goes off screen
        if (Math.abs(positionsArray[i3]) > 20 || Math.abs(positionsArray[i3 + 1]) > 15) {
          positionsArray[i3] = (Math.random() - 0.5) * 30
          positionsArray[i3 + 1] = (Math.random() - 0.5) * 20
          positionsArray[i3 + 2] = (Math.random() - 0.5) * 10
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      
      // Gentle rotation
      pointsRef.current.rotation.z += 0.002
    }
  })

  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Create a glowing particle
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 32, 32)
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        map={particleTexture}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function ShootingLinesCanvas() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <GalaxyStreaks count={25} />
      </Canvas>
    </div>
  )
}

"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ParticleProps {
  count: number
}

function FloatingParticles({ count }: ParticleProps) {
  const mesh = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Use deterministic positioning based on index
      const seed = i * 0.618033988749; // Golden ratio for better distribution
      temp[i3] = (((seed * 9301 + 49297) % 233280) / 233280 - 0.5) * 20
      temp[i3 + 1] = (((seed * 9301 + 49297 + 1) % 233280) / 233280 - 0.5) * 20
      temp[i3 + 2] = (((seed * 9301 + 49297 + 2) % 233280) / 233280 - 0.5) * 20
    }
    return temp
  }, [count])

  const velocities = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Use deterministic velocities based on index
      const seed = (i + 100) * 0.618033988749;
      temp[i3] = (((seed * 9301 + 49297) % 233280) / 233280 - 0.5) * 0.02
      temp[i3 + 1] = (((seed * 9301 + 49297 + 1) % 233280) / 233280 - 0.5) * 0.02
      temp[i3 + 2] = (((seed * 9301 + 49297 + 2) % 233280) / 233280 - 0.5) * 0.02
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const time = state.clock.elapsedTime
        
        // Add more random, organic movement
        positions[i3] += velocities[i3] + Math.sin(time * 0.5 + i * 0.3) * 0.003
        positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i * 0.7) * 0.002
        positions[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.4 + i * 0.5) * 0.002

        // Wrap around bounds with more variation
        const bounds = 12
        if (positions[i3] > bounds) positions[i3] = -bounds
        if (positions[i3] < -bounds) positions[i3] = bounds
        if (positions[i3 + 1] > bounds) positions[i3 + 1] = -bounds
        if (positions[i3 + 1] < -bounds) positions[i3 + 1] = bounds
        if (positions[i3 + 2] > bounds) positions[i3 + 2] = -bounds
        if (positions[i3 + 2] < -bounds) positions[i3 + 2] = bounds
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true
      // Slower rotation to prevent forming lines
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Create a glowing particle with cyberpunk colors
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(0, 255, 255, 1)')
    gradient.addColorStop(0.4, 'rgba(255, 0, 128, 0.8)')
    gradient.addColorStop(1, 'rgba(128, 0, 255, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 32, 32)
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        map={particleTexture}
        transparent
        alphaTest={0.001}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function FloatingParticlesCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <FloatingParticles count={80} />
      </Canvas>
    </div>
  )
}

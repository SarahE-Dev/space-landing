"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Stars, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sparkles, Star, ChevronDown, Home, User, Code, Briefcase, Mail, Download } from "lucide-react"
import SpaceNav from "./space-nav"
import PlanetSection from "./planet-section"
import FeatureCard from "./feature-card"
import ProjectCard from "./project-card"
import GalaxyBackground from "./galaxy-background"
import ShootingLinesCanvas from "./shooting-lines"
import { AnimatedSkills } from "./animated-skills"
import { ContactForm } from "./contact-form"
import * as THREE from "three"
import { useResponsiveScale } from "./hooks/use-responsive-scale"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Code },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
]

const MAIN_NAME = "Sarah Eatherly"

type RGB = { r: number; g: number; b: number }
type GradientStop = { position: number; color: RGB }

const WHITE: RGB = { r: 255, g: 255, b: 255 }

const heroNameGradient: GradientStop[] = [
  { position: 0, color: hexToRgb("#2563eb") },
  { position: 0.32, color: hexToRgb("#38bdf8") },
  { position: 0.68, color: hexToRgb("#a855f7") },
  { position: 1, color: hexToRgb("#ec4899") },
]

function hexToRgb(hex: string): RGB {
  const normalized = hex.replace("#", "")
  const expanded = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized
  const intVal = parseInt(expanded, 16)

  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
  }
}

function rgbToCss(color: RGB, alpha = 1): string {
  if (alpha >= 1) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`
  }
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
}

function mixColors(a: RGB, b: RGB, factor: number): RGB {
  const t = Math.min(Math.max(factor, 0), 1)
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  }
}

function getGradientColor(stops: GradientStop[], t: number): RGB {
  if (!stops.length) {
    return WHITE
  }

  const clampedT = Math.min(Math.max(t, 0), 1)

  if (clampedT <= stops[0].position) {
    return stops[0].color
  }

  for (let i = 1; i < stops.length; i++) {
    const current = stops[i]
    const previous = stops[i - 1]

    if (clampedT <= current.position) {
      const range = current.position - previous.position || 1
      const localT = (clampedT - previous.position) / range
      return mixColors(previous.color, current.color, localT)
    }
  }

  return stops[stops.length - 1].color
}

export default function SpaceLanding() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  const heroLetters = useMemo(() => {
    const characters = MAIN_NAME.split("")
    const visibleCharacters = characters.filter((char) => char !== " ").length
    let visibleIndex = -1

    return characters.map((char) => {
      if (char === " ") {
        return {
          char,
          display: "\u00A0",
          baseColor: "rgba(219, 234, 254, 0.9)",
          highlightColor: "rgba(191, 219, 254, 0.8)",
          glowColor: "rgba(148, 163, 255, 0.4)",
          isSpace: true,
        }
      }

      visibleIndex += 1
      const ratio = visibleCharacters > 1 ? visibleIndex / (visibleCharacters - 1) : 0
      const baseRgb = getGradientColor(heroNameGradient, ratio)
      const highlightRgb = mixColors(baseRgb, WHITE, 0.18)
      const glowRgb = mixColors(baseRgb, WHITE, 0.08)

      return {
        char,
        display: char,
        baseColor: rgbToCss(baseRgb),
        highlightColor: rgbToCss(highlightRgb),
        glowColor: rgbToCss(glowRgb, 0.45),
        isSpace: false,
      }
    })
  }, [])

  const heroBadges = useMemo(() => (
    [
      { text: "AI & ML", accent: "#38bdf8" },
      { text: "Full Stack", accent: "#a855f7" },
      { text: "Creative Tech", accent: "#ec4899" },
    ]
  ), [])

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0118] text-white overflow-hidden">
      <GalaxyBackground />
      
      {/* Custom cursor effect */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, rgba(128, 0, 255, 0.6) 50%, transparent 100%)",
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(128, 0, 255, 0.4)"
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      <div className="relative z-10">
        <SpaceNav />

        <main>
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden py-12 sm:py-16 lg:py-20">
            {/* Parallax background layers */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff69b4" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                
                {/* Main Saturn */}
                <ColorfulSaturn position={[4, 0, -6]} />
                
                {/* Jupiter-style planet */}
                <CyberpunkJupiter position={[-5, 2, -8]} scale={0.7} />
                
                {/* Earth-style planet */}
                <CyberpunkEarth position={[2, -3, -10]} scale={0.5} />
                
                {/* Asteroid field */}
                {[...Array(8)].map((_, i) => (
                  <mesh key={i} position={[
                    (Math.sin(i) * 8) + (i % 2 === 0 ? -6 : 6),
                    (Math.cos(i) * 4) + (i % 3 === 0 ? 1 : -1),
                    -12 - (i * 0.5)
                  ]}>
                    <dodecahedronGeometry args={[0.1 + (i % 3) * 0.05]} />
                    <meshStandardMaterial 
                      color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff0080" : "#8000ff"}
                      emissive={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff0080" : "#8000ff"}
                      emissiveIntensity={0.2}
                    />
                  </mesh>
                ))}
              </Canvas>
            </motion.div>

            {/* Shooting lines layer */}
            <ShootingLinesCanvas />

            <div className="container relative z-10 mx-auto text-center max-w-6xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1.2 }}
                className="space-y-6 sm:space-y-8 lg:space-y-10"
              >
                    {/* Animated icon with orbital elements */}
                <motion.div
                      className="relative"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                  transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                        delay: 0.2,
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="relative"
                      >
                        <Sparkles className="h-20 w-20 mx-auto text-[#ff69b4] drop-shadow-2xl" />
                        
                        {/* Orbital rings */}
                        <motion.div
                          className="absolute inset-0 border-2 border-[#8a2be2]/30 rounded-full"
                          style={{ width: "120px", height: "120px", left: "-10px", top: "-10px" }}
                          animate={{ rotate: -360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-0 border border-[#1e90ff]/20 rounded-full"
                          style={{ width: "140px", height: "140px", left: "-20px", top: "-20px" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                </motion.div>

                    {/* Clean title with proper visibility and no glitch */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="relative z-30 mb-8 sm:mb-12"
                    >
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        {/* Subtle background glow - positioned behind name only */}
                        <motion.div
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] max-w-[800px] h-20 sm:h-28 md:h-32 lg:h-40 z-10"
                          style={{
                            background: "radial-gradient(ellipse 75% 50%, rgba(34, 211, 238, 0.35) 0%, rgba(236, 72, 153, 0.35) 55%, rgba(168, 85, 247, 0.35) 100%)",
                            filter: "blur(20px)"
                          }}
                          animate={{
                            opacity: [0.7, 0.9, 0.7]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Main name with clear visibility */}
                        <motion.h1 
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold relative z-20 text-center leading-tight mb-4 sm:mb-6"
                          style={{
                            color: "#dbeafe",
                            letterSpacing: "0.03em",
                            filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 0.35)) drop-shadow(0 0 28px rgba(168, 85, 247, 0.3))"
                          }}
                          animate={{
                            filter: [
                              "drop-shadow(0 0 12px rgba(59, 130, 246, 0.35)) drop-shadow(0 0 28px rgba(168, 85, 247, 0.3))",
                              "drop-shadow(0 0 14px rgba(14, 165, 233, 0.4)) drop-shadow(0 0 32px rgba(236, 72, 153, 0.32))",
                              "drop-shadow(0 0 12px rgba(59, 130, 246, 0.35)) drop-shadow(0 0 28px rgba(168, 85, 247, 0.3))"
                            ]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.span
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 pointer-events-none"
                            style={{
                              left: "22%",
                              right: "22%",
                              background: "linear-gradient(120deg, transparent 35%, rgba(56, 189, 248, 0.22) 50%, transparent 65%)",
                              opacity: 0.38,
                              mixBlendMode: "screen",
                              filter: "blur(9px)"
                            }}
                            animate={{
                              opacity: [0.28, 0.45, 0.28],
                              scaleX: [0.92, 1.05, 0.92]
                            }}
                            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                          />

                          {heroLetters.map((letter, index) => {
                            const colorAnimation = letter.isSpace
                              ? [letter.baseColor, letter.baseColor, letter.baseColor]
                              : [letter.highlightColor, letter.baseColor, letter.highlightColor]
                            const shadowAnimation = letter.isSpace
                              ? [
                                  "0 0 12px rgba(148, 163, 255, 0.32)",
                                  "0 0 16px rgba(148, 163, 255, 0.42)",
                                  "0 0 12px rgba(148, 163, 255, 0.32)"
                                ]
                              : [
                                  `0 0 18px ${letter.glowColor}, 0 0 32px ${letter.glowColor}`,
                                  `0 0 26px ${letter.glowColor}, 0 0 40px ${letter.glowColor}`,
                                  `0 0 18px ${letter.glowColor}, 0 0 32px ${letter.glowColor}`
                                ]

                            return (
                              <motion.span
                                key={`${letter.display}-${index}`}
                                className="inline-block relative"
                                style={{
                                  color: letter.baseColor,
                                  textShadow: letter.isSpace
                                    ? "0 0 12px rgba(148, 163, 255, 0.4)"
                                    : `0 0 18px ${letter.glowColor}, 0 0 32px ${letter.glowColor}`
                                }}
                                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                                animate={{ 
                                  opacity: 1, 
                                  y: [0, -6, 0], 
                                  rotateX: 0,
                                  rotateZ: [0, 1, -1, 0],
                                  color: colorAnimation,
                                  textShadow: shadowAnimation
                                }}
                                transition={{
                                  opacity: { duration: 0.8, delay: index * 0.1, ease: "backOut" },
                                  y: { 
                                    duration: 3, 
                                    repeat: Infinity, 
                                    delay: index * 0.2,
                                    ease: "easeInOut" 
                                  },
                                  rotateX: { duration: 0.8, delay: index * 0.1, ease: "backOut" },
                                  rotateZ: { 
                                    duration: 4, 
                                    repeat: Infinity, 
                                    delay: index * 0.15,
                                    ease: "easeInOut" 
                                  },
                                  color: {
                                    duration: 4.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.12
                                  },
                                  textShadow: {
                                    duration: 4.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.12
                                  }
                                }}
                                whileHover={{
                                  scale: letter.isSpace ? 1 : 1.15,
                                  y: letter.isSpace ? 0 : -12,
                                  rotateZ: letter.isSpace ? 0 : 5,
                                  transition: { duration: 0.2 }
                                }}
                              >
                                {letter.display}
                              </motion.span>
                            )
                          })}
                        </motion.h1>
                      </motion.div>
                    </motion.div>

                    {/* Job title with improved styling */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="mb-4 sm:mb-6"
                    >
                      <motion.div
                        className="relative inline-flex items-center gap-4 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#38bdf8]/45 bg-white/[0.04] backdrop-blur-md shadow-[0_0_25px_rgba(56,189,248,0.18)]"
                        whileHover={{
                          scale: 1.06,
                          boxShadow: "0 0 35px rgba(56, 189, 248, 0.28)",
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <motion.span
                          className="hidden sm:block h-px w-10 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent"
                          animate={{ opacity: [0.45, 0.8, 0.45] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                        />

                        <motion.h2
                          className="font-heading text-xs sm:text-sm md:text-base uppercase text-sky-100/80"
                          style={{
                            textShadow: "0 0 18px rgba(56, 189, 248, 0.35)",
                            letterSpacing: "0.52em",
                          }}
                          animate={{
                            letterSpacing: ["0.52em", "0.58em", "0.52em"],
                            textShadow: [
                              "0 0 18px rgba(56, 189, 248, 0.35)",
                              "0 0 22px rgba(236, 72, 153, 0.4)",
                              "0 0 18px rgba(56, 189, 248, 0.35)",
                            ],
                            color: [
                              "rgba(186, 230, 253, 0.78)",
                              "rgba(224, 231, 255, 0.9)",
                              "rgba(186, 230, 253, 0.78)",
                            ],
                          }}
                          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          Software Engineer
                        </motion.h2>

                        <motion.span
                          className="hidden sm:block h-px w-10 bg-gradient-to-r from-transparent via-[#ec4899] to-transparent"
                          animate={{ opacity: [0.38, 0.75, 0.38] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        />
                      </motion.div>
                      
                      {/* Single hero quote */}
                      <motion.blockquote
                        className="relative mt-8 sm:mt-10 max-w-3xl mx-auto px-6"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.35, duration: 0.85, ease: "easeOut" }}
                      >
                        <motion.p
                          className="text-sky-100/85 text-base sm:text-lg md:text-xl font-light leading-relaxed text-center"
                          style={{ textShadow: "0 0 18px rgba(56, 189, 248, 0.25)" }}
                          animate={{
                            textShadow: [
                              "0 0 18px rgba(56, 189, 248, 0.25)",
                              "0 0 24px rgba(168, 85, 247, 0.3)",
                              "0 0 18px rgba(56, 189, 248, 0.25)",
                            ],
                          }}
                          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        >
                          “Creating beyond the ordinary, engineering cosmic experiences with intention and heart.”
                        </motion.p>
                      </motion.blockquote>

                      {/* Hero highlight badges */}
                      <motion.div
                        className="mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-4 px-6"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.55, duration: 0.8, ease: "easeOut" }}
                      >
                        {heroBadges.map((badge, index) => (
                          <motion.span
                            key={badge.text}
                            className="font-heading relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border backdrop-blur-md text-xs sm:text-sm uppercase tracking-[0.32em] text-sky-100/80"
                            style={{
                              borderColor: `${badge.accent}55`,
                              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.55), rgba(30, 41, 59, 0.35))",
                              boxShadow: `0 0 18px ${badge.accent}24`,
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              letterSpacing: ["0.32em", "0.36em", "0.32em"],
                              boxShadow: [
                                `0 0 18px ${badge.accent}24`,
                                `0 0 24px ${badge.accent}32`,
                                `0 0 18px ${badge.accent}24`,
                              ],
                            }}
                            transition={{
                              delay: 1.6 + index * 0.12,
                              duration: 5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            whileHover={{ scale: 1.05, boxShadow: `0 0 26px ${badge.accent}36` }}
                          >
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: `radial-gradient(circle, ${badge.accent}, transparent)` }}
                            />
                            {badge.text}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Enhanced buttons with better mobile layout */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8 px-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 0.8 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group w-full sm:w-56"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff] via-[#ff0080] to-[#8000ff] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300 group-hover:duration-200"></div>
                        <Button
                          className="relative bg-gradient-to-r from-[#00ffff] to-[#ff0080] hover:opacity-90 text-black border-0 h-12 sm:h-14 px-6 sm:px-6 text-base sm:text-lg font-semibold w-full transition-all duration-300"
                          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                          style={{
                            boxShadow: "0 0 30px rgba(0, 255, 255, 0.4), 0 0 50px rgba(255, 0, 128, 0.3), 0 4px 15px rgba(0, 0, 0, 0.3)"
                          }}
                        >
                          View My Work
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group w-full sm:w-56"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#8000ff] to-[#00ffff] rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-300 group-hover:duration-200"></div>
                        <Button
                          variant="outline"
                          className="relative border-2 border-[#8000ff] text-[#8000ff] hover:bg-[#8000ff]/10 h-12 sm:h-14 px-6 sm:px-6 text-base sm:text-lg font-semibold backdrop-blur-sm w-full transition-all duration-300"
                          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                          style={{
                            textShadow: "0 0 10px rgba(128, 0, 255, 0.5)",
                            boxShadow: "0 0 20px rgba(128, 0, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.2)"
                          }}
                        >
                          About Me
                        </Button>
                      </motion.div>
                    </motion.div>
              </motion.div>
            </div>

            {/* Enhanced scroll indicator */}
            <motion.button
              type="button"
              aria-label="Scroll to About section"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute bottom-0 sm:bottom-1 lg:bottom-2 inset-x-0 mx-auto hidden sm:flex flex-col items-center gap-2 focus:outline-none w-fit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative flex items-center justify-center"
                style={{ filter: "drop-shadow(0 0 25px rgba(56, 189, 248, 0.35))" }}
              >
                <motion.span
                  className="absolute -top-6 h-16 w-px bg-gradient-to-b from-transparent via-[#38bdf8]/60 to-transparent"
                  animate={{
                    opacity: [0.25, 0.6, 0.25],
                    scaleY: [0.7, 1.05, 0.7],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                  className="relative flex items-center justify-center w-16 h-16 rounded-full border border-[#38bdf8]/50 bg-white/[0.04] backdrop-blur-md"
                  animate={{
                    boxShadow: [
                      "0 0 25px rgba(56, 189, 248, 0.2)",
                      "0 0 35px rgba(236, 72, 153, 0.28)",
                      "0 0 25px rgba(56, 189, 248, 0.2)",
                    ],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#38bdf8]/20 via-transparent to-[#ec4899]/20"
                    animate={{ rotate: [0, 12, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <motion.div
                    className="flex flex-col items-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="h-6 w-6 text-[#38bdf8]" />
                    <motion.span
                      className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#ec4899]"
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.15, 0.8] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.span
                className="hidden sm:block font-heading text-[0.65rem] uppercase tracking-[0.35em] text-[#e0e0ff]/60 text-center w-16"
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                Scroll
              </motion.span>
            </motion.button>
          </section>

          {/* About Section */}
          <section id="about" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
            {/* Glowing background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#00ffff]/10 to-[#ff0080]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-[#8000ff]/10 to-[#00ffff]/10 rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#ff0080] to-[#8000ff]" style={{
                  textShadow: "0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(255, 0, 128, 0.2), 0 0 40px rgba(128, 0, 255, 0.1)"
                }}>
                  About Me
                </h2>
                <p className="text-lg text-[#e0e0ff]/70 max-w-2xl mx-auto">
                  AI/ML specialist and full-stack developer focused on innovative solutions
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                {/* My Journey Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex"
                >
                  <div className="bg-gradient-to-b from-[#0f0f3a]/40 to-[#2a0e38]/40 p-8 rounded-xl border border-[#00ffff]/30 backdrop-blur-sm relative overflow-hidden flex-1" style={{
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)"
                  }}>
                    {/* Animated background elements */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-16 h-16 rounded-full opacity-10"
                        style={{
                          background: `radial-gradient(circle, ${i % 2 === 0 ? '#00ffff' : '#8000ff'}, transparent)`,
                          left: `${15 + (i * 20)}%`,
                          top: `${20 + (i * 25)}%`,
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 180, 360],
                          opacity: [0.1, 0.25, 0.1],
                        }}
                        transition={{
                          duration: 7 + i,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      />
                    ))}

                    <h3 className="text-2xl font-bold text-[#00ffff] mb-6 relative z-10" style={{
                      textShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
                    }}>My Journey</h3>

                    <div className="relative z-10">
                      <motion.p
                        className="text-[#e0e0ff]/80 leading-relaxed mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        When I learned to code, everything clicked. I finally found the one thing I truly loved and was naturally good at.
                        It wasn't just about writing code—it was about creating magic, turning ideas into reality, and solving problems
                        in ways I never imagined possible.
                      </motion.p>

                      <motion.p
                        className="text-[#e0e0ff]/80 leading-relaxed mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Now, as a software engineer specializing in AI/ML integration and full-stack development, I get to make
                        that magic every day. From building AI voice assistants with RAG systems to crafting responsive web platforms,
                        I bridge technical complexity with user-friendly design.
                      </motion.p>

                      <motion.p
                        className="text-[#e0e0ff]/80 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        Every project is an opportunity to push boundaries, learn something new, and create solutions that make
                        a real difference. That's the magic I bring to everything I build.
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                {/* Creative Vision Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex"
                >
                  <div className="bg-gradient-to-b from-[#0f0f3a]/40 to-[#2a0e38]/40 p-8 rounded-xl border border-[#ff0080]/30 backdrop-blur-sm relative overflow-hidden flex-1" style={{
                    boxShadow: "0 0 20px rgba(255, 0, 128, 0.1)"
                  }}>
                    {/* Animated background elements */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-20 h-20 rounded-full opacity-10"
                        style={{
                          background: `radial-gradient(circle, ${i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff0080' : '#8000ff'}, transparent)`,
                          left: `${20 + (i * 15)}%`,
                          top: `${10 + (i * 20)}%`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          rotate: [0, 180, 360],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 8 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}

                    <h3 className="text-2xl font-bold text-[#ff0080] mb-6 relative z-10" style={{
                      textShadow: "0 0 10px rgba(255, 0, 128, 0.3)"
                    }}>Creative Vision</h3>
                    
                    <div className="relative z-10">
                      <motion.p 
                        className="text-[#e0e0ff]/80 leading-relaxed mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        I believe in creating digital experiences that are not just functional, but magical. 
                        Every line of code is an opportunity to craft something extraordinary.
                      </motion.p>

                      {/* Animated quote */}
                      <motion.div
                        className="relative p-6 rounded-lg border border-[#ff0080]/20 bg-gradient-to-r from-[#ff0080]/10 to-transparent"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#ff0080]/20 to-[#00ffff]/20 rounded-lg"
                          animate={{ opacity: [0, 0.3, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <p className="text-[#e0e0ff]/90 italic text-lg relative z-10">
                          "The best code doesn't just solve problems—it creates possibilities."
                        </p>
                        <div className="flex justify-end mt-2">
                          <motion.div
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ffff] to-[#ff0080]"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                      </motion.div>

                      {/* Floating cyberpunk elements */}
                      <div className="flex justify-center mt-6 space-x-6">
                        {[
                          { delay: 0.5, color: "#00ffff" },
                          { delay: 0.7, color: "#ff0080" },
                          { delay: 0.9, color: "#8000ff" },
                          { delay: 1.1, color: "#00ff41" }
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            className="relative w-8 h-8"
                            animate={{
                              y: [0, -10, 0],
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: item.delay,
                            }}
                            whileHover={{ scale: 1.3 }}
                          >
                            {/* Outer ring */}
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 opacity-60"
                              style={{ borderColor: item.color }}
                              animate={{
                                rotate: [0, -360],
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: item.delay,
                              }}
                            />
                            {/* Inner core */}
                            <motion.div
                              className="absolute inset-2 rounded-full"
                              style={{ 
                                background: `radial-gradient(circle, ${item.color}, transparent)`,
                                boxShadow: `0 0 15px ${item.color}60`
                              }}
                              animate={{
                                opacity: [0.4, 1, 0.4],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: item.delay,
                              }}
                            />
                            {/* Center dot */}
                            <div 
                              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                              style={{ backgroundColor: item.color }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* Animated Skills Section */}
          <AnimatedSkills />

          {/* Projects Section */}
          <section id="projects" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            {/* Glowing background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/3 right-1/5 w-72 h-72 bg-gradient-to-r from-[#ff0080]/8 to-[#8000ff]/8 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/6 w-56 h-56 bg-gradient-to-r from-[#00ffff]/8 to-[#ff0080]/8 rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#ff0080] to-[#8000ff]" style={{
                  textShadow: "0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(255, 0, 128, 0.2), 0 0 40px rgba(128, 0, 255, 0.1)"
                }}>
                  Featured Projects
                </h2>
                <p className="text-lg text-[#e0e0ff]/70 max-w-2xl mx-auto">
                  A showcase of my recent work, featuring innovative solutions and creative implementations
                </p>
              </motion.div>

              <div className="mb-12">
                <ProjectCard
                  title="HRPR - Human Responsive Personal Representative"
                  description="AI voice assistant showcased and used at the ACA (American Correctional Association) Conference in August 2025 in Denver. Led hands-on development while guiding a small cross-functional team from prototype to pilot. Implemented RAG to use domain-specific knowledge, with simple intent routing and short-term memory so answers stay grounded and useful. Shipped as a Next.js + React app with a PostgreSQL vector database."
                  image="/hrpr.png"
                  technologies={["Next.js", "React", "RAG", "PostgreSQL", "AI Voice Assistant"]}
                  category="fullstack"
                  featured={true}
                  liveUrl="https://hrpr.banyanlabs.io"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="Cosmic Portfolio Site"
                  description="Space-themed portfolio website with stunning 3D animations, interactive planets, and optimized performance. Built with modern React and Three.js."
                  image="/portfolio.png"
                  technologies={["Next.js", "Framer Motion", "Three.js", "Tailwind", "TypeScript"]}
                  category="frontend"
                  liveUrl="https://saraheatherly.dev"
                  githubUrl="https://github.com/SarahE-Dev/space-landing"
                />

                <ProjectCard
                  title="Bloom Housing Risk Prediction System"
                  description="An AI/ML risk assessment system developed in partnership with Exygy. Built an XGBoost machine learning model to predict housing instability risk based on housing application data."
                  image="/bloomhousing.png"
                  technologies={["Python", "XGBoost", "Machine Learning"]}
                  category="fullstack"
                  githubUrl="https://github.com/SarahE-Dev/bloom-housing"
                />

                <ProjectCard
                  title="BlueZack"
                  description="A YouTube clone built with the MERN stack. Users can search for videos, watch them, and interact through comments. Integrated YouTube API for seamless video data retrieval and playback."
                  image="/bluezack.png"
                  technologies={["React", "Node.js", "MongoDB", "YouTube API"]}
                  category="fullstack"
                  liveUrl="https://bluezack.saraheatherly.dev"
                  githubUrl="https://github.com/SarahE-Dev/youtube-frontend"
                />

                <ProjectCard
                  title="Fyre Tunes"
                  description="A music app that integrates with the Spotify API. Users can search for tracks, view detailed album information, and create custom playlists."
                  image="/fyretunes.png"
                  technologies={["React", "Spotify API", "Node.js"]}
                  category="fullstack"
                  liveUrl="https://fyretunes.saraheatherly.dev"
                  githubUrl="https://github.com/SarahE-Dev/midterm-react-front-end"
                />

                <ProjectCard
                  title="Neon Link"
                  description="A Next.js-powered chat application featuring a sleek, futuristic cyberpunk-inspired front-end design."
                  image="/neonlink.png"
                  technologies={["Next.js", "React", "TypeScript"]}
                  category="frontend"
                  liveUrl="https://neonlink-chi.vercel.app"
                  githubUrl="https://github.com/SarahE-Dev/neonlink"
                />

                <ProjectCard
                  title="Article Elevator"
                  description="A Next.js app for creating and managing articles. It allows users to write, edit, and organize articles with a modern interface."
                  image="/articleelevator.png"
                  technologies={["Next.js", "React", "Eldora UI"]}
                  category="frontend"
                  liveUrl="https://internship-project-cyan-nu.vercel.app/"
                  githubUrl="https://github.com/SarahE-Dev/internship-project"
                />
              </div>

              {/* View More Projects Button */}
              <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group inline-block"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff] to-[#ff0080] rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-300"></div>
                  <Button 
                    className="relative bg-gradient-to-r from-[#00ffff] to-[#ff0080] hover:opacity-90 text-black border-0 px-8 py-3 text-lg font-semibold"
                    onClick={() => window.open('https://github.com/SarahE-Dev', '_blank')}
                    style={{
                      boxShadow: "0 0 25px rgba(0, 255, 255, 0.4), 0 0 40px rgba(255, 0, 128, 0.3)"
                    }}
                  >
                    View All Projects on GitHub
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            {/* Glowing background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-r from-[#8000ff]/6 to-[#00ffff]/6 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/5 right-1/4 w-64 h-64 bg-gradient-to-r from-[#ff0080]/6 to-[#8000ff]/6 rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#ff0080] to-[#8000ff]" style={{
                  textShadow: "0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(255, 0, 128, 0.2), 0 0 40px rgba(128, 0, 255, 0.1)"
                }}>
                  Experience & Journey
                  </h2>
                <p className="text-lg text-[#e0e0ff]/70 max-w-2xl mx-auto">
                  From AI integration to full-stack development - my professional journey in tech
                </p>
              </motion.div>

              <div className="max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-6">
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ffff] via-[#ff0080] to-[#8000ff]" style={{
                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
                  }}></div>

                  {/* Experience items */}
                  {[
                    {
                      year: "May 2025 - Present",
                      title: "Software Engineer",
                      company: "Banyan Labs",
                      description: "Built an AI voice assistant for client workflows—hands-on coding while guiding a small cross-functional team from prototype to pilot. Implemented RAG to use the client's own knowledge, with simple intent routing and short-term memory. Shipped the assistant as a Next.js + React app with a Supabase vector database.",
                      technologies: ["Next.js", "React", "RAG", "Supabase", "AI Voice Assistant"],
                      side: "right"
                    },
                    {
                      year: "Aug 2025 - Present",
                      title: "Teaching Team Assistant - Applied AI Solutions Engineering",
                      company: "Justice Through Code",
                      description: "Mentor 12+ mid-career professionals transitioning into AI engineering roles through intensive 40-week program focused on Python, machine learning, and production-grade system development. Deliver 9+ hours weekly of live technical instruction support across virtual classrooms, maintaining high engagement during evening sessions while managing complex breakout room collaborations. Build 1:1 mentorship framework through weekly technical check-ins, identifying learning blockers early and creating personalized development pathways for each Fellow.",
                      technologies: ["Python", "Machine Learning", "AI Engineering", "Technical Mentorship", "Curriculum Development"],
                      side: "left"
                    },
                    {
                      year: "Sep 2024 - Mar 2025",
                      title: "Front End Developer Intern",
                      company: "UpUnikSelf",
                      description: "Improved user engagement by 30% through responsive design optimizations for mobile and desktop platforms using React and Tailwind CSS. Collaborated with a team of 15 developers to build scalable React components, achieving a 95% approval rate from senior developers and stakeholders.",
                      technologies: ["React", "Tailwind CSS", "React Hooks", "Responsive Design"],
                      side: "right"
                    },
                    {
                      year: "Sep 2024 - Jun 2025",
                      title: "Justice Through Code, Columbia University",
                      company: "Software Engineering",
                      description: "Advanced coursework in full stack development, data science fundamentals, and cutting-edge AI technologies. Specialized training in Artificial Intelligence (AI), Machine Learning Operations (MLOps), and serverless computing. Applied machine learning techniques to real-world challenges including housing risk prediction.",
                      technologies: ["AI/ML", "MLOps", "Serverless", "Full Stack", "Data Science"],
                      side: "left"
                    },
                    {
                      year: "Jul 2023 - May 2024",
                      title: "Persevere",
                      company: "Full Stack Software Development",
                      description: "Completed comprehensive training in full stack development with hands-on projects like Fyre Tunes and BlueZack. Gained expertise in API integration, responsive web design, and agile development practices.",
                      technologies: ["MERN Stack", "API Integration", "Agile", "Full Stack"],
                      side: "right"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className={`relative mb-12 md:mb-16 ${
                        item.side === "left" ? "md:text-right" : "md:text-left"
                      }`}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-8 md:left-1/2 top-8 w-4 h-4 bg-gradient-to-r from-[#00ffff] to-[#8000ff] rounded-full -translate-x-1/2 z-10"
                        style={{
                          boxShadow: "0 0 15px rgba(0, 255, 255, 0.6)"
                        }}
                        whileHover={{ scale: 1.5 }}
                      />

                      {/* Content */}
                      <div
                        className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] lg:w-[calc(50%-2.5rem)] xl:w-[calc(50%-3rem)] ${
                          item.side === "left"
                            ? "md:pr-12 lg:pr-16 xl:pr-20 md:mr-auto"
                            : "md:pl-12 lg:pl-16 xl:pl-20 md:ml-auto"
                        }`}
                      >
                        <motion.div
                          className="bg-gradient-to-b from-[#0f0f3a]/40 to-[#2a0e38]/40 p-6 rounded-xl border border-[#00ffff]/30 backdrop-blur-sm"
                          style={{
                            boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)"
                          }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex flex-col mb-3">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-1">
                              <h3 className="text-xl font-bold text-[#00ffff]" style={{
                                textShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
                              }}>
                                {item.title}
                              </h3>
                              <span className="text-sm text-[#ff0080] font-medium md:ml-4 md:whitespace-nowrap md:mt-1" style={{
                                textShadow: "0 0 5px rgba(255, 0, 128, 0.3)"
                              }}>
                                {item.year}
                              </span>
                            </div>
                          </div>
                          
                          <h4 className="text-lg text-[#8000ff] font-semibold mb-3" style={{
                            textShadow: "0 0 8px rgba(128, 0, 255, 0.3)"
                          }}>
                            {item.company}
                          </h4>
                          
                          <p className="text-[#e0e0ff]/80 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 text-sm bg-[#0a0118]/50 border border-white/10 rounded-full text-[#e0e0ff]/90"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                  </div>
                    </motion.div>
                  ))}
                </div>

                {/* Download Resume Button */}
                <div className="flex justify-center mt-12">
                  <motion.a
                    href="/SarahEatherlyResumeAI.pdf"
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#00ffff] to-[#ff0080] hover:opacity-90 text-black border-0 font-bold"
                      style={{
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.4), 0 0 30px rgba(255, 0, 128, 0.3)"
                      }}
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Resume
                    </Button>
                  </motion.a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <ContactForm />
            </div>
          </section>
        </main>

        <footer className="border-t border-[#8a2be2]/20 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <motion.div 
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="flex items-center justify-center mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-[#00ffff]" />
                </motion.div>
                <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#ff0080] leading-none">
                  Sarah Eatherly
                </span>
              </motion.div>

              <p className="text-[#e0e0ff]/60 text-base sm:text-lg">
                AI/ML Specialist & Full-Stack Developer
              </p>

              <div className="text-xs sm:text-sm text-[#e0e0ff]/50 max-w-md text-center">
                © {new Date().getFullYear()} Sarah Eatherly. Crafted with ❤️ and cosmic energy.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function ColorfulSaturn({ position, scale: planetScale = 1 }: { position: [number, number, number], scale?: number }) {
  const planetRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Mesh>(null)
  const responsiveScale = useResponsiveScale(1, 0.6, 0.8)
  const finalScale = responsiveScale * planetScale

  // Create a canvas for the planet texture
  const createPlanetTexture = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Create a gradient matching navbar name colors
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#00ffff") // Cyan (matches navbar start)
    gradient.addColorStop(0.5, "#ff0080") // Hot pink (matches navbar middle)
    gradient.addColorStop(1, "#8000ff") // Electric purple (matches navbar end)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add cyberpunk stripes to make rotation visible
    ctx.strokeStyle = "#00ff41" // Neon green
    ctx.lineWidth = 8
    for (let i = 0; i < 25; i++) {
      const y = i * 20
      ctx.beginPath()
      ctx.moveTo(0, y)
      // Create electric wavy lines
      for (let x = 0; x < canvas.width; x += 15) {
        const height = Math.sin(x * 0.02 + i * 0.8) * 15
        ctx.lineTo(x, y + height)
      }
      ctx.stroke()
    }

    // Add cyberpunk spots/energy cores
    for (let i = 0; i < 35; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 15 + 8

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      // Use navbar name colors only
      const navbarColors = ["#00ffff", "#ff0080", "#8000ff"]
      ctx.fillStyle = navbarColors[i % navbarColors.length]
      ctx.fill()
      
      // Add glow effect
      ctx.beginPath()
      ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = navbarColors[i % navbarColors.length] + "40" // 25% opacity
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

    // Create rings gradient matching navbar name colors
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop(0, "#00ffff") // Cyan (navbar start)
    gradient.addColorStop(0.33, "#ff0080") // Hot pink (navbar middle)
    gradient.addColorStop(0.66, "#8000ff") // Electric purple (navbar end)
    gradient.addColorStop(1, "#00ffff") // Back to cyan for continuity
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add cyberpunk texture/gaps to the rings
    for (let i = 0; i < canvas.width; i += 15) {
      const width = Math.random() * 8 + 3
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(i, 0, width, canvas.height)
    }

    // Add cyberpunk sparkles/energy particles
    for (let i = 0; i < 250; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 3 + 1

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      // Navbar sparkle colors
      const sparkleColors = ["#00ffff", "#ff0080", "#8000ff"]
      ctx.fillStyle = sparkleColors[i % sparkleColors.length]
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.003 // Much slower, smoother rotation
      planetRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.002 // Slower ring rotation
      ringsRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group position={position} scale={finalScale}>
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

function CyberpunkJupiter({ position, scale: planetScale = 1 }: { position: [number, number, number], scale?: number }) {
  const planetRef = useRef<THREE.Mesh>(null)
  const responsiveScale = useResponsiveScale(1, 0.6, 0.8)
  const finalScale = responsiveScale * planetScale

  // Create Jupiter-style texture with bands
  const createJupiterTexture = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Create banded background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#ff0080") // Hot pink
    gradient.addColorStop(0.2, "#8000ff") // Electric purple
    gradient.addColorStop(0.4, "#00ffff") // Cyan
    gradient.addColorStop(0.6, "#ff0080") // Hot pink
    gradient.addColorStop(0.8, "#8000ff") // Electric purple
    gradient.addColorStop(1, "#00ffff") // Cyan
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add horizontal bands
    for (let i = 0; i < 30; i++) {
      const y = i * 17
      const bandColor = i % 3 === 0 ? "#00ff41" : i % 3 === 1 ? "#ffff00" : "#ffffff"
      ctx.strokeStyle = bandColor + "60" // 38% opacity
      ctx.lineWidth = 3 + Math.sin(i) * 2
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y + Math.sin(i * 0.5) * 10)
      ctx.stroke()
    }

    // Add the Great Red Spot (but make it cyan)
    ctx.beginPath()
    ctx.ellipse(canvas.width * 0.7, canvas.height * 0.4, 80, 40, 0, 0, Math.PI * 2)
    ctx.fillStyle = "#00ffff"
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(canvas.width * 0.7, canvas.height * 0.4, 100, 50, 0, 0, Math.PI * 2)
    ctx.fillStyle = "#00ffff40"
    ctx.fill()

    return new THREE.CanvasTexture(canvas)
  }

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.004 // Slightly faster than Saturn
      planetRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group position={position} scale={finalScale}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          map={createJupiterTexture()} 
          emissive="#ff0080" 
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  )
}

function CyberpunkEarth({ position, scale: planetScale = 1 }: { position: [number, number, number], scale?: number }) {
  const planetRef = useRef<THREE.Mesh>(null)
  const responsiveScale = useResponsiveScale(1, 0.6, 0.8)
  const finalScale = responsiveScale * planetScale

  // Create Earth-style texture with continents
  const createEarthTexture = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Ocean background
    const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2)
    gradient.addColorStop(0, "#00ffff") // Cyan ocean
    gradient.addColorStop(1, "#0080ff") // Blue ocean
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add continent-like shapes
    ctx.fillStyle = "#8000ff" // Purple continents
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = 50 + Math.random() * 100
      
      ctx.beginPath()
      ctx.ellipse(x, y, size, size * 0.7, Math.random() * Math.PI, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add glowing city lights
    ctx.fillStyle = "#ffff00"
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add atmosphere glow
    ctx.strokeStyle = "#00ff41"
    ctx.lineWidth = 8
    ctx.globalCompositeOperation = "screen"
    ctx.beginPath()
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 10, 0, Math.PI * 2)
    ctx.stroke()

    return new THREE.CanvasTexture(canvas)
  }

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005 // Earth rotation speed
      planetRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    }
  })

  return (
    <group position={position} scale={finalScale}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial 
          map={createEarthTexture()} 
          emissive="#00ffff" 
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  )
}

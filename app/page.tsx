"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Stars, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sparkles, Star, ChevronDown, Home, User, Code, Briefcase, Mail } from "lucide-react"
import SpaceNav from "./space-nav"
import PlanetSection from "./planet-section"
import FeatureCard from "./feature-card"
import ProjectCard from "./project-card"
import GalaxyBackground from "./galaxy-background"
import TextReveal, { GlitchText } from "./text-reveal"
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

export default function SpaceLanding() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

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
          <section id="home" className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
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

            <div className="container relative z-10 mx-auto text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1.2 }}
                className="space-y-8"
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

                    {/* Enhanced title with glitch effect */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="relative z-20"
                    >
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <motion.h1 
                          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 relative z-10"
                        >
                          {"Sarah Eatherly".split("").map((char, index) => (
                            <motion.span
                              key={index}
                              className="inline-block relative"
                              animate={{
                                y: [0, -20, 0],
                                rotateZ: [0, 5, -5, 0],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: index * 0.1,
                                ease: "easeInOut"
                              }}
                              whileHover={{
                                scale: 1.2,
                                rotateZ: 10,
                                transition: { duration: 0.2 }
                              }}
                            >
                              {/* Subtle glow outline */}
                              <motion.span
                                className="absolute inset-0"
                                style={{
                                  background: index < 5 ? 
                                    "radial-gradient(circle, rgba(128, 0, 255, 0.3) 30%, transparent 70%)" :
                                    "radial-gradient(circle, rgba(0, 255, 255, 0.3) 30%, transparent 70%)",
                                  filter: "blur(8px)",
                                  transform: "scale(1.2)",
                                }}
                                animate={{
                                  opacity: [0.4, 0.7, 0.4],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: index * 0.05,
                                }}
                              />
                              
                              {/* Main letter */}
                              <span
                                style={{
                                  background: index < 5 ? 
                                    "linear-gradient(45deg, #ffffff, #8000ff, #00ffff)" : 
                                    "linear-gradient(45deg, #ffffff, #00ffff, #8000ff)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                  WebkitTextStroke: "2px rgba(255, 255, 255, 0.8)",
                                  textShadow: index < 5 ?
                                    "0 0 30px rgba(128, 0, 255, 1), 0 0 60px rgba(255, 255, 255, 0.9), 2px 2px 0px rgba(0, 0, 0, 0.8), -2px -2px 0px rgba(0, 0, 0, 0.8)" :
                                    "0 0 30px rgba(0, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.9), 2px 2px 0px rgba(0, 0, 0, 0.8), -2px -2px 0px rgba(0, 0, 0, 0.8)",
                                  filter: index < 5 ?
                                    "drop-shadow(0 0 15px rgba(128, 0, 255, 0.9)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.7))" :
                                    "drop-shadow(0 0 15px rgba(0, 255, 255, 0.9)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.7))"
                                }}
                              >
                                {char === " " ? "\u00A0" : char}
                              </span>
                            </motion.span>
                          ))}
                        </motion.h1>

                        {/* Enhanced glitch effect overlay */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none z-20"
                          initial={{ opacity: 0 }}
                        >
                          {/* Cyan glitch layer */}
                          <motion.h1 
                            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-[#00ffff] absolute opacity-0"
                            style={{
                              textShadow: "0 0 10px rgba(0, 255, 255, 1)"
                            }}
                            animate={{
                              opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0.6, 0, 0],
                              x: [0, 3, -2, 0],
                              skewX: [0, 2, -1, 0]
                            }}
                            transition={{
                              duration: 0.2,
                              repeat: Infinity,
                              repeatDelay: 4,
                              ease: "linear",
                            }}
                            style={{
                              clipPath: "inset(40% 0 50% 0)",
                            }}
                          >
                            Sarah Eatherly
                          </motion.h1>

                          {/* Hot pink glitch layer */}
                          <motion.h1 
                            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-[#ff0080] absolute opacity-0"
                            style={{
                              textShadow: "0 0 10px rgba(255, 0, 128, 1)"
                            }}
                            animate={{
                              opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0.6, 0, 0],
                              x: [0, -3, 2, 0],
                              skewX: [0, -2, 1, 0]
                            }}
                            transition={{
                              duration: 0.2,
                              repeat: Infinity,
                              repeatDelay: 4,
                              ease: "linear",
                              delay: 0.05,
                            }}
                            style={{
                              clipPath: "inset(10% 0 80% 0)",
                            }}
                          >
                            Sarah Eatherly
                          </motion.h1>

                          {/* Purple glitch layer */}
                          <motion.h1 
                            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-[#8000ff] absolute opacity-0"
                            style={{
                              textShadow: "0 0 10px rgba(128, 0, 255, 1)"
                            }}
                            animate={{
                              opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0.4, 0, 0],
                              x: [0, 1, -3, 0],
                              skewX: [0, 1, -2, 0]
                            }}
                            transition={{
                              duration: 0.2,
                              repeat: Infinity,
                              repeatDelay: 4,
                              ease: "linear",
                              delay: 0.1,
                            }}
                            style={{
                              clipPath: "inset(70% 0 10% 0)",
                            }}
                          >
                            Sarah Eatherly
                          </motion.h1>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Job title */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="mb-4"
                    >
                      <motion.h2 
                        className="text-2xl md:text-4xl font-semibold mb-3"
                        style={{
                          background: "linear-gradient(45deg, #8000ff, #00ffff)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          textShadow: "0 0 20px rgba(128, 0, 255, 0.6)"
                        }}
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(128, 0, 255, 0.6)",
                            "0 0 30px rgba(0, 255, 255, 0.8)",
                            "0 0 20px rgba(128, 0, 255, 0.6)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Software Engineer
                      </motion.h2>
                      <motion.div 
                        className="flex flex-wrap justify-center gap-3 text-base md:text-lg lg:text-xl mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                      >
                        {[
                          { text: "React", color: "#00ffff" },
                          { text: "Next.js", color: "#8000ff" },
                          { text: "TypeScript", color: "#00ffff" },
                          { text: "Node.js", color: "#8000ff" },
                          { text: "Python", color: "#00ffff" }
                        ].map((tech, index) => (
                          <motion.span
                            key={tech.text}
                            style={{ color: tech.color }}
                            animate={{
                              opacity: [0.7, 1, 0.7],
                              textShadow: [
                                `0 0 5px ${tech.color}40`,
                                `0 0 15px ${tech.color}80`,
                                `0 0 5px ${tech.color}40`
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2
                            }}
                            whileHover={{ 
                              scale: 1.1,
                              textShadow: `0 0 20px ${tech.color}`
                            }}
                          >
                            {tech.text}
                            {index < 4 && <span className="text-[#e0e0ff]/40 ml-3">•</span>}
                          </motion.span>
                        ))}
                      </motion.div>
                      <motion.p
                        className="text-[#e0e0ff] text-xl md:text-2xl font-light italic"
                        style={{
                          textShadow: "0 0 20px rgba(224, 224, 255, 0.8), 0 0 40px rgba(0, 0, 0, 1)",
                          background: "radial-gradient(ellipse, rgba(0, 0, 0, 0.8) 20%, transparent 70%)",
                          padding: "8px 16px",
                          borderRadius: "12px"
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                      >
                        Crafting digital experiences beyond the ordinary
                      </motion.p>
                    </motion.div>

                    {/* Animated subtitle */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      <TextReveal
                        text="Crafting digital experiences that bridge the gap between imagination and reality"
                        className="text-xl md:text-2xl max-w-2xl mx-auto text-[#e0e0ff]/80"
                        delay={0.5}
                      />
                    </motion.div>

                    {/* Enhanced buttons with magnetic effect */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-6 justify-center pt-12"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#8a2be2] to-[#1e90ff] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <Button
                          className="relative bg-gradient-to-r from-[#00ffff] to-[#ff0080] hover:opacity-90 text-black border-0 h-14 px-10 text-lg font-semibold"
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
                        className="relative group"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#8000ff] to-[#00ffff] rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
                  <Button
                    variant="outline"
                          className="relative border-2 border-[#8000ff] text-[#8000ff] hover:bg-[#8000ff]/10 h-14 px-10 text-lg font-semibold backdrop-blur-sm"
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
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center space-y-2"
              >
                <span className="text-[#e0e0ff]/60 text-sm font-medium">Scroll to explore</span>
                <ChevronDown className="h-6 w-6 text-[#00ffff]" style={{
                  filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.5))"
                }} />
              </motion.div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="relative py-24 px-4 min-h-screen flex items-center">
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
                  Passionate developer with a love for creating innovative digital experiences
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* My Journey Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-b from-[#0f0f3a]/40 to-[#2a0e38]/40 p-8 rounded-xl border border-[#00ffff]/30 backdrop-blur-sm h-full" style={{
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)"
                  }}>
                    <h3 className="text-2xl font-bold text-[#00ffff] mb-4" style={{
                      textShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
                    }}>My Journey</h3>
                    <p className="text-[#e0e0ff]/80 leading-relaxed mb-4">
                      I'm a full-stack developer with over 5 years of experience crafting digital solutions that make a difference. 
                      My passion lies in transforming complex problems into elegant, user-friendly applications.
                    </p>
                    <p className="text-[#e0e0ff]/80 leading-relaxed">
                      When I'm not coding, you'll find me exploring the latest tech trends, contributing to open-source projects, 
                      or stargazing—which inspired this cosmic portfolio design!
                    </p>
                  </div>
                </motion.div>

                {/* Creative Vision Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-b from-[#0f0f3a]/40 to-[#2a0e38]/40 p-8 rounded-xl border border-[#ff0080]/30 backdrop-blur-sm relative overflow-hidden h-full" style={{
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
                          "Code is poetry written in logic, design is art painted with purpose."
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
          <section id="projects" className="relative py-24 px-4">
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <ProjectCard
                  title="E-Commerce Platform"
                  description="A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built with modern technologies for optimal performance and user experience."
                  image="/placeholder.jpg"
                  technologies={["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind"]}
                  category="fullstack"
                  liveUrl="https://example.com"
                  githubUrl="https://github.com"
                  featured={true}
                />
                
                <div className="space-y-8">
                  <ProjectCard
                    title="Task Management App"
                    description="A collaborative task management tool with real-time updates, team workspaces, and advanced filtering capabilities."
                    image="/placeholder.jpg"
                    technologies={["React", "Node.js", "Socket.io", "MongoDB"]}
                    category="fullstack"
                    liveUrl="https://example.com"
                    githubUrl="https://github.com"
                  />
                  
                  <ProjectCard
                    title="Portfolio Website"
                    description="A responsive portfolio website with stunning animations, 3D elements, and optimized performance."
                    image="/placeholder.jpg"
                    technologies={["Next.js", "Framer Motion", "Three.js", "Tailwind"]}
                    category="frontend"
                    liveUrl="https://example.com"
                    githubUrl="https://github.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="Weather Dashboard"
                  description="Real-time weather application with location-based forecasts and interactive maps."
                  image="/placeholder.jpg"
                  technologies={["React", "Weather API", "Chart.js"]}
                  category="frontend"
                  liveUrl="https://example.com"
                  githubUrl="https://github.com"
                />
                
                <ProjectCard
                  title="Mobile Fitness App"
                  description="Cross-platform fitness tracking app with workout plans and progress analytics."
                  image="/placeholder.jpg"
                  technologies={["React Native", "Firebase", "Redux"]}
                  category="mobile"
                  liveUrl="https://example.com"
                  githubUrl="https://github.com"
                />
                
                <ProjectCard
                  title="Brand Identity System"
                  description="Complete brand identity design including logo, color palette, and design guidelines."
                  image="/placeholder.jpg"
                  technologies={["Figma", "Adobe Creative Suite", "Branding"]}
                  category="design"
                  liveUrl="https://example.com"
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
          <section id="experience" className="relative py-24 px-4">
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
                  My professional journey through the world of technology and development
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 md:left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ffff] via-[#ff0080] to-[#8000ff]" style={{
                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
                  }}></div>

                  {/* Experience items */}
                  {[
                    {
                      year: "2023 - Present",
                      title: "Senior Full-Stack Developer",
                      company: "Tech Innovations Inc.",
                      description: "Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring junior developers and architecting cloud solutions.",
                      technologies: ["React", "Next.js", "TypeScript", "AWS", "Docker"],
                      side: "right"
                    },
                    {
                      year: "2021 - 2023",
                      title: "Frontend Developer",
                      company: "Digital Solutions Co.",
                      description: "Developed responsive web applications and improved user experience across multiple products. Collaborated with design teams to implement pixel-perfect interfaces.",
                      technologies: ["React", "Vue.js", "JavaScript", "SASS", "Figma"],
                      side: "left"
                    },
                    {
                      year: "2019 - 2021",
                      title: "Junior Web Developer",
                      company: "StartUp Labs",
                      description: "Built and maintained websites for various clients. Gained experience in full-stack development and agile methodologies.",
                      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                      side: "right"
                    },
                    {
                      year: "2018 - 2019",
                      title: "Computer Science Degree",
                      company: "University of Technology",
                      description: "Graduated with honors, specializing in software engineering and web technologies. Completed multiple projects in various programming languages.",
                      technologies: ["Python", "Java", "C++", "Algorithms", "Data Structures"],
                      side: "left"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className={`relative mb-12 ${
                        item.side === "left" ? "md:text-right" : ""
                      }`}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className={`absolute left-8 md:left-1/3 w-4 h-4 bg-gradient-to-r from-[#00ffff] to-[#8000ff] rounded-full transform -translate-x-1/2 z-10 ${
                          item.side === "left" ? "md:-translate-y-6" : "md:translate-y-6"
                        }`}
                        style={{
                          boxShadow: "0 0 15px rgba(0, 255, 255, 0.6)"
                        }}
                        whileHover={{ scale: 1.5 }}
                      />

                      {/* Content */}
                      <div className={`ml-16 md:ml-0 ${
                        item.side === "left" ? "md:mr-2/3 md:pr-8" : "md:ml-1/3 md:pl-8"
                      }`}>
                        <motion.div
                          className="bg-gradient-to-b from-[#0f0f3a]/40 to-[#2a0e38]/40 p-6 rounded-xl border border-[#00ffff]/30 backdrop-blur-sm"
                          style={{
                            boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)"
                          }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <h3 className="text-xl font-bold text-[#00ffff] mb-1 md:mb-0" style={{
                              textShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
                            }}>
                              {item.title}
                            </h3>
                            <span className="text-sm text-[#ff0080] font-medium" style={{
                              textShadow: "0 0 5px rgba(255, 0, 128, 0.3)"
                            }}>
                              {item.year}
                            </span>
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
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="relative py-24 px-4">
            <div className="container mx-auto">
              <ContactForm />
            </div>
          </section>
        </main>

        <footer className="border-t border-[#8a2be2]/20 py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div 
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="flex items-center justify-center mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-8 w-8 text-[#00ffff]" />
                </motion.div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#ff0080] leading-none">
                  Sarah Eatherly
                </span>
              </motion.div>

              <p className="text-[#e0e0ff]/60 text-lg">
                Software Engineer & Creative Problem Solver
              </p>

              <div className="text-sm text-[#e0e0ff]/50">
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


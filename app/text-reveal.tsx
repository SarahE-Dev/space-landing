"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50 + Math.random() * 50)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  const words = text.split(" ")
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "8px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Main text - crystal clear with minimal glow */}
      <motion.span 
        className="relative z-10 block"
        animate={{
          textShadow: [
            "0 0 5px rgba(0, 255, 255, 0.3), 0 0 10px rgba(255, 0, 128, 0.2), 0 0 15px rgba(128, 0, 255, 0.1)",
            "0 0 8px rgba(0, 255, 255, 0.4), 0 0 12px rgba(255, 0, 128, 0.3), 0 0 18px rgba(128, 0, 255, 0.2)",
            "0 0 5px rgba(0, 255, 255, 0.3), 0 0 10px rgba(255, 0, 128, 0.2), 0 0 15px rgba(128, 0, 255, 0.1)"
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          filter: "none",
          WebkitFontSmoothing: "antialiased",
          textRendering: "optimizeLegibility",
        }}
      >
        {text}
      </motion.span>
      
      {/* Subtle glitch effect - very occasional */}
      <motion.span
        className="absolute inset-0 text-[#00ffff] opacity-0 pointer-events-none"
        animate={{
          opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0],
        }}
        transition={{
          duration: 0.05,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "linear",
        }}
        style={{ 
          clipPath: "inset(40% 0 50% 0)",
          transform: "translateX(1px)"
        }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-[#ff0080] opacity-0 pointer-events-none"
        animate={{
          opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0],
        }}
        transition={{
          duration: 0.05,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "linear",
          delay: 0.03,
        }}
        style={{ 
          clipPath: "inset(10% 0 80% 0)",
          transform: "translateX(-1px)"
        }}
      >
        {text}
      </motion.span>

      {/* Electric purple glitch layer */}
      <motion.span
        className="absolute inset-0 text-[#8000ff] opacity-0 pointer-events-none"
        animate={{
          opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.15, 0],
        }}
        transition={{
          duration: 0.05,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "linear",
          delay: 0.06,
        }}
        style={{ 
          clipPath: "inset(60% 0 20% 0)",
          transform: "translateX(0.5px)"
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Menu, X, User, Briefcase, Code, Mail, Home, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Code },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
]

export default function SpaceNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isMounted])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Glass morphism navigation */}
      <motion.header
        className={`fixed top-2 sm:top-4 left-2 right-2 sm:left-4 sm:right-4 z-50 transition-all duration-500 ${
          isScrolled 
            ? "max-w-6xl mx-auto" 
            : "max-w-7xl mx-auto"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={`relative backdrop-blur-xl bg-[#0a0118]/30 border border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-4 shadow-2xl transition-all duration-500 ${
          isScrolled ? "shadow-[#ff69b4]/20 bg-[#0a0118]/50" : ""
        }`}>
          {/* Enhanced animated gradient border */}
          <motion.div 
            className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#00ffff]/20 via-[#ff0080]/20 to-[#8000ff]/20 opacity-60 blur-sm"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="relative flex items-center justify-between">
            {/* Logo with enhanced animation */}
            <motion.div
              className="flex items-center cursor-pointer"
              onClick={() => scrollToSection("#home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="flex items-center justify-center mr-2 sm:mr-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-[#00ffff] drop-shadow-lg" />
              </motion.div>
              <span className="font-heading text-base sm:text-lg lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#ff0080] to-[#8000ff] leading-none">
                <span className="hidden sm:inline">Sarah Eatherly</span>
                <span className="sm:hidden">SE</span>
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 2xl:space-x-4">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === item.href.slice(1)
                
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative flex items-center space-x-1 xl:space-x-2 px-2 xl:px-4 py-2 rounded-xl transition-all duration-300 text-xs xl:text-sm ${
                      isActive 
                        ? "text-white" 
                        : "text-[#e0e0ff]/70 hover:text-white"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/20 to-[#ff0080]/20 rounded-xl border border-white/10"
                        layoutId="activeNav"
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                      />
                    )}
                    <Icon className="h-4 w-4" />
                    <span className="font-heading font-medium">{item.name}</span>
                  </motion.button>
                )
              })}
            </nav>

            {/* Social Icons & CTA */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              {/* Social Icons */}
              <div className="flex items-center space-x-2">
        <motion.a
          href="https://github.com/SarahE-Dev"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Github className="h-5 w-5 text-[#e0e0ff]/70 hover:text-[#ff69b4] transition-colors" />
        </motion.a>

        <motion.a
          href="https://linkedin.com/in/saraheatherlydev"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Linkedin className="h-5 w-5 text-[#e0e0ff]/70 hover:text-[#00ffff] transition-colors" />
        </motion.a>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff] to-[#ff0080] rounded-xl blur opacity-30 group-hover:opacity-80 transition duration-300"></div>
                  <Button 
                    className="relative bg-gradient-to-r from-[#00ffff] to-[#ff0080] hover:opacity-90 text-black border-0 px-6 py-2 font-semibold"
                    onClick={() => scrollToSection("#contact")}
                    style={{
                      boxShadow: "0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(255, 0, 128, 0.2)"
                    }}
                  >
                    Let's Connect
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Mobile CTA & Social - improved layout */}
            <div className="hidden md:flex lg:hidden items-center space-x-2">
              <motion.a
                href="https://github.com/SarahE-Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5 text-[#e0e0ff]/70 hover:text-[#ff69b4] transition-colors" />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/saraheatherlydev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-[#e0e0ff]/70 hover:text-[#00ffff] transition-colors" />
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <motion.button 
              className="lg:hidden text-white p-1.5 sm:p-2 rounded-xl hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0a0118]/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu content - improved mobile design */}
            <motion.div
              className="absolute top-16 sm:top-20 left-0 right-0 mx-2 sm:mx-4 bg-[#0a0118]/95 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl"
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              style={{
                boxShadow: "0 0 40px rgba(0, 255, 255, 0.1), 0 0 80px rgba(255, 0, 128, 0.1)"
              }}
            >
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#00ffff]/10 via-[#ff0080]/10 to-[#8000ff]/10 opacity-50 blur-sm" />
              
              <div className="relative space-y-3 sm:space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.slice(1)
                  
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "bg-gradient-to-r from-[#00ffff]/20 via-[#ff0080]/20 to-[#8000ff]/20 text-white border border-white/20 shadow-lg" 
                          : "text-[#e0e0ff]/70 hover:text-white hover:bg-white/10 border border-transparent"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      style={isActive ? {
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)"
                      } : {}}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-heading font-medium text-base sm:text-lg">{item.name}</span>
                    </motion.button>
                  )
                })}
                
                <motion.div
                  className="pt-3 sm:pt-4 border-t border-white/10 space-y-3 sm:space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Social Icons with better spacing */}
                  <div className="flex justify-center space-x-3 sm:space-x-4">
                    <motion.a
                      href="https://github.com/SarahE-Dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        boxShadow: "0 0 10px rgba(255, 0, 128, 0.2)"
                      }}
                    >
                      <Github className="h-4 w-4 sm:h-6 sm:w-6 text-[#e0e0ff]/70 hover:text-[#ff69b4] transition-colors" />
                    </motion.a>
                    
                    <motion.a
                      href="https://linkedin.com/in/saraheatherlydev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)"
                      }}
                    >
                      <Linkedin className="h-4 w-4 sm:h-6 sm:w-6 text-[#e0e0ff]/70 hover:text-[#00ffff] transition-colors" />
                    </motion.a>
                  </div>

                  {/* Enhanced CTA button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-[#00ffff] to-[#ff0080] hover:opacity-90 text-black border-0 py-2.5 sm:py-3 font-semibold text-sm sm:text-base transition-all duration-300"
                      onClick={() => scrollToSection("#contact")}
                      style={{
                        boxShadow: "0 0 25px rgba(0, 255, 255, 0.3), 0 0 50px rgba(255, 0, 128, 0.2)"
                      }}
                    >
                      Let's Connect
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

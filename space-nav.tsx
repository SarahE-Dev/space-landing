"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SpaceNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0a0118]/80 backdrop-blur-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Sparkles className="h-6 w-6 text-[#ff69b4] mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff69b4] to-[#1e90ff]">
              CosmicUI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-[#e0e0ff]/80 hover:text-[#ff69b4] transition-colors">
              Features
            </Link>
            <Link href="#" className="text-[#e0e0ff]/80 hover:text-[#ff69b4] transition-colors">
              Showcase
            </Link>
            <Link href="#" className="text-[#e0e0ff]/80 hover:text-[#ff69b4] transition-colors">
              Pricing
            </Link>
            <Link href="#" className="text-[#e0e0ff]/80 hover:text-[#ff69b4] transition-colors">
              Contact
            </Link>
            <Button className="bg-gradient-to-r from-[#8a2be2] to-[#1e90ff] hover:opacity-90 text-white border-0">
              Get Started
            </Button>
          </nav>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0a0118]/95 backdrop-blur-lg"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link
              href="#"
              className="text-[#e0e0ff]/80 hover:text-[#ff69b4] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-[#e0e0ff]/80 hover:text-[#ff69b4] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Showcase
            </Link>
            <Link
              href="#"
              className="text-[#e0e0ff]/80 hover:text-[#ff69b4] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-[#e0e0ff]/80 hover:text-[#ff69b4] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button
              className="bg-gradient-to-r from-[#8a2be2] to-[#1e90ff] hover:opacity-90 text-white border-0 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}


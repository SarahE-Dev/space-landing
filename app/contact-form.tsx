"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      })
      return
    }

    setStatus({ type: 'loading', message: 'Sending message...' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      })
    }
  }

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
      borderColor: "#00ffff",
    },
    blur: {
      scale: 1,
      boxShadow: "0 0 0px rgba(0, 255, 255, 0)",
      borderColor: "rgba(255, 255, 255, 0.2)",
    }
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="inline-block mb-4"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Mail className="h-12 w-12 text-[#00ffff] mx-auto" />
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#ff0080] to-[#8000ff]">
          Let's Connect
        </h2>
        
        <p className="text-xl text-[#e0e0ff]/70">
          Ready to bring your ideas to life? Drop me a message!
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <motion.div
            className="relative"
            variants={inputVariants}
            animate={focusedField === 'name' ? 'focus' : 'blur'}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-[#e0e0ff]/70 mb-2">
              Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#00ffff] z-10" style={{ filter: "none" }} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#e0e0ff]/50 focus:outline-none focus:border-[#00ffff] transition-all duration-300 backdrop-blur-sm"
                placeholder="Your full name"
              />
            </div>
          </motion.div>

          {/* Email Field */}
          <motion.div
            className="relative"
            variants={inputVariants}
            animate={focusedField === 'email' ? 'focus' : 'blur'}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-[#e0e0ff]/70 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#ff0080] z-10" style={{ filter: "none" }} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#e0e0ff]/50 focus:outline-none focus:border-[#00ffff] transition-all duration-300 backdrop-blur-sm"
                placeholder="your.email@example.com"
              />
            </div>
          </motion.div>
        </div>

        {/* Subject Field */}
        <motion.div
          className="relative"
          variants={inputVariants}
          animate={focusedField === 'subject' ? 'focus' : 'blur'}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="subject" className="block text-sm font-medium text-[#e0e0ff]/70 mb-2">
            Subject
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8000ff] z-10" style={{ filter: "none" }} />
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#e0e0ff]/50 focus:outline-none focus:border-[#00ffff] transition-all duration-300 backdrop-blur-sm"
              placeholder="What would you like to discuss?"
            />
          </div>
        </motion.div>

        {/* Message Field */}
        <motion.div
          className="relative"
          variants={inputVariants}
          animate={focusedField === 'message' ? 'focus' : 'blur'}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-[#e0e0ff]/70 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            required
            rows={6}
            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#e0e0ff]/50 focus:outline-none focus:border-[#00ffff] transition-all duration-300 backdrop-blur-sm resize-none"
            placeholder="Tell me about your project, ideas, or just say hello!"
          />
        </motion.div>

        {/* Status Message */}
        <AnimatePresence>
          {status.type !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-center space-x-3 p-4 rounded-xl ${
                status.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                  : status.type === 'error'
                  ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                  : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
              }`}
            >
              {status.type === 'loading' && <Loader className="h-5 w-5 animate-spin" />}
              {status.type === 'success' && <CheckCircle className="h-5 w-5" />}
              {status.type === 'error' && <AlertCircle className="h-5 w-5" />}
              <span>{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            type="submit"
            disabled={status.type === 'loading'}
            className="relative group px-8 py-4 bg-gradient-to-r from-[#00ffff] to-[#ff0080] text-black font-bold rounded-xl shadow-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.4), 0 0 50px rgba(255, 0, 128, 0.3)"
            }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ff0080] to-[#00ffff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
            
            {/* Button Content */}
            <div className="relative flex items-center space-x-2">
              {status.type === 'loading' ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <span>Send Message</span>
                </>
              )}
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 rounded-xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255, 105, 180, 0.3)",
                  "0 0 40px rgba(30, 144, 255, 0.3)",
                  "0 0 20px rgba(255, 105, 180, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Button>
        </motion.div>
      </motion.form>

      {/* Alternative Contact Methods */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-[#e0e0ff]/60 mb-6">Or reach out directly:</p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <motion.a
            href="mailto:sarah@saraheatherly.dev"
            className="flex items-center space-x-2 text-[#e0e0ff]/70 hover:text-[#ff69b4] transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-5 w-5" />
            <span>sarah@saraheatherly.dev</span>
          </motion.a>
          
          <motion.a
            href="https://linkedin.com/in/saraheatherlydev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-[#e0e0ff]/70 hover:text-[#1e90ff] transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

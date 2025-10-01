"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Code, Palette, Server, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: "frontend" | "fullstack" | "mobile" | "design"
  featured?: boolean
}

const categoryIcons = {
  frontend: Code,
  fullstack: Server,
  mobile: Smartphone,
  design: Palette,
}

const categoryColors = {
  frontend: "#ff69b4",
  fullstack: "#8a2be2", 
  mobile: "#1e90ff",
  design: "#ff1493",
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies, 
  liveUrl, 
  githubUrl, 
  category,
  featured = false 
}: ProjectCardProps) {
  const Icon = categoryIcons[category]
  const color = categoryColors[category]

  return (
    <motion.div
      className={`group relative bg-gradient-to-b from-[#0f0f3a]/40 to-[#2a0e38]/40 rounded-2xl border border-[#8a2be2]/30 backdrop-blur-sm overflow-hidden ${
        featured ? "lg:col-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#ff69b4]/20 via-[#8a2be2]/20 to-[#1e90ff]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
      
      <div className="relative">
        {/* Project Image */}
        <div className={`relative ${featured ? 'h-80 md:h-96 lg:h-[32rem]' : 'h-48 md:h-56'} overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#8a2be2]/20 to-[#1e90ff]/20`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118]/80 to-transparent z-10" />
          
          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4 z-20 flex items-center space-x-2 px-3 py-1 rounded-full backdrop-blur-md border border-white/20"
            style={{ backgroundColor: `${color}20` }}
            whileHover={{ scale: 1.05 }}
          >
            <Icon className="h-4 w-4" style={{ color }} />
            <span className="text-sm font-medium text-white capitalize">{category}</span>
          </motion.div>

          {/* Featured Badge */}
          {featured && (
            <motion.div
              className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff69b4] to-[#ff1493] text-white text-sm font-bold"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(255, 105, 180, 0.4)",
                  "0 0 0 10px rgba(255, 105, 180, 0)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Featured
            </motion.div>
          )}

          {/* Project Image */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            style={featured ? { objectPosition: 'center 30%' } : {}}
          />
        </div>

        {/* Project Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#ff69b4] transition-colors">
              {title}
            </h3>
            <p className="text-[#e0e0ff]/80 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-sm bg-[#0a0118]/50 border border-white/10 rounded-full text-[#e0e0ff]/90"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: `${color}20` }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {liveUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#00ffff] to-[#ff0080] hover:opacity-90 text-black border-0"
                  onClick={() => window.open(liveUrl, '_blank')}
                  style={{
                    boxShadow: "0 0 15px rgba(0, 255, 255, 0.3), 0 0 25px rgba(255, 0, 128, 0.2)"
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
              </motion.div>
            )}
            
            {githubUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#8000ff] text-[#8000ff] hover:bg-[#8000ff]/10"
                  onClick={() => window.open(githubUrl, '_blank')}
                  style={{
                    textShadow: "0 0 8px rgba(128, 0, 255, 0.3)",
                    boxShadow: "0 0 15px rgba(128, 0, 255, 0.2)"
                  }}
                >
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

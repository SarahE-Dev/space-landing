"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Code, Database, Globe, Smartphone, Server, Zap, Cpu, Cloud, Terminal, Layers } from "lucide-react"

interface Skill {
  name: string
  level: number
  icon: any
  category: string
  color: string
}

const skills: Skill[] = [
  // Frontend
  { name: "React/Next.js", level: 95, icon: Globe, category: "Frontend", color: "#00ffff" },
  { name: "TypeScript", level: 90, icon: Code, category: "Frontend", color: "#ff0080" },
  { name: "JavaScript", level: 95, icon: Code, category: "Frontend", color: "#00ff41" },
  { name: "HTML/CSS", level: 92, icon: Globe, category: "Frontend", color: "#8000ff" },
  { name: "Tailwind CSS", level: 88, icon: Layers, category: "Frontend", color: "#00ffff" },
  
  // Backend
  { name: "Node.js", level: 85, icon: Server, category: "Backend", color: "#00ff41" },
  { name: "Python", level: 80, icon: Terminal, category: "Backend", color: "#ff0080" },
  { name: "Express.js", level: 83, icon: Server, category: "Backend", color: "#00ffff" },
  { name: "REST APIs", level: 87, icon: Zap, category: "Backend", color: "#ff4000" },
  
  // Database
  { name: "MongoDB", level: 82, icon: Database, category: "Database", color: "#00ff41" },
  { name: "PostgreSQL", level: 78, icon: Database, category: "Database", color: "#8000ff" },
  { name: "Firebase", level: 85, icon: Database, category: "Database", color: "#ffff00" },
  
  // Tools & Cloud
  { name: "AWS", level: 75, icon: Cloud, category: "Cloud", color: "#ff4000" },
  { name: "Docker", level: 70, icon: Cpu, category: "DevOps", color: "#00ffff" },
  { name: "Git/GitHub", level: 90, icon: Terminal, category: "Tools", color: "#ff0080" },
  { name: "VS Code", level: 95, icon: Code, category: "Tools", color: "#8000ff" },
]

const categories = ["Frontend", "Backend", "Database", "Cloud", "DevOps", "Tools"]

export function AnimatedSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  return (
    <section id="skills" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118]" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          // Use deterministic positioning based on index
          const left = (i * 17 + 23) % 100; // Deterministic but varied positioning
          const top = (i * 23 + 17) % 100;
          const duration = 3 + (i % 3);
          const delay = (i % 4) * 0.5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#00ffff] to-[#ff0080] rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          )
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap className="h-12 w-12 text-[#00ffff] mx-auto" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] via-[#ff0080] to-[#8000ff]">
            Technical Arsenal
          </h2>
          
          <p className="text-xl text-[#e0e0ff]/70 max-w-2xl mx-auto">
            Crafting digital experiences with cutting-edge technologies and creative problem-solving
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {["All", ...categories].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#00ffff] to-[#ff0080] text-black shadow-lg shadow-[#00ffff]/25"
                  : "bg-white/10 text-[#e0e0ff]/70 hover:bg-white/20 hover:text-white"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={selectedCategory === category ? {
                boxShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.3)",
                  "0 0 30px rgba(0, 255, 255, 0.5)",
                  "0 0 20px rgba(0, 255, 255, 0.3)",
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          {filteredSkills.map((skill, index) => {
            const IconComponent = skill.icon
            
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="group relative"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Skill Card */}
                <motion.div
                  className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 overflow-hidden"
                  whileHover={{
                    y: -10,
                    rotateY: 5,
                    rotateX: 5,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                    }}
                  />

                  {/* Glowing Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}40, transparent, ${skill.color}40)`,
                      padding: "1px",
                    }}
                    animate={hoveredSkill === skill.name ? {
                      rotate: [0, 360],
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl" />
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="flex justify-center mb-4"
                    animate={hoveredSkill === skill.name ? {
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    } : {}}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      className="p-3 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                      }}
                      animate={{
                        boxShadow: hoveredSkill === skill.name 
                          ? [`0 0 20px ${skill.color}40`, `0 0 40px ${skill.color}60`, `0 0 20px ${skill.color}40`]
                          : `0 0 0px ${skill.color}00`,
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <IconComponent 
                        className="h-8 w-8"
                        style={{ color: skill.color }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Skill Name */}
                  <h3 className="text-white font-bold text-lg mb-4 text-center group-hover:text-[#00ffff] transition-colors">
                    {skill.name}
                  </h3>

                  {/* Skill Level Indicator */}
                  <div className="flex justify-center mt-4">
                    <motion.div
                      className="flex space-x-1"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: skill.color,
                            boxShadow: `0 0 8px ${skill.color}60`,
                          }}
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{
                            delay: index * 0.1 + 0.7 + i * 0.1,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.2 }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Category Tag */}
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: `${skill.color}20`,
                      color: skill.color,
                      border: `1px solid ${skill.color}40`,
                    }}
                    animate={hoveredSkill === skill.name ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {skill.category}
                  </motion.div>

                  {/* Floating Particles on Hover */}
                  {hoveredSkill === skill.name && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{ 
                            backgroundColor: skill.color,
                            left: `${20 + i * 10}%`,
                            top: `${30 + (i % 2) * 20}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [0, -20, -40],
                            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.p
            className="text-lg text-[#e0e0ff]/60 mb-6"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            Ready to bring your ideas to life with these technologies?
          </motion.p>
          
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-[#00ffff] to-[#ff0080] text-black font-bold rounded-full shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 20px 40px rgba(0, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 255, 255, 0.3)",
                "0 0 30px rgba(255, 0, 128, 0.3)",
                "0 0 20px rgba(0, 255, 255, 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Build Something Amazing
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

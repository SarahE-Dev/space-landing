"use client"

import { motion } from "framer-motion"
import { Navigation, Settings, Zap, Shield, Headphones, Globe } from "lucide-react"

type FeatureCardProps = {
  title: string
  description: string
  icon: string
  color: string
}

export default function FeatureCard({ title, description, icon, color }: FeatureCardProps) {
  const getIcon = (): JSX.Element => {
    const props = { className: "h-8 w-8", style: { color } }

    switch (icon) {
      case "navigation":
        return <Navigation {...props} />
      case "settings":
        return <Settings {...props} />
      case "zap":
        return <Zap {...props} />
      case "shield":
        return <Shield {...props} />
      case "headphones":
        return <Headphones {...props} />
      case "globe":
        return <Globe {...props} />
      default:
        return <Navigation {...props} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gradient-to-b from-[#0f0f3a]/40 to-[#2a0e38]/40 p-6 rounded-xl border border-[#8a2be2]/30 backdrop-blur-sm"
    >
      <div className="bg-[#0a0118]/50 p-3 rounded-lg w-fit mb-4">{getIcon()}</div>
      <h3 className="text-xl font-bold mb-2" style={{ color }}>
        {title}
      </h3>
      <p className="text-[#e0e0ff]/70">{description}</p>
    </motion.div>
  )
}


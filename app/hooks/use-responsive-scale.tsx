"use client"

import { useState, useEffect } from "react"

export function useResponsiveScale(baseScale = 1, mobileScale = 0.7, tabletScale = 0.85): number {
  const [scale, setScale] = useState(baseScale)

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setScale(mobileScale)
        } else if (window.innerWidth < 1024) {
          setScale(tabletScale)
        } else {
          setScale(baseScale)
        }
      }
    }

    // Set initial scale
    handleResize()

    // Add event listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
    }

    // Clean up
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [baseScale, mobileScale, tabletScale])

  return scale
}


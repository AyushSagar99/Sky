"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image";
import iphone16 from "@/public/iPhone-16-Pro-Mockup.webp"

interface FeatureSection {
  title: string;
  subtitle: string;
}

export default function FixedScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFixed, setIsFixed] = useState(true)

  // Feature sections data
  const sections: FeatureSection[] = [
    {
      title: "Institutional-Grade Liquidity",
      subtitle: "Deep liquidity for precise trade execution, even in volatile markets",
    },
    {
      title: "Ultra-Fast Execution",
      subtitle: "Lightning-speed order placement with minimal slippage",
    },
    {
      title: "Seamless Deposits & Withdrawals",
      subtitle: "Multiple payment options with fast processing times",
    },
    {
      title: "Tight Spreads & Low Trading Costs",
      subtitle: "Competitive pricing designed for serious traders",
    },
    {
      title: "Access to 2000+ Markets",
      subtitle: "Trade forex, commodities, indices, and cryptocurrencies",
    }
  ]

  // Handle scroll to change active section and manage fixed position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const containerOffsetTop = containerRef.current.offsetTop
      const scrollY = window.scrollY
      
      // Start position (when the container reaches the top of the viewport)
      const startPosition = containerOffsetTop
      
      // End position (when we should stop fixing the content)
      const sectionHeight = window.innerHeight * 0.8
      const endPosition = startPosition + (sections.length * sectionHeight)
      
      // Current scroll position relative to the container
      const relativeScroll = scrollY - startPosition
      
      // Determine if the content should be fixed
      if (scrollY >= startPosition && scrollY < endPosition) {
        setIsFixed(true)
        
        // Calculate which section should be active
        const sectionIndex = Math.floor(relativeScroll / sectionHeight)
        setActiveIndex(Math.min(sectionIndex, sections.length - 1))
      } else if (scrollY >= endPosition) {
        // We've scrolled past all sections, unfix the content
        setIsFixed(false)
        setActiveIndex(sections.length - 1)
      } else {
        // We're above the container
        setIsFixed(false)
        setActiveIndex(0)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections.length])

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ 
        height: `${(sections.length * 80) }vh`,
        marginBottom: "20vh"
      }}
    >
      <div 
        ref={contentRef}
        className={`w-full ${
          isFixed ? 'fixed top-0 left-0' : 'relative'
        } h-screen flex items-center`}
        style={{
          zIndex: 20
        }}
      >
        {/* Content container */}
        <div className="w-full bg-transparent px-4 py-16">
        <div className="flex justify-center items-center">
  <p className="text-6xl text-center font-light flex flex-col">
    <span>
      What sets{" "}
      <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
        Skyriss
      </span>
    </span>
    <span>apart?</span>
  </p>
</div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side with iPhone image */}
            <div className="hidden md:flex h-[500px] items-center justify-center">
              <div className="w-full h-full rounded-3xl flex items-center justify-center">
                <Image
                  src={iphone16}
                  alt="iphone"
                  width={520}
                  height={530}
                  priority
                />
              </div>
            </div>
            
            {/* Right side with text content */}
            <div className="h-[500px] relative flex items-center justify-center md:justify-start">
              <div className="relative w-full max-w-md mx-auto md:mx-0">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ 
                      opacity: activeIndex === index ? 1 : 0,
                      x: activeIndex === index ? 0 : 80
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`absolute inset-0 ${activeIndex === index ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <h2 className="text-3xl md:text-4xl font-light mb-3">{section.title}</h2>
                    <p className="text-lg text-gray-500">{section.subtitle}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Progress indicator */}
              <div className="absolute right-4 md:right-8 flex flex-col gap-2">
                {sections.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
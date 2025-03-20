"use client"
import { useState, useEffect, useRef, type ReactNode } from "react"
import { NumberTicker } from "./magicui/number-ticker"

type StatCardProps = {
  icon: ReactNode
  value: string
  suffix?: string
  description: string
  subDescription?: string
  isNumeric?: boolean
  tiltOptions?: {
    max: number
    perspective: number
    scale: number
    speed: number
  }
}

export default function StatCard({
  icon,
  value,
  suffix = "",
  description,
  subDescription = "",
  isNumeric = false,
  tiltOptions = {
    max: 15,
    perspective: 1000,
    scale: 1.03,
    speed: 400
  }
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 })
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    // Store the current ref value in a variable inside the effect
    const currentCard = cardRef.current
    
    if (currentCard) {
      observer.observe(currentCard)
    }
    
    return () => {
      // Use the stored variable instead of cardRef.current
      if (currentCard) {
        observer.disconnect()
      }
    }
  }, [])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    
    // Calculate mouse position relative to card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Calculate percent position
    const percentX = x / rect.width
    const percentY = y / rect.height
    
    // Calculate tilt angles (centered at 0.5, 0.5)
    const tiltX = (percentY - 0.5) * (tiltOptions.max * 2)
    const tiltY = (0.5 - percentX) * (tiltOptions.max * 2)
    
    setTilt({
      x: tiltX,
      y: tiltY,
      scale: tiltOptions.scale
    })
  }
  
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, scale: 1 })
  }
  
  return (
    <div
      ref={cardRef}
      className="bg-white rounded-3xl p-8 cursor-pointer overflow-hidden transform-gpu"
      style={{
        transform: `perspective(${tiltOptions.perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scale})`,
        transition: tilt.x === 0 && tilt.y === 0 ? `transform ${tiltOptions.speed}ms ease-out` : 'none',
        boxShadow: tilt.scale > 1 
          ? '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -8px rgba(0, 0, 0, 0.15)' 
          : '0 2px 8px -1px rgba(0, 0, 0, 0.05)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-12 w-12 bg-black text-lime-500 rounded-full flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-3xl font-bold mb-2">
        {isNumeric && isVisible ? (
          <>
            <NumberTicker value={parseFloat(value.replace(/,/g, ''))} />
            {suffix}
          </>
        ) : (
          <>
            {value} {description}
          </>
        )}
      </h3>
      {isNumeric ? (
        <p className="text-gray-600">{description}</p>
      ) : (
        <p className="text-gray-600">{subDescription}</p>
      )}
    </div>
  )
}
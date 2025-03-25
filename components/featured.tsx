"use client"

import React from 'react'
import { useState } from "react"
import feature from "@/public/feature_logo1.png"
import mt5 from "@/public/mt5.png"
import leverage from "@/public/Leverage.png"
import fast from "@/public/fast_exec.png"
import mkt from "@/public/mt5.png"
import adv from "@/public/adv_trading_tools.png"
import Image from 'next/image'
import { AnimatedLink } from './animatedLink'
import { StaticImageData } from 'next/image'

interface FeatureCardProps {
  title: string
  description?: string
  subtitle?: string
  imageSrc?: string | StaticImageData
  className?: string
}

const FeatureCard = ({ title, description, subtitle, imageSrc, className = "" }: FeatureCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={`${className} relative`}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="w-full h-full relative"
        style={{ 
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.4s" 
        }}
      >
        {/* Front of Card */}
        <div
          className="absolute w-full h-full bg-white rounded-xl shadow-md p-5 flex flex-col"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="flex-1 flex items-center justify-center mb-3">
            {imageSrc && typeof imageSrc === 'string' ? (
              <Image 
                src={imageSrc} 
                alt={title} 
                className="max-h-16 w-auto"
                width={154}
                height={164}
              />
            ) : imageSrc ? (
              <div className="max-h-16 flex items-center justify-center">
                <Image 
                  src={imageSrc} 
                  alt={title} 
                  className="max-h-16 w-auto"
                  width={154}
                  height={164}
                />
              </div>
            ) : null}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            {subtitle && (
              <p className="text-base text-gray-700">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute w-full h-full bg-white rounded-xl shadow-md p-5 flex items-center justify-center"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {description && (
            <p className="text-center text-gray-600 text-sm">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function Featured() {
  const features: FeatureCardProps[] = [
    {
      title: "MetaTrader 5",
      description: "Trade where the world trades with the industry's leading platform",
      imageSrc: mt5
    },
    {
      title: "Leverage",
      subtitle: "Up to 1:500",
      description: "Maximize your trading potential with flexible leverage options",
      imageSrc: leverage
    },
    {
      title: "Fast Execution",
      description: "Lightning-fast trades with minimal slippage",
      imageSrc: fast
    },
    {
      title: "24/5",
      subtitle: "Market Access",
      description: "Trade around the clock on weekdays with continuous market access",
      imageSrc: mkt
    },
    {
      title: "Advanced Trading Tools",
      description: "Professional tools suite for serious traders",
      imageSrc: adv
    }
  ]

  // CTA button component
  const CTAButton = () => (
    <div className="transform transition-transform w-full justify-center items-center flex">
      <AnimatedLink href="#">Open an account</AnimatedLink>
    </div>
  )

  return (
    <section className="w-full py-20 px-4" >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading with subtle decoration */}
        <div className="relative mb-12">
          <h2 className="text-5xl font-light relative z-10">Featured</h2>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full"></div>
        </div>
        
        {/* Feature logo with proper sizing */}
        <div className="w-full max-w-lg mb-14">
          <Image
            src={feature}
            alt="Featured partners"
            width={500}
            height={100}
            className="w-full h-auto"
            priority
          />
        </div>
        
        {/* Main content with proper spacing */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-6xl font-light mb-4">
            Everything you need,
            <div className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
              in one platform
            </div>
          </h3>
          
          <p className="text-2xl md:text-4xl text-gray-500 mb-10">
            Trade Better with the Right Tools.
          </p>
        </div>

        {/* CTA button above cards (matching image 2) */}
        <div className="mb-12">
          <CTAButton />
        </div>

        {/* Feature Cards - Layout matching the screenshot exactly */}
        <div className="w-full mb-16">
          {/* Top row - 3 cards centered with proper spacing */}
          <div className="flex justify-end mb-6">
            <div className="w-60 h-60 mx-3">
              <FeatureCard 
                {...features[0]} 
                className="w-full h-full"
              />
            </div>
            <div className="w-60 h-60 mx-3">
              <FeatureCard 
                {...features[1]} 
                className="w-full h-full"
              />
            </div>
            <div className="w-60 h-60 mx-3">
              <FeatureCard 
                {...features[2]} 
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Bottom row - 2 cards centered with inset */}
          <div className="flex justify-start">
            <div className="w-60 h-60 mx-3">
              <FeatureCard 
                {...features[3]} 
                className="w-full h-full"
              />
            </div>
            <div className="w-60 h-60 mx-3">
              <FeatureCard 
                {...features[4]} 
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Featured
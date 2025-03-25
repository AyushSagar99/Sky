import React from 'react'
import feature from "@/public/feature_logo1.png"
import Image from 'next/image'
import { AnimatedLink } from './animatedLink'

function Featured() {
  return (
    <section className="w-full py-20 px-4">
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
          <h3 className="flex flex-col justify-center items-center text-4xl md:text-6xl font-light mb-4">
            Everything you need,
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
              in one platform
            </span>
          </h3>
          
          <p className="text-2xl md:text-4xl text-gray-500 mb-10">
            Trade Better with the Right Tools.
          </p>
          
          {/* Call to action button with hover effect */}
          <div className="transform transition-transform w-full justify-center items-center flex">
            <AnimatedLink href="#">Open an account</AnimatedLink>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Featured
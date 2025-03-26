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
  const [isFixed, setIsFixed] = useState(false)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isInView, setIsInView] = useState(false)

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

  // Setup intersection observer to detect when the component is in view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.01, // Trigger when at least 10% of the element is visible
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Handle initial load state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events
  useEffect(() => {
    if (!isInitialized) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Calculate if we're inside the container's scroll area
      const isInScrollArea = scrollY >= containerTop && scrollY < containerTop + containerHeight - windowHeight;
      
      // Check if we've reached the end of the container
      const reachedEnd = scrollY >= containerTop + containerHeight - windowHeight;
      setHasReachedEnd(reachedEnd);
      
      // Only fix position when we're inside the scroll area
      setIsFixed(isInScrollArea);
      
      // Calculate which section should be active based on scroll position
      if (isInScrollArea || reachedEnd) {
        // Calculate relative progress through the container (0 to 1)
        const scrollProgress = Math.min(1, Math.max(0, (scrollY - containerTop) / (containerHeight - windowHeight)));
        
        // Map scroll progress to section index
        const newActiveIndex = Math.min(
          sections.length - 1,
          Math.floor(scrollProgress * sections.length)
        );
        
        setActiveIndex(newActiveIndex);
      } else {
        // Before the scroll area, set to first section
        setActiveIndex(0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Force a second check after a slight delay to account for any layout shifts
    const timer = setTimeout(() => {
      handleScroll();
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [sections.length, isInitialized]);

  // Determine if the content should be visible
  const shouldShowContent = isInView && isInitialized;

  return (
    <div 
      ref={containerRef}
      className="relative opacity-100" // Always keep the container visible
      style={{ 
        height: `${(sections.length * 80)}vh`,
        marginBottom: "20vh", // Add bottom margin to avoid overlapping with next components
      }}
    >
      {/* The content element - only visible when in viewport */}
      <div 
        ref={contentRef}
        className={`w-full transition-opacity duration-300 ${shouldShowContent ? 'opacity-100' : 'opacity-0'}`}
        style={{
          position: isFixed ? 'fixed' : hasReachedEnd ? 'absolute' : 'relative',
          top: isFixed ? 0 : 'auto',
          bottom: hasReachedEnd ? 0 : 'auto',
          left: 0,
          height: '100vh',
          zIndex: isFixed ? 10 : 1,
          display: 'flex',
          alignItems: 'center',
          visibility: shouldShowContent ? 'visible' : 'hidden', // Hide completely when not in view
          pointerEvents: shouldShowContent ? 'auto' : 'none'
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
      
      {/* Add placeholder space at the top for when content is fixed */}
      {isFixed && (
        <div style={{ height: '100vh' }}></div>
      )}
    </div>
  )
}
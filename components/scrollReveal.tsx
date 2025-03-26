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
  const [isMobile, setIsMobile] = useState(false)

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

  // Check for mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
        threshold: 0.01, // Trigger when even a small part of the element is visible
      }
    );

    // Store the current value of the ref
    const currentContainer = containerRef.current;
    
    observer.observe(currentContainer);

    return () => {
      // Use the stored reference in the cleanup
      observer.unobserve(currentContainer);
      observer.disconnect();
    };
  }, []);
  
  // Fix scroll position only if needed
  useEffect(() => {
    // Only run this on client-side
    if (typeof window !== 'undefined') {
      // Check if we're very close to the top but not exactly at it
      // This fixes the issue where reloading near the top might scroll down
      if (window.scrollY > 0 && window.scrollY < 100) {
        window.scrollTo(0, 0);
      }
    }
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
        // Reduce height for mobile to avoid excessive scrolling
        height: isMobile ? `${(sections.length * 60)}vh` : `${(sections.length * 80)}vh`,
        marginBottom: isMobile ? "10vh" : "2vh", // Less bottom margin on mobile
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
        <div className="w-full bg-transparent px-4 py-8 md:py-16">
          <div className="flex justify-center items-center">
            <p className="text-3xl sm:text-4xl md:text-6xl text-center font-light flex flex-col">
              <span>
                What sets{" "}
                <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
                  Skyriss
                </span>
              </span>
              <span>apart?</span>
            </p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center mt-6 md:mt-0">
            {/* Left side with iPhone image - shown at bottom on mobile */}
            <div className="order-2 md:order-1 flex md:hidden h-[200px] sm:h-[300px] md:h-[500px] items-center justify-center mt-4">
              <div className="w-full h-full rounded-3xl flex items-center justify-center">
                <Image
                  src={iphone16}
                  alt="iphone"
                  width={280}
                  height={300}
                  className="w-auto h-full object-contain"
                  priority
                />
              </div>
            </div>
            
            {/* iPhone image for desktop only */}
            <div className="hidden md:flex order-1 h-[500px] items-center justify-center">
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
            <div className="order-1 md:order-2 h-[250px] sm:h-[300px] md:h-[500px] relative flex items-center justify-center md:justify-start">
              <div className="relative w-full max-w-md mx-auto md:mx-0 px-4 md:px-0">
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
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-2 md:mb-3">{section.title}</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500">{section.subtitle}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Progress indicator - repositioned for mobile */}
              <div className={`absolute ${isMobile ? 'bottom-0 right-1/2 transform translate-x-1/2 flex-row' : 'right-4 md:right-8 flex-col'} flex gap-2`}>
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
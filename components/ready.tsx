'use client';
import { motion } from 'framer-motion';
import { AnimatedLink } from './animatedLink';
import { useEffect, useState } from 'react';

export default function AnimatedCTA() {
  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);

  // Update isMobile state based on window size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex justify-center items-center w-full px-4 sm:px-6 md:px-8">
      <motion.div
        className="relative w-full p-6 sm:p-10 md:p-16 rounded-3xl overflow-hidden flex flex-col items-center text-center"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ 
          duration: isMobile ? 15 : 20, // Slightly faster animation on mobile
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        style={{
          backgroundSize: '300% 100%',
          backgroundImage: 'linear-gradient(90deg, rgba(204, 255, 204, 0.9), rgba(173, 216, 230, 0.9), rgba(154, 209, 212, 0.9), rgba(173, 216, 230, 0.9), rgba(204, 255, 204, 0.9))',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium text-black">Ready?</h2>
        <p className="text-2xl sm:text-3xl md:text-5xl font-medium text-black mt-1 sm:mt-2 mb-6 sm:mb-8 md:mb-10">
          Let&apos;s make it happen.
        </p>
        <div className="relative w-full sm:w-auto inline-block">
          <AnimatedLink href='#' className="w-full justify-center sm:w-auto sm:justify-between">
            Open an account
          </AnimatedLink>
        </div>
      </motion.div>
    </div>
  );
}
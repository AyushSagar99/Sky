import Image from "next/image"
import lock from "@/public/open_account_img_security_lock.webp"
import back from "@/public/open_account_img_container.png"
import { useState, useEffect, useRef } from "react"
import { AnimatedLink } from "./animatedLink"

export default function AccountOpening() {
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });
  const [lockTiltAngle, setLockTiltAngle] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lockRef = useRef<HTMLDivElement>(null);
  const tiltMax = 15; // Maximum tilt angle for container
  const lockTiltMax = 25; // Maximum tilt angle for lock (more pronounced)
  
  // Detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    // Set up intersection observer for entrance animation
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once it's visible, we don't need to observe anymore
        if (lockRef.current) observer.unobserve(lockRef.current);
      }
    }, { threshold: 0.1 }); // Trigger when at least 10% is visible
    
    // Store the current value of the ref
    const currentLockRef = lockRef.current;
    
    if (currentLockRef) {
      observer.observe(currentLockRef);
    }
    
    return () => {
      // Use the stored reference in the cleanup
      if (currentLockRef) observer.unobserve(currentLockRef);
      
      // It's also good practice to disconnect the observer
      observer.disconnect();
    };
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip tilt effect on mobile
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    // Calculate tilt percentage
    const percentX = (x / rect.width - 0.5) * 2; // -1 to 1
    const percentY = (y / rect.height - 0.5) * -2; // -1 to 1 (inverted y for natural tilt)
    
    // Calculate actual tilt for container
    setTiltAngle({
      x: percentY * tiltMax, // Rotate around X axis based on Y position
      y: percentX * tiltMax, // Rotate around Y axis based on X position
    });
    
    // Calculate more pronounced tilt for lock (in opposite direction for parallax effect)
    setLockTiltAngle({
      x: percentY * lockTiltMax * 0.7, // Slightly reduced to avoid extreme tilt
      y: percentX * lockTiltMax * 0.7,
    });
  };
  
  const handleMouseLeave = () => {
    // Reset tilt when mouse leaves
    setTiltAngle({ x: 0, y: 0 });
    setLockTiltAngle({ x: 0, y: 0 });
  };

  // For mobile, use a simpler animation without mouse tracking
  useEffect(() => {
    if (isMobile && isVisible) {
      // Add a gentle bobbing animation for mobile
      const interval = setInterval(() => {
        setLockTiltAngle({
          x: Math.sin(Date.now() / 1000) * 2, // Gentle bobbing
          y: Math.cos(Date.now() / 1500) * 2, // Gentle rotation
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, isVisible]);

  return (
    <div className="w-full px-4 sm:px-6 py-8 sm:py-12 md:py-16 overflow-hidden">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-light mb-2">Open your account.</h1>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-light">
          It is that <span className="text-blue-300">simple</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image section - order changed for mobile */}
        <div className="flex justify-center order-2 md:order-1">
          <div 
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-110 md:h-94 flex items-center justify-center overflow-visible"
            style={{ 
              transform: `perspective(1000px) rotateX(${tiltAngle.x}deg) rotateY(${tiltAngle.y}deg)`,
              transition: tiltAngle.x === 0 && tiltAngle.y === 0 ? 'transform 0.5s ease-out' : 'none'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={back}
              alt="background"
              width={550}
              height={500}
              className="absolute w-full h-full object-contain"
            />
            <div 
              ref={lockRef}
              className="relative transform-gpu"
              style={{ 
                transform: `perspective(1000px) rotateX(${lockTiltAngle.x}deg) rotateY(${lockTiltAngle.y}deg) translateZ(40px) scale(${isVisible ? 1 : 0.2})`,
                opacity: isVisible ? 1 : 0,
                transition: isVisible 
                  ? 'transform 0.8s cubic-bezier(0.17, 0.67, 0.3, 1.33), opacity 0.8s ease-out' 
                  : 'none',
                transformOrigin: 'center center'
              }}
            >
              <Image
                src={lock}
                width={305}
                height={305}
                alt="Security lock with fingerprint"
                className="object-contain w-48 h-48 sm:w-64 sm:h-64 md:w-auto md:h-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Steps section - moved to top for mobile */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10 order-1 md:order-2">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-400 rounded-full flex items-center justify-center text-black font-bold text-sm sm:text-base">
              1
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Complete the application</h3>
              <p className="text-gray-600 text-base sm:text-lg">It only takes a few minutes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-400 rounded-full flex items-center justify-center text-black font-bold text-sm sm:text-base">
              2
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Fund your account</h3>
              <p className="text-gray-600 text-base sm:text-lg">Transfer funds using a variety of funding methods.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-400 rounded-full flex items-center justify-center text-black font-bold text-sm sm:text-base">
              3
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Start trading</h3>
              <p className="text-gray-600 text-base sm:text-lg">Take your investment to the next level.</p>
            </div>
          </div>
          
          {/* CTA button - full width on mobile */}
          <div className="w-full sm:w-auto">
            <AnimatedLink href="#" className="w-full sm:w-auto justify-center sm:justify-between">Open an account</AnimatedLink>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedLink } from "../animatedLink"
import { BlackToLimeLink } from "../animatedBLink"

// Define the dropdown content type
type NavItemKey = 'Trade' | 'Products' | 'Platforms' | 'News' | 'About' | 'Learn' | 'Help';

export default function Navbar() {
  // State to track which dropdown is open
  const [hoveredItem, setHoveredItem] = useState<NavItemKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<NavItemKey[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dropdown content mapping with proper typing
  const dropdownContent: Record<NavItemKey, string[]> = {
    "Trade": ["Forex", "Commodities", "Indices", "Stocks", "Cryptocurrency"],
    "Products": ["MetaTrader 4", "MetaTrader 5", "WebTrader", "Mobile Apps"],
    "Platforms": ["Premium", "Standard", "Basic", "Demo"],
    "News": ["Market News", "Trading Insights", "Economic Calendar", "Price Alerts"],
    "About": ["Our Company", "Regulations", "Careers", "Press"],
    "Learn": ["Trading Guides", "Webinars", "Video Tutorials", "Glossary"],
    "Help": ["FAQs", "Support Center", "Contact Us", "Live Chat"]
  }

  // Get nav items as typed array
  const navItems = Object.keys(dropdownContent) as NavItemKey[];

  // Animation variants for the dropdown - coming from back to forward
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      z: -100,
      rotateX: 10,
      transformOrigin: "top",
      transition: {
        duration: 0.2,
      }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      z: 0,
      rotateX: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.03
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 }
  }

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  }

  // Mobile menu accordion functionality
  const toggleMobileAccordion = (item: NavItemKey) => {
    setExpandedMobileItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  }

  // Handle mouse enter/leave with delay for better UX
  const handleMouseEnter = (label: NavItemKey) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 100); // Small delay to prevent flickering when moving between items
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 relative">
          <div className="absolute inset-0 rounded-full border-4 border-black"></div>
          <div className="absolute inset-2 rounded-full border-2 border-black"></div>
        </div>
        <span className="text-2xl font-bold">skyriss</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((label) => (
          <div 
            key={label} 
            className="relative"
            onMouseEnter={() => handleMouseEnter(label)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`text-black hover:text-gray-600 font-medium flex items-center cursor-pointer ${hoveredItem === label ? 'text-blue-600' : ''}`}
            >
              {label}
              <motion.div
                animate={{ rotate: hoveredItem === label ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 ml-1" />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {hoveredItem === label && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 perspective-500"
                  style={{ 
                    transformStyle: "preserve-3d", 
                    perspective: "500px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  <div className="py-2">
                    {dropdownContent[label].map((item) => (
                      <motion.div key={item} variants={itemVariants}>
                        <Link 
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        >
                          {item}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden z-50 text-black focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 bg-white pt-20 pb-6 px-4 z-40 overflow-y-auto md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((label) => (
                <motion.div
                  key={label}
                  variants={mobileNavItemVariants}
                  className="border-b border-gray-100 pb-2"
                >
                  <div
                    className="flex items-center justify-between py-2 font-medium"
                    onClick={() => toggleMobileAccordion(label)}
                  >
                    <span>{label}</span>
                    <motion.div
                      animate={{ rotate: expandedMobileItems.includes(label) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedMobileItems.includes(label) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-4"
                      >
                        {dropdownContent[label].map((item) => (
                          <Link 
                            key={item}
                            href="#"
                            className="block py-2 text-gray-600 hover:text-blue-600"
                          >
                            {item}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              
              {/* Mobile CTAs */}
              <motion.div 
                variants={mobileNavItemVariants}
                className="pt-4 mt-4 space-y-4"
              >
                <div className="w-full">
                  <AnimatedLink href="#" className="w-full">Open an account</AnimatedLink>
                </div>
                <div className="w-full">
                  <BlackToLimeLink href="#" className="w-full">Login</BlackToLimeLink>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop CTAs */}
      <div className="hidden md:flex items-center gap-2">
        <AnimatedLink href="#">Open an account</AnimatedLink>
        <BlackToLimeLink href="#">Login</BlackToLimeLink>
      </div>
    </header>
  )
}
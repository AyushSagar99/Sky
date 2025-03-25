"use client"
import { useState } from "react"
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarIcon, Headset, UsersIcon} from "lucide-react"
import Navbar from "@/components/nav/Navbar"
import { AnimatedLink } from "@/components/animatedLink"
import StatCard from "@/components/tCard"
import { AuroraText } from "@/components/magicui/aurora-text"
import { motion } from "framer-motion"
import { BlackToLimeLink } from "@/components/animatedBLink"
import FixedScrollReveal from "@/components/scrollReveal"
import { AccountSelection } from "@/components/accountS"
import Asset from "@/components/asset"
import Featured from "@/components/featured"
import AccountOpening from "@/components/trading"
import TestimonialsAndGuides from "@/components/testimonial"
import AnimatedCTA from "@/components/ready"
import Footer from "@/components/footer"

export default function Home() {

  const accountOptions = [
    {
      id: "raw",
      name: "Raw",
      description: "Suggestive for Scalping",
      minimumDeposit: "$1,000",
      features: [
        { text: "Minimum Deposit: $1,000" },
        { text: "Competitive commission" },
        { text: "Tight spread" },
        { text: "Swap: Yes" },
        { text: "Leverage 50 to 500" },
        { text: "Currencies: USD" },
      ],
    },
    {
      id: "standard",
      name: "Standard",
      description: "Suggestive for Institution or HNIs",
      minimumDeposit: "$100",
      isHighlighted: true,
      features: [
        { text: "Minimum Deposit: $100" },
        { text: "$0 commissions" },
        { text: "Spread: 18 to 25" },
        { text: "Swap: No" },
        { text: "Leverage 50 to 500" },
        { text: "Currencies: USD" },
      ],
    },
    {
      id: "plus",
      name: "Plus",
      description: "Suggestive for Individual traders",
      minimumDeposit: "$10",
      features: [
        { text: "Minimum Deposit: $10" },
        { text: "$0 commissions" },
        { text: "Spread: 25 to 30" },
        { text: "Swap: No" },
        { text: "Leverage 50 to 500" },
        { text: "Currencies: USD" },
      ],
    },
  ]

  const contentItems = [
    {
      title: "Big Moves Are Happening.",
      subtitle: "Are You Ready?",
      description: "Markets don't wait, why should you? Stay ahead with the latest trends, insights, and data-driven strategies."
    },
    {
      title: "Opportunity Awaits.",
      subtitle: "Take Action Now.",
      description: "Discover new markets and emerging trends with our expert analysis and powerful trading tools."
    },
    {
      title: "Maximize Your Potential.",
      subtitle: "Join The Elite.",
      description: "Our platform provides the edge you need to succeed in today's competitive financial landscape."
    }
  ]

  // State to track which content is currently shown
  const [currentIndex, setCurrentIndex] = useState(0)

  // Functions to handle next and previous content
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % contentItems.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + contentItems.length) % contentItems.length)
  }

  // Get the current content
  const currentContent = contentItems[currentIndex]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient background with blur */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -inset-[10%] top-0 bg-gradient-to-br from-blue-200 via-purple-100 to-green-200 opacity-80 animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDuration: '10s', animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDuration: '12s', animationDelay: '-7s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDuration: '8s', animationDelay: '-5s' }}></div>
      </div>

      {/* Add backdrop filter to navbar for glass effect */}
      <div className="sticky top-0 z-50">
        <Navbar  />
      </div>

      <motion.main 
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top section with ml-17 */}
        <div className="container ml-17 pt-16 pb-24">
          <motion.section className="mb-20" variants={itemVariants}>
            <div className="max-w-5xl">
              <motion.h1 
                className="text-4xl font-light tracking-tighter md:text-5xl lg:text-7xl"
                variants={itemVariants}
              >
                <AuroraText>Limitless</AuroraText>
              </motion.h1>
              <motion.h1 
                className="text-7xl font-light text-black mb-4"
                variants={itemVariants}
              >
                Possibilities
              </motion.h1>
              <motion.p 
                className="text-3xl text-gray-700 mb-8"
                variants={itemVariants}
              >
                History of investments modernized.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <AnimatedLink href="#">Open an account</AnimatedLink>
                <BlackToLimeLink href="#">Demo account</BlackToLimeLink>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={itemVariants}
          >
            <motion.div 
              className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <motion.div variants={itemVariants}>
                <StatCard 
                  icon={<UsersIcon />} 
                  value="900,000" 
                  suffix="+" 
                  description="traders and counting" 
                  isNumeric={true}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard 
                  icon={<CalendarIcon />} 
                  value="26" 
                  suffix="+" 
                  description="successful years in the industry" 
                  isNumeric={true}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard 
                  icon={<Headset />} 
                  value="24/7" 
                  description="support" 
                  subDescription="No breaks. No delays" 
                  isNumeric={false}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard 
                  icon={<BadgeCheck />} 
                  value="0.0" 
                  suffix=" Pips" 
                  description="Tightest Spreads" 
                  isNumeric={true}
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="bg-gray-900/90 backdrop-blur-sm text-white rounded-3xl p-8 flex flex-col justify-between border border-gray-800"
              variants={itemVariants}
            >
              <div>
                <motion.h2 
                  className="text-3xl font-light mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={currentContent.title}
                  transition={{ duration: 0.5 }}
                >
                  {currentContent.title}
                </motion.h2>
                <motion.h3 
                  className="text-3xl font-light mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={currentContent.subtitle}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentContent.subtitle}
                </motion.h3>
                <motion.p 
                  className="text-gray-300 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={currentContent.description}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentContent.description}
                </motion.p>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button className="bg-gray-800 hover:bg-gray-700 rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="h-6 w-6 bg-gray-600 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span>Explore Market Insights</span>
                </button>

                <div className="flex gap-2">
                  <button 
                    className="h-10 w-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center"
                    onClick={handlePrev}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button 
                    className="h-10 w-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center"
                    onClick={handleNext}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.section>
          
          {/* Fixed Scroll Reveal section with adjusted link */}
          <motion.div 
            className="mt-20 mb-20"
            variants={itemVariants}
          >
            <FixedScrollReveal />
            <div className="flex justify-center mt-10">
              <AnimatedLink href="#">Open an account</AnimatedLink>
            </div>
          </motion.div>
        </div>
        
        {/* Gray background section with extended bottom margin */}
        <div className="relative" >
          {/* Extended absolute background */}
          <div className="absolute inset-0 bg-gray-50" ></div>
          
          {/* Content container with proper spacing */}
          <div className="relative container ml-17 ">
            <AccountSelection options={accountOptions} />
            <Asset/>
            <Featured/>
            <AccountOpening/>
            <TestimonialsAndGuides/>
            <div className=" ">
              <AnimatedCTA/>
            </div>
            <Footer/>
          </div>
        </div>
      </motion.main>
    </div>
  )
}
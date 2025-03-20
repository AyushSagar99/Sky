"use client"
import Link from "next/link"
import { CircleArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, ReactNode } from "react"

type IconProps = {
  isHovered: boolean
  className?: string
}

type AnimatedLinkProps = {
  href: string
  children: ReactNode
  className?: string
  icon?: ReactNode | ((props: IconProps) => ReactNode)
}

export function BlackToLimeLink({
  href = "#",
  children,
  className = "",
  icon = <CircleArrowRight className="h-5 w-5" />,
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const baseClasses = `group relative bg-black hover:bg-lime-400 text-white hover:text-black rounded-full px-6 py-3 flex items-center justify-between min-w-[200px] transition-colors duration-300 ${className}`
  
  return (
    <Link
      href={href}
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.div
            key="left-icon"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4"
          >
            {typeof icon === 'function' 
              ? (icon as (props: IconProps) => ReactNode)({ isHovered, className: isHovered ? "text-black" : "text-white" }) 
              : <div className={isHovered ? "text-black" : "text-white"}>{icon}</div>}
          </motion.div>
        ) : (
          <motion.div
            key="right-icon"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4"
          >
            {typeof icon === 'function' 
              ? (icon as (props: IconProps) => ReactNode)({ isHovered, className: isHovered ? "text-black" : "text-white" }) 
              : <div className={isHovered ? "text-black" : "text-white"}>{icon}</div>}
          </motion.div>
        )}
      </AnimatePresence>
      
      <span className="text-lg transition-all duration-300 hover:ml-3.5">{children}</span>
    </Link>
  )
}
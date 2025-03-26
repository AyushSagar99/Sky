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
  backgroundColor?: string
  hoverBackgroundColor?: string
  textColor?: string
  hoverTextColor?: string
}

export function AnimatedLink({
  href = "#",
  children,
  className = "",
  icon = <CircleArrowRight className="h-5 w-5" />,
  backgroundColor = "bg-lime-400",
  hoverBackgroundColor = "hover:bg-black",
  textColor = "text-black",
  hoverTextColor = "hover:text-white",
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const baseClasses = `group relative ${backgroundColor} ${hoverBackgroundColor} ${textColor} ${hoverTextColor} rounded-full px-6 py-3 flex items-center justify-between min-w-[200px] ${className}`
  
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
              ? (icon as (props: IconProps) => ReactNode)({ isHovered, className: isHovered ? "text-white" : "text-black" }) 
              : icon}
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
              ? (icon as (props: IconProps) => ReactNode)({ isHovered, className: isHovered ? "text-white" : "text-black" }) 
              : icon}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.span 
        className="text-lg"
        animate={{ marginLeft: isHovered ? "1.25rem" : "0" }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </Link>
  )
}
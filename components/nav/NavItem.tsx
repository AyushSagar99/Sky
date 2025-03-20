"use client"
import Link from "next/link"

type NavItemProps = {
  label: string
}

export default function NavItem({ label }: NavItemProps) {
  return (
    <Link 
  href="#" 
  className="group text-black hover:text-blue-600 font-medium flex items-center"
>
  {label}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:rotate-180"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
</Link>
  )
}
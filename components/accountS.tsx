import { Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface AccountFeature {
  text: string
}

interface AccountOption {
  id: string
  name: string
  description: string
  features: AccountFeature[]
  minimumDeposit: string
  isHighlighted?: boolean
}

interface AccountSelectionProps {
  title?: string
  subtitle?: string
  options: AccountOption[]
}

export function AccountSelection({
  title = "Choose your account",
  subtitle = "Select what works for you",
  options,
}: AccountSelectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  
  // Function to determine if a card should show the highlight style
  const shouldHighlight = (option: AccountOption) => {
    // If a card is being hovered, only that card should be highlighted
    if (hoveredId) {
      return option.id === hoveredId
    }
    // Otherwise, use the default highlighted property
    return option.isHighlighted
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-2">{title}</h2>
        <p className="text-xl text-gray-500">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option) => (
          <div
            key={option.id}
            className={cn(
              "rounded-2xl p-8 bg-white shadow-sm relative transition-all duration-300",
              shouldHighlight(option) && "bg-gradient-to-b from-gray-800 to-teal-800 text-white",
            )}
            onMouseEnter={() => setHoveredId(option.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-1">{option.name}</h3>
              <p className={cn("text-gray-500 text-lg transition-colors duration-300", 
                 shouldHighlight(option) && "text-gray-300")}>
                {option.description}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {option.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className={cn("h-5 w-5 mr-2 flex-shrink-0 transition-colors duration-300",
                    shouldHighlight(option) ? "text-lime-400" : "text-blue-500")} />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <button className={cn(
              "flex items-center justify-center rounded-full font-medium py-3 px-6 w-full transition-colors duration-300",
              shouldHighlight(option) 
                ? "bg-lime-400 hover:bg-lime-500 text-black" 
                : "bg-blue-100 hover:bg-blue-200 text-blue-800"
            )}>
              Open an account
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
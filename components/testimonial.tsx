import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { AnimatedLink } from "./animatedLink"
import { useState } from "react"

// Sample testimonials data for the carousel
const testimonials = [
  {
    name: "James",
    title: "Professional",
    rating: 5,
    text: "The platform is seamless, and the insights are game-changers. With zero downtime and advanced tools, my trading experience has significantly improved!"
  },
  {
    name: "Sarah",
    title: "Institutional Trader",
    rating: 5,
    text: "After trying multiple platforms, I've finally found one that meets all my needs. The execution speed and reliability are unmatched in the industry."
  },
  {
    name: "Michael",
    title: "Day Trader",
    rating: 5,
    text: "The customer support is exceptional. Whenever I've had an issue, the team resolves it quickly. The platform's stability gives me confidence in my trades."
  }
]

export default function TestimonialsAndGuides() {
  // State for the testimonial carousel
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  
  // Handle navigation
  const goToPrev = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }
  
  const goToNext = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }
  
  // Current testimonial to display
  const currentTestimonial = testimonials[currentTestimonialIndex]

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col mt-12 sm:mt-16 md:mt-20">
      {/* Testimonials Section */}
      <div className="w-full bg-gradient-to-b from-zinc-900 to-green-800/70 text-white p-6 sm:p-8 md:p-12 rounded-3xl">
        <div className="w-full mx-auto grid md:grid-cols-2 gap-8">
          {/* Left side - Heading and company logos */}
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              What <span className="text-green-400">clients</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              say about us
            </h2>

            <div className="flex flex-wrap gap-8 sm:gap-12">
              {/* Company Logo 1 */}
              <div className="space-y-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-300">26 reviews</p>
              </div>

              {/* Company Logo 2 */}
              <div className="space-y-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-300">26 reviews</p>
              </div>
            </div>
          </div>

          {/* Right side - Testimonial Carousel */}
          <div className="flex flex-col justify-center mt-6 md:mt-0">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold">{currentTestimonial.name}</h3>
              <p className="text-gray-300">{currentTestimonial.title}</p>
              <div className="flex mb-2">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                ))}
              </div>
              <p className="text-base sm:text-lg">
                {currentTestimonial.text}
              </p>

              {/* Navigation arrows */}
              <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
                <button 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700/50 rounded-full flex items-center justify-center"
                  onClick={goToPrev}
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button 
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700/50 rounded-full flex items-center justify-center"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                {/* Testimonial indicators */}
                <div className="flex items-center ml-2 space-x-1">
                  {testimonials.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentTestimonialIndex 
                          ? "bg-green-400" 
                          : "bg-gray-500"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => setCurrentTestimonialIndex(index)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guides Section */}
      <div className="w-full mx-auto py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16">Guides</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Guide Card 1 */}
          <div className="bg-white rounded-xl p-5 sm:p-8 shadow-md">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Supply and Demand in Commodities</h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Supply and Demand in Commodities</p>
            <div className="w-auto">
              <AnimatedLink href="#" className="w-full sm:w-auto">Learn More</AnimatedLink>
            </div>
          </div>

          {/* Guide Card 2 */}
          <div className="bg-white rounded-xl p-5 sm:p-8 shadow-md flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex flex-col">
              Trading Oil in Volatile <span>Markets</span>
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Trading Oil in Volatile Markets</p>
            <div className="w-auto">
              <AnimatedLink href="#" className="w-full sm:w-auto">Learn More</AnimatedLink>
            </div>
          </div>

          {/* Guide Card 3 */}
          <div className="bg-white rounded-xl p-5 sm:p-8 shadow-md">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Gold: A Reliable Asset for Uncertain Times?</h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Gold: A Reliable Asset for Uncertain Times?</p>
            <div className="w-auto">
              <AnimatedLink href="#" className="w-full sm:w-auto">Learn More</AnimatedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
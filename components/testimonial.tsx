import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { AnimatedLink } from "./animatedLink"

export default function TestimonialsAndGuides() {
  return (
    <div className="w-[90vw] items-center justify-center flex flex-col ml-15 mt-20">
      {/* Testimonials Section */}
      <div className="w-full bg-gradient-to-b from-zinc-900 to-green-800/70 text-white p-8 md:p-12 rounded-3xl">
        <div className="w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Left side - Heading and company logos */}
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold">
              What <span className="text-green-400">clients</span>
              <br />
              say about us
            </h2>

            <div className="flex space-x-12">
              {/* Company Logo 1 */}
              <div className="space-y-2">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-white" />
                  ))}
                </div>
                <p className="text-sm text-gray-300">26 reviews</p>
              </div>

              {/* Company Logo 2 */}
              <div className="space-y-2">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-white" />
                  ))}
                </div>
                <p className="text-sm text-gray-300">26 reviews</p>
              </div>
            </div>
          </div>

          {/* Right side - Testimonial */}
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">James</h3>
              <p className="text-gray-300">Professional</p>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-white" />
                ))}
              </div>
              <p className="text-lg">
                The platform is seamless, and the insights are game-changers. With zero downtime and advanced tools, my
                trading experience has significantly improved!
              </p>

              {/* Navigation arrows */}
              <div className="flex space-x-4 mt-6">
                <button className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guides Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-5xl font-bold text-center mb-16">Guides</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Guide Card 1 */}
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-bold mb-4">Supply and Demand in Commodities</h3>
            <p className="text-gray-600 mb-8">Supply and Demand in Commodities</p>
            <div className="w-10">
            <AnimatedLink href="#">Learn More</AnimatedLink>
            </div>
          </div>

          {/* Guide Card 2 */}
          <div className="bg-white rounded-xl p-8 shadow-md flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex flex-col">Trading Oil in Volatile <span> Markets</span></h3>
            <p className="text-gray-600 mb-8">Trading Oil in Volatile Markets</p>
            <div className="w-10">
            <AnimatedLink href="#">Learn More</AnimatedLink>
            </div>
          </div>

          {/* Guide Card 3 */}
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-bold mb-4">Gold: A Reliable Asset for Uncertain Times?</h3>
            <p className="text-gray-600 mb-8">Gold: A Reliable Asset for Uncertain Times?</p>
            <div className="w-10">
            <AnimatedLink href="#">Learn More</AnimatedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


import React from 'react'
import { cn } from "@/lib/utils";
import { AnimatedLink } from './animatedLink';

const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];
   
  const firstRow = reviews.slice(0, reviews.length / 2);
   
  const ReviewCard = ({
    img,
    name,
    username,
    body,
  }: {
    img: string;
    name: string;
    username: string;
    body: string;
  }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-4 flex-shrink-0",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <img className="rounded-full" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    );
  };

function Asset() {
  return (
    <div className="w-full overflow-hidden">
      <div className='flex flex-col justify-center items-center my-16 px-4 text-center'>
        <p className='text-4xl md:text-7xl font-light flex flex-col justify-center items-center'>
          Multi-Asset Trading.
          <span>Connect with</span>
          <span className='bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent'>global markets</span>
        </p>
        <p className='text-xl md:text-4xl mt-4'>Trade the Markets That Move the World.</p>
      </div>

      {/* Full-width marquee container with no horizontal padding or margins */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden my-8">
        {/* First row - Left to right */}
        <div className="relative overflow-hidden w-full">
          <div 
            className="flex flex-nowrap items-center animate-slide-left py-4"
            style={{
              animationDuration: '30s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          >
            {/* Triple the content to ensure it spans the full width for ultra-wide screens */}
            {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((review, index) => (
              <ReviewCard key={`${review.username}-row1-${index}`} {...review} />
            ))}
          </div>
          
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white dark:from-black z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white dark:from-black z-10"></div>
        </div>
        
        {/* Second row - Right to left */}
        <div className="relative overflow-hidden w-full">
          <div 
            className="flex flex-nowrap items-center animate-slide-right py-4"
            style={{
              animationDuration: '25s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          >
            
          </div>
          
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white dark:from-black z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white dark:from-black z-10"></div>
        </div>
        <div className='w-full flex justify-center items-center'>
        <AnimatedLink href='#'>Start Trading</AnimatedLink>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        @keyframes slide-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slide-left {
          animation: slide-left linear infinite;
        }
        
        .animate-slide-right {
          animation: slide-right linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Asset
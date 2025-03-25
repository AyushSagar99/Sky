'use client';
import { motion } from 'framer-motion';
import { AnimatedLink } from './animatedLink';

export default function AnimatedCTA() {
  return (
    <div className="flex justify-center items-center ml-35">
      <motion.div
        className="relative w-full p-16 rounded-3xl overflow-hidden flex flex-col items-center text-center"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ 
          backgroundSize: '300% 100%', 
          backgroundImage: 'linear-gradient(90deg, rgba(204, 255, 204, 0.9), rgba(173, 216, 230, 0.9), rgba(154, 209, 212, 0.9), rgba(173, 216, 230, 0.9), rgba(204, 255, 204, 0.9))',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <h2 className="text-6xl font-medium text-black">Ready?</h2>
        <p className="text-5xl font-medium text-black mt-2 mb-10">Let&apos;s make it happen.</p>
        <div className="relative inline-block">
          <AnimatedLink href='#'>Open an account</AnimatedLink>
        </div>
      </motion.div>
    </div>
  );
}
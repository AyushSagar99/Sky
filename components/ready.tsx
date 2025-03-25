'use client';

import { motion } from 'framer-motion';
import { AnimatedLink } from './animatedLink';

export default function AnimatedCTA() {
  return (
    <div className="flex justify-center items-center w-full">
      <motion.div
        className="relative w-full p-10 rounded-3xl overflow-hidden flex flex-col items-center text-center"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%', backgroundImage: 'linear-gradient(90deg, #87CEFA, #B0E0E6, #87CEFA)' }}
      >
        <h2 className="text-6xl font-medium text-black">Ready?</h2>
        <p className="text-5xl font-medium text-black mt-2 mb-3">Let&apos;s make it happen.</p>
        <AnimatedLink href='#'>Open an account</AnimatedLink>
      </motion.div>
    </div>
  );
}

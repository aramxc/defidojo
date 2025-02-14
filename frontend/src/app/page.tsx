'use client';

import { BackgroundImage } from '@/components/background/BackgroundImage';
import { EnterButton } from '@/components/buttons/EnterButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative h-full">
          <BackgroundImage overrideImage="/assets/dojobg.png" />
          <div className="absolute inset-0 flex items-end justify-center pb-32">
            <EnterButton />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

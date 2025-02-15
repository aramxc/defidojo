'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Rock_Salt } from 'next/font/google';

const brushFont = Rock_Salt({ 
  weight: '400',
  subsets: ['latin'],
});

export function EnterButton() {
  const router = useRouter();

  const handleEnterDojo = async () => {
    // First animate out
    document.body.classList.add('fade-out');
    
    
    // Navigate
    router.push('/challenge');
    
    // Remove fade-out class after navigation
    document.body.classList.remove('fade-out');
  };

  return (
    <div className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2" data-testid="enter-button">
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: [20, -20],
          opacity: 1
        }}
        transition={{ 
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          },
          opacity: {
            duration: 0.5
          }
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)"
        }}
        onClick={handleEnterDojo}
        className={`px-8 py-3 
                   bg-gradient-to-r from-red-600 to-red-500 
                   text-white text-xl
                   rounded-xl
                   shadow-[0_10px_20px_rgba(239,68,68,0.3)]
                   border border-red-400/30
                   backdrop-blur-md
                   transition-all duration-300
                   hover:from-red-500 hover:to-red-600
                   hover:shadow-[0_15px_30px_rgba(239,68,68,0.4)]
                   hover:-translate-y-1
                   active:translate-y-1
                   text-shadow-[0_2px_2px_rgba(0,0,0,0.3)] 
                   ${brushFont.className}`}
      >
        Enter the Dojo
      </motion.button>
    </div>
  );
}
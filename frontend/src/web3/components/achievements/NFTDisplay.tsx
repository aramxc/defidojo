'use client';

import { useEffect, useState } from 'react'
import { useAchievement } from '@/web3/hooks/useAchievement'
import { AchievementType } from '@/web3/services/contractService'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { AchievementCard } from './AchievementCard'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
// import Image from 'next/image'

export function NFTDisplay({ address }: { address: `0x${string}` }) {
  const [achievements, setAchievements] = useState<AchievementType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [cardIndex, setCardIndex] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { getAllAchievements } = useAchievement()

  useEffect(() => {
    async function loadAchievements() {
      if (!address) return;
      try {
        const userAchievements = await getAllAchievements();
        setAchievements(userAchievements);
      } catch (error) {
        console.error('Error loading achievements:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadAchievements();
  }, [address, getAllAchievements]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (achievements.length === 0) return;
      
      if (e.key === 'ArrowLeft') {
        setCardIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCardIndex(prev => Math.min(achievements.length - 1, prev + 1));
      } else if (e.key === 'Escape') {
        setSelectedCard(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [achievements.length]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? -1 : 1;
      const newIndex = Math.max(0, Math.min(cardIndex + direction, achievements.length - 1));
      setCardIndex(newIndex);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center p-4">
        Loading achievements...
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Mobile View */}
      {isMobile && achievements.length > 0 && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm">
          <motion.div 
            className="w-full h-screen relative overflow-hidden flex items-center justify-center"
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${cardIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute flex w-full h-full items-center"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  className="w-full h-full flex-shrink-0 px-4 flex items-center justify-center"
                  style={{ x: `${index * 100}%` }}
                >
                  <div className="w-[85vw] h-[70vh] max-w-md">
                    <AchievementCard 
                      achievement={achievement}
                      onClick={() => setSelectedCard(achievement)}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === cardIndex ? 'bg-white' : 'bg-gray-500'
                  }`}
                  onClick={() => setCardIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Desktop View */}
      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement}
              achievement={achievement}
              onClick={() => setSelectedCard(achievement)}
            />
          ))}
        </div>
      )}

      {/* Mobile Achievement Modal */}
      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-[95vw] h-[90vh] max-w-4xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 backdrop-blur-sm 
                           rounded-full flex items-center justify-center z-50 
                           hover:bg-white/20 transition-colors duration-200"
                aria-label="Close achievement"
              >
                <svg 
                  className="w-4 h-4 text-white" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <AchievementCard achievement={selectedCard} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
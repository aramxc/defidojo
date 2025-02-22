'use client';

// import { useEffect, useState } from 'react'
import { useAchievement } from '@/web3/hooks/useAchievement'
import { AchievementType } from '@/web3/services/contractService'
// import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { AchievementCard } from './AchievementCard'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { truncateAddress } from '../wallets/WalletConnect';
import { useWallet } from '@/web3/contexts/WalletContext';
// import Image from 'next/image'

export function NFTDisplay() {
  const { achievements, isLoading, mintAchievement } = useAchievement()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { address } = useWallet()
  
  if (isLoading) {
    return <div className="text-white">Loading achievements...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Container for all content */}
      <div className="w-full max-w-4xl">
        {/* Header Info */}
        <div className="mb-4 text-gray-400 text-sm">
          <p>{truncateAddress(address!)}</p>
          <p className="text-xs text-gray-400">Total Achievements: {achievements.length}</p>
        </div>

        {/* Achievement Cards Grid */}
        <div className={`w-full grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-6 place-items-center`}>
          {achievements.map((achievement) => (
            <div key={achievement} className="w-full h-full max-w-[400px]">
              <AchievementCard
                achievement={achievement}
              />
            </div>
          ))}
        </div>

        {/* Development Mint Button */}
        {process.env.NODE_ENV === 'development' && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => mintAchievement(AchievementType.DOJO_MASTER)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 
                       text-white rounded-lg transition-colors duration-200 text-sm"
            >
              Mint Test Achievement
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
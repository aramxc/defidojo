'use client';

// import { useEffect, useState } from 'react'
import { useAchievement } from '@/web3/hooks/useAchievement'
import { AchievementCard } from './AchievementCard'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { truncateAddress } from '../wallets/WalletConnect';
import { useWallet } from '@/web3/contexts/WalletContext';
// import Image from 'next/image'

export function NFTDisplay() {
  const { achievements, isLoading } = useAchievement()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { address } = useWallet()
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-theme-text-primary">Loading achievements...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Header Info */}
      <div className="text-center">
        <p className="text-theme-text-accent">{truncateAddress(address!)}</p>
        <p className="text-sm text-theme-text-accent">Total Achievements: {achievements.length}</p>
      </div>

      {/* Achievement Cards Grid */}
      <div className={`w-full grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-6 place-items-center px-4`} 
           style={{ 
             gridTemplateColumns: achievements.length === 1 ? '1fr' : undefined 
           }}>
        <div className={achievements.length === 1 ? 'col-span-full flex justify-center' : ''}>
          {achievements.map((achievement) => (
            <AchievementCard key={achievement} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  )
}
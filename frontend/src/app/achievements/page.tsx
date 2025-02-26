'use client';

import { useState, useEffect } from 'react';
import { NFTDisplay } from '@/web3/components/achievements/NFTDisplay';
import PageLayout from '@/components/layout/PageLayout';
import { WalletConnect } from '@/web3/components/wallets/WalletConnect';
import { useWallet } from '@/web3/contexts/WalletContext';
import { Rock_Salt } from 'next/font/google';
import { useAchievement } from '@/web3/hooks/useAchievement';
import { AchievementType } from '@/web3/services/contractService';

const rockSalt = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
});

export default function AchievementsPage() {
  const [mounted, setMounted] = useState(false);
  const { address } = useWallet();
  const { mintAchievement, isLoading } = useAchievement();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <PageLayout>
        <div className="h-[100dvh] flex items-center justify-center">
          <h1 className="text-xl text-theme-text-primary">Loading...</h1>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="relative h-[100dvh]">
        {/* Header */}
        <div className="p-4 pb-2">
          <h1 className={`text-2xl md:text-xl text-theme-text-dark font-bold text-center ${rockSalt.className}`}>
            Achievements
          </h1>
        </div>

        {/* Main Content */}
        {address ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <NFTDisplay />
            <button 
              onClick={() => mintAchievement(AchievementType.DOJO_MASTER)}
              disabled={isLoading}
              className="mt-6 px-6 py-3 bg-theme-button-primary 
                        text-white rounded-lg shadow-lg hover:shadow-xl 
                        transform hover:scale-105 transition-all duration-200
                        font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Minting...' : 'Mint Test Achievement'}
            </button>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex flex-col items-center space-y-6">
                <p className="text-theme-text-dark text-lg">Connect your wallet to view achievements</p>
                <WalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

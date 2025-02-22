'use client';

import { useState, useEffect } from 'react';
import { NFTDisplay } from '@/web3/components/achievements/NFTDisplay';
import PageLayout from '@/components/layout/PageLayout';
import { WalletConnect } from '@/web3/components/wallets/WalletConnect';
import { useWallet } from '@/web3/contexts/WalletContext';
import { Rock_Salt } from 'next/font/google';

const rockSalt = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
});

export default function AchievementsPage() {
  const [mounted, setMounted] = useState(false);
  const { address } = useWallet();

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
      <div className="min-h-[100dvh] flex flex-col">
        {/* Header - Compact on mobile */}
        <div className="p-4 pb-2">
          <h1 className={`text-2xl md:text-xl text-theme-text-dark  font-bold text-center bg-clip-text ${rockSalt.className}`}>
            Achievements
          </h1>
          
        </div>

        {/* Main Content - Takes remaining space */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {address ? (
            <NFTDisplay />
          ) : (
            <div className="h-full flex items-center justify-center p-4">
              <div className="text-center">
                <p className="text-theme-text mb-4">Connect your wallet to view achievements</p>
                <WalletConnect />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

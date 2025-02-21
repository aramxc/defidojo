'use client';

import { useState, useEffect } from 'react';
import { NFTDisplay } from '@/web3/components/Achievements/NFTDisplay';
import { useAccount } from 'wagmi';
import PageLayout from '@/components/layout/PageLayout';
import { WalletConnect, truncateAddress } from '@/web3/components/wallets/WalletConnect';
export default function AchievementsPage() {
  const [mounted, setMounted] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-theme-text-primary">Loading...</h1>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
            Achievement Collection
          </h1>
          <p className="text-theme-text text-center mt-2">
            Showcase your learning journey with unique NFT achievements
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-theme-panel-bg rounded-xl p-6 backdrop-blur-sm 
                      border border-theme-panel-border shadow-lg">
          {address ? (
            <div>
              <p>Connected to {truncateAddress(address)}</p>
              <NFTDisplay address={address} />
            </div>
          ) : (
            <div className="text-theme-text text-center p-8 bg-theme-background/50 rounded-lg">
              <p className="text-lg mb-4">Connect your wallet to view achievements</p>
              <WalletConnect />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

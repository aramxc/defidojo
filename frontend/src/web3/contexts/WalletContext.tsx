'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAccount, useWalletClient, useDisconnect } from 'wagmi';
import { WalletClient } from 'viem';

interface WalletContextType {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  walletClient: WalletClient | undefined;
  chainId: number | undefined;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address, isConnected, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { disconnect } = useDisconnect();

  const value = {
    address,
    isConnected,
    walletClient,
    chainId: chain?.id,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
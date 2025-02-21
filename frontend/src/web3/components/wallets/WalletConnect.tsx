'use client';

import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { metaMask } from '@wagmi/connectors';
import Image from 'next/image';

export const truncateAddress = (addr: string) => { // truncate to first 6 and last 4 characters
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export function WalletConnect() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

 

  if (isConnected && address) {
    return (
      <button 
        onClick={() => disconnect()}
        className="px-4 py-2 bg-theme-button-primary rounded-lg flex items-center gap-2 
                 hover:bg-theme-button-primary/80 transition-colors"
      >
        <Image 
          src="/metamask-logo.svg" 
          alt="MetaMask" 
          width={20} 
          height={20} 
        />
        <span className="font-mono">{truncateAddress(address)}</span>
      </button>
    );
  }

  return (
    <button 
      onClick={() => connect({ connector: metaMask() })}
      className="px-4 py-2 bg-theme-button-primary rounded-lg flex items-center gap-2
               hover:bg-theme-button-primary/80 transition-colors"
    >
      <Image 
        src="/metamask-logo.svg" 
        alt="MetaMask" 
        width={20} 
        height={20} 
      />
      Connect MetaMask
    </button>
  );
}
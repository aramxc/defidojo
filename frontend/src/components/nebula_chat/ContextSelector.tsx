'use client';

import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ChatContext } from '@/hooks/useNebula';

interface ContextSelectorProps {
  context: ChatContext;
  setContext: (context: ChatContext) => void;
}

export const ContextSelector: React.FC<ContextSelectorProps> = ({ context, setContext }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Temporary hardcoded chains - you can replace this later
  const chains = [
    { id: '1', name: 'Ethereum Mainnet' },
    { id: '137', name: 'Polygon' },
    { id: '11155111', name: 'Sepolia' },
  ];

  const handleChainChange = (chainId: string) => {
    if (chainId) {
      setContext({ ...context, chainIds: [chainId] });
    } else {
      const newContext = { ...context };
      delete newContext.chainIds;
      setContext(newContext);
    }
  };

  const handleWalletChange = (address: string) => {
    if (address) {
      setContext({ ...context, walletAddress: address });
    } else {
      const newContext = { ...context };
      delete newContext.walletAddress;
      setContext(newContext);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-2 rounded-lg
                   text-gray-400 hover:text-white
                   transition-all duration-200"
      >
        <SettingsIcon className="w-5 h-5" />
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-64
                      bg-[#1F2937] dark:bg-[#1A1F2E]
                      border border-theme-border-secondary
                      rounded-lg shadow-xl p-4 space-y-4">
          {/* Chain Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Chain (Optional)</label>
            <select
              value={context.chainIds?.[0] || ''}
              onChange={(e) => handleChainChange(e.target.value)}
              className="w-full p-2 rounded-lg
                         bg-[#111827] dark:bg-[#0F1629]
                         border border-theme-border-secondary
                         text-white
                         focus:outline-none focus:ring-2 focus:ring-theme-button-primary/20"
            >
              <option value="">None</option>
              {chains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>

          {/* Wallet Address Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Wallet Address (Optional)</label>
            <input
              type="text"
              value={context.walletAddress || ''}
              onChange={(e) => handleWalletChange(e.target.value)}
              placeholder="0x..."
              className="w-full p-2 rounded-lg
                         bg-[#111827] dark:bg-[#0F1629]
                         border border-theme-border-secondary
                         text-white placeholder:text-gray-600
                         focus:outline-none focus:ring-2 focus:ring-theme-button-primary/20"
            />
          </div>
        </div>
      )}
    </div>
  );
};
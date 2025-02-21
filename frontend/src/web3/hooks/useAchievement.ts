import { useCallback } from 'react';
import { ContractService, AchievementType } from '@/web3/services/contractService';
import { useWallet } from '@/web3/contexts/WalletContext';

export function useAchievement() {
  const { address, walletClient, chainId, isConnected } = useWallet();

  const checkAchievement = useCallback(async (type: AchievementType) => {
    if (!address || !chainId) throw new Error('Wallet not connected');
    return ContractService.checkAchievement(address, type, chainId);
  }, [address, chainId]);

  const getAllAchievements = useCallback(async () => {
    if (!address || !chainId) throw new Error('Wallet not connected');
    
    // Get all achievement types
    const types = Object.values(AchievementType).filter(
      (value): value is AchievementType => typeof value === 'number'
    );

    // Check each achievement type
    const results = await Promise.all(
      types.map(async (type) => {
        const hasAchievement = await ContractService.checkAchievement(address, type, chainId);
        return hasAchievement ? type : null;
      })
    );

    // Filter out null values and return owned achievements
    return results.filter((type): type is AchievementType => type !== null);
  }, [address, chainId]);

  const mintAchievement = useCallback(async (type: AchievementType) => {
    if (!walletClient || !address || !chainId) {
      throw new Error('Wallet not connected');
    }
    
    const tokenURI = `https://example.com/metadata/${type}`; // placeholder URI
    return ContractService.mintAchievement(
      address,
      type, 
      tokenURI,
      walletClient,
    );
  }, [walletClient, address, chainId]);

  return { 
    checkAchievement, 
    getAllAchievements,
    mintAchievement,
    isWalletConnected: isConnected,
    address 
  };
}
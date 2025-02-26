import { useCallback } from 'react';
import { ContractService, AchievementType } from '@/web3/services/contractService';
import { useWallet } from '@/web3/contexts/WalletContext';
import { useQuery } from '@tanstack/react-query';

export function useAchievement() {
  const { address, isConnected, chainId, walletClient } = useWallet();

  // Use React Query to cache the results and prevent unnecessary calls
  const { data: achievements = [], isLoading, refetch } = useQuery({
    queryKey: ['achievements', address, chainId],
    queryFn: async () => {
      if (!address || !chainId) return [];
      
      const types = Object.values(AchievementType).filter(
        (value): value is AchievementType => typeof value === 'number'
      );

      const results = await Promise.allSettled(
        types.map(async (type) => {
          try {
            const hasAchievement = await ContractService.checkAchievement(address, type, chainId);
            return hasAchievement ? type : null;
          } catch (error) {
            console.warn(`Error checking achievement type ${type}:`, error);
            return null;
          }
        })
      );

      return results
        .filter((result): result is PromiseFulfilledResult<AchievementType | null> => 
          result.status === 'fulfilled')
        .map(result => result.value)
        .filter((type): type is AchievementType => type !== null);
    },
    enabled: Boolean(address && chainId),
  });

  const mintAchievement = useCallback(async (type: AchievementType) => {
    if (!isConnected || !address || !chainId || !walletClient) {
      throw new Error('Please connect your wallet first');
    }
    
    const tokenURI = `https://example.com/metadata/${type}`; // placeholder URI
    const hash = await ContractService.mintAchievement(
      address,
      type,
      tokenURI,
      walletClient
    );
    
    // Add a small delay to allow the blockchain to update
    await new Promise(resolve => setTimeout(resolve, 1000));
    await refetch();
    
    return hash;
  }, [isConnected, address, chainId, walletClient, refetch]);

  return { 
    achievements,
    isLoading,
    mintAchievement,
    isConnected,
    address 
  };
}
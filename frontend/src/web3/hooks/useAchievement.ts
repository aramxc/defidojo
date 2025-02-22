import { useCallback } from 'react';
import { ContractService, AchievementType } from '@/web3/services/contractService';
import { useWallet } from '@/web3/contexts/WalletContext';
import { useQuery } from '@tanstack/react-query';

export function useAchievement() {
  const { address, walletClient, chainId, isConnected } = useWallet();

  // Use React Query to cache the results and prevent unnecessary calls
  const { data: achievements = [], isLoading } = useQuery({
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
    achievements,
    isLoading,
    mintAchievement,
    isWalletConnected: isConnected,
    address 
  };
}
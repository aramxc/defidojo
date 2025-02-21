import { createPublicClient, http, Address, WalletClient } from 'viem';
import { hardhat, mainnet } from 'viem/chains';
import { DOJO_ACHIEVEMENT_NFT_ABI } from '../contracts/abis/DojoAchievementNFT';

// Use environment variables for contract addresses
const CONTRACT_ADDRESS = {
  [hardhat.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`,
  [mainnet.id]: process.env.NEXT_PUBLIC_MAINNET_CONTRACT_ADDRESS as `0x${string}`, // set in vercel dashboard for production deployment
} as const;


export enum AchievementType {
  DOJO_MASTER,
  SOLIDITY_SENSEI,
  QUICK_REFLEXES,
  COMMUNITY_CONTRIBUTOR,
  NOT_SO_RUSTY
}

// Public client for read operations
const publicClient = createPublicClient({
  chain: process.env.NODE_ENV === 'development' ? hardhat : mainnet,
  transport: http()
});

export const ContractService = {
  getContractAddress: (chainId: number): Address => {
    const address = CONTRACT_ADDRESS[chainId as keyof typeof CONTRACT_ADDRESS];
    if (!address) throw new Error(`No contract address for chain ${chainId}`);
    return address as Address;
  },

  checkAchievement: async (walletAddress: Address, achievementType: AchievementType, chainId: number) => {
    try {
      const hasAchievement = await publicClient.readContract({
        address: ContractService.getContractAddress(chainId),
        abi: DOJO_ACHIEVEMENT_NFT_ABI,
        functionName: 'hasAchievement',
        args: [walletAddress, achievementType]
      });
      return hasAchievement;
    } catch (error) {
      console.error('Error checking achievement:', error);
      return false;
    }
  },

  mintAchievement: async (
    userWallet: Address, 
    achievementType: AchievementType, 
    tokenURI: string,
    walletClient: WalletClient,
  ) => {
    if (!walletClient) throw new Error('Wallet client is required for minting');
    
    try {
      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESS[hardhat.id],
        abi: DOJO_ACHIEVEMENT_NFT_ABI,
        functionName: 'awardAchievement',
        args: [userWallet, achievementType, tokenURI],
        account: userWallet,
      });

      const hash = await walletClient.writeContract(request);
      return hash;
    } catch (error) {
      console.error('Error minting achievement:', error);
      throw error;
    }
  }
};
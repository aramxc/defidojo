import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  // Non-default networks
  networks: {
    // Sepolia testnet
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 11155111
    },
    // Polygon Amoy testnet
    amoy: {
      url: `https://api-amoy.polygonscan.com/api?apikey=${process.env.POLYGONSCAN_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 80001
    }
  },
  
  // Verify contracts on Etherscan/Polygonscan
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
    }
  }
};

export default config;
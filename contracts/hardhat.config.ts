import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    // Local development network
    hardhat: {
      chainId: 31337
    },
    // Local running node
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat Node
      chainId: 31337,
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // First 3 accounts in local hardhat node
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
      ]
    },
    // Sepolia testnet (when ready to deploy to testnet)
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  },
  // For verifying contracts on Etherscan
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;
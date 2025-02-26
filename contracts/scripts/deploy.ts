import { ethers } from "hardhat";

async function main() {
  // Ensure the network is running and accessible
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", await deployer.getAddress());
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const DojoAchievementNFT = await ethers.getContractFactory("DojoAchievementNFT");
  const dojoAchievementNFT = await DojoAchievementNFT.deploy();

  await dojoAchievementNFT.waitForDeployment();

  console.log("DojoAchievementNFT deployed to:", await dojoAchievementNFT.getAddress());
}

main().catch((error) => {
  console.error("Error deploying contract:", error);
  process.exitCode = 1;
});
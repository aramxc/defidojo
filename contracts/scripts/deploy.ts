import { ethers } from "hardhat";

async function main() {
  const DojoAchievementNFT = await ethers.getContractFactory("DojoAchievementNFT");
  const dojoAchievementNFT = await DojoAchievementNFT.deploy();

  await dojoAchievementNFT.waitForDeployment();

  console.log("DojoAchievementNFT deployed to:", await dojoAchievementNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
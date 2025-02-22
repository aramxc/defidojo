import fs from 'fs';
import path from 'path';

async function copyArtifacts() {
  // Read the DojoAchievementNFT artifact
  const artifact = require('../artifacts/contracts/Achievements.sol/DojoAchievementNFT.json');
  
  // Frontend path only
  const frontendPath = path.join(__dirname, '../frontend-abis/DojoAchievementNFT.ts');
  const frontendContent = `
export const DOJO_ACHIEVEMENT_NFT_ABI = ${JSON.stringify(artifact.abi, null, 2)} as const;
  `.trim();
  
  fs.writeFileSync(frontendPath, frontendContent);
  console.log('Successfully copied ABI to frontend');
}

copyArtifacts().catch(console.error);
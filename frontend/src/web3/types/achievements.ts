import { AchievementType } from '../services/contractService';

export const ACHIEVEMENT_IMAGE_PATH: Record<AchievementType, string> = {
  [AchievementType.DOJO_MASTER]: '/assets/achievements/dojo-master.png',
//   [AchievementType.SOLIDITY_SENSEI]: '/images/achievements/solidity-sensei.png',
//   [AchievementType.QUICK_REFLEXES]: '/images/achievements/quick-reflexes.png',
//   [AchievementType.COMMUNITY_CONTRIBUTOR]: '/images/achievements/community-contributor.png',
//   [AchievementType.NOT_SO_RUSTY]: '/images/achievements/not-so-rusty.png',
} as const;

export const ACHIEVEMENT_TITLES: Record<AchievementType, string> = {
  [AchievementType.DOJO_MASTER]: 'Dojo Master',
//   [AchievementType.SOLIDITY_SENSEI]: 'Solidity Sensei',
//   [AchievementType.QUICK_REFLEXES]: 'Quick Reflexes',
//   [AchievementType.COMMUNITY_CONTRIBUTOR]: 'Community Contributor',
//   [AchievementType.NOT_SO_RUSTY]: 'Not So Rusty',
} as const;
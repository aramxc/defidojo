import { motion } from 'framer-motion';
import { AchievementType } from '@/web3/services/contractService';
import Image from 'next/image';

interface AchievementCardProps {
  achievement: AchievementType;
  onClick?: () => void;
}

// TODO Refactory achievement details
export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const getAchievementDetails = (type: AchievementType) => {
    const details: Record<AchievementType, { title: string; description: string; image: string }> = {
      [AchievementType.DOJO_MASTER]: {
        title: 'Dojo Master',
        description: 'Mastered the art of blockchain development',
        image: '/public/assets/achievements/dojo-master.png',
      },
      [AchievementType.SOLIDITY_SENSEI]: {
        title: 'Solidity Sensei',
        description: 'Achieved mastery in Solidity',
        image: '/assets/achievements/solidity-sensei.png',
      },
      [AchievementType.QUICK_REFLEXES]: {
        title: 'Quick Reflexes',
        description: 'Lightning fast problem solver',
        image: '/assets/achievements/quick-reflexes.png',
      },
      [AchievementType.COMMUNITY_CONTRIBUTOR]: {
        title: 'Community Contributor',
        description: 'Valuable community member',
        image: '/assets/achievements/community.png',
      },
      [AchievementType.NOT_SO_RUSTY]: {
        title: 'Not So Rusty',
        description: 'Kept your skills sharp',
        image: '/assets/achievements/not-so-rusty.png',
      }
    };
    return details[type] || { title: 'Unknown Achievement', description: '', image: '' };
  };

  const { title, description, image } = getAchievementDetails(achievement);

  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <HolographicCard>
        <div className="space-y-4 p-6">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-white/80">{description}</p>
          </div>
        </div>
      </HolographicCard>
    </motion.div>
  );
}

export function HolographicCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-green-500 p-[1px]"
    >
      <div className="bg-black rounded-2xl h-full w-full">
        {children}
      </div>
    </div>
  );
}
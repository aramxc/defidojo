import { AchievementType } from '@/web3/services/contractService';
import Image from 'next/image';
import { ACHIEVEMENT_IMAGE_PATH, ACHIEVEMENT_TITLES } from '@/web3/types/achievements';

interface AchievementCardProps {
  achievement: AchievementType;
  onClick?: () => void;
}

// TODO Refactory achievement details
export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  return (
    <div 
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-xl 
                 border border-white/10 backdrop-blur-sm
                 hover:border-white/20 transition-all duration-300
                 w-full h-[300px] max-w-[300px]"
    >
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div className="w-full h-full relative">
          <Image
            src={ACHIEVEMENT_IMAGE_PATH[achievement]}
            alt={ACHIEVEMENT_TITLES[achievement]}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-contain transform group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10">
        <h3 className="text-xl md:text-lg font-bold text-white">
          {ACHIEVEMENT_TITLES[achievement]}
        </h3>
      </div>
    </div>
  );
}

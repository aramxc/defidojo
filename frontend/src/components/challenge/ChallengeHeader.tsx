import { Challenge } from '@/types/challenge';
import { Rock_Salt } from 'next/font/google';
import TagBadge from '@/components/shared/TagBadge';

interface ChallengeHeaderProps {
  challenge: Challenge;
}

const brushFont = Rock_Salt({ 
  weight: '400',
  subsets: ['latin'],
});

export default function ChallengeHeader({ challenge }: ChallengeHeaderProps) {
  // Create difficulty tag object
  const difficultyTag = {
    id: 'difficulty',
    name: challenge.difficulty,
    color: getDifficultyColor(challenge.difficulty),
    background_color: getDifficultyBgColor(challenge.difficulty),
  };

  return (
    <div className="mb-4 lg:mb-6">
      <h1 className={`text-xl md:text-2xl text-center lg:text-3xl font-bold text-theme-text-dark mb-3 ${brushFont.className}`} data-testid="challenge-title">
        {challenge.title}
      </h1>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <TagBadge tag={difficultyTag} animate={false} size="sm" />
        {challenge.tags?.map((tag) => (
          <TagBadge key={tag.id} tag={tag} animate={false} size="sm" />
        ))}
      </div>
    </div>
  );
}

// Helper functions for difficulty colors
function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'rgb(52, 211, 153)';
    case 'medium':
      return 'rgb(249, 115, 22)';
    case 'hard':
      return 'rgb(239, 68, 68)';
    default:
      return 'rgb(156, 163, 175)';
  }
}

function getDifficultyBgColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'rgba(52, 211, 153, 0.1)';
    case 'medium':
      return 'rgba(249, 115, 22, 0.1)';
    case 'hard':
      return 'rgba(239, 68, 68, 0.1)';
    default:
      return 'rgba(156, 163, 175, 0.1)';
  }
}
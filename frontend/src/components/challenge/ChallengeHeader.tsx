import { Challenge } from '@/types/challenge';

interface ChallengeHeaderProps {
  challenge: Challenge;
}

export default function ChallengeHeader({ challenge }: ChallengeHeaderProps) {
  // Map difficulty to color scheme
  const difficultyColors = {
    Easy: {
      text: 'text-theme-button-primary',
      bg: 'bg-theme-button-primary/10',
    },
    Medium: {
      text: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    Hard: {
      text: 'text-red-500',
      bg: 'bg-red-500/10',
    },
  };

  return (
    <div className="mb-4 lg:mb-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-theme-text-primary mb-2">
        {challenge.title}
      </h1>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <span 
          className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium
            ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors].bg} 
            ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors].text}`}
        >
          {challenge.difficulty}
        </span>
        {challenge.tags.map((tag) => (
          <span
            key={tag.id}
            className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium`}
            style={{
              backgroundColor: tag.backgroundColor,
              color: tag.color,
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
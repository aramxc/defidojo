import { Challenge } from "@/types/challenge";

interface ChallengeDescriptionProps {
  challenge: Challenge;
}

export default function ChallengeDescription({ challenge }: ChallengeDescriptionProps) {
  return (
    <div className="prose max-w-none">
      <h2 className="text-xl font-semibold mb-4 text-theme-text-primary">Description</h2>
      <p className="text-theme-text-secondary whitespace-pre-wrap">
        {challenge.description}
      </p>
      
      <h3 className="text-lg font-semibold mb-2 mt-6 text-theme-text-primary">Examples:</h3>
      <div className="space-y-3">
        {challenge.examples.map((example, index) => (
          <div key={index} className="bg-theme-bg-accent/50 p-4 rounded-lg">
            <code className="text-sm text-theme-text-secondary block">
              Input: {example.input}
            </code>
            <code className="text-sm text-theme-text-secondary block">
              Output: {example.output}
            </code>
            {example.explanation && (
              <p className="text-sm text-theme-text-secondary mt-2 border-t border-theme-bg-accent pt-2">
                {example.explanation}
              </p>
            )}
          </div>
        ))}
      </div>
      
      <h3 className="text-lg font-semibold mb-2 mt-6 text-theme-text-primary">Constraints:</h3>
      <ul className="list-disc list-inside text-theme-text-secondary space-y-1">
        {challenge.constraints.map((constraint, index) => (
          <li key={index}>{constraint}</li>
        ))}
      </ul>
    </div>
  );
}
'use client';

import { useChallenge } from '@/contexts/ChallengeContext';

export default function ChallengeDescription() {
  const { challenge } = useChallenge();

  if (!challenge) return null;

  return (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-theme-text-primary mb-2">Description</h2>
        <p className="text-theme-text-secondary">{challenge.description}</p>
      </div>

      {/* Constraints */}
      <div>
        <h3 className="text-lg font-semibold text-theme-text-primary mb-3">Constraints</h3>
        <ul className="list-none space-y-2">
          {challenge.constraints.map((constraint, index) => (
            <li 
              key={index}
              className="flex items-start gap-2 text-theme-text-secondary"
            >
              <span className="text-theme-text-accent">•</span>
              <span>{constraint}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Examples */}
      {challenge.examples && challenge.examples.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-theme-text-primary mb-3">Examples</h3>
          <div className="space-y-4">
            {challenge.examples.map((example, index) => (
              <div 
                key={index}
                className="bg-theme-bg-accent/10 rounded-lg p-4 border border-theme-border-primary"
              >
                <div className="space-y-2">
                  <div className="font-mono text-sm">
                    <span className="text-theme-text-accent">Input: </span>
                    <span className="text-theme-text-primary">{example.input}</span>
                  </div>
                  <div className="font-mono text-sm">
                    <span className="text-theme-text-accent">Output: </span>
                    <span className="text-theme-text-primary">{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="text-sm text-theme-text-secondary mt-2 border-t border-theme-border-primary pt-2">
                      {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default function ChallengeDescription() {
    return (
      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold mb-4 text-theme-text-primary">Description</h2>
        <p className="text-theme-text-secondary mb-4">
          Write a function that takes an array of numbers and returns their sum.
        </p>
        
        <h3 className="text-lg font-semibold mb-2 text-theme-text-primary">Examples:</h3>
        <pre className="bg-theme-bg-accent/50 p-4 rounded-lg mb-4">
          <code className="text-sm text-theme-text-secondary">
            arraySum([1, 2, 3]) → 6{'\n'}
            arraySum([5, -1, 2]) → 6{'\n'}
            arraySum([]) → 0
          </code>
        </pre>
        
        <h3 className="text-lg font-semibold mb-2 text-theme-text-primary">Constraints:</h3>
        <ul className="list-disc list-inside text-theme-text-secondary space-y-1">
          <li>Array length will be between 0 and 1000</li>
          <li>Array elements will be between -1000 and 1000</li>
        </ul>
      </div>
    );
  }
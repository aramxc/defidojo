export default function TestResults() {
    return (
      <div>
        <h2 className="text-xl font-semibold text-theme-text-primary mb-4">Test Results</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-theme-button-primary/10 text-theme-button-primary rounded-lg">
            <span>Test Case 1: [1, 2, 3] → 6</span>
            <span>✓ Passed</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-500/10 text-red-500 rounded-lg">
            <span>Test Case 2: [5, -1, 2] → 6</span>
            <span>✗ Failed</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-theme-bg-accent/50 text-theme-text-accent rounded-lg">
            <span>Test Case 3: [] → 0</span>
            <span>Not run</span>
          </div>
        </div>
      </div>
    );
  }
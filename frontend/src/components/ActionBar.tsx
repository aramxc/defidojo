export default function ActionBar() {
    return (
      <div className="flex gap-3">
        <button className="flex-1 bg-theme-button-primary hover:bg-theme-button-hover text-theme-text-primary px-6 py-3 rounded-xl font-medium transition-colors">
          Run Tests
        </button>
        <button className="flex-1 bg-theme-button-secondary hover:bg-theme-button-hover text-theme-text-primary px-6 py-3 rounded-xl font-medium transition-colors">
          Submit Solution
        </button>
      </div>
    );
  }
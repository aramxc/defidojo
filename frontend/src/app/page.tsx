import CodeEditor from '@/components/editor/CodeEditor';
import ChallengeDescription from '@/components/challenge/ChallengeDescription';
import TestResults from '@/components/TestResults';
import ActionBar from '@/components/ActionBar';
import ThemeSelector from '@/components/ThemeSelector';
import ChallengeHeader from '@/components/challenge/ChallengeHeader';

// This would come from your database
const mockChallenge = {
  id: '1',
  title: 'Simple Token Balance Checker',
  difficulty: 'Easy' as const,
  tags: [
    {
      id: '1',
      name: 'Solidity',
      color: 'rgb(103, 76, 196)', // Purple
      backgroundColor: 'rgba(103, 76, 196, 0.1)',
    },
    {
      id: '2',
      name: 'ERC20',
      color: 'rgb(59, 130, 246)', // Blue
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      id: '3',
      name: 'View Functions',
      color: 'rgb(16, 185, 129)', // Green
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    }
  ],
  description: `Create a function that checks if an address has a token balance greater than a specified amount.`  
};
  
  export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-bg-primary via-theme-bg-secondary to-theme-bg-primary">
      <main className="container mx-auto px-4 py-4 h-screen flex flex-col">
        {/* Theme Selector - Positioned in top right */}
        <div className="absolute top-4 right-4">
          <ThemeSelector />
        </div>

        {/* Challenge Header */}
        <ChallengeHeader challenge={mockChallenge} />

        {/* Main Challenge Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-0">
          {/* Left Panel - Description with scrolling */}
          <div className="bg-theme-panel-bg rounded-xl backdrop-blur-sm border border-theme-panel-border flex flex-col min-h-0">
            <div className="p-4 lg:p-6 overflow-y-auto custom-scrollbar">
              <ChallengeDescription challenge={mockChallenge} />
            </div>
          </div>

          {/* Right Panel - Code Editor & Results */}
          <div className="flex flex-col gap-4 min-h-0">
            {/* Code Editor */}
            <div className="flex-1 bg-theme-panel-bg rounded-xl backdrop-blur-sm border border-theme-panel-border min-h-0">
              <div className="h-full p-4 lg:p-6">
                <CodeEditor />
              </div>
            </div>
            
            {/* Action Bar */}
            <div className="h-auto">
              <ActionBar />
            </div>

            {/* Test Results Panel */}
            <div className="bg-theme-panel-bg rounded-xl backdrop-blur-sm border border-theme-panel-border">
              <div className="p-4 lg:p-6 max-h-[200px] overflow-y-auto custom-scrollbar">
                <TestResults />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

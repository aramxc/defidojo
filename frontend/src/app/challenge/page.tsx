'use client';

// import { motion } from 'framer-motion';
import { BackgroundImage } from '@/components/background/BackgroundImage';
import CodeEditor from '@/components/editor/CodeEditor';
import ChallengeDescription from '@/components/challenge/ChallengeDescription';
import TestResults from '@/components/challenge/TestResults';
import ActionBar from '@/components/ActionBar';
import ThemeSelector from '@/components/theme/ThemeSelector';
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
  description: `Create a function that checks if an address has a token balance greater than a specified amount.`,
  examples: [
    {
      input: 'hasEnoughTokens(0x123...789, 50)',
      output: 'true',
      explanation: 'Address has 100 tokens, which is greater than minimum balance of 50'
    },
    {
      input: 'hasEnoughTokens(0x456...abc, 150)',
      output: 'false',
      explanation: 'Address has 100 tokens, which is less than minimum balance of 150'
    }
  ],
  constraints: [
    'Account address must be a valid Ethereum address',
    'minBalance must be greater than 0',
    'Function must be marked as view',
    'Use the provided _balances mapping to check balances'
  ]
};
  
export default function ChallengePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with controlled overflow */}
      <div className="fixed inset-0 w-full h-full">
        <BackgroundImage overlay={false} />
      </div>

      {/* Theme Selector - Adjusted positioning for mobile */}
      <div className="absolute right-4 top-4 md:right-8 md:top-4 z-50">
        <ThemeSelector />
      </div>

      {/* Main Content Container */}
      <main className="relative min-h-screen container mx-auto px-4 py-4 flex flex-col">
        {/* Challenge Header */}
        <ChallengeHeader challenge={mockChallenge} />

        {/* Main Challenge Area - Responsive Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-0 mt-4">
          {/* Left Panel - Description */}
          <div className="bg-theme-panel-bg rounded-xl backdrop-blur-sm border border-theme-panel-border 
                        flex flex-col min-h-[300px] lg:min-h-0 order-2 lg:order-1">
            <div className="p-4 lg:p-6 overflow-y-auto custom-scrollbar">
              <ChallengeDescription challenge={mockChallenge} />
            </div>
          </div>

          {/* Right Panel - Code Editor & Results */}
          <div className="flex flex-col gap-4 min-h-0 order-1 lg:order-2">
            {/* Code Editor */}
            <div className="flex-1 bg-theme-panel-bg rounded-xl backdrop-blur-sm border border-theme-panel-border 
                          min-h-[300px] lg:min-h-0">
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

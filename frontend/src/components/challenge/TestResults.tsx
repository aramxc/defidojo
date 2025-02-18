'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



interface TestResultsProps {
  onSubmit: () => void;
}

export default function TestResults({ onSubmit }: TestResultsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  

  return (
    <div className={`bg-theme-panel-bg border-theme-panel-border backdrop-blur-sm flex flex-col rounded-xl sm:mb-8 md:mb-0
                     ${isExpanded ? 'lg:rounded-t-none' : ''}`}>
      {/* Action Bar */}
      <div className="p-4 lg:p-6">
        <div className="flex gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-theme-button-primary hover:bg-theme-button-hover text-theme-text-primary px-6 py-3 rounded-xl font-medium"
          >
            Run Tests
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 bg-theme-button-secondary hover:bg-theme-button-hover text-theme-text-primary px-6 py-3 rounded-xl font-medium"
          >
            Submit Solution
          </button>
        </div>
      </div>

      {/* Test Results Panel - Always visible on mobile */}
      <div className="block lg:hidden p-4 border-t bg-theme-panel-bg border-theme-panel-border">
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

      {/* Desktop Expandable Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="hidden lg:block overflow-hidden absolute bottom-full left-0 right-0 bg-theme-panel-bg border-t border-theme-panel-border"
          >
            <div className="p-6">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
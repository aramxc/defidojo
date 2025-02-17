'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Challenge } from '@/types/challenge';
import { challengeApi } from '@/api/challenges';
import LoadingSpinner from '@/components/LoadingSpinner';
import CodeEditor from '@/components/editor/CodeEditor';
import ChallengeDescription from '@/components/challenge/ChallengeDescription';
import TestResults from '@/components/challenge/TestResults';
import ActionBar from '@/components/ActionBar';
import ChallengeHeader from '@/components/challenge/ChallengeHeader';
import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';

export default function ChallengePage() {
  const params = useParams();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const data = await challengeApi.getChallenge(params.id as string);
        setChallenge(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchChallenge();
    }
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-theme-text">Challenge not found</div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="relative container mx-auto px-4 py-4 h-screen flex flex-col">
        <div className="flex items-center mb-4">
          <Link
            href="/challengeSelection"
            className="inline-flex items-center text-theme-text-dark hover:text-theme-text-accent transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Choose Different Challenge
          </Link>
          
          {/* Center the Challenge Header */}
          <div className="flex-1 flex justify-center">
            <ChallengeHeader challenge={challenge} />
          </div>
        </div>

        {/* Main Challenge Area - Responsive Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-0">
          {/* Left Panel - Description */}
          <div className="bg-theme-panel-bg rounded-xl backdrop-blur-sm border border-theme-panel-border 
                        flex flex-col min-h-[300px] lg:min-h-0 order-2 lg:order-1">
            <div className="p-4 lg:p-6 overflow-y-auto custom-scrollbar">
              <ChallengeDescription challenge={challenge} />
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
      </div>
    </PageLayout>
  );
}

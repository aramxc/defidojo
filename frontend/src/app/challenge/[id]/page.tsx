'use client';

import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import CodeEditor from '@/components/editor/CodeEditor';
import ChallengeDescription from '@/components/challenge/ChallengeDescription';
import TestResults from '@/components/challenge/TestResults';
import ChallengeHeader from '@/components/challenge/ChallengeHeader';
import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import { Rock_Salt } from 'next/font/google';
import { ChallengeProvider, useChallenge } from '@/contexts/ChallengeContext';
import SubmissionModal from '@/components/modals/SubmissionModal';
import { useState } from 'react';

const brushFont = Rock_Salt({ 
  weight: '400',
  subsets: ['latin'],
});

function ChallengeContent() {
  const { challenge, loading, error, currentCode } = useChallenge();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="min-h-screen flex items-center justify-center"><div className="text-red-500">Error: {error}</div></div>;
  if (!challenge) return <div className="min-h-screen flex items-center justify-center"><div className="text-theme-text">Challenge not found</div></div>;

  return (
    <div className="relative container mx-auto px-4 py-2 h-[99vh] flex flex-col">
      {/* Desktop Navigation Header */}
      <div className="mb-4 pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <Link
            href="/challengeSelection"
            className="hidden md:inline-flex items-center text-theme-text-dark hover:text-theme-text-accent transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className={`font-bold whitespace-nowrap ${brushFont.className}`}>Choose Different</span>
          </Link>

          <div className="flex-1 flex justify-center">
            <ChallengeHeader challenge={challenge} />
          </div>

          <Link
            href="#"
            className="hidden md:inline-flex items-center text-theme-text-dark hover:text-theme-text-accent transition-colors duration-200"
          >
            <span className={`whitespace-nowrap font-bold ${brushFont.className}`}>Next Challenge</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-between items-center mb-4">
        <Link
          href="/challengeSelection"
          className="inline-flex items-center text-theme-text-dark hover:text-theme-text-accent transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className={`whitespace-nowrap font-bold ${brushFont.className}`}>Choose Different</span>
        </Link>

        <Link
          href="#"
          className="inline-flex items-center text-theme-text-dark hover:text-theme-text-accent transition-colors duration-200"
        >
          <span className={`whitespace-nowrap font-bold ${brushFont.className}`}>Next Challenge</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Main Challenge Area - Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-0 lg:overflow-hidden sm:mb-6 md:mb-0">
        {/* Left Panel - Challenge Description */}
        <div className="bg-theme-panel-bg rounded-xl backdrop-blur-sm border border-theme-panel-border h-[300px] lg:h-full">
          <div className="p-4 lg:p-6 overflow-y-auto custom-scrollbar h-full">
            <ChallengeDescription />
          </div>
        </div>

        {/* Right Panel - Code Editor & Test Results */}
        <div className="flex flex-col md:h-auto h-auto">
          <div className="flex-1 min-h-0 bg-theme-panel-bg rounded-xl backdrop-blur-sm border border-theme-panel-border mb-4">
            <CodeEditor />
          </div>
          
          <div className="flex-shrink-0">
            <TestResults onSubmit={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* Submission Review Modal */}
      {challenge && (
        <SubmissionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          description={challenge.description}
          constraints={challenge.constraints.join('\n')}
          submittedCode={currentCode}
        />
      )}
    </div>
  );
}

export default function ChallengePage() {
  const params = useParams();

  return (
    <PageLayout>
      <ChallengeProvider challengeId={params.id as string}>
        <ChallengeContent />
      </ChallengeProvider>
    </PageLayout>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useChallenge } from '@/hooks/useChallenge';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Challenge } from '@/types/challenge';
import { Rock_Salt } from 'next/font/google';
import TagBadge from '@/components/shared/TagBadge';
import PageLayout from '@/components/layout/PageLayout';

const brushFont = Rock_Salt({ 
  weight: '400',
  subsets: ['latin'],
});

export default function ChallengesPage() {
  const { getChallenges, loading, error } = useChallenge();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [searchTag, setSearchTag] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.difficulty-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      const params: Record<string, string> = {};
      if (searchTag) params.tag = searchTag;
      if (difficulty) params.difficulty = difficulty;
      
      const data = await getChallenges(params);
      setChallenges(data.challenges);
      setHasSearched(true);
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    }
  };


  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <PageLayout>
      <div className="relative mx-auto px-4 h-screen flex flex-col items-center">
        {/* Fixed Header Section with gradient fade */}
        <div className="w-full max-w-3xl flex-shrink-0 pt-4 pb-4 bg-theme-background z-10 relative">
          {/* Add fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-theme-background to-transparent z-20"></div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-4">
            {/* Empty div for left spacing */}
            <div className="w-[200px]" />

            {/* Title - Center */}
            <div className="flex-1 flex justify-center">
              <div className="text-center">
                <h1 className={`text-xl md:text-2xl lg:text-3xl lg:py-6 font-bold text-theme-text-dark ${brushFont.className}`}>
                  Choose Your Challenge
                </h1>
              </div>
            </div>

            {/* Empty div for right spacing */}
            <div className="w-[200px]" />
          </div>

          {/* Search Form - Fixed position with max-width */}
          <div className="w-full relative z-30">
            <form onSubmit={handleSearch} className="relative mb-4 space-y-4 bg-theme-panel-bg backdrop-blur-sm 
                                                 border border-theme-panel-border rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  placeholder="Search by tag (e.g., Solidity, DeFi)..."
                  className="flex-1 p-3 rounded-lg bg-theme-background-secondary border border-theme-panel-border
                           text-theme-text-dark placeholder-theme-text-accent focus:ring-2 focus:ring-theme-primary"
                />
                {/* DifficultyDropdown */}
                <div className="relative w-full md:w-40 difficulty-dropdown" style={{ zIndex: 30 }}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between h-full px-3 py-2 rounded-lg bg-theme-panel-bg 
                             border border-theme-panel-border hover:border-theme-button-primary transition-colors"
                  >
                    <span className="text-theme-text-primary text-sm font-medium">
                      {difficulties.find(d => d.value === difficulty)?.label || 'All Levels'}
                    </span>
                    <svg className={`w-4 h-4 text-theme-text-primary transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute w-full mt-1 py-2 rounded-lg bg-theme-panel-bg border border-theme-panel-border shadow-lg"
                         style={{ zIndex: 40 }}>
                      {difficulties.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setDifficulty(option.value);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-all duration-200
                            hover:bg-theme-button-primary hover:bg-opacity-10
                            ${difficulty === option.value ? 'text-theme-button-primary' : 'text-theme-text-primary'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-theme-button-primary text-white rounded-lg 
                           hover:bg-theme-button-hover transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Scrollable Results Section */}
        <div className="w-full max-w-3xl flex-1 md: pl-1 lg:pl-3 overflow-y-auto min-h-0 flex items-center flex-col scroll-auto-hide">
          <div className="w-full pt-4 lg:px-2 pb-4">
            {loading ? (
              <LoadingSpinner />
            ) : !hasSearched ? (
              <motion.div 
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="text-center text-theme-text-secondary mt-8 bg-theme-panel-bg 
                         border border-theme-panel-border rounded-xl p-8 mx-4"
              >
                <p className="text-xl">Select your preferences and search for challenges</p>
                <p className="mt-2">Use the filters above to find challenges that match your interests</p>
              </motion.div>
            ) : challenges.length === 0 ? (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="text-center text-theme-text-secondary mt-8 bg-theme-panel-bg 
                         border border-theme-panel-border rounded-xl p-8 mx-4"
              >
                <p className="text-xl">No challenges found</p>
                <p className="mt-2">Try adjusting your search criteria</p>
              </motion.div>
            ) : (
              <div className="space-y-4 pb-6">
                {challenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 1, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-theme-panel-bg border border-theme-panel-border 
                             rounded-xl p-6 shadow-lg transition-all duration-300"
                  >
                    <Link href={`/challenge/${challenge.id}`} className="block">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-semibold text-theme-text">
                          {challenge.title}
                        </h2>
                        <div className="flex items-center gap-1 text-theme-button-primary">
                          <svg 
                            className="w-5 h-5" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M10 17.833L8.858 16.825C4.5 12.925 1.667 10.392 1.667 7.25C1.667 4.717 3.683 2.75 6.25 2.75C7.7 2.75 9.092 3.408 10 4.483C10.908 3.408 12.3 2.75 13.75 2.75C16.317 2.75 18.333 4.717 18.333 7.25C18.333 10.392 15.5 12.925 11.142 16.833L10 17.833Z"
                            />
                          </svg>
                          <span className="text-sm font-medium ">{challenge.upvotes}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {challenge.tags?.map((tag) => (
                          <TagBadge key={tag.id} tag={tag} />
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-theme-text-secondary">
                          Difficulty: {challenge.difficulty}
                        </p>
                        <span className="text-theme-text-secondary hover:text-theme-button-dark transition-colors">
                          Start Challenge →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
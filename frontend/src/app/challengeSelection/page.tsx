'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useChallenge } from '@/hooks/useChallenge';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Challenge } from '@/types/challenge';
import { Rock_Salt } from 'next/font/google';


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
      <div className="relative container mx-auto px-4 py-4 h-screen flex flex-col">
        {/* Updated Header Section to match challenge page */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
            {/* Empty div for left spacing */}
            <div className="w-[200px]" />

            {/* Title - Center */}
            <div className="flex-1 flex justify-center">
              <div className="text-center">
                <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold text-theme-text-dark ${brushFont.className}`}>
                  Choose Your Challenge
                </h1>
              </div>
            </div>

            {/* Empty div for right spacing */}
            <div className="w-[200px]" />
          </div>
        </div>

        {/* Main Content - Lower z-index */}
        <div className="flex-1 overflow-auto relative z-0">
          <div className="max-w-4xl mx-auto">
            {/* Search Form - Higher z-index */}
            <form onSubmit={handleSearch} className="relative z-20 mb-8 space-y-4 bg-theme-panel-bg backdrop-blur-sm 
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
                {/* Dropdown - Highest z-index */}
                <div className="relative w-full md:w-40 difficulty-dropdown" style={{ zIndex: 30 }}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-theme-panel-bg 
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

            {/* Results - Lowest z-index */}
            <div className="relative z-10">
              {loading ? (
                <LoadingSpinner />
              ) : !hasSearched ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-theme-text-secondary mt-8 bg-theme-panel-bg backdrop-blur-sm 
                             border border-theme-panel-border rounded-xl p-8"
                >
                  <p className="text-xl">Select your preferences and search for challenges</p>
                  <p className="mt-2">Use the filters above to find challenges that match your interests</p>
                </motion.div>
              ) : challenges.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-theme-text-secondary mt-8 bg-theme-panel-bg backdrop-blur-sm 
                             border border-theme-panel-border rounded-xl p-8"
                >
                  <p className="text-xl">No challenges found</p>
                  <p className="mt-2">Try adjusting your search criteria</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {challenges.map((challenge) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-theme-panel-bg backdrop-blur-sm border border-theme-panel-border 
                               rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href={`/challenge/${challenge.id}`} className="block">
                        <h2 className="text-xl font-semibold mb-2 text-theme-text">
                          {challenge.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {challenge.tags?.map((tag) => (
                            <span
                              key={tag.id}
                              style={{
                                color: tag.color,
                                backgroundColor: tag.backgroundColor
                              }}
                              className="px-2 py-1 rounded-full text-sm"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-theme-text-secondary">
                            Difficulty: {challenge.difficulty}
                          </p>
                          <span className="text-theme-primary hover:text-theme-primary-hover">
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
      </div>
    </PageLayout>
  );
}
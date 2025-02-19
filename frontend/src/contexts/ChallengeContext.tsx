'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Challenge } from '@/types/challenge';
import { challengeApi } from '@/api/challenges';

interface ChallengeContextType {
  challenge: Challenge | null;
  loading: boolean;
  error: string | null;
  currentCode: string;
  setCurrentCode: (code: string) => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export function ChallengeProvider({ 
  children,
  challengeId 
}: { 
  children: ReactNode;
  challengeId: string;
}) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCode, setCurrentCode] = useState<string>('');

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const data = await challengeApi.getChallenge(challengeId);
        setChallenge(data);
        setCurrentCode(data.initial_code || '');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      fetchChallenge();
    }
  }, [challengeId]);

  return (
    <ChallengeContext.Provider value={{
      challenge,
      loading,
      error,
      currentCode,
      setCurrentCode
    }}>
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenge() {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
}
import { useState, useEffect } from 'react';
import { Challenge} from '@/types/challenge';
import { challengeApi } from '@/api/challenges';

export function useChallenge(id: string) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChallenge() {
      try {
        setLoading(true);
        const data = await challengeApi.getChallenge(id);
        setChallenge(data);
      } catch (err) {
        setError('Failed to load challenge');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchChallenge();
  }, [id]);

  const submitSolution = async (code: string, language: string) => {
    try {
      const solution = await challengeApi.submitSolution(id, { code, language });
      return solution;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to submit solution');
    }
  };

  return {
    challenge,
    loading,
    error,
    submitSolution
  };
}
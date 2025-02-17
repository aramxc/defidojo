import { useState, useCallback } from 'react';
import { Challenge } from '@/types/challenge';
import { fetchApi } from '@/api/config';

interface ChallengeListResponse {
  challenges: Challenge[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

export function useChallenge() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getChallenges = useCallback(async (params?: {
    difficulty?: string;
    tag?: string;
    page?: number;
    per_page?: number;
  }): Promise<ChallengeListResponse> => {
    setLoading(true);
    setError(null);
    
    // Build query string
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `challenges${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    // // Debug logging
    // console.log('Fetching challenges:', {
    //   endpoint,
    //   params,
    //   queryString: queryParams.toString()
    // });
    
    try {
      const response = await fetchApi(endpoint);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch challenges';
      setError(errorMessage);
      throw err; 
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getChallenges,
  };
}
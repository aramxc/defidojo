import { Challenge } from '@/types/challenge';
import { fetchApi } from './config';

export const challengesApi = {
  getChallenge(id: string) {
    return fetchApi<Challenge>(`/challenges/${id}`);
  },

  getChallenges(params?: {
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    tags?: string[];
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.difficulty) searchParams.set('difficulty', params.difficulty);
    if (params?.tags) searchParams.set('tags', params.tags.join(','));
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    return fetchApi<{
      challenges: Challenge[];
      total: number;
      page: number;
    }>(`/challenges?${searchParams.toString()}`);
  },

  submitSolution(challengeId: string, solution: {
    code: string;
    language: string;
  }) {
    return fetchApi<{
      success: boolean;
      results: Array<{
        passed: boolean;
        message: string;
      }>;
    }>(`/challenges/${challengeId}/submit`, {
      method: 'POST',
      body: JSON.stringify(solution),
    });
  },
};
import { Challenge, Solution } from '@/types/challenge';
import { fetchApi } from './config';


export const challengeApi = {
  getChallenge: async (id: string): Promise<Challenge> => {
    const response = await fetchApi(`/challenge/${id}`) as { data: Challenge };
    return response.data;
  },

  // getChallenges: async (params?: {
  //   difficulty?: string;
  //   tag?: string;
  //   page?: number;
  //   per_page?: number;
  // }): Promise<{
  //   challenges: Challenge[];
  //   total: number;
  //   page: number;
  //   per_page: number;
  //   pages: number;
  // }> => {
  //   const response = await fetchApi('/challenge', { params });
  //   return response.data;
  // },

  submitSolution: async (challengeId: string, solution: {
    code: string;
    language: string;
  }) => {
    const response = await fetchApi(`/challenge/${challengeId}/solutions`, {
      method: 'POST',
      body: JSON.stringify(solution),
    }) as { data: Solution };
    return response.data;
  },
};
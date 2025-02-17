import { Challenge, Solution } from '@/types/challenge';
import { fetchApi } from './config';

type ChallengeParams = {
  difficulty?: string;
  tag?: string;
  page?: number;
  per_page?: number;
}

export const challengeApi = {
  getChallenge: async (id: string): Promise<Challenge> => {
    return fetchApi(`challenges/${id}`);
  },

  getChallenges: async (params?: ChallengeParams) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `challenges${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    console.log('Requesting challenges with endpoint:', endpoint);
    return fetchApi(endpoint);
  },

  submitSolution: async (challengeId: string, solution: {
    code: string;
    language: string;
  }): Promise<Solution> => {
    return fetchApi(`challenges/${challengeId}/solutions`, {
      method: 'POST',
      body: JSON.stringify(solution),
    });
  },
};
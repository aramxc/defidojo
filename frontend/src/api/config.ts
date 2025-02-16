export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const fetchApi = async (endpoint: string) => {
  // For Vercel deployment
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
  
  // Use production URL on Vercel, Docker URL locally
  const baseUrl = isProduction 
    ? process.env.NEXT_PUBLIC_PRODUCTION_API_URL  // Your deployed backend URL
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};
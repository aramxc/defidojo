export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const getBaseUrl = () => {
  // In development, use localhost since we're accessing from browser
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  // In production, use the environment variable
  return process.env.NEXT_PUBLIC_API_URL;
};

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};
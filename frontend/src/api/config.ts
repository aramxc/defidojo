// In development (Docker or local), this will be http://localhost:8000/api
// In production (Vercel), this will be the production URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  // // debug logging
  // console.log('API Request Details:', {
  //   fullUrl: url,
  //   baseUrl: API_BASE_URL,
  //   endpoint,
  //   environment: process.env.NODE_ENV,
  //   apiUrl: process.env.NEXT_PUBLIC_API_URL,
  // });
  
  // Default options for all requests
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    mode: 'cors',
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    console.error('API request failed:', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    if (!navigator.onLine) {
      throw new Error('No internet connection. Please check your network and try again.');
    }
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        `Unable to connect to the API at ${url}. Please ensure:\n` +
        `1. The backend server is running (port 8000)\n` +
        `2. CORS is properly configured\n` +
        `3. The API endpoint exists and is accessible`
      );
    }
    
    throw error;
  }
};
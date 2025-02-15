import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import LandingPage from '@/app/page';
import ChallengePage from '@/app/challenge/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { describe, test, expect, jest, beforeEach, useState, useEffect } from '@jest/globals';

// Create a mock module for ThemeContext
const mockThemeContext = {
  isLoading: false,
  theme: 'forest',
  setTheme: jest.fn(),
};

// Mock ThemeContext and handle the async behavior
jest.mock('@/contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => {
    // Simulate the theme provider's behavior but without actual image loading
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      // Immediately set loading to false in the test environment
      setIsLoading(false);
    }, []);

    return (
      <div data-testid="theme-provider">
        {isLoading ? (
          <div data-testid="loading-spinner">Loading...</div>
        ) : (
          children
        )}
      </div>
    );
  },
  useTheme: () => ({
    ...mockThemeContext,
    isLoading: false // Force isLoading to always be false in tests
  })
}));

// Mock ChatContext
jest.mock('@/contexts/ChatContext', () => ({
  ChatProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useChat: () => ({
    isOpen: false,
    toggleChat: jest.fn(),
    messages: [],
    sendMessage: jest.fn(),
  })
}));

describe('Page Loading Tests', () => {
  beforeEach(() => {
    // Reset mock state before each test
    mockThemeContext.isLoading = false;
  });

  test('Landing page loads', async () => {
    render(
      <ThemeProvider>
        <ChatProvider>
          <LandingPage />
        </ChatProvider>
      </ThemeProvider>
    );
    
    
    const enterButton = await screen.findByTestId('enter-button');
    expect(enterButton).toBeTruthy();
  });

  test('Challenge page loads', () => {
    render(
      <ThemeProvider>
        <ChatProvider>
          <ChallengePage />
        </ChatProvider>
      </ThemeProvider>
    );
    const element = screen.getByTestId('challenge-title');
    expect(element).toBeTruthy();
  });
});
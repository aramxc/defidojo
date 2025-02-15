import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';
import ChallengePage from '@/app/challenge/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { describe, test, expect, jest, beforeEach } from '@jest/globals';

// Create a mock module for ThemeContext
const mockThemeContext = {
  isLoading: false,
  theme: 'light',
  setTheme: jest.fn(),
};

// Mock ThemeContext
jest.mock('@/contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTheme: () => mockThemeContext
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
    expect(enterButton).toBeInTheDocument();
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
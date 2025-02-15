import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';
import ChallengePage from '@/app/challenge/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { describe, test, expect, jest } from '@jest/globals';

// Mock ChatContext with minimal implementation
jest.mock('@/contexts/ChatContext', () => ({
  ChatProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useChat: () => ({
    isOpen: false,
    toggleChat: () => {},
    messages: [],
    sendMessage: () => {},
  })
}));

describe('Page Loading Tests', () => {
  test('Landing page loads', () => {
    render(
      <ThemeProvider>
        <ChatProvider>
          <LandingPage />
        </ChatProvider>
      </ThemeProvider>
    );
    expect(document.title).toBe('DeFi Dojo - Coding Challenges');
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
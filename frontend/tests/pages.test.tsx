import { render, screen } from '@testing-library/react';
import ChallengePage from '@/app/challenge/[id]/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { describe, test, expect, jest } from '@jest/globals';


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

  

  test('Challenge page loads', () => {
    render(
      <ThemeProvider>
        <ChatProvider>
          <ChallengePage  />
        </ChatProvider>
      </ThemeProvider>
    );
    const element = screen.getByTestId('challenge-title');
    expect(element).toBeTruthy();
  });
});
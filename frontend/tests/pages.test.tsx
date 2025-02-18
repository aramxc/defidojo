import { render, screen } from '@testing-library/react';
import ChallengePage from '@/app/challenge/[id]/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { describe, test, expect, jest } from '@jest/globals';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({
    id: '1',
  }),
}));

// Mock challenge API
jest.mock('@/api/challenges', () => ({
  challengeApi: {
    getChallenge: () => Promise.resolve({
      id: '1',
      title: 'Test Challenge',
      description: 'Test Description',
      difficulty: 'easy',
      initial_code: 'function test() {}',
      tags: [
        { id: '1', name: 'Solidity', color: '#fff', backgroundColor: '#000' },
        { id: '2', name: 'ERC20', color: '#fff', backgroundColor: '#000' }
      ]
    }),
  },
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
  test('Challenge page loads', async () => {
    render(
      <ThemeProvider>
        <ChatProvider>
          <ChallengePage />
        </ChatProvider>
      </ThemeProvider>
    );

    // Wait for the challenge to load
    const element = await screen.findByText('Test Challenge');
    expect(element).toBeTruthy();
  });
});
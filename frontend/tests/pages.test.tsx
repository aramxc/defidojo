import { render, screen } from '@testing-library/react';
import ChallengePage from '@/app/challenge/[id]/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { describe, test, expect, jest } from '@jest/globals';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({
    id: '1',
  }),
}));

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Rock_Salt: () => ({
    className: 'mocked-font',
    style: { fontFamily: 'mocked-font' },
  }),
}));

// Mock the ChallengeContext
jest.mock('@/contexts/ChallengeContext', () => ({
  ChallengeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useChallenge: () => ({
    challenge: {
      id: '1',
      title: 'Test Challenge',
      description: 'Test Description',
      difficulty: 'easy',
      initial_code: 'function test() {}',
      constraints: ['Constraint 1'],
      tags: [
        { id: '1', name: 'Solidity', color: '#fff', backgroundColor: '#000' }
      ]
    },
    loading: false,
    error: null,
    currentCode: 'function test() {}'
  }),
}));

// Mock react-syntax-highlighter
jest.mock('react-syntax-highlighter', () => ({
  Prism: ({ children }: { children: React.ReactNode }) => <pre>{children}</pre>,
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  vscDarkPlus: {},
}));



describe('Challenge Page Tests', () => {
  test('Challenge page renders with title', async () => {
    render(
      <ThemeProvider>
        <ChallengePage />
      </ThemeProvider>
    );

    const titleElement = await screen.findByText('Test Challenge');
    expect(titleElement).toBeTruthy();
  });
});
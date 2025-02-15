import { render, screen } from '@testing-library/react';
import LandingPage from 'src/app/page';
import ChallengePage from 'src/app/challenge/page';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { ChatProvider } from 'src/contexts/ChatContext';
import { describe, test, expect, jest } from '@jest/globals';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: { children: React.ReactNode } & { [key: string]: string }) => <button {...props}>{children}</button>
  }
}));

describe('Page Loading Tests', () => {
  test('Landing page loads', async () => {
    render(
      <ThemeProvider>
        <ChatProvider>
          <LandingPage />
        </ChatProvider>
      </ThemeProvider>
    );
    const element = await screen.findByRole('button', { 
      name: /Enter the Dojo/i 
    }, { 
      timeout: 15000 
    });
    expect(element).toBeTruthy();
  });

  test('Challenge page loads', async () => {
    render(
      <ThemeProvider>
        <ChatProvider>
          <ChallengePage />
        </ChatProvider>
      </ThemeProvider>
    );
    const element = await screen.findByTestId('challenge-title', {}, { timeout: 5000 });
    expect(element).toBeTruthy();
  });
});
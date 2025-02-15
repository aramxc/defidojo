import { render, screen } from '@testing-library/react';
import LandingPage from 'src/app/page';
import ChallengePage from 'src/app/challenge/page';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { ChatProvider } from 'src/contexts/ChatContext';
import { describe, test, expect } from '@jest/globals';

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
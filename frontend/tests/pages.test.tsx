import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';
import ChallengePage from '@/app/challenge/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ChatProvider } from '@/contexts/ChatContext';
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
    const element = screen.getByText(/Enter the Dojo/i);
    expect(element).toBeTruthy();
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
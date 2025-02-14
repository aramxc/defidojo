import { render, screen } from '@testing-library/react';
import LandingPage from 'src/app/page';
import ChallengePage from 'src/app/challenge/page';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { describe, test, expect } from '@jest/globals';

describe('Page Loading Tests', () => {
  test('Landing page loads', () => {
    render(
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    );
    const element = screen.getByText(/Enter the Dojo/i);
    expect(element).toBeTruthy();
  });

  test('Challenge page loads', () => {
    render(
      <ThemeProvider>
        <ChallengePage />
      </ThemeProvider>
    );
    const element = screen.getByTestId('challenge-title');
    expect(element).toBeTruthy();
  });
});
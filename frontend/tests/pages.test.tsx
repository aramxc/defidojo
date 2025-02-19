import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { describe, test, expect } from '@jest/globals';


describe('Landing Page Tests', () => {
  test('Challenge page renders with title', async () => {
    render(
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    );

    const titleElement = await screen.findByText('Test Challenge');
    expect(titleElement).toBeTruthy();
  });
});
import { render } from '@testing-library/react';
import LandingPage from '@/app/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { describe, test, expect } from '@jest/globals';


describe('Landing Page Tests', () => {
  test('Landing page renders with title', async () => {
    // Create a mock head element if it doesn't exist
    if (!document.head) {
      const head = document.createElement('head');
      document.documentElement.appendChild(head);
    }

    render(
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    );

    // Use setTimeout to allow for any asynchronous title updates
    await new Promise((resolve) => setTimeout(resolve, 0));
    
    expect(document.title).toBe('DeFi Dojo - Coding Challenges');
  });
});
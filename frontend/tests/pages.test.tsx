import { render } from '@testing-library/react';
import LandingPage from '@/app/page';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { describe, test, jest } from '@jest/globals';

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Rock_Salt: () => ({
    className: 'mocked-font',
  }),
}));

describe('Landing Page Tests', () => {
  test('Landing page renders without crashing', () => {
    render(
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    );
  });
});
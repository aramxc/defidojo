'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '@/types/themes';
import { themes } from '@/config/themes';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'forest',
  setTheme: () => {},
  isLoading: true,
});

// Helper function to preload image
const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('forest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const applyTheme = async () => {
      setIsLoading(true);
      const currentTheme = themes[theme];

      try {
        // Get the background image path from the theme
        const bgImage = currentTheme.colors.background.image;
        if (bgImage) {
          await preloadImage(bgImage);
        }

        // Apply theme CSS variables
        const root = document.documentElement;
        Object.entries(currentTheme.colors).forEach(([category, values]) => {
          if (category !== 'background') { // Skip background object since it contains the image path
            Object.entries(values).forEach(([name, value]) => {
              root.style.setProperty(`--${category}-${name}`, value as string);
            });
          }
        });
      } catch (error) {
        console.error('Failed to load theme assets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    applyTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
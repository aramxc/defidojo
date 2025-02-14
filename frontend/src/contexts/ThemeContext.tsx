'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '@/types/themes';
import { themes } from '@/config/themes';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'forest',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('forest');

  useEffect(() => {
    // Apply theme CSS variables
    const root = document.documentElement;
    const currentTheme = themes[theme];

    if (currentTheme) {
      Object.entries(currentTheme.colors).forEach(([category, values]) => {
        Object.entries(values).forEach(([name, value]) => {
          root.style.setProperty(`--${category}-${name}`, value as string);
        });
      });
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
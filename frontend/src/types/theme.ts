export type ThemeMode = 'light' | 'dark' | 'ocean' | 'cyberpunk' | string;

export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    accent: string;
  };
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
  border: {
    primary: string;
    secondary: string;
  };
  panel: {
    background: string;
    border: string;
  };
  button: {
    primary: string;
    secondary: string;
    hover: string;
  };
}

export interface Theme {
  name: string;
  colors: ThemeColors;
}
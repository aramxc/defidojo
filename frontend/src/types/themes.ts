export type ThemeMode = 'forest' | 'ocean' | 'sunset' | 'cyberpunk' | 'aurora' | string;

export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    accent: string;
    image?: string;
  };
  text: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
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
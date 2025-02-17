import { Theme } from '@/types/themes';

export const themes: Record<string, Theme> = {
  forest: {
    name: 'Forest',
    colors: {
      background: {
        primary: '#111827',
        secondary: '#1F2937',
        accent: '#2D3F2B',
        image: '/assets/dojobgforest.png',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#E5E7EB',
        accent: '#9CA3AF',
        dark: '#1E3A2B',
      },
      border: {
        primary: 'rgba(75, 85, 99, 0.5)',
        secondary: 'rgba(75, 85, 99, 0.3)',
      },
      panel: {
        background: 'rgba(31, 41, 55, 0.85)',
        border: 'rgba(75, 85, 99, 0.85)',
      },
      button: {
        primary: '#10B981',
        secondary: '#4B5563',
        hover: '#059669',
      },
    },
  },
  ocean: {
    name: 'Ocean',
    colors: {
      background: {
        primary: '#0B1C34',
        secondary: '#1E293B',
        accent: '#334155',
        image: '/assets/dojobgocean.png',
      },
      text: {
        primary: '#F8FAFC',
        secondary: '#E2E8F0',
        accent: '#94A3B8',
        dark: '#0A4D68',
      },
      border: {
        primary: 'rgba(56, 189, 248, 0.4)',
        secondary: 'rgba(56, 189, 248, 0.2)',
      },
      panel: {
        background: 'rgba(15, 23, 42, 0.85)',
        border: 'rgba(56, 189, 248, 0.85)',
      },
      button: {
        primary: '#0EA5E9',
        secondary: '#475569',
        hover: '#0284C7',
      },
    },
  },
  sunset: {
    name: 'Sunset',
    colors: {
      background: {
        primary: '#1F1A17',
        secondary: '#2B1D1D',
        accent: '#3D2523',
        image: '/assets/dojobgsunset.png',
      },
      text: {
        primary: '#F8FAFC',
        secondary: '#E2E8F0',
        accent: '#DBA88C',
        dark: '#C4442A',
      },
      border: {
        primary: 'rgba(223, 140, 107, 0.4)',
        secondary: 'rgba(223, 140, 107, 0.2)',
      },
      panel: {
        background: 'rgba(31, 26, 23, 0.85)',
        border: 'rgba(223, 140, 107, 0.85)',
      },
      button: {
        primary: '#E67E22',
        secondary: '#7D4E3B',
        hover: '#D35400',
      },
    },
  },
  cyberpunk: {
    name: 'Cyberpunk',
    colors: {
      background: {
        primary: '#0D0B1E',
        secondary: '#1A1B3C',
        accent: '#2A2C52',
        image: '/assets/dojobgcyberpunk.png',
      },
      text: {
        primary: '#E2E8F0',
        secondary: '#CBD5E1',
        accent: '#94A3B8',
        dark: '#FF2E63',
      },
      border: {
        primary: 'rgba(99, 102, 241, 0.4)',
        secondary: 'rgba(99, 102, 241, 0.2)',
      },
      panel: {
        background: 'rgba(17, 24, 39, 0.85)',
        border: 'rgba(139, 92, 246, 0.85)',
      },
      button: {
        primary: '#FF2E63',
        secondary: '#6366F1',
        hover: '#F43F5E',
      },
    },
  },
  aurora: {
    name: 'Aurora',
    colors: {
      background: {
        primary: '#0F172A',
        secondary: '#1E293B',
        accent: '#2D4F4B',
        image: '/assets/dojobgaurora.png',
      },
      text: {
        primary: '#E2F8F0',
        secondary: '#E2E8F0',
        accent: '#88E0D0',
        dark: '#4ADE80',
      },
      border: {
        primary: 'rgba(74, 222, 128, 0.4)',
        secondary: 'rgba(74, 222, 128, 0.2)',
      },
      panel: {
        background: 'rgba(15, 23, 42, 0.85)',
        border: 'rgba(139, 92, 246, 0.85)',
      },
      button: {
        primary: '#4ADE80',
        secondary: '#9333EA',
        hover: '#22C55E',
      },
    },
  },
};
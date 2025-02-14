import { Theme } from '@/types/theme';

export const themes: Record<string, Theme> = {
  dark: {
    name: 'Dark',
    colors: {
      background: {
        primary: '#111827',
        secondary: '#1F2937',
        accent: '#374151',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#E5E7EB',
        accent: '#9CA3AF',
      },
      border: {
        primary: 'rgba(75, 85, 99, 0.5)',
        secondary: 'rgba(75, 85, 99, 0.3)',
      },
      panel: {
        background: 'rgba(31, 41, 55, 0.5)',
        border: 'rgba(75, 85, 99, 0.5)',
      },
      button: {
        primary: '#10B981',
        secondary: '#4B5563',
        hover: '#059669',
      },
    },
  },
  light: {
    name: 'Light',
    colors: {
      background: {
        primary: '#FFFFFF',
        secondary: '#F3F4F6',
        accent: '#E5E7EB',
      },
      text: {
        primary: '#111827',
        secondary: '#374151',
        accent: '#6B7280',
      },
      border: {
        primary: 'rgba(209, 213, 219, 0.5)',
        secondary: 'rgba(209, 213, 219, 0.3)',
      },
      panel: {
        background: 'rgba(249, 250, 251, 0.5)',
        border: 'rgba(209, 213, 219, 0.5)',
      },
      button: {
        primary: '#059669',
        secondary: '#6B7280',
        hover: '#047857',
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
      },
      text: {
        primary: '#E2E8F0',
        secondary: '#CBD5E1',
        accent: '#94A3B8',
      },
      border: {
        primary: 'rgba(99, 102, 241, 0.4)',
        secondary: 'rgba(99, 102, 241, 0.2)',
      },
      panel: {
        background: 'rgba(17, 24, 39, 0.7)',
        border: 'rgba(139, 92, 246, 0.3)',
      },
      button: {
        primary: '#FF2E63',
        secondary: '#6366F1',
        hover: '#F43F5E',
      },
    },
  },
  ocean: {
    name: 'Ocean',
    colors: {
      background: {
        primary: '#0F172A',
        secondary: '#1E293B',
        accent: '#334155',
      },
      text: {
        primary: '#F8FAFC',
        secondary: '#E2E8F0',
        accent: '#94A3B8',
      },
      border: {
        primary: 'rgba(56, 189, 248, 0.4)',
        secondary: 'rgba(56, 189, 248, 0.2)',
      },
      panel: {
        background: 'rgba(15, 23, 42, 0.7)',
        border: 'rgba(56, 189, 248, 0.3)',
      },
      button: {
        primary: '#0EA5E9',
        secondary: '#475569',
        hover: '#0284C7',
      },
    },
  },
};
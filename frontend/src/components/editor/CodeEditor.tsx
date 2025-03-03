'use client';

import { Editor } from '@monaco-editor/react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useChallenge } from '@/contexts/ChallengeContext';
import { initMonaco, editorOptions } from '@/utils/monaco';


type SupportedLanguage = 'solidity' | 'rust' | 'javascript' | 'typescript';

export default function CodeEditor() {
  const { theme } = useTheme();
  const { challenge, currentCode, setCurrentCode } = useChallenge();
  const [language, setLanguage] = useState<SupportedLanguage>('solidity');

  useEffect(() => {
    initMonaco();
    
    // Determine language from tags
    if (challenge?.tags) {
      const hasRust = challenge.tags.some(tag => tag.name.toLowerCase() === 'rust');
      const hasSolidity = challenge.tags.some(tag => tag.name.toLowerCase() === 'solidity');
      
      if (hasRust) {
        setLanguage('rust');
      } else if (hasSolidity) {
        setLanguage('solidity');
      }
    }
  }, [challenge?.tags]);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    if (challenge?.initial_code) {
      setCurrentCode(challenge.initial_code);
    } else {
      setCurrentCode('// Your code here');
    }
  };

  const handleReset = () => {
    if (challenge?.initial_code) {
      setCurrentCode(challenge.initial_code);
    } else {
      setCurrentCode('// Your code here');
    }
  };

  const handleCopy = () => {
    if (currentCode) {
      navigator.clipboard.writeText(currentCode);
    }
  };

  return (
    <div className="h-full flex flex-col rounded-xl ">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-theme-text-primary">Solution</h2>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
              className="appearance-none bg-theme-panel-bg text-theme-text-primary px-3 py-1.5 pr-8 rounded-lg border border-theme-border-primary text-sm 
              focus:outline-none focus:ring-2 focus:ring-theme-button-primary hover:border-theme-button-primary transition-colors"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              <option value="solidity" className="bg-theme-panel-bg text-theme-text-primary">Solidity</option>
              <option value="rust" className="bg-theme-panel-bg text-theme-text-primary">Rust</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-theme-text-primary">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="px-3 py-1 text-sm text-theme-text-accent hover:text-theme-text-primary transition-colors"
          >
            Reset
          </button>
          <button 
            onClick={handleCopy}
            className="px-3 py-1 text-sm text-theme-text-accent hover:text-theme-text-primary transition-colors"
          >
            Copy
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 rounded-b-xl overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={currentCode}
          onChange={(value) => value && setCurrentCode(value)}
          theme={theme === 'light' ? 'light' : 'vs-dark-solidity'}
          options={{
            ...editorOptions,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
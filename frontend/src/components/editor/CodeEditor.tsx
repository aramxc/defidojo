'use client';

import { Editor, loader } from '@monaco-editor/react';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { solidityLanguageConfig } from '@/utils/monaco-solidity';

// Register Solidity language
loader.init().then(monaco => {
  monaco.languages.register({ id: 'solidity' });
  monaco.languages.setMonarchTokensProvider('solidity', solidityLanguageConfig);
});

const LANGUAGE_SAMPLES = {
  javascript: `function arraySum(numbers) {
  // Your code here
  
}`,
  typescript: `function arraySum(numbers: number[]): number {
  // Your code here
  return 0;
}`,
  solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Challenge {
    function arraySum(uint256[] memory numbers) public pure returns (uint256) {
        // Your code here
        
    }
}`
};

type SupportedLanguage = keyof typeof LANGUAGE_SAMPLES;

export default function CodeEditor() {
  const { theme } = useTheme();
  const [language, setLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState(LANGUAGE_SAMPLES[language]);

  const handleEditorChange = (value: string | undefined) => {
    if (value) setCode(value);
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    setCode(LANGUAGE_SAMPLES[newLang]);
  };

  const handleReset = () => {
    setCode(LANGUAGE_SAMPLES[language]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
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
              <option value="javascript" className="bg-theme-panel-bg text-theme-text-primary">JavaScript</option>
              <option value="typescript" className="bg-theme-panel-bg text-theme-text-primary">TypeScript</option>
              <option value="solidity" className="bg-theme-panel-bg text-theme-text-primary">Solidity</option>
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
      
      <div className="h-[400px] rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={theme === 'light' ? 'light' : 'vs-dark'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
}
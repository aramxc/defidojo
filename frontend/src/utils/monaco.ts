import { loader } from '@monaco-editor/react';
import { solidityLanguageConfig } from './monaco-solidity';
import { rustLanguageConfig } from './monaco-rust';
import { editor } from 'monaco-editor';
import { languages } from 'monaco-editor';

// Editor default options
export const editorOptions: editor.IStandaloneEditorConstructionOptions = {
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
  autoClosingBrackets: 'always',
  autoClosingQuotes: 'always',
  autoIndent: 'full',
  autoSurround: 'brackets',
  bracketPairColorization: {
    enabled: true,
  },
  guides: {
    bracketPairs: false,
    indentation: true,
  },
};

// Initialize Monaco with all configurations
export const initMonaco = () => {
  loader.init().then(monaco => {
    // Register Solidity language
    monaco.languages.register({ id: 'solidity' });
    monaco.languages.setMonarchTokensProvider('solidity', solidityLanguageConfig);
    
    // Register Rust language
    monaco.languages.register({ id: 'rust' });
    monaco.languages.setMonarchTokensProvider('rust', rustLanguageConfig);
    
    // Add language configurations
    const commonConfig: languages.LanguageConfiguration = {
      brackets: [
        ['(', ')'],
        ['[', ']'],
        ['{', '}']
      ] as languages.CharacterPair[],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      indentationRules: {
        increaseIndentPattern: /^.*\{[^}"']*$/,
        decreaseIndentPattern: /^.*\}[^{"']*$/
      },
    };

    monaco.languages.setLanguageConfiguration('solidity', {
      ...commonConfig,
    });

    monaco.languages.setLanguageConfiguration('rust', {
      ...commonConfig,
    });

    // Define custom theme
    monaco.editor.defineTheme('vs-dark-solidity', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'C678DD' },
        { token: 'type', foreground: '56B6C2' },
        { token: 'type.identifier', foreground: '61AFEF' },
        { token: 'function', foreground: '61AFEF' },
        { token: 'string', foreground: '98C379' },
        { token: 'number', foreground: 'D19A66' },
        { token: 'delimiter', foreground: 'ABB2BF' },
        { token: 'comment', foreground: '7F848E', fontStyle: 'italic' },
        { token: 'comment.quote', foreground: '7F848E' },
      ],
      colors: {
        'editor.background': '#1F2937F7',
      }
    });
  });
};
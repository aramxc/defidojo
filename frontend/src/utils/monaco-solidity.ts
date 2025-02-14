import { languages } from 'monaco-editor';

export const solidityLanguageConfig: languages.IMonarchLanguage = {
    defaultToken: '',
    tokenPostfix: '.sol',
  
    brackets: [
      { open: '{', close: '}', token: 'delimiter.curly' },
      { open: '[', close: ']', token: 'delimiter.square' },
      { open: '(', close: ')', token: 'delimiter.parenthesis' }
    ],
  
    keywords: [
      'pragma',
      'solidity',
      'contract',
      'library',
      'interface',
      'function',
      'modifier',
      'event',
      'struct',
      'enum',
      'mapping',
      'public',
      'private',
      'external',
      'internal',
      'pure',
      'view',
      'payable',
      'memory',
      'storage',
      'calldata',
      'returns',
      'return',
      'if',
      'else',
      'for',
      'while',
      'do',
      'break',
      'continue',
      'throw',
      'import',
      'using',
      'is',
      'new',
      'delete',
      'try',
      'catch',
    ],
  
    typeKeywords: [
      'address',
      'string',
      'bytes',
      'byte',
      'int',
      'uint',
      'uint256',
      'bool',
      'hash',
      'uint8',
      'int8',
      'int256',
      'bytes32',
      'void',
    ],
  
    operators: [
      '=',
      '>',
      '<',
      '!',
      '~',
      '?',
      ':',
      '==',
      '<=',
      '>=',
      '!=',
      '&&',
      '||',
      '++',
      '--',
      '+',
      '-',
      '*',
      '/',
      '&',
      '|',
      '^',
      '%',
      '+=',
      '-=',
      '*=',
      '/=',
      '&=',
      '|=',
      '^=',
      '%=',
      '<<=',
      '>>=',
      '>>>='
    ],
  
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
  
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  
    tokenizer: {
      root: [
        // License identifier
        [/\/\/ SPDX-License-Identifier:.*$/, 'comment.quote'],
        
        // Pragmas
        [/(pragma)(\s+)(solidity)/, ['keyword', 'white', 'keyword']],
        
        // Comments
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment'],

        // Contract, interface, or library declaration
        [/(contract|interface|library)(\s+)([A-Za-z_]\w*)/, ['keyword', 'white', 'type.identifier']],
        
        // Function declaration
        [/(function)(\s+)([A-Za-z_]\w*)/, ['keyword', 'white', 'function']],

        // Types
        [/\b(address|bool|string|bytes\d*|int\d*|uint\d*)\b/, 'type'],

        // Numbers
        [/\b\d+\b/, 'number'],
        [/\b0x[a-fA-F0-9]+\b/, 'number.hex'],

        // Identifiers
        [/[a-zA-Z_]\w*/, {
          cases: {
            '@typeKeywords': 'type',
            '@keywords': 'keyword',
            '@default': 'identifier'
          }
        }],

        // Whitespace
        [/[ \t\r\n]+/, 'white'],

        // Delimiters
        [/[;,.]/, 'delimiter'],
        [/[{}()\[\]]/, '@brackets'],

        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string'],
      ],
  
      comment: [
        [/[^/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[/*]/, 'comment']
      ],
  
      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/"/, 'string', '@pop']
      ],
    },
  };
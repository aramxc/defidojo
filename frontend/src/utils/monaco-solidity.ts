import { languages } from 'monaco-editor';

export const solidityLanguageConfig: languages.IMonarchLanguage = {
    defaultToken: 'invalid',
    tokenPostfix: '.sol',
  
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
      'bool',
      'hash',
      'uint8',
      'uint256',
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
      '<<',
      '>>',
      '>>>',
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
        // Identifiers and keywords
        [/[a-z_$][\w$]*/, {
          cases: {
            '@typeKeywords': 'type',
            '@keywords': 'keyword',
            '@default': 'identifier'
          }
        }],
  
        // Whitespace
        { include: '@whitespace' },
  
        // Numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],
  
        // Delimiters and operators
        [/[{}()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, {
          cases: {
            '@operators': 'operator',
            '@default': ''
          }
        }],
  
        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string'],
      ],
  
      comment: [
        [/[^\/*]+/, 'comment'],
        [/\/\*/, 'comment', '@push'],
        ["\\*/", 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ],
  
      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
      ],
  
      whitespace: [
        [/[ \t\r\n]+/, ''],
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment'],
      ],
    },
  };
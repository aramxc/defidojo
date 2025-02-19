import { languages } from 'monaco-editor';

export const rustLanguageConfig: languages.IMonarchLanguage = {
  defaultToken: '',
  tokenPostfix: '.rs',

  keywords: [
    'as', 'break', 'const', 'continue', 'crate', 'else', 'enum', 'extern',
    'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop', 'match', 'mod',
    'move', 'mut', 'pub', 'ref', 'return', 'self', 'Self', 'static', 'struct',
    'super', 'trait', 'true', 'type', 'unsafe', 'use', 'where', 'while', 'async',
    'await', 'dyn', 'abstract', 'become', 'box', 'do', 'final', 'macro',
    'override', 'priv', 'typeof', 'unsized', 'virtual', 'yield',
    // NEAR specific
    'near_bindgen', 'init', 'callback', 'private', 'payable'
  ],

  typeKeywords: [
    'i8', 'i16', 'i32', 'i64', 'i128', 'isize',
    'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
    'f32', 'f64', 'str', 'char', 'bool', 'Box', 'Option', 'Result',
    'String', 'Vec', 'AccountId', 'Balance', 'Promise', 'Gas'
  ],

  operators: [
    '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
    '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
    '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
    '%=', '<<=', '>>=', '>>>='
  ],

  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  tokenizer: {
    root: [
      // Attributes
      [/#!?\[.*\]/, 'annotation'],

      // Comments
      [/\/\/.*$/, 'comment'],
      [/\/\*/, 'comment', '@comment'],

      // Functions
      [/fn\s+([a-zA-Z_]\w*)/, ['keyword', 'function']],

      // Macros
      [/([a-zA-Z_]\w*!)/, 'macro'],

      // Strings
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

      // Numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/\d+/, 'number'],

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
      [/[{}()\[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [/@symbols/, 'operator'],
      [/[;,.]/, 'delimiter']
    ],

    comment: [
      [/[^\/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[\/*]/, 'comment']
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
    ]
  }
};
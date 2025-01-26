module.exports = {
  extends: [
    'eslint:recommended',
    'eslint-config-standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {},
      typescript: {
        directory: './*',
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  plugins: ['unused-imports', 'filename-rules'],
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-void': 'off',
    'no-prototype-builtins': 'off',
    'no-use-before-define': 'off',

    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/no-explicit-any': 'on',
    // '@typescript-eslint/explicit-function-return-type': 'on',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    camelcase: [
      'warn',
      {
        properties: 'never',
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    eqeqeq: ['error'],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'comma-dangle': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'filename-rules/match': [
      'warn',
      {
        '.js': 'kebab-case',
        '.ts': /^([a-z]+-)*[a-z0-9]+(?:\..*)?$/,
      },
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling', 'index']],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'off',
    'import/export': 'off',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
  },
  ignorePatterns: ['!node_modules/*'],
};

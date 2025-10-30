import js from '@eslint/js';
import globals from 'globals';
import * as tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-key': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-duplicate-imports': 'error',
      'no-unused-private-class-members': 'error',
      'no-template-curly-in-string': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': 'off',
      camelcase: 'error',
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      'object-shorthand': 'error',
      'max-len': [
        'warn',
        {
          code: 100,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
          ignoreUrls: true,
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-body-style': ['error', 'as-needed'],
      curly: ['error', 'all'],
    },
  },
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },
]);

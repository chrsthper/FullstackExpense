import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module', // ✅ penting
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/__tests__/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest // ✅ untuk test
      }
    }
  }
]);

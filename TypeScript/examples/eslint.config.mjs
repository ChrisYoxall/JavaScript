import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // 1. Global Ignores
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // 2. Base ESLint recommended
  eslint.configs.recommended,

  // 3. Type-checked rules for TS files only
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },

  // 4. Disable type-checked rules for JS config files
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);

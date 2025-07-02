import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      stylistic.configs.recommended
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1 }],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      'no-relative-import-paths/no-relative-import-paths': 'error'
    },
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths
    }
  }
])

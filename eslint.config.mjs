// import css from '@eslint/css';
import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import reExportSort from 'eslint-plugin-re-export-sort';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsSortKeys from 'eslint-plugin-typescript-sort-keys';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  // {
  //   files: ['**/*.css'],
  //   plugins: {
  //     css,
  //   },
  //   language: 'css/css',
  //   rules: {
  //     'css/no-duplicate-imports': 'error',
  //   },
  // },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      're-export-sort': reExportSort,
      'simple-import-sort': simpleImportSort,
      'typescript-sort-keys': tsSortKeys,
      'unused-imports': unusedImports,
    },
    rules: {
      're-export-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^'], ['^@overdesk'], ['^\\.']],
        },
      ],
      'typescript-sort-keys/interface': [
        'error',
        'asc',
        { caseSensitive: false },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
  },
);

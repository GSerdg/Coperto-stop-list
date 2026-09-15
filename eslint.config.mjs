import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Добавляем строгие правила для TypeScript-файлов
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Полный запрет на использование типа any
      '@typescript-eslint/no-explicit-any': 'error',

      // Полный запрет на использование @ts-ignore и @ts-nocheck
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          'ts-expect-error': 'allow-with-description', // Разрешено только с текстовым пояснением причины
        },
      ],
    },
  },

  // Интеграция Prettier во Flat Config ESLint 9+
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error', // Ошибки форматирования станут ошибками линтера
    },
  },

  // Перегрузка игнорируемых папок
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;

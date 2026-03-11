import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ui: path.resolve(__dirname, '../ui/src/index.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    include: ['src/**/*.test.{ts,tsx}'],
  },
});

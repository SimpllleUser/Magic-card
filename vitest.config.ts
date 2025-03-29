import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    css: false,
    setupFiles: './vitest.setup.ts',
    deps: {
      inline: ['vuetify'],
    },
    environment: 'jsdom', /// 'node' | 'jsdom'
    include: ['**/*.{test,spec}.{ts,js}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportsDirectory: './coverage',
      exclude: ['node_modules', 'dist', '**/*.config.{ts,js}'],
      reportOnFailure: true,
    },
  },
});

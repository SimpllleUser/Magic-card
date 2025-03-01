import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', /// 'node' | 'jsdom'
    include: ['**/*.{test,spec}.{ts,js}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    exclude: ['node_modules', 'dist', '**/*.config.{ts,js}'],
    // threads: true, // multithreading
    // maxThreads: 4, // quantity of threads количество потоков
  },
});

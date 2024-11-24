import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ['test/**/*.test.ts', 'test/**/*.spec.ts'],
    exclude: ['dist', '**/dist/**', '**/vitest.config.*']
  },
  plugins: [
    tsconfigPaths(),
    swc.vite({ module: { type: 'es6' } }),
  ],
});

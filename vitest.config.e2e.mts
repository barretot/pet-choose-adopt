import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    setupFiles: ['/test/setup-e2e.ts'],
    include: ['src/**/*.e2e-spec.ts'],
    exclude: ['dist', '**/dist/**', '**/vitest.config.*'],
  },
  plugins: [
    tsconfigPaths(),
    swc.vite({ module: { type: 'es6' } }),
  ],
});

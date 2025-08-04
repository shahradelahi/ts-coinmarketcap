import { defineConfig } from 'tsup';

export default defineConfig([
  {
    clean: true,
    dts: true,
    minify: true,
    keepNames: true,
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    target: 'esnext',
    outDir: 'dist',
  },
  {
    clean: true,
    dts: true,
    entry: ['src/types/*/index.ts'],
    format: ['esm'],
    target: 'esnext',
    outDir: 'dist/types',
  },
]);

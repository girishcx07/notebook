import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/posts.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
});

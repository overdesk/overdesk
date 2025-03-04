import { build } from 'esbuild';
import process from 'process';

const isProduction = process.env.NODE_ENV === 'production';

await build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  sourcemap: !isProduction,
  minify: isProduction,
  platform: 'node',
  target: 'esnext',
});

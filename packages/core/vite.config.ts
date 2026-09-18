import fs from 'fs';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { defineConfig, type LibraryOptions } from 'vite';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { peerDependencies } = packageJson;

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
      outDir: 'dist',
      entryRoot: 'src',
    }),
  ],
  build: {
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    } as LibraryOptions,
    rollupOptions: {
      external: (id) =>
        Object.keys(peerDependencies).some(
          (dep) => id === dep || id.startsWith(`${dep}/`),
        ),
    },
    emptyOutDir: true,
  },
});

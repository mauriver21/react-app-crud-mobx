import path from 'path';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import babel from '@rolldown/plugin-babel';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      // En desarrollo apunta directamente al src de core,
      // sin necesidad de hacer build previo del paquete.
      'use-mobx-model': path.resolve(__dirname, '../core/src/index.ts'),
    },
  },
});

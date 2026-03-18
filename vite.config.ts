import fbteePreset from '@nkzw/babel-preset-fbtee';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import reactCompiler from 'babel-plugin-react-compiler';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        plugins: [reactCompiler],
        presets: [fbteePreset],
      },
    }),
    tailwindcss(),
    react(),
  ],
});

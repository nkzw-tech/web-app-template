import fbteePreset from '@nkzw/babel-preset-fbtee';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import reactCompiler from 'babel-plugin-react-compiler';
import babelPluginRelay from 'babel-plugin-relay';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [reactCompiler, babelPluginRelay],
        presets: [fbteePreset],
      },
    }),
  ],
});

import nkzw from '@nkzw/oxlint-config';
import fbtee from '@nkzw/vite-plugin-fbtee';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { transformSync as transformRelay } from 'oxc-transform-relay';
import { defineConfig } from 'vite-plus';

const relayPlugin = {
  enforce: 'pre' as const,
  name: 'oxc-transform-relay',
  transform: {
    filter: {
      code: /(?:^|[^\w.])graphql\s*`/m,
      id: { exclude: '**/node_modules/**', include: '**/*.tsx' },
    },
    handler(source: string, id: string) {
      const result = transformRelay(id, source, {
        lang: 'tsx',
        language: 'typescript',
        sourcemap: true,
      });
      if (result.errors.length) {
        throw new Error(result.errors.map(({ message }) => message).join('\n'));
      }
      return { code: result.code, map: result.map };
    },
  },
};

export default defineConfig({
  fmt: {
    experimentalSortImports: {
      newlinesBetween: false,
    },
    experimentalSortPackageJson: {
      sortScripts: true,
    },
    experimentalTailwindcss: {
      stylesheet: 'src/App.css',
    },
    ignorePatterns: [
      'coverage/',
      'dist/',
      'index.html',
      'pnpm-lock.yaml',
      'src/__generated__/',
      'src/translations/',
    ],
    singleQuote: true,
  },
  lint: {
    extends: [nkzw],
    ignorePatterns: ['dist/', 'vite.config.ts.timestamp-*'],
    options: { typeAware: true, typeCheck: true },
  },
  plugins: [relayPlugin, fbtee(), tailwindcss(), react({ compiler: true })],
  run: {
    tasks: {
      'test:all': {
        command: 'vp check && vp test',
      },
    },
  },
  staged: {
    '*': 'vp check --fix',
  },
});

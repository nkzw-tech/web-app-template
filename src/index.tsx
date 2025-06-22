/// <reference types="fbtee/ReactTypes.d.ts" />

import App from './App.tsx';
import './App.css';
import { LocaleContext } from 'fbtee';
import { createRoot } from 'react-dom/client';
import AvailableLanguages from './AvailableLanguages.tsx';

const clientLocales = [navigator.language, ...navigator.languages];

const loadLocale = async (locale: string) => {
  if (locale === 'ja_JP') {
    return (await import('./translations/ja_JP.json')).default.ja_JP;
  }

  return {};
};
createRoot(document.getElementById('root')!).render(
  <LocaleContext
    availableLanguages={AvailableLanguages}
    clientLocales={clientLocales}
    loadLocale={loadLocale}
  >
    <App />
  </LocaleContext>,
);

/// <reference types="fbtee/ReactTypes.d.ts" />

import { createLocaleContext } from 'fbtee';
import './App.css';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter } from 'react-router';
import { Environment, FetchFunction, Network } from 'relay-runtime';
import App from './App.tsx';
import AvailableLanguages from './AvailableLanguages.tsx';
import env from './lib/env.tsx';

const LocaleContext = createLocaleContext({
  availableLanguages: AvailableLanguages,
  clientLocales: [navigator.language, ...navigator.languages],
  loadLocale: async (locale: string) => {
    if (locale === 'ja_JP') {
      return (await import('./translations/ja_JP.json')).default.ja_JP;
    }

    return {};
  },
});

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const response = await fetch(`${env('SERVER_URL')}/graphql`, {
    body: JSON.stringify({ query: request.text, variables }),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Response failed.');
  }

  return await response.json();
};

const environment = new Environment({
  network: Network.create(fetchGraphQL),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleContext>
      <RelayEnvironmentProvider environment={environment}>
        <Suspense>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </RelayEnvironmentProvider>
    </LocaleContext>
  </StrictMode>,
);

import isPresent from '@nkzw/core/isPresent.js';
import Stack from '@nkzw/stack';
import { useLocaleContext } from 'fbtee';
import { AnchorHTMLAttributes, Suspense, useTransition } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay/hooks.js';
import {
  LinkProps,
  Link as ReactRouterLink,
  Route,
  Routes,
} from 'react-router';
import { AppRelayEntryPointQuery } from './__generated__/AppRelayEntryPointQuery.graphql.ts';
import { AppUserCard_user$key } from './__generated__/AppUserCard_user.graphql.ts';
import AvailableLanguages from './AvailableLanguages.tsx';
import AuthClient from './user/AuthClient.tsx';
import SignIn from './user/SignIn.tsx';

const Link = ({
  className,
  ...props
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <ReactRouterLink
    className={
      'text-pink-500 underline hover:no-underline dark:text-pink-400' +
      (className ? ` ${className}` : '')
    }
    {...props}
  />
);

const LocaleSwitcher = () => {
  const [, startTransition] = useTransition();
  const { locale, setLocale } = useLocaleContext();

  return (
    <div>
      <a
        className="cursor-pointer text-pink-500 underline select-none hover:no-underline dark:text-pink-400"
        onClick={() =>
          startTransition(() =>
            setLocale(locale === 'ja_JP' ? 'en_US' : 'ja_JP'),
          )
        }
      >
        {AvailableLanguages.get(locale)}
      </a>
    </div>
  );
};

const UserCard = ({ user: userKey }: { user: AppUserCard_user$key }) => {
  const user = useFragment(
    graphql`
      fragment AppUserCard_user on User {
        caughtPokemon {
          edges {
            node {
              id
              nickname
              pokemon {
                name
              }
              shiny
            }
          }
        }
      }
    `,
    userKey,
  );

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-bold">
        <fbt desc="Collection headline">Pokémon Collection</fbt>
      </h2>
      <div className="flex flex-col gap-2">
        {user.caughtPokemon.edges?.filter(isPresent).map(({ node }) =>
          node ? (
            <div className="flex items-center gap-2" key={node.id}>
              <span>{node.nickname}</span>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

const RelayEntryPoint = () => {
  const { viewer } = useLazyLoadQuery<AppRelayEntryPointQuery>(
    graphql`
      query AppRelayEntryPointQuery {
        viewer {
          ...AppUserCard_user
        }
      }
    `,
    {},
  );

  return viewer ? <UserCard user={viewer} /> : null;
};

const Home = () => {
  const { data: session, isPending } = AuthClient.useSession();

  return (
    <div className="m-6 mx-auto w-8/12 rounded-sm border border-gray-200 p-4 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none">
      <Stack alignCenter between gap>
        <h1 className="text-4xl">
          <fbt desc="Greeting">Welcome</fbt>
        </h1>
        <LocaleSwitcher />
      </Stack>
      <p className="my-4">
        <em>
          <fbt desc="Tagline">Minimal, fast, sensible defaults.</fbt>
        </em>
      </p>
      <p className="my-4">
        <fbt desc="Template tools">
          Using{' '}
          <fbt:list
            items={[
              <Link key="vite" target="_blank" to="https://vitejs.dev/">
                Vite
              </Link>,
              <Link key="react" target="_blank" to="https://reactjs.org/">
                React
              </Link>,
              <Link key="relay" to="https://relay.dev/">
                Relay
              </Link>,
              <Link key="typescript" to="https://www.typescriptlang.org/">
                TypeScript
              </Link>,
              <Link
                key="tailwind"
                target="_blank"
                to="https://tailwindcss.com/"
              >
                Tailwind
              </Link>,
              <Link
                key="fbtee"
                target="_blank"
                to="https://github.com/nkzw-tech/fbtee"
              >
                fbtee
              </Link>,
              <Link
                key="better-auth"
                target="_blank"
                to="https://www.better-auth.com/"
              >
                Better Auth
              </Link>,
            ]}
            name="tools"
          />.
        </fbt>
      </p>
      <p className="my-4">
        <fbt desc="Instructions">
          Change{' '}
          <code className="rounded-sm border-1 border-pink-500 bg-neutral-100 px-1 py-1 font-mono text-pink-500 dark:border-pink-400 dark:bg-neutral-700 dark:text-pink-400">
            src/App.tsx
          </code>{' '}
          for live updates.
        </fbt>
      </p>
      <div>
        {session ? (
          <Stack gap={12} vertical>
            <div>
              <fbt desc="User greeting">
                Hello, <fbt:param name="name">{session.user.name}</fbt:param>
              </fbt>
            </div>
            <ErrorBoundary fallbackRender={() => null}>
              <Suspense>
                <RelayEntryPoint />
              </Suspense>
            </ErrorBoundary>
            <div>
              <a
                className="text-pink-500 dark:border-pink-400"
                onClick={() => AuthClient.signOut()}
              >
                <fbt desc="Logout button">Logout</fbt>
              </a>
            </div>
          </Stack>
        ) : !isPending ? (
          <SignIn />
        ) : null}
      </div>
      <p className="my-4">
        <Link to="/about">
          <fbt desc="About link">About this template</fbt>
        </Link>
      </p>
    </div>
  );
};

const About = () => (
  <div className="m-6 mx-auto w-8/12 rounded-sm border border-gray-200 p-4 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none">
    <h1 className="text-4xl">
      <fbt desc="About">About</fbt>
    </h1>
    <p className="my-4">🤘</p>
    <p className="my-4">
      <Link to="/">
        <fbt desc="Back to home link">Home</fbt>
      </Link>
    </p>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<About />} path="/about" />
    </Routes>
  );
}

import Stack from '@nkzw/stack';
import { useLocaleContext } from 'fbtee';
import { AnchorHTMLAttributes, useTransition } from 'react';
import { LinkProps, Link as ReactRouterLink, Route, Routes } from 'react-router';
import AvailableLanguages from './AvailableLanguages.tsx';
import AuthClient from './user/AuthClient.tsx';
import SignIn from './user/SignIn.tsx';

const cardClassName =
  'squircle relative m-6 mx-auto w-[min(92vw,760px)] overflow-hidden border border-gray-200/70 bg-white/85 p-5 shadow-[0_16px_70px_-32px_rgba(15,23,42,0.45)] transition duration-200 ease-out hover:shadow-[0_24px_80px_-38px_rgba(15,23,42,0.55)] dark:border-neutral-800 dark:bg-neutral-900/80';

const codeClassName =
  'squircle border border-input bg-background px-2 py-1 font-mono text-sm text-foreground shadow-sm dark:bg-neutral-900/40';

const linkClassName =
  'cursor-pointer text-primary underline decoration-foreground/30 underline-offset-4 select-none transition hover:decoration-foreground';

const Link = ({ className, ...props }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <ReactRouterLink className={linkClassName + (className ? ` ${className}` : '')} {...props} />
);

const LocaleSwitcher = () => {
  const [, startTransition] = useTransition();
  const { locale, setLocale } = useLocaleContext();

  return (
    <div>
      <a
        className={linkClassName}
        onClick={() => startTransition(() => setLocale(locale === 'ja_JP' ? 'en_US' : 'ja_JP'))}
      >
        {AvailableLanguages.get(locale)}
      </a>
    </div>
  );
};

const Home = () => {
  const { data: session } = AuthClient.useSession();

  return (
    <div className={cardClassName}>
      <Stack alignCenter between gap>
        <h1 className="text-4xl leading-tight font-semibold text-balance">
          <fbt desc="Greeting">Welcome</fbt>
        </h1>
        <LocaleSwitcher />
      </Stack>
      <p className="my-4 text-muted-foreground">
        <em>
          <fbt desc="Tagline">Minimal, fast, sensible defaults.</fbt>
        </em>
      </p>
      <p className="my-4 text-foreground/90">
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
              <Link key="typescript" target="_blank" to="https://www.typescriptlang.org/">
                TypeScript
              </Link>,
              <Link key="tailwind" target="_blank" to="https://tailwindcss.com/">
                Tailwind
              </Link>,
              <Link key="fbtee" target="_blank" to="https://github.com/nkzw-tech/fbtee">
                fbtee
              </Link>,
              <Link key="better-auth" target="_blank" to="https://www.better-auth.com/">
                Better Auth
              </Link>,
            ]}
            name="tools"
          />
          .
        </fbt>
      </p>
      <p className="my-4 text-foreground/90">
        <fbt desc="Instructions">
          Change <code className={codeClassName}>src/App.tsx</code> for live updates.
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
            <div>
              <a className={linkClassName} onClick={() => AuthClient.signOut()}>
                <fbt desc="Logout button">Logout</fbt>
              </a>
            </div>
          </Stack>
        ) : (
          <SignIn />
        )}
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
  <div className={cardClassName}>
    <h1 className="text-4xl leading-tight font-semibold text-balance">
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

import { useLocaleContext } from 'fbtee';
import { AnchorHTMLAttributes } from 'react';
import {
  LinkProps,
  Link as ReactRouterLink,
  Route,
  Routes,
} from 'react-router';
import AvailableLanguages from './AvailableLanguages.tsx';

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
  const { locale, setLocale } = useLocaleContext();

  return (
    <div>
      <a
        className="cursor-pointer text-pink-500 underline select-none hover:no-underline dark:text-pink-400"
        onClick={() => setLocale(locale === 'ja_JP' ? 'en_US' : 'ja_JP')}
      >
        {AvailableLanguages.get(locale)}
      </a>
    </div>
  );
};

const Home = () => {
  return (
    <div className="m-6 mx-auto w-8/12 rounded-sm border border-gray-200 p-4 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none">
      <div className="flex flex-nowrap items-center justify-between gap-2">
        <h1 className="text-4xl">
          <fbt desc="Greeting">Welcome</fbt>
        </h1>
        <LocaleSwitcher />
      </div>
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
              <Link key="vite" to="https://vitejs.dev/">
                Vite
              </Link>,
              <Link key="react" to="https://reactjs.org/">
                React
              </Link>,
              <Link key="typescript" to="https://www.typescriptlang.org/">
                TypeScript
              </Link>,
              <Link key="tailwind" to="https://tailwindcss.com/">
                Tailwind
              </Link>,
              <Link key="fbtee" to="https://github.com/nkzw-tech/fbtee">
                fbtee
              </Link>,
            ]}
            name="tools"
          />.
        </fbt>
      </p>
      <p className="my-4">
        <fbt desc="Instructions">
          Change{' '}
          <code className="2py-1 rounded-sm border-1 border-pink-500 bg-neutral-100 px-1 font-mono text-pink-500 dark:border-pink-400 dark:bg-neutral-700 dark:text-pink-400">
            src/App.tsx
          </code>{' '}
          for live updates.
        </fbt>
      </p>
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

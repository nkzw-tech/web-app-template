import { useLocaleContext } from 'fbtee';
import { AnchorHTMLAttributes, Fragment } from 'react';
import AvailableLanguages from './AvailableLanguages.tsx';

const Link = ({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
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
      <Link
        className="cursor-pointer select-none"
        onClick={() => setLocale(locale === 'ja_JP' ? 'en_US' : 'ja_JP')}
      >
        {AvailableLanguages.get(locale)}
      </Link>
    </div>
  );
};

const Card = () => {
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
              <Link href="https://vitejs.dev/" key="vite">
                Vite
              </Link>,
              <Link href="https://reactjs.org/" key="react">
                React
              </Link>,
              <Link href="https://www.typescriptlang.org/" key="typescript">
                TypeScript
              </Link>,
              <Link href="https://tailwindcss.com/" key="tailwind">
                Tailwind
              </Link>,
              <Link href="https://github.com/nkzw-tech/fbtee" key="fbtee">
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
    </div>
  );
};

export default function App() {
  const { locale } = useLocaleContext();
  return (
    <Fragment key={locale}>
      <Card />
    </Fragment>
  );
}

import Stack from '@nkzw/stack';
import { fbs } from 'fbtee';
import { FormEvent, useState } from 'react';
import AuthClient from './AuthClient.tsx';

const codeClassName =
  'squircle border border-input bg-background px-2 py-1 font-mono text-sm text-foreground shadow-sm dark:bg-neutral-900/40';

const inputClassName =
  'border-input squircle flex w-full border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900/40';

const buttonClassName =
  'squircle inline-flex h-9 cursor-pointer items-center justify-center gap-2 border border-input bg-background px-2 text-sm font-medium whitespace-nowrap ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:pt-[11px] active:pb-[9px] disabled:pointer-events-none disabled:opacity-50';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (event: FormEvent) => {
    event.preventDefault();

    await AuthClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {},
        onRequest: () => {},
        onSuccess: () => {},
      },
    );
  };

  return (
    <Stack gap vertical>
      <h2 className="text-lg font-bold">
        <fbt desc="Sign in heading">Sign In</fbt>{' '}
        <span className="text-sm font-normal text-muted-foreground">
          (
          <fbt desc="Prompt to view the server template repository">
            See{' '}
            <a
              className="text-primary underline decoration-foreground/30 underline-offset-4 transition hover:decoration-foreground"
              href="https://github.com/nkzw-tech/server-template"
              rel="noreferrer"
              target="_blank"
            >
              <code className={codeClassName}>nkzw-tech/server-template</code>
            </a>
          </fbt>
          )
        </span>
      </h2>
      <Stack as="form" gap onSubmit={signIn}>
        <input
          className={inputClassName}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={fbs('email', 'Email input placeholder')}
          type="email"
          value={email}
        />
        <input
          className={inputClassName}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={fbs('password', 'Password input placeholder')}
          type="password"
          value={password}
        />
        <button className={buttonClassName} type="submit">
          <fbt desc="Sign in submit button">Sign In</fbt>
        </button>
      </Stack>
    </Stack>
  );
}

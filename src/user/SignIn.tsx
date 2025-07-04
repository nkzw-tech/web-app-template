import { FormEvent, useState } from 'react';
import AuthClient from './AuthClient.tsx';
import Stack from '@nkzw/stack';

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
        Sign In{' '}
        <span className="font-normal text-sm">
          (See{' '}
          <a
            href="https://github.com/nkzw-tech/server-template"
            rel="noreferrer"
            target="_blank"
          >
            <code className="py-1 rounded-sm border-1 border-pink-500 bg-neutral-100 px-1 font-mono text-pink-500 dark:border-pink-400 dark:bg-neutral-700 dark:text-pink-400">
              nkzw-tech/server-template
            </code>
          </a>
          )
        </span>
      </h2>
      <Stack as="form" gap onSubmit={signIn}>
        <input
          className="p-2 rounded-sm border-1 border-pink-500 font-mono text-pink-500 dark:border-pink-400 dark:text-pink-400"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
          value={email}
        />
        <input
          className="p-2 rounded-sm border-1 border-pink-500 font-mono text-pink-500 dark:border-pink-400 dark:text-pink-400"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          value={password}
        />
        <button
          className="p-2 rounded-sm border-1 border-pink-500 font-mono text-pink-500 dark:border-pink-400 dark:text-pink-400"
          type="submit"
        >
          Sign In
        </button>
      </Stack>
    </Stack>
  );
}

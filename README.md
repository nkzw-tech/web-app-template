# Starter Kit for Vite, React, TypeScript & Tailwind

> [!IMPORTANT]
> **This template is deprecated.** For a new web app, run `vp create fate`. See [fate.technology](https://fate.technology/) for setup and documentation.

_Minimal, sensible defaults, fast._

Read [the blog post about this template](https://cpojer.net/posts/fastest-frontend-tooling-in-2022).

<img src="https://github.com/user-attachments/assets/63982227-510b-4376-a780-7db997026c4a" width="49%" />
<img src="https://github.com/user-attachments/assets/89b936b0-0fab-43e0-a1f2-97a800e14378" width="49%" />

## Technologies

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/) with [React Compiler](https://react.dev/learn/react-compiler) enabled
- [Relay](https://relay.dev/) for data fetching
- [Tailwind](https://tailwindcss.com/)
- [fbtee](https://github.com/nkzw-tech/fbtee) for i18n
- [Better Auth](https://www.better-auth.com/) for authentication
- [React Router](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org)
- [pnpm](https://pnpm.io/)

For mobile apps, see the [Expo app template](https://github.com/nkzw-tech/expo-app-template).

## Running an existing checkout

- Run `pnpm install` (or `npm install` if you don't use `pnpm`).
- Run `pnpm dev:setup`.
- `pnpm dev` for development.
- Use `pnpm test` to run tests.
- `pnpm build` for production builds.

_Note: You can install `pnpm` via `homebrew` on macOS: `brew install pnpm`._

## Relay Setup

By default, this template expects the [`nkzw-tech/server-template`](https://github.com/nkzw-tech/server-template) to be located side-by-side with this repository. You can adjust the location of the GraphQL schema in your [`relay.config.js`](https://github.com/nkzw-tech/web-app-template/blob/with-relay/relay.config.json#L4) file.

## Protips for the fastest Developer Experience

- Use [`npm-run-all2`](https://github.com/bcomnes/npm-run-all2) to parallelize local test runs.
- Use `oxlint` for linting and `oxfmt` for formatting.

## I'm not using Better Auth

You can simply remove everything related to Better Auth in the `src/user` directory.

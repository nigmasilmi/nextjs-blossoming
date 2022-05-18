# NextJS time to blossom

With the help of [NextJS & React - The Complete guide by Maximilian Schwarzmüller](https://www.udemy.com/course/nextjs-react-the-complete-guide/)

# Dev notes on learning NextJS

Some notes to ground the learning and for future reference.
🤓 Welcome!

# Deploying NextJS Apps

## Deployment Options

1. Standard Build

   - Triggered by next build
   - Produces optimized production bundles and a server-side app, which <strong> requires NodeJS server</strong>
   - Pages are pre-rendered (if possible) but NodeJS server is required for API routes, server-side pages and page revalidations
   - Re-deploy needed if code changes or you don't use revalidations and need page updates

2. Full Static Build

   - Triggered by next export
   - Produces 100% static app (HTML, CSS, JS): <strong>no NodeJS server required</strong>
   - Does not work if the app uses API routes, server-side pages or there is the need to use page revalidations
   - Re-deploy needed for all code and content changes

## General Deployment Steps and Considerations

- Add page metadata, optimize code, remove unnecessary dependencies
  - NextJS has built in lazy loading and works out of the box
- Double check configurations and use environment variables data
- Do a test build and test the production-ready app locally or on some test server
- Deploy!

## NextJS Config file and environment variables

[Go to the docs](https://nextjs.org/docs/api-reference/next.config.js/introduction)

- useful to define different environment varibles depending on the environment of the project (dev, test, prod, etc)
- assign the env vars in the config file under the "env" key, as follows:
- nextConfig can be an object or a function, and if it's a function,it must return the configuration object
- in its mode function (which is executed by NextJS), will automatically receive the phase argument

```js

/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
   reactStrictMode: true,
   env: {
      the-name-of-your-choice1: "the-value1",
      the-name-of-your-choice2: "the-value2",
      the-name-of-your-choice3: "the-value3",
   },
};

module.exports = nextConfig;

```

- to differentiate values for different environments:
  - ## in the config file, import the [appropiate phase](https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/constants.ts#L1-L5) constant from 'next/constants'
  - use the nextConfig as a function with the logic to check the phase and return the different env for each case

```js
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
         the-name-of-your-choice1: "the-value1-dev",
         the-name-of-your-choice2: "the-value2-dev",
         the-name-of-your-choice3: "the-value3-dev",
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
       the-name-of-your-choice1: "the-value1",
       the-name-of-your-choice2: "the-value2",
       the-name-of-your-choice3: "the-value3",
  };
};
```

## Running a test build & reducing code size

- run the build command
- the info generated will indicate the size in red the considered as big pages (at the client side)
- in the case of this specific app, /posts/[slug] and specifically the component PostContent is loading a big third-party libray: react-syntax-highlighter, but fortunately the athors offer a light build version, so we must swap it

## Deploy!

- running next build produces a /.next folder with the bundled code
- in a server, the folder can be placed (install dependencies) and the command next start will lift up the application
- also make sure to port 3000 to 80 (the outside world), but the specific steps will depend on the hosting provider
- the same as before (without installing because the dependencies would be installed already ) can be done in the dev machine (note that the production build runs faster than the dev one)

### Using Vercel

- Sign up or sign in with GitHub, BitBucket or GitLab
- new project > import GitHub repository (select and import)

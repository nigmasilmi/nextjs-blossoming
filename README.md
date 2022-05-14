Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Dev notes on learning NextJS

Some notes to ground the learning and for future reference.
🤓 Welcome!

## API Routes

- its location is the /pages/api (must be named api)
- inside there will be files with regular JS functions that manage only server-side code
- its structure responds to NodeJS syntax and tools

A very basic example:

```
function handler(req, res) {
  res.status(200).send("Hello world");
}

export default handler;
```

### Sending Requests to API Routes

- normal request to an API to the route /api/<the-name-of-the-file>

### Using API routes for pre-rendering pages

- use case: request and pre render data from the own app pages to the own API
- we cannot fetch data inside getStaticProps() to call a self API
- instead write any Node logic inside getStaticProps()

### Creating and using Dynamic API Routes

[Check from the source](https://nextjs.org/docs/api-routes/dynamic-api-routes)

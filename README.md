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

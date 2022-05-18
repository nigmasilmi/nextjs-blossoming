# NextJS time to blossom

With the help of [NextJS & React - The Complete guide by Maximilian Schwarzmüller](https://www.udemy.com/course/nextjs-react-the-complete-guide/)

# Dev notes on learning NextJS

Some notes to ground the learning and for future reference.
🤓 Welcome!

# Authentication

## Refresher on Auth in React (and NextJS)

- Client logs in with user credentials
- Server checks the credentials (user and pass), and sends the appropiate response
- The Client then needs to access a protected route, for that there is the need to use credentials, more complex data than a single flag

### Aproaches to handle permissions

1. Server-side Sessions
   1.1 The server stores a unique identifier in the server (DB)
   1.2 Sends that unique identifier to the client
   1.3 The client attaches that identifier to subsequent requests to the server that allows to grant or reject access to protected resources
   1.4 The server checks for that identifier in the request, then checks the stored data in DB and rejects or accepts the incoming request
   1.5 The requests in transit are protected by [SSL](https://developer.mozilla.org/en-US/docs/Glossary/SSL) and in the client that identifier can be stored in a cookie which at the same time can be configured that is not accessible thorugh JS to prevent cross-site attacks and then in the client/browser side ... ("you can only hack yourself")
2. Authentication Tokens
   2.1 The server does not store tokens or identifiers
   2.2 The server instead create and signs tokens
   2.3 That token can be sent to the client which will attach to subsequent requests to the server
   2.4 the server verifies if the token was created by itself or not

### SPAs work with tokens instead of sessions

- Pages are served directly and populated with logic without hitting the server
- Of course, with NextJS there is the option to generate server side code with each request getServerSideProps, but not all pages will behave that way, also once the first page is rendered in the server, React takes over. the point is that <strong>there is no one-to-one request per each page visited</strong>
- Backend APIs work in a "stateless" way (they don't care about connected clients )
- Servers don't save information about authenticated clients, the clients instead should get information that allows them to prove their authentication: all this can be done with JWT

### JWT are generated with 3 main pieces

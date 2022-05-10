This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

# Dev notes on learning NextJS

Some notes to ground the learning and for future reference.
🤓 Welcome!

## Pages and File-based Routing

(instead of Code-based Routing)

- Regular component files inside /pages folder
- The routes are inferred from that folder and files inside, it is how NextJS works
- Nesting folders work as new segment of the route
- [] works as a dynamic segment of the route

### Named / Static Route Files

- adding directly in /pages
- creating a nested folder in /pages, e.g. /pages/profile
- add index.js component to /pages/profile or another named component, then the route will be /pages/profile/<name-of-the-component-file-without-js-extension>

### Dynamic Paths and Routes

- create a file inside the correspondent folder which name is enclosed with [], add the js extension
- the name inside the [] is some identifier of our choice. Example [projectId].js inside of /portfolio
- the route path to access will be /portfolio/<some-identifier> <= this identifier is a placeholder at the begining, so it can be anything like /portfolio/someId or /portfolio/123

### Extracting Dynamic Path Segments Data

- React hook to the rescue: useRouter
- import from next/router
- execute and get the generated object
- router.pathname gives us the inferred route: /portfolio/[projectId]
- router.query gives us the dynamic fragment in the form of an object where the name of the property is the name enclosed in [] and the value, the specific value of the dynamic data.
- Example: {
  "projectId": "someId"
  }

### Building Dynamic nested Routes and Paths

- Use case: The users have multiple projects. And we need to show different views for the client with all its projects and also for a selected project for an specific user. Ej: /clients/nig/123

- For that, the folders can have [thisDynamicEncolsedData], in the previous example, this would be clients/[id]/[clientprojectId] where [id] is a folder.

- the [id] folder can have an index.js file, there is no problem with that. And in that view we can show all the projects for that client id.

### Adding Catch-All Routes

- use case: we need to support routes to show blog posts based on:

  - its id
  - its month of publication
  - its day of publication
  - its slug

- Then technically we need to render the same component no matter the route

- That is achieved with [...<any-name-we-choose>]
  - Example: [...slug] inside of /blog
  - /blog/567 will give us the router.query: {slug: ["567"]}
  - /blog/janedoe/345/march12 will give us: {slug: ["janedoe", "345", "march12"]}

### Navigating with the Link component

- The links can be added like normal anchor tag links but that will behave as a normal http request

- Link is a component from next that serves similar functions as the Link of React Router, but its implementation is different
  - import Link from 'next/link'
  - <Link href="/path/of/interest">Link text</Link>

### Navigation to Dynamic Routes

- import Link form 'next/link'
- implement the Link as usually, populate dinamycally. Check the /clients/index.js

### Different ways of setting links' href

- besides from a string, a Link href prop can receive an object with the properties pathname and query that we have seen already
  `<Link href={{ pathname:'/clients/[id]', query:{id:client.id} }}>{client.name}</Link>`

### Programmatic Navigation

- use case: our app needs a cta button that takes the user to some specific route

- link a button to a function that performs `router.push('/the/path/we/want/to/go')` or `router.replace('/the/path/we/want/to/go')` with replace() we can go back to the previous page

- replace and push also can receive objects with pathname and query

```
router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "jane", clientprojectid: "holaid" },
    });
```

### Adding a custom 404 page

- on the root of the /pages, add a 404.js (just like that, NextJS knows what to do with this)

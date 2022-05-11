# Dev notes on learning NextJS

Some notes to ground the learning and for future reference.
🤓 Welcome!

## Pre-rendering and Data Fetching

- Pre render pages in server side
- helps us with running code on the server side
- How to blend server side with client side code

### The problem with traditional React Apps

- The initial content of a page is the content without any data fetched from some backend
- There is a delay for the user to see the data
- The SEO won't work as expected for the fact that the initial content does not have the full content of it

## How NextJS Prepares and Pre-renders a page

1. Request to visit the page
2. NextJS returns a pre-rendered page
3. The pre-rendering includes all the data that may be needed
4. The pre-rendered code is then taken over by React which "hydrates" the content once loaded

- the pre-rendering only affects the first load

## Forms of Pre-rendering

- Static Generation
- Server-side Rendering

## Static Generation

- Is tipically recommendend (depends on the use case)
- Pre-generated a page with data on the server side <strong>during build time</strong> before deploying
- Pages are prepared ahead to time and can be cached by the server /CDN serving the app

### How to instruct the Static Generation

- From the <strong>pages components</strong>

```
export async function getStaticProps(context){...}
```

- That function should contain only code that normally would run on server-side
- The code of that function won't be bundled on the client side, for example if we use credentials in that code, those wont't be visible by the client
- NextJS is watching for getStaticProps, and if it finds it in our code, executes it on our behalf
- It is executed before the component function

### getStaticProps implementation details

- Must always return an object
- The object returned must contain the <strong>props</strong> property, which value must be an object and the rest is up to our implementation.

Example:

```
export async function getStaticProps() {
  return {
    props: {
      products: [
        { id: "p1", name: "Forerunner 245" },
        { id: "p2", name: "Fénix" },
      ],
    },
  };
}

```

### Running Server-side Code & Using The File System

- With this approach we can interact with Node and the file system, because we are able to write code that will be executed on the server-side
- The server-side code must be written in getStaticProps
- The imports used inside getStaticProps won't be bundled into the client side
- process.cwd() returns the current working directory of the file when is executed and treats all the files as the where in root, so it is the overall starting folder

### Behind the Scenes build

- When we execute the build script, NextJS shows informatiion about which pages were generated with static content and which with getStaticProps
- The build bundle can be found in /.next/server/pages, and in there we can see the static HTML generated
- If we want to view those static generated html files, we run npm start

### Utilizing Incremental Static Generation

- Generating a code via build is good for fairly static pages, but what if the data changes frequently (like new products added each day to the Data base)

- solution 1: Pre build the page but also use useEffect to fetch data
- solution 2: getStaticProps executes also in Incremental Static Generation on every request at most every X seconds
- to unlock it, in the object returned after the props add revalidate property with a value of number of seconds

Example:

```
return {
    props: {
      products: data.products,
    },
    revalidate: 120,
  };
```

### getStaticProps configuration options

[Know from the source](https://nextjs.org/docs/api-reference/data-fetching/get-static-props)<br />
<br />
The getStaticProps function should return an object containing either props, redirect, or notFound followed by an optional revalidate property.

```
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }
```

### Working with Dynamic Parameters

- through the context argument of getStaticProps we can access to the parameters in the url
- we can prepare the data in advance for a specific page if we make use of getStaticProps in it

```
export async function getStaticProps(context) {
 ...

  const { params } = context;
  const productId = params.<the-name-of-the-query-key>;
  const productContent = data.find((product) => product.id === productId);
  return {
    props: {
      product: productContent,
    },
  };
}
```

- But with the previous snapshot we have a problem and is that getStaticPaths is required for dynamic SSG (Static Site Generation) pages, so...

### Using getStaticPaths

- For dynamic pages with getStaticProps NexJS DOES NOT pre generate the page because there are multiple options to render de same page, e.g: products/forerunner245, products/forerunner55, etc

- We have to give Next the instances that can be generated, because multiple concrete [parameter] are pre-generated

- That is why we need to implement getStaticPaths

```
export async function getStaticPaths(){...}
```

- getStaticPaths must return an object with the property `paths` which value is an array of objects, those objects are the possible routes that we expect to be requested by the users

```

export async function getStaticPaths() {
  return {
    paths: [
      { params: { productId: "p1" } },
      { params: { productId: "p2" } },
      { params: { productId: "p3" } },
    ],
    fallback: false,
  };
}
```

- imagine a use case with 1000 or more posible paths, for that we use fallback: true, that takes into account another route values and takes them as valid ones, but does not pre generate those pages' data, instead they are generated in time.

- also keep in mind that if one of thos not explicit routes are visited directly (via link or typed) would be an error because the content is not already loaded. For that <strong>we have to prepare our component with a validation</strong> and a fallback content. When the data is available, the component will re-render automatically.
  Check the [productId].js for clarification

- an alternative is to use `fallback: 'blocking'` and we don't need to add a component fallback because Next will wait untill the page is fully pre generate in the server before serving it. It make take longer for the user.

- the final solution for this introduction project is to map all the product id's and pass them as objects, and setting the fallback to false.

### Fallback pages and not found pages

- with fallback to true we are telling Next that in spite of the ids settings, or predefining, we are expecting the posibility that there is another id or specific page that we are not considering, and in this case, we need a fallback page. Because even though we are setting a loading snippet, there is the case in which the product the user requests does not exist.

- so we set notFound to true in the returned object

```
export async function getStaticProps(context) {
  const data = await getData();
  const { params } = context;
  const productId = params.productId;
  const productContent = data.products.find(
    (product) => product.id === productId
  );

if(!productContent){
    return {notFound: true}
}

  return {
    props: {
      product: productContent,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { productId: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}
```

## Server-side Rendering SSR

- sometimes we need to pre-render for every request or we need access to the request object (e.g. for cookies)
- NextJS allows to run "real" server-side code as well
- that code is implemented inside getServerSideProps

### getServerSideProps

```
export async function getServerSideProps(){...}
```

- suppose an use case in which we need to render a user-profile page, but we need to identify which user is making the request via cookies

- the page cannot be dynamic because with knowing the userid and using it like this [userId].js, only with knowing the id of the user anyone could enter to that reserved page (also there is much more about authentication further ahead in the course)

- then coming back to the idea of cookies, we need to have access to the request, that is something that can be done in getServerSideProps()

- the implementation details for getServerSideProps() is very similar to getStaticProps()
  - must return an object
  - the object returned must have a props property
  - can have notFound
  - can have fallback
  - cannot have revalidate, because by default getServerSideProps() executes with every request

### getServerSideProps context

- with context we get full access to the REQUEST object and also to the RESPONSE that will be sent back

### getServerSideProps in Dynamic Pages

- when we used getStaticPaths and getStaticProps we needed them to prepare the possible pages that would potentially be requested by the user, that is why we needed the path generation in advance. But in this case...
- given that getServerSideProps is executed with each render and that we can access to the server, to load a specific entity-id page we just need to access the params through the context and request the specific instance with that data. Check out [postId].js

## Client-side data fetching

### Some data doesn't need to be pre-rendered

1. Data changing with high frequency (each minute or so)
2. Highly user-specific data, like orders in an online shop. Also in this case we don't need to make the content available for SEO optimization.
3. Partial data, like a dashboard

- In these cases (when the data changes very frequently or there is some specific user data or a huge amount of data from which only a part is used), it is better to render the data in the client-side with a classic React approach

### Implementing Client-side data fetching

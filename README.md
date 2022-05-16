# Dev notes on learning NextJS

Some notes to ground the learning and for future reference.
🤓 Welcome!

(latest notes on top)

# Integrate Context in a NextJS application

## Context implementation refresher

1. Create a context object with the help of createContext imported from 'react'
2. Pass the main structure as an argument to createContext (definition and autocompletion)
3. Export default 1.
4. Create a React component that will manage all the context-related state, that component must be the explicit provider of the context and wrap its props.children
5. Export 4.
6. In 4 define the states and methods that manage that state.
7. In 4 consolidate 6 into a single object to pass as props that its children can receive and use.
8. Wrap the components at the top most needed level, in order that all its stakeholders have access to the context.
9. In the place where the context provider is used, there whe can use useContext to access all properties of the context

10. There is a place where we use the context and there is a place where we set the context, in both cases we use 9, the difference is that where we use the context, we are interested in the properties and in the setter phase we use the functions that manipulate the state

## Fetch() handling errors

<q><i>The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.</i></q><br />
[Check this out](https://towardsdev.com/how-to-handle-404-500-and-more-using-fetch-api-in-javascript-f4e301925a51)

# Implementing API routes

In pages/api structure the routes follow the same structure/pattern than the normal /pages folder.

- The code inside the handler functions are NodeJS code, that handles requests and responses. Good'al NodeJS code.

# Project optimization

## The need for a head metadata

- By default NextJS adds a pretty basic metadata, as our clients may certainly need, the use of scripts for SEO and other functionalities will be needed, so how can we add such information?

### Configuring the head content

- Use the special Head component

```
import Head from 'next/head'
```

- Can be added any component

### Adding dynamic head content

- We can use all the pieces of information that are available inside a component to construct the data inside meta tags or title tags
- Keep in mind that the content of those tags will be available in the code of the fully rendered page but also in the server response
- There are some edge cases where that content will not be visible in the server response, like for example in the filtered events, because if we place that head only in one of the options (the happy path) the other paths won't receive that configuration.
- The above notes brings the necessity of the logic reuse

### Reusing logic inside a component

- We can implement a typical reusage of logic inside a NextJS component but also...

### Working with the \_app.js file and why

- use case: we need a base head content in all pages
- define and implement in \_app.js straightforward

### Head content merging

- if we set a Head in \_app.js and the another specific Head for any internal page, that content will merge into one
- if there is a conflict like twice the definition of title, then the last one is applied

### \_document.js file

- allows to implement application-wide settings
- must be at the pages root side by side with \_app.js
- must contain a class-based component, which its base structure is as following:

```
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

### Images optimization

- the special component Image creates various images on the fly for differents OS and devices according to the request that is been received by the server, those images will be chached for requests from similar devices

- Those generated images can be found in /.next/cache/images

- the implementation is similar to a normal image but the width and the height must be explicitly set (and manually calculated according to the css rules or the calculated value)

```
<Image src={`/${image}`} alt={imageAlt} width={160} height={160} />
```

- the value of width and height must be checked in responsive behavior, and even though we set the dimensions, the css rules still applies as normally would

# Dev notes on learning NextJS

Some notes to ground the learning and for future reference.
🤓 Welcome!

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

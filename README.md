# prismic-query-api-simple

Simple package to query Prismic API

Use like this:

```javascript
import PrismicQuery from 'prismic-query-api-simple'

const prismicCredentials = {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  repo: process.env.PRISMIC_REPOSITORY
}
const prismic = new PrismicQuery(prismicCredentials)

// Creates queries with Prismic.Predicates.at
const contentQuery = {
  'document.type': 'document_type',
  'document.tags': ['something', 'something-else']
}

// https://prismic.io/docs/javascript/query-the-api/query-options-reference
const options = {
  'orderings': '[document.last_publication_date]',
  'pageSize': 100
}

return prismic.fetchContent(contentQuery, options)
  .then(pages => {
    // Do stuff with pages
    // ...
  })
  .catch(error => Promise.reject(error))
```

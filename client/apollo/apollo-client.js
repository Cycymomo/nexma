import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import withApollo from 'next-with-apollo'
import fetch from 'isomorphic-unfetch'

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ headers, initialState }) =>
    new ApolloClient({
      link: new HttpLink({
        ...(typeof window === 'undefined' && { fetch }),
        headers,
        credentials: 'include',
        uri: 'http://localhost:4000'
      }),
      cache: new InMemoryCache().restore(initialState || {}),
      ssrMode: typeof window === 'undefined',
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include',
          },
        })
      },
    })
)

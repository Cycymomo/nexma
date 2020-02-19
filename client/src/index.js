import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import App from './App'
import { unregister } from './serviceWorker'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      },
    })
  },
})

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
)

render(ApolloApp(App), document.getElementById('root'))
unregister()

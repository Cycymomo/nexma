import React from 'react'
import Head from 'next/head'
import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'

import withData from '../apollo/apollo-client'

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props
    return (
      <ApolloProvider client={apollo}>
        <Head>
          <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔱</text></svg>"/>
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withData(MyApp)

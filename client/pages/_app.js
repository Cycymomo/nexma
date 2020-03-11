import Head from 'next/head'
import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'

import withData from '../apollo/apollo-client'
import Nav from '../components/nav'

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props
    return (
      <ApolloProvider client={apollo}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav></Nav>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withData(MyApp)

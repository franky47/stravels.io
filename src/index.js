import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AppContainer } from 'react-hot-loader'
import { EventEmitter } from 'events'

import auth from './lib/auth'

// Root styling
import 'normalize.css'
import './resources/heebo/stylesheet.css'
import './index.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/graphql' : 'https://stravels-graphql.now.sh/graphql'
})

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: auth.jwt ? `Bearer ${auth.jwt}` : undefined
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, data }) => {
      console.group('[GraphQL Error]')
      console.log(message)
      if (data) console.log(data)
      if (path) {
        console.log('Path', path)
      }
      if (locations) {
        console.log('Locations', locations)
      }
      console.groupEnd()
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache()
})

const serviceWorkerEvents = new EventEmitter()

const render = Component => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <AppContainer>
        <App serviceWorkerEvents={serviceWorkerEvents} />
      </AppContainer>
    </ApolloProvider>,
    document.getElementById('root')
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}

registerServiceWorker(serviceWorkerEvents)

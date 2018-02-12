import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AppContainer } from 'react-hot-loader'
import { EventEmitter } from 'events'

import auth from './lib/auth'

// Root styling
import 'normalize.css'
import './index.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const httpLink = new HttpLink({
  // uri: 'http://localhost:3000/graphql'
  uri: 'https://stravels-graphql.now.sh/graphql'
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

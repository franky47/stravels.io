// React & GraphQL
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'

// Development tools
import { AppContainer } from 'react-hot-loader'

import { register as registerServiceWorker, swEvents } from './serviceWorker'
import graphqlClient from './graphql'

import App from './App'

const RootComponent = () => (
  <ApolloProvider client={graphqlClient}>
    <AppContainer>
      <App serviceWorkerEvents={swEvents} client={graphqlClient} />
    </AppContainer>
  </ApolloProvider>
)

ReactDOM.render(<RootComponent />, document.getElementById('react-root'))

registerServiceWorker()

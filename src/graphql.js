import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import auth from './lib/auth'

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/graphql'
      : 'https://stravels-graphql.now.sh/graphql'
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

export default new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
})

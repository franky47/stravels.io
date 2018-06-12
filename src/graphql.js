import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import auth from './lib/auth'

let client = null

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

export const reauthenticate = (client: any): Promise<> => {
  console.log('Reauthenticating...')
  return client
    .mutate({
      mutation: gql`
        mutation {
          jwt: refreshToken
        }
      `
    })
    .then(({ data }) => {
      if (data && data.jwt) {
        auth.authenticate(data.jwt)
      } else {
        throw new Error('Invalid response')
      }
    })
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, data }) => {
      console.group('[GraphQL Error]')
      console.log(message)
      if (data) console.log('Data:', data)
      if (path) {
        console.log('Path:', path)
      }
      if (locations) {
        console.log('Locations:', locations)
      }
      console.groupEnd()
    })

    graphQLErrors.forEach(({ data }) => {
      if (data && data.reason === 'jwt expired') {
        reauthenticate()
          .then(window.location.reload)
          .catch(() => {
            window.location.replace('/login')
          })
      }
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
})

export default client

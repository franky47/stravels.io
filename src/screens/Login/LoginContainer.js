// @flow

import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import LoginComponent from './LoginComponent'

// GraphQL --

const mutation = gql`
  mutation LoginWithCode($code: AuthenticationCode!) {
    jwt: loginWithCode(code: $code)
  }
`
const withGraphQL = graphql(mutation, {
  name: 'loginWithCode'
})

// --

export default withGraphQL(withRouter(LoginComponent))

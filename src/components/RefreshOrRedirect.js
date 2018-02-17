import React from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import auth from '../lib/auth'
import Spinner from './core/Spinner'

const mutation = gql`
mutation RefreshJwt {
  jwt: refreshToken
}
`
const withGraphQLMutation = graphql(mutation, {
  name: 'refreshToken'
})

class HocBody extends React.Component {
  state = {
    renderComponent: false,
    renderRedirect: false
  }

  async componentWillReceiveProps (nextProps) {
    // console.log('cwrp', this.props, nextProps)
    const { data: queryData } = nextProps
    if (queryData.loading || !queryData.error) {
      // console.log('ROR: Everything ok, rendering component')
      this.setState({
        renderComponent: true,
        renderRedirect: false
      })
    } else {
      // console.log('ROR: Found error, start mutation')
      this.setState({
        renderComponent: false,
        renderRedirect: false
      })
      try {
        const { refreshToken } = nextProps // from GraphQL mutation injection
        const { data: mutationData } = await refreshToken()
        // console.log('ROR: Data received from mutation, authenticating')
        auth.authenticate(mutationData.jwt)
        window.location.reload()
      } catch (error) {
        // console.log('ROR: Mutation returned error, redirecting', error)
        this.setState({
          renderComponent: false,
          renderRedirect: true
        })
      }
    }
  }

  render () {
    const { Component, data, ...rest } = this.props
    const { renderComponent, renderRedirect } = this.state
    // console.log(this.state, this.props)
    if (renderComponent) {
      return <Component data={data} {...rest} />
    }
    if (renderRedirect) {
      return <Redirect to='/login' />
    }
    return <Spinner />
  }
}

export default Component => withGraphQLMutation((props) => <HocBody Component={Component} {...props} />)

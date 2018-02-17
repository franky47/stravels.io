import React from 'react'
import Logo from '../core/Logo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import profilePlaceholder from '../../resources/placeholder-user-64px.jpg'

import './Header.css'

const Header = ({ data }) => {
  const profile = data.me ? data.me.profilePicture : profilePlaceholder
  return (
    <header className='editor-header'>
      <Logo size={40} />
      <h1>Stravels</h1>
      <img src={profile} alt='profile' className='profile' />
    </header>
  )
}

const query = gql`
query {
  me {
    profilePicture
  }
}
`
export default graphql(query)(Header)

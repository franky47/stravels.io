import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import auth from '../lib/auth'

import './Landing.css'

export default () => {
  if (auth.isAuthenticated) {
    return <Redirect to='/activities' />
  }
  return (
    <React.Fragment>
      <section className='hero'>
        <h2 className='title'>
          <img
            src='/img/logo.png'
            srcSet='/img/logo@2x.png 2x'
            alt='logo'
          />
          Stravels
        </h2>
        <h1>Share your travels made with Strava</h1>
        <Link to='/activities'>Get started</Link>
      </section>
      <section className='mobile'>
        <p className='description'><i>Coming soon for Android and iOS</i></p>
      </section>
      <section className='about'>
        <a href='https://developers.strava.com'>
          <img
            src='/img/poweredByStrava.png'
            srcSet='/img/poweredByStrava@2x.png 2x'
            alt='Powered by Strava'
          />
        </a>
      </section>
    </React.Fragment>
  )
}

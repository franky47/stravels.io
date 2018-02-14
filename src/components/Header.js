import React from 'react'
import logo from '../resources/stravels-logo.svg'
import './Header.css'

export default () => (
  <header className='app-header'>
    <img src={logo} alt='logo' />
    <h1>Stravels</h1>
  </header>
)

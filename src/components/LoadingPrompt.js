import React from 'react'
import Logo from './core/Logo'
import Spinner from './core/Spinner'

import './LoadingPrompt.css'

const prompts = [
  'Pumping up tyres...',
  'Checking brake pads...',
  'Filling up bottles...',
  'Loading up panier racks...',
  'Polishing saddle...',
  'Checking the weather...',
  'Planning route...'
]

export default class LoadingPrompt extends React.Component {
  state = {
    display: false,
    index: 0
  }

  componentDidMount () {
    // Show this component only after a brief moment, to avoid spinner flash
    this.displayTimeout = setTimeout(() => this.setState({ display: true }), 500)

    const increment = () => {
      this.setState(prevState => ({
        index: (prevState.index + 1) % prompts.length
      }))
      this.incrementTimeout = setTimeout(increment, 1000 + Math.random() * (1500 + this.state.index * 500))
    }
    this.incrementTimeout = setTimeout(increment, 2000)
  }
  componentWillUnmount () {
    clearTimeout(this.displayTimeout)
    clearTimeout(this.incrementTimeout)
  }

  render () {
    const { index, display } = this.state
    if (!display) return null
    return (
      <section className='loading-prompt'>
        <Logo size={70} />
        <p>{prompts[index]}</p>
        <Spinner size={40} />
      </section>
    )
  }
}

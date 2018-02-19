import React from 'react'

import './EditableText.css'

export default class EditableText extends React.Component {
  state = {
    prevText: '',
    text: ''
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.text) {
      this.setState({
        text: nextProps.value,
        prevText: nextProps.value
      })
    }
  }

  render () {
    const className = ['editable-text', this.props.className].join(' ')
    return (
      <div className={this.props.className}>
        <input
          ref={this._ref}
          className={className}
          onChange={this._onChange}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onKeyUp={this._onKeyUp}
          value={this.state.text}
        />
        <span className='border' />
      </div>
    )
  }
  _ref = (input) => {
    this.input = input
  }
  _onFocus = () => {
    this.setState((prevState) => ({
      prevText: prevState.text
    }))
  }
  _onChange = ({ target }) => {
    this.setState({
      text: target.value
    })
  }
  _onKeyUp = ({ key }) => {
    switch (key) {
      case 'Enter':
        this.input.blur()
        break
      case 'Escape':
        this.setState(prevState => ({
          text: prevState.prevText
        }), () => this.input.blur())
        break
      default:
        break
    }
  }
  _onBlur = () => {
    if (this.state.prevText !== this.state.text) {
      this.props.onChange(this.state.text)
    }
  }
}

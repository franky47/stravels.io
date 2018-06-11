// @flow

import * as React from 'react'

import Input from '@material-ui/core/Input'

export default class AutoSelectInput extends React.Component<any> {
  ref: ?HTMLInputElement

  componentDidMount() {
    this.autoSelect()
  }

  render() {
    return <Input {...this.props} inputRef={this.createRef} />
  }

  createRef = (ref: HTMLInputElement) => {
    this.ref = ref
  }
  autoSelect = () => {
    if (!this.ref) {
      return
    }
    this.ref.setSelectionRange(0, this.ref.value.length)
  }
}

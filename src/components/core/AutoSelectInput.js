import * as React from 'react'

import Input from '@material-ui/core/Input'

export default class AutoSelectInput extends React.Component {
  componentDidMount() {
    this.autoSelect()
  }

  render() {
    return <Input {...this.props} inputRef={this.createRef} />
  }

  createRef = ref => {
    this.ref = ref
  }
  autoSelect = () => {
    if (!this.ref) {
      return
    }
    this.ref.select()
  }
}

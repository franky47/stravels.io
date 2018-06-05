// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { renameTravel } from 'state/actions/travels'

import type { State } from 'state/types'
import type { TravelID } from 'lib/types'

import MetaEditor from './MetaEditorComponent'

// Redux --

const mapDispatchToProps = dispatch => ({
  renameTravel: (id: TravelID, title: string) => {
    dispatch(renameTravel(id, title))
  }
})

const withRedux = connect(null, mapDispatchToProps)

// --

export default withRouter(withRedux(MetaEditor))

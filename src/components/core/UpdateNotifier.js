import React from 'react'

import './UpdateNotifier.css'

const onClick = () => {
  // true = force reload from server, ignore cache
  window.location.reload(true)
}

export default () => (
  <div className="update-notifier">
    A new version of Stravels is available
    <button onClick={onClick}>Refresh</button>
  </div>
)

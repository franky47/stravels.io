import React from 'react'
import Header from './Header'
import EditableText from '../core/EditableText'
import Stats from './Stats'

import './LeftPanel.css'

export default ({ onTitleChange = () => {}, children }) => (
  <aside className='editor-left-panel'>
    <Header />
    <div className='editor-details'>
      <EditableText className='title' onChange={onTitleChange} />
      <div className='date-range'>July - August 2017</div>
    </div>
    <Stats />
    { children }
  </aside>
)

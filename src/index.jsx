import React, {StrictMode} from 'react'
import {render} from 'react-dom'
import {App} from './App.jsx'
import './index.css'

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
)

if (import.meta.hot) {
  import.meta.hot.accept()
}

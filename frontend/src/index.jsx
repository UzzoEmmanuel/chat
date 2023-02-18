import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/components/App'
import './sass/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/components/App'
import { AuthProvider } from '../src/utils/context/AuthProvider'
import './sass/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)

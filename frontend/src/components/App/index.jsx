import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { useAuth } from '../../utils/context/AuthContext'
import Connexion from '../../pages/Connexion'
import Dashboard from '../../pages/Dashboard'
import Error from '../../pages/Error'

export default function App() {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  )
}

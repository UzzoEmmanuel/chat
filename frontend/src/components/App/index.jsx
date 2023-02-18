import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Connexion from '../../pages/Connexion'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  )
}

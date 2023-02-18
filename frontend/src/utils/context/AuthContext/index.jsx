import React, { createContext } from 'react'

const AuthContext = createContext()

const useAuth = () => {
  const context = React.useContext(AuthContext)
  return context
}

export { useAuth, AuthContext }

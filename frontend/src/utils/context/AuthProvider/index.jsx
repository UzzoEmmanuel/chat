import React, { useState, useEffect } from 'react'
import { AuthContext } from '../AuthContext'
import Loader from '../../../components/Loader'

const ROOT_URL = process.env.REACT_APP_ROOT_URL
const getToken = localStorage.getItem('token')
const token = getToken

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    isAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const connect = (token, user) => {
    if (token) localStorage.setItem('token', token)
    if (user) {
      setIsAuthenticated(true)
      setUser(user)
    }
  }

  //signUp
  //--------------------------------------------------------------------------------------------------------------------------------------------
  const signupUser = async (data) => {
    return fetch(`${ROOT_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.error?.code === 'P2002' &&
          data.error?.meta?.target === 'User_username_key'
        ) {
          alert("nom d'utilisateur déjà existant")
        } else if (
          data.error?.code === 'P2002' &&
          data.error?.meta?.target === 'User_email_key'
        ) {
          alert('email déjà existant')
        } else if (
          data.message ===
          'le mot de passe doit faire au minimum 8 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial'
        ) {
          alert('format du mot de passe est incorrect')
        } else {
          connect(data.token, data.user)
        }
      })
  }

  //login
  //--------------------------------------------------------------------------------------------------------------------------------------------
  const loginUser = async (data) => {
    return fetch(`${ROOT_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.status === 401) {
          alert('connexion non authentifiée')
        } else {
          return data.json()
        }
      })
      .then((data) => connect(data.token, data.user))
  }

  //getLoggedUser
  //--------------------------------------------------------------------------------------------------------------------------------------------
  const getLoggedUser = async () => {
    return fetch(`${ROOT_URL}/loggedUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!!data) connect(null, data)
        else logout()
        setLoading(false)
      })
  }

  //logout
  //--------------------------------------------------------------------------------------------------------------------------------------------
  const logout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
  }

  //authentification
  //--------------------------------------------------------------------------------------------------------------------------------------------
  const isAuth = async () => {
    if (getToken === null || getToken === '' || getToken === 'undefined') {
      setIsAuthenticated(false)
      setLoading(false)
      return
    }
    getLoggedUser()
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loginUser,
        signupUser,
        logout,
      }}
    >
      {/* <Loader /> */}
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  )
}

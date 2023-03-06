import { useState } from 'react'
import { useAuth } from '../../../utils/context'
import { LockOpenIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { isAuthenticated, loginUser, logout } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await loginUser({ email, password })
    if (isAuthenticated) {
      return logout()
    }
  }

  return (
    <>
      <div className="connexion__form">
        <div className="connexion__form__title">
          <h2>Connexion</h2>
        </div>
        <form
          className="connexion__form__body"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="connexion__form__input">
            <label htmlFor="username"></label>
            <input
              id="email-login"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              placeholder="Email"
              required
              className="connexion__form__input__field"
            />
          </div>
          <div className="connexion__form__input">
            <label htmlFor="password"></label>
            <input
              id="password-login"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              autoComplete="on"
              placeholder="Mot de passe"
              required
              className="connexion__form__input__field"
            />
          </div>
          <div className="connexion__form__button">
            <button type="submit" className="connexion__form__button__submit">
              <span
                className="connexion__form__button__icon"
                aria-hidden="true"
                aria-label="connexion"
              >
                <LockOpenIcon />
              </span>
              Connexion
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

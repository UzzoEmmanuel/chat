import { useState } from 'react'
import { useAuth } from '../../../utils/context'
import { LockOpenIcon } from '@heroicons/react/24/outline'

export default function SignUp() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { isAuthenticated, signupUser, logout } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (onlyWhiteSpace(username)) {
      alert('le nom ne peut pas être vide')
    } else {
      await signupUser({ username, email, password })
      if (isAuthenticated) {
        return logout()
      }
    }
  }

  const onlyWhiteSpace = (input) => input.trim().lenght === 0

  return (
    <>
      <div className="connexion__form">
        <div className="connexion__form__title">
          <h2>Inscription</h2>
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
              id="username-signup"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
              placeholder="Nom"
              required
              className="connexion__form__input__field"
            />
          </div>
          <div className="connexion__form__input">
            <label htmlFor="email"></label>
            <input
              id="email-signup"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Email"
              required
              className="connexion__form__input__field"
            />
          </div>
          <div className="connexion__form__input">
            <label htmlFor="password"></label>
            <input
              id="password-signup"
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
              Inscription
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

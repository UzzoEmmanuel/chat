import { LockOpenIcon } from '@heroicons/react/24/outline'

export default function SignUp() {
  return (
    <>
      <div className="connexion__form">
        <div className="connexion__form__title">
          <h2>Inscription</h2>
        </div>
        <form className="connexion__form__body">
          <div className="connexion__form__input">
            <label htmlFor="username"></label>
            <input
              id="username-signup"
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
              id="password-login"
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

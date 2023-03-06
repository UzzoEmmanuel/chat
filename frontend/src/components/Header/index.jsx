import { useAuth } from '../../utils/context'
import ChatLogo from '../../assets/ChatLogo.png'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <>
      <header className="header">
        <img src={ChatLogo} alt="logo chat" className="header__logo" />
        <div className="header__container">
          <h1 className="header__container__title">CHAT</h1>
          {isAuthenticated && (
            <div className="header__container__logout">
              <button
                type="submit"
                onClick={logout}
                className="header__container__logout__button"
              >
                <span
                  className="header__container__logout__button__icon"
                  aria-hidden="true"
                  aria-label="déconnexion"
                >
                  <ArrowLeftOnRectangleIcon />
                </span>
                <span className="header__container__logout__button__text">
                  Déconnexion
                </span>
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

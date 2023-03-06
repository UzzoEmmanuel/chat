import Profil from '../../assets/profil.png'
import { PencilIcon } from '@heroicons/react/24/outline'

export default function Me() {
  return (
    <>
      <section className="me">
        <h2 className="me__title">Moi :</h2>
        <form className="me__container" action="#" method="PUT">
          <img src={Profil} alt="profil" className="me__picture" />
          <div className="me__name">
            <label htmlFor="username"></label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Emmanuel"
              required
              className="me__name__input"
            />
            <button type="submit" className="me__name__submit">
              <span
                className="me__name__submit__icon"
                aria-hidden="true"
                aria-label="check"
              >
                <PencilIcon />
              </span>
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

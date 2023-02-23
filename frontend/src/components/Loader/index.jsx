import ChatLogo from '../../assets/ChatLogo.png'

export default function Loader() {
  return (
    <>
      <div className="loader">
        <img src={ChatLogo} alt="logo chat" className="loader__logo" />
        <div className="loader__text">
          <span className="loader__text__letter">L</span>
          <span className="loader__text__letter">o</span>
          <span className="loader__text__letter">a</span>
          <span className="loader__text__letter">d</span>
          <span className="loader__text__letter">i</span>
          <span className="loader__text__letter">n</span>
          <span className="loader__text__letter">g</span>
          <span className="loader__text__letter">.</span>
          <span className="loader__text__letter">.</span>
          <span className="loader__text__letter">.</span>
        </div>
      </div>
    </>
  )
}

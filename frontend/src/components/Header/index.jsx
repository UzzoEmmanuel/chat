import ChatLogo from '../../assets/ChatLogo.png'

export default function Header() {
  return (
    <>
      <header className="header">
        <img src={ChatLogo} alt="logo chat" className="header__logo" />
        <h1 className="header__title">CHAT</h1>
      </header>
    </>
  )
}

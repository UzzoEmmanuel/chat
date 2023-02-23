import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ErrorLogo from '../../assets/ErrorLogo.png'

export default function Error() {
  return (
    <>
      <Header />
      <div className="error">
        <img src={ErrorLogo} alt="logo erreur" className="error__logo" />
        <span className="error__text">Oops... Page not found</span>
      </div>
      <Footer />
    </>
  )
}

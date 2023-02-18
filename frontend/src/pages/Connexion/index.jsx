import Header from '../../components/Header'
import Login from '../../components/Forms/Login'
import SignUp from '../../components/Forms/SignUp'
import Footer from '../../components/Footer'

export default function Connexion() {
  return (
    <>
      <Header />
      <section className="connexion">
        <Login />
        <SignUp />
      </section>
      <Footer />
    </>
  )
}

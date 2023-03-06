import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Me from '../../components/Me'
import MyFriends from '../../components/MyFriends'

export default function Dashboard() {
  return (
    <>
      <Header />
      <section className="dashboard">
        <Me />
        <MyFriends />
      </section>
      <Footer />
    </>
  )
}

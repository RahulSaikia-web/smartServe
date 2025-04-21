// import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'
// import { Layout } from 'lucide-react'
import Layout from '../layouts/Layout'
import Hero from './Hero'
import MostBooked from './MostBooked'

function Home() {
  return (
    <>
      {/* <Navbar/>
      <Footer/> */}
      <Layout>
        <Hero/>
        <MostBooked/>
      </Layout>
    </>
  )
}

export default Home

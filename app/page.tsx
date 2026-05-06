import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Stats from '@/components/landing/Stats'
import Overview from '@/components/landing/Overview'
import Outcomes from '@/components/landing/Outcomes'
import Schedule from '@/components/landing/Schedule'
import WhoAttends from '@/components/landing/WhoAttends'
import Format from '@/components/landing/Format'
import Logistics from '@/components/landing/Logistics'
import AboutIgnit from '@/components/landing/AboutIgnit'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Overview />
      <Outcomes />
      <Schedule />
      <WhoAttends />
      <Format />
      <Logistics />
      <AboutIgnit />
      <Footer />
    </main>
  )
}

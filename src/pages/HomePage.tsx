import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import Marquee from '../components/home/Marquee'
import AboutTeaser from '../components/home/AboutTeaser'
import ServicesGrid from '../components/home/ServicesGrid'
import PricingSection from '../components/home/PricingSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutTeaser />
      <ServicesGrid />
      <PricingSection />
      <Footer />
    </>
  )
}

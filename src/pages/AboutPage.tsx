import Footer from '../components/layout/Footer'
import AboutHero from '../components/about/AboutHero'
import MyStory from '../components/about/MyStory'
import TechnicalArsenal from '../components/about/TechnicalArsenal'
import Timeline from '../components/about/Timeline'
import SkillsGrid from '../components/about/SkillsGrid'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MyStory />
      <TechnicalArsenal />
      <Timeline />
      <SkillsGrid />
      <Footer />
    </>
  )
}

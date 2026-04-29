import { getPortfolioData } from '@/lib/getPortfolioData'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  // Runs on every server request — never cached in client bundle
  const data = getPortfolioData()

  return (
    <>
      <Navigation logo={data.nav.logo} />
      <HeroSection />
      <StatsSection stats={data.stats} />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </>
  )
}

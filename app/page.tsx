import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Milestones from '@/components/Milestones'
import Services from '@/components/Services'
import About from '@/components/About'
import WhyUs from '@/components/WhyUs'
import Pillars from '@/components/Pillars'
import Testimonials from '@/components/Testimonials'
import Calculators from '@/components/Calculators'
import AppDownload from '@/components/AppDownload'
import Partners from '@/components/Partners'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Milestones />
      <About />
      <Services />
      <WhyUs />
      <Pillars />
      <Testimonials />
      <Calculators />
      <AppDownload />
      <Partners />
      <Contact />
      <Footer />
    </main>
  )
}


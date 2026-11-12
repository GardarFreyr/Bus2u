import { useEffect } from 'react'
import { Hero } from '../components/Hero'
import { Services } from '../components/Services'
import { Tours } from '../components/Tours'
import { BookingInquiry } from '../components/BookingInquiry'
import { WhyUs } from '../components/WhyUs'
import { About } from '../components/About'
import { FinalCta } from '../components/FinalCta'

export default function Home() {
  useEffect(() => {
    document.title = 'Bus2u — Ferðir og akstur (sýnidæmi)'
  }, [])
  return (
    <>
      <Hero />
      <Services />
      <Tours />
      <BookingInquiry />
      <WhyUs />
      <About />
      <FinalCta />
    </>
  )
}

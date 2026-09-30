import { useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { WhyChoose } from './sections/WhyChoose'
import { About } from './sections/About'
import { Verticals } from './sections/Verticals'
import { Industries } from './sections/Industries'
import { Partners } from './sections/Partners'
import { Contact } from './sections/Contact'

/** Fades .reveal blocks in once as they enter the viewport. */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-3 focus:font-bold focus:text-navy-950"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <WhyChoose />
        <About />
        <Verticals />
        <Industries />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

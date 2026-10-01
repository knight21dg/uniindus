import { useEffect } from 'react'
import { startSmoothScroll } from './lib/scroll'
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
            // Cards revealed together follow each other 0.1s apart, three to a beat.
            const el = entry.target as HTMLElement
            const siblings = Array.from(el.parentElement?.children ?? []).filter((c) => c.classList.contains('reveal'))
            if (siblings.length > 1) el.style.setProperty('--rd', `${(siblings.indexOf(el) % 3) * 0.1}s`)
            el.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  useEffect(() => startSmoothScroll(), [])
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-3 focus:font-bold focus:text-ink"
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

import Lenis from 'lenis'

let lenis: Lenis | null = null

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Eased wheel scrolling with the previous live site's settings (1.2s, ease-out
 * expo). In-page anchor links glide to their section. Skipped entirely for
 * visitors who ask for reduced motion. Returns a cleanup function.
 */
export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    anchors: true,
    autoRaf: true,
  })
  // A link straight to a section (for example /#contact) should open there.
  const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
  if (target) lenis.scrollTo(target, { immediate: true, force: true })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

/** Scroll to an element, landing below the fixed header (via its scroll-margin-top). */
export function scrollToElement(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}

/** Pause or resume smooth scrolling, for when the mobile menu covers the page. */
export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
}

import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { NAV } from '../content/site'
import { COMPANY } from '../content/company'
import { Logo } from './Logo'

/** Which nav section the reader is in: the last one whose top has scrolled past the threshold. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      // A section counts as current once its top passes the upper third of the viewport.
      const offset = Math.max(window.innerWidth >= 1024 ? 120 : 96, window.innerHeight * 0.35)
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      // The contact section may be too short to reach the top at the page end.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1]
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids])
  return active
}

const IDS = NAV.map((n) => n.id)

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(IDS)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Drawer: lock page scroll, close on Escape or on resize to desktop, keep Tab inside.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () =>
      Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []).concat(toggleRef.current ?? [])
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      } else if (e.key === 'Tab') {
        const els = focusables()
        const first = els[0]
        const last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  // The drawer locks page scroll, so a plain anchor jump would be swallowed.
  // Close first, then scroll once the lock is released.
  const goTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => {
      document.body.style.overflow = ''
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    }, 0)
  }

  const solid = scrolled || open
  const links = NAV.slice(0, -1)
  const contact = NAV[NAV.length - 1]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? 'border-b border-gold-400/15 bg-navy-900/95 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1840px] items-center justify-between px-4 sm:px-6 lg:h-[88px] lg:px-10 xl:px-14">
        <a href="#home" className="-m-1 flex min-h-11 items-center rounded-lg p-1" aria-label={`${COMPANY.name}, back to top`}>
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {links.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative flex min-h-11 items-center px-3 text-[1.0625rem] font-semibold transition-colors ${
                      isActive ? 'text-gold-400' : 'text-white hover:text-gold-300'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-gold-400 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
            <li className="ml-4 xl:ml-6">
              <a
                href={`#${contact.id}`}
                aria-current={active === contact.id ? 'location' : undefined}
                className={`btn btn-primary min-h-12 px-7 text-[1.0625rem] sm:text-[1.0625rem] ${
                  active === contact.id ? 'ring-2 ring-gold-300 ring-offset-2 ring-offset-navy-900' : ''
                }`}
              >
                {contact.label}
                <ArrowUpRight className="size-[18px]" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="grid size-12 place-items-center rounded-lg border border-white/20 bg-navy-900/60 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={drawerRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gold-400/15 bg-navy-950 lg:hidden"
      >
        <nav aria-label="Mobile" className="px-4 py-4 sm:px-6">
          <ul className="divide-y divide-white/10">
            {links.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={goTo(item.id)}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={`flex min-h-14 items-center justify-between font-heading text-lg font-semibold ${
                    active === item.id ? 'text-gold-400' : 'text-white'
                  }`}
                >
                  {item.label}
                  {active === item.id && <span className="h-0.5 w-8 rounded-full bg-gold-400" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
          <a href={`#${contact.id}`} onClick={goTo(contact.id)} className="btn btn-primary mt-6 w-full">
            {contact.label}
            <ArrowUpRight className="size-[18px]" aria-hidden="true" />
          </a>
          <p className="mt-8 text-center text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">{COMPANY.motto}</p>
        </nav>
      </div>
    </header>
  )
}

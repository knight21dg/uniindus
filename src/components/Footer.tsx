import { Mail } from 'lucide-react'
import { COMPANY, SERVING_INDUSTRIES } from '../content/company'
import { GENERAL_CONTACT } from '../content/contact'
import { NAV } from '../content/site'
import { Logo } from './Logo'

const link = 'inline-flex min-h-11 min-w-11 items-center text-slate-300 transition-colors hover:text-amber-400'

export function Footer() {
  return (
    <footer className="border-t-2 border-gold-400 bg-navy-950">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <a href="#home" className="inline-flex min-h-11 items-center rounded-lg" aria-label={`${COMPANY.name}, back to top`}>
            <Logo compact />
          </a>
          <p className="mt-4 font-heading text-sm font-semibold tracking-[0.18em] text-gold-400 uppercase">{COMPANY.motto}</p>
          <p className="mt-2 text-sm text-muted">{COMPANY.formerly}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="font-heading text-sm font-bold tracking-[0.18em] text-white uppercase">Navigation</h2>
          <ul className="mt-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-heading text-sm font-bold tracking-[0.18em] text-white uppercase">Industries</h2>
          <ul className="mt-3">
            {SERVING_INDUSTRIES.map(({ name }) => (
              <li key={name}>
                <a href="#industries" className={link}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-heading text-sm font-bold tracking-[0.18em] text-white uppercase">Contact</h2>
          <ul className="mt-3">
            <li>
              <a href={`mailto:${GENERAL_CONTACT.email}`} className={`${link} gap-3`}>
                <Mail className="size-5 shrink-0 text-gold-400" aria-hidden="true" />
                {GENERAL_CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-5 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

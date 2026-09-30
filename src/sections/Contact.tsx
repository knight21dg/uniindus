import { Globe, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { COMPANY } from '../content/company'
import { GENERAL_CONTACT, PEOPLE } from '../content/contact'
import { InquiryForm } from '../components/InquiryForm'
import { SectionHeading } from '../components/ui'

const rowLink =
  'flex min-h-11 items-center gap-3 rounded-md text-slate-100 transition-colors hover:text-gold-300 [overflow-wrap:anywhere]'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative bg-navy-950">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-400/60 to-transparent" />
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          lines={['Contact', 'Us']}
          subtitle={
            <>
              Speak directly with the <span className="text-white">{COMPANY.name}</span> team, or send an inquiry and we will route it to the
              right person.
            </>
          }
          className="reveal"
        />

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-5">
            <ul className="space-y-4">
              {PEOPLE.map((p) => (
                <li key={p.email} className="panel-subtle p-5">
                  <div className="flex gap-4">
                    <span className="icon-ring size-12 border-2">
                      <UserRound className="size-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-lg font-bold tracking-wide text-gold-400 uppercase">{p.name}</h3>
                      <p className="text-sm text-slate-300">{p.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 sm:pl-16">
                    <a href={`tel:${p.tel}`} className={rowLink}>
                      <Phone className="size-[18px] shrink-0 text-gold-400" aria-hidden="true" />
                      <span className="sr-only">Call {p.name}: </span>
                      {p.phone}
                    </a>
                    <a href={`mailto:${p.email}`} className={rowLink}>
                      <Mail className="size-[18px] shrink-0 text-gold-400" aria-hidden="true" />
                      <span className="sr-only">Email {p.name}: </span>
                      {p.email}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="panel mt-4 p-5">
              <a href={GENERAL_CONTACT.websiteUrl} className={rowLink} rel="noopener">
                <Globe className="size-5 shrink-0 text-gold-400" aria-hidden="true" />
                {GENERAL_CONTACT.website}
              </a>
              <a href={`mailto:${GENERAL_CONTACT.email}`} className={rowLink}>
                <Mail className="size-5 shrink-0 text-gold-400" aria-hidden="true" />
                {GENERAL_CONTACT.email}
              </a>
              <p className="flex min-h-11 items-center gap-3 text-slate-100">
                <MapPin className="size-5 shrink-0 text-gold-400" aria-hidden="true" />
                {GENERAL_CONTACT.location}
              </p>
            </div>
          </div>

          <div className="reveal lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}

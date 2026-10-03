import type { ReactNode } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { COMPANY } from '../content/company'
import { GENERAL_CONTACT, PEOPLE } from '../content/contact'
import { InquiryForm } from '../components/InquiryForm'
import { SectionHeading } from '../components/ui'
import type { IconType } from '../components/icons'

const rowLink =
  'flex min-h-11 items-center gap-3 rounded-md text-slate-100 transition-colors hover:text-gold-300 [overflow-wrap:anywhere]'

function InfoCard({
  icon: Icon,
  photo,
  title,
  children,
}: {
  icon?: IconType
  photo?: { src: string; alt: string }
  title: string
  children: ReactNode
}) {
  return (
    <li className="reveal panel-subtle hover-card flex gap-4 p-5">
      {photo ? (
        <img
          src={photo.src}
          alt={photo.alt}
          width={152}
          height={152}
          loading="lazy"
          className="size-16 shrink-0 rounded-full border-2 border-gold-400 bg-slate-200 object-cover sm:size-[4.5rem]"
        />
      ) : (
        Icon && (
          <span className="icon-ring size-12 border-2">
            <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
        )
      )}
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-lg font-bold tracking-wide text-gold-400 uppercase">{title}</h3>
        {children}
      </div>
    </li>
  )
}

/**
 * Two columns from the top, in the page-wide container: heading, intro and
 * contact cards on the left, the inquiry form on the right. On phones and
 * tablets the form follows the contact cards. Details are the PDF's (p15).
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="theme-light relative bg-[#f1f5f9]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-400/60 to-transparent" />
      <div className="container-x grid gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-[4.5%] lg:py-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact Us"
            lines={['Get in Touch', 'With Our Team']}
            subtitle={
              <>
                Speak directly with the <span className="text-white">{COMPANY.name}</span> team, or send an inquiry and we will route it to
                the right person.
              </>
            }
            className="reveal"
          />

          <ul className="mt-8 space-y-4">
            <InfoCard icon={MapPin} title="Registered Office">
              <p className="flex min-h-11 items-center text-slate-100">{GENERAL_CONTACT.location}</p>
            </InfoCard>

            <InfoCard icon={Mail} title="Official Email & Web">
              <a href={`mailto:${GENERAL_CONTACT.email}`} className={rowLink}>
                {GENERAL_CONTACT.email}
              </a>
              <a href={GENERAL_CONTACT.websiteUrl} className={rowLink} rel="noopener">
                {GENERAL_CONTACT.website}
              </a>
            </InfoCard>

            {PEOPLE.map((p) => (
              <InfoCard key={p.email} photo={{ src: p.photo, alt: `Portrait of ${p.name}` }} title={p.name}>
                <p className="text-sm text-slate-300">{p.role}</p>
                <div className="mt-1 flex flex-wrap gap-x-8">
                  <a href={`tel:${p.tel}`} className={rowLink}>
                    <Phone className="size-[1.125rem] shrink-0 text-gold-400" aria-hidden="true" />
                    <span className="sr-only">Call {p.name}: </span>
                    {p.phone}
                  </a>
                  <a href={`mailto:${p.email}`} className={rowLink}>
                    <Mail className="size-[1.125rem] shrink-0 text-gold-400" aria-hidden="true" />
                    <span className="sr-only">Email {p.name}: </span>
                    {p.email}
                  </a>
                </div>
              </InfoCard>
            ))}
          </ul>
        </div>

        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <InquiryForm />
        </div>
      </div>
    </section>
  )
}

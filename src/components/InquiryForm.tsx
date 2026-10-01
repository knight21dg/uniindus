import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { CircleAlert, CircleCheckBig, LoaderCircle, Send } from 'lucide-react'
import { GENERAL_CONTACT, REQUIREMENT_OPTIONS } from '../content/contact'
import { sendInquiry, validateInquiry, type Inquiry, type InquiryErrors } from '../lib/inquiry'

const EMPTY: Inquiry = { name: '', company: '', email: '', phone: '', requirement: '', message: '' }
const ORDER: (keyof Inquiry)[] = ['name', 'company', 'email', 'phone', 'requirement', 'message']

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string }

const inputBase =
  'mt-2 block min-h-12 w-full rounded-lg border bg-navy-950/70 px-4 py-3 text-base text-white placeholder:text-slate-500 transition-colors hover:border-gold-400/60 focus:border-gold-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-gold-400'

function FieldError({ name, message }: { name: keyof Inquiry; message?: string }) {
  if (!message) return null
  return (
    <p id={`inq-${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-300">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

function Label({ name, children, required }: { name: keyof Inquiry; children: string; required?: boolean }) {
  return (
    <label htmlFor={`inq-${name}`} className="text-sm font-semibold text-slate-100">
      {children}
      {required && (
        <span className="text-gold-400" aria-hidden="true">
          {' '}*
        </span>
      )}
    </label>
  )
}

export function InquiryForm() {
  const [values, setValues] = useState<Inquiry>(EMPTY)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Inquiry, boolean>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const honeypot = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const update = (field: keyof Inquiry) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateInquiry(next)[field] }))
    if (status.kind === 'sent' || status.kind === 'error') setStatus({ kind: 'idle' })
  }
  const blur = (field: keyof Inquiry) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateInquiry(values)[field] }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status.kind === 'sending') return
    const found = validateInquiry(values)
    setErrors(found)
    setTouched({ name: true, email: true, phone: true, message: true })
    const first = ORDER.find((f) => found[f])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus({ kind: 'sending' })
    try {
      await sendInquiry(values, honeypot.current?.value ?? '')
      setStatus({ kind: 'sent' })
      setValues(EMPTY)
      setTouched({})
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'The inquiry was not sent. Please try again.' })
    }
  }

  const field = (name: keyof Inquiry) => ({
    id: `inq-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    onBlur: blur(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `inq-${name}-error` : undefined,
    className: `${inputBase} ${errors[name] ? 'border-red-400' : 'border-slate-400/30'}`,
  })

  const sending = status.kind === 'sending'

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="panel p-5 sm:p-8" aria-labelledby="inquiry-title">
      <h3 id="inquiry-title" className="font-heading text-2xl font-extrabold text-white uppercase">
        Send an <span className="text-gold-400">Inquiry</span>
      </h3>
      <p className="mt-2 text-sm text-muted">
        Fields marked <span className="text-gold-400">*</span> are required.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <Label name="name" required>
            Full Name
          </Label>
          <input type="text" autoComplete="name" required {...field('name')} />
          <FieldError name="name" message={errors.name} />
        </div>
        <div>
          <Label name="company">Company Name</Label>
          <input type="text" autoComplete="organization" {...field('company')} />
        </div>
        <div>
          <Label name="email" required>
            Email
          </Label>
          <input type="email" autoComplete="email" inputMode="email" required {...field('email')} />
          <FieldError name="email" message={errors.email} />
        </div>
        <div>
          <Label name="phone" required>
            Phone
          </Label>
          <input type="tel" autoComplete="tel" inputMode="tel" required placeholder="+91" {...field('phone')} />
          <FieldError name="phone" message={errors.phone} />
        </div>
        <div className="sm:col-span-2">
          <Label name="requirement">Requirement / Service</Label>
          <select {...field('requirement')} className={`${field('requirement').className} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23FDB813%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_14px_center] bg-no-repeat pr-11`}>
            <option value="">Select a service (optional)</option>
            {REQUIREMENT_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label name="message" required>
            Message
          </Label>
          <textarea rows={5} required {...field('message')} className={`${field('message').className} resize-y`} />
          <FieldError name="message" message={errors.message} />
        </div>
      </div>

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="inq-website">Leave this field empty</label>
        <input ref={honeypot} id="inq-website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={sending} className="btn btn-primary btn-flat mt-7 w-full tracking-wide uppercase disabled:cursor-wait disabled:opacity-80 sm:w-auto">
        {sending ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send Inquiry
            <Send className="btn-arrow size-5" aria-hidden="true" />
          </>
        )}
      </button>

      <div role="status" aria-live="polite" className="mt-5 empty:hidden">
        {status.kind === 'sent' && (
          <p className="flex items-start gap-3 rounded-lg border border-emerald-400/40 bg-emerald-400/10 p-4 text-emerald-100">
            <CircleCheckBig className="mt-0.5 size-5 shrink-0 text-emerald-300" aria-hidden="true" />
            Thank you. Your inquiry has been sent to our team, and we will get back to you.
          </p>
        )}
        {status.kind === 'error' && (
          <p className="flex items-start gap-3 rounded-lg border border-red-400/40 bg-red-400/10 p-4 text-red-100">
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-red-300" aria-hidden="true" />
            <span>
              {status.message} You can also email us directly at{' '}
              <a className="font-semibold text-gold-300 underline underline-offset-2" href={`mailto:${GENERAL_CONTACT.email}`}>
                {GENERAL_CONTACT.email}
              </a>
              .
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

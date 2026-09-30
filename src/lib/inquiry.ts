import { INQUIRY_INBOX } from '../content/contact'

export type Inquiry = {
  name: string
  company: string
  email: string
  phone: string
  requirement: string
  message: string
}

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_CHARS = /^[+\d\s()-]+$/

export function validateInquiry(v: Inquiry): InquiryErrors {
  const e: InquiryErrors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!EMAIL.test(v.email.trim())) e.email = 'Please enter a valid email address, like name@company.com.'
  const digits = v.phone.replace(/\D/g, '')
  if (!v.phone.trim()) e.phone = 'Please enter a phone number.'
  else if (!PHONE_CHARS.test(v.phone.trim()) || digits.length < 7 || digits.length > 15)
    e.phone = 'Please enter a valid phone number, including the country code if outside India.'
  if (v.message.trim().length < 10) e.message = 'Please describe your requirement (at least 10 characters).'
  return e
}

/**
 * Sends the inquiry through FormSubmit's AJAX endpoint, which relays it by email
 * to INQUIRY_INBOX. This is the service the previous site used. It only reports
 * success when FormSubmit says so, so a failure is never shown as sent.
 */
export async function sendInquiry(v: Inquiry, honeypot: string): Promise<void> {
  // Bots fill hidden fields. Pretend it worked and send nothing.
  if (honeypot) return

  const body = new FormData()
  body.append('_subject', `Website inquiry from ${v.name.trim()}${v.company.trim() ? ` (${v.company.trim()})` : ''}`)
  body.append('_template', 'table')
  body.append('_captcha', 'false')
  body.append('_replyto', v.email.trim())
  body.append('Full Name', v.name.trim())
  body.append('Company', v.company.trim() || 'Not specified')
  body.append('Email', v.email.trim())
  body.append('Phone', v.phone.trim())
  body.append('Requirement / Service', v.requirement || 'Not specified')
  body.append('Message', v.message.trim())

  let res: Response
  try {
    res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(INQUIRY_INBOX)}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    })
  } catch {
    throw new Error('We could not reach the server. Please check your connection and try again.')
  }

  let data: { success?: string | boolean; message?: string } = {}
  try {
    data = await res.json()
  } catch {
    // Non-JSON response; handled below.
  }
  if (!res.ok || String(data.success) !== 'true') {
    throw new Error(data.message ? `The inquiry was not sent: ${data.message}` : 'The inquiry was not sent. Please try again.')
  }
}

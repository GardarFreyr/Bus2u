import { company } from '../data/company'

export type ServiceType = 'tour' | 'group' | 'private' | 'transfer'

export const serviceTypes: Array<{ id: ServiceType; label: string; hint: string }> = [
  { id: 'tour', label: 'Dagsferð', hint: 'Skoðunarferð um áhugaverða staði (dæmi).' },
  { id: 'group', label: 'Hópferð', hint: 'Akstur fyrir hópa, félög og fyrirtæki.' },
  { id: 'private', label: 'Sérferð', hint: 'Ferð sniðin að þínum hópi og óskum.' },
  { id: 'transfer', label: 'Akstursþjónusta', hint: 'Akstur milli staða, t.d. frá flugvelli.' },
]

export const quoteTypes: ServiceType[] = ['group', 'private']

export interface InquiryForm {
  type: ServiceType | ''
  tour: string
  quote: boolean
  date: string
  passengers: string
  from: string
  to: string
  name: string
  email: string
  phone: string
  notes: string
}

export type FieldErrors = Partial<Record<keyof InquiryForm, string>>

export const emptyForm: InquiryForm = {
  type: '', tour: '', quote: false, date: '', passengers: '', from: '', to: '',
  name: '', email: '', phone: '', notes: '',
}

export const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export function validateDetails(f: InquiryForm): FieldErrors {
  const e: FieldErrors = {}
  if (!f.date) e.date = 'Veldu brottfarardag.'
  else if (f.date < todayISO()) e.date = 'Dagsetning má ekki vera liðin.'

  const raw = f.passengers.trim()
  const n = Number(raw)
  if (!raw) e.passengers = 'Sláðu inn fjölda farþega.'
  else if (!/^\d+$/.test(raw) || n < 1 || n > 999) e.passengers = 'Fjöldi verður að vera heil tala frá 1 til 999.'

  if (!f.from.trim()) e.from = 'Sláðu inn brottfararstað.'
  if (f.name.trim().length < 2) e.name = 'Sláðu inn fullt nafn.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Sláðu inn gilt netfang, t.d. nafn@daemi.is.'
  if (f.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(f.phone.trim()))
    e.phone = 'Símanúmer má aðeins innihalda tölustafi, bil, sviga og +.'
  return e
}

export const typeLabel = (t: InquiryForm['type']) => serviceTypes.find((s) => s.id === t)?.label ?? ''

export const serviceSummary = (f: InquiryForm) =>
  [typeLabel(f.type) + (f.type === 'tour' && f.tour ? ` — ${f.tour}` : ''), f.quote ? 'óskað eftir tilboði' : '']
    .filter(Boolean)
    .join(' · ')

export const formatDate = (iso: string) => (iso ? iso.split('-').reverse().join('.') : '—')

export function reviewRows(f: InquiryForm) {
  return [
    { k: 'Þjónusta', v: serviceSummary(f), full: true },
    { k: 'Brottfarardagur', v: formatDate(f.date) },
    { k: 'Fjöldi farþega', v: f.passengers || '—' },
    { k: 'Brottfararstaður', v: f.from || '—' },
    { k: 'Áfangastaður', v: f.to || '—' },
    { k: 'Nafn', v: f.name || '—' },
    { k: 'Netfang', v: f.email || '—' },
    { k: 'Símanúmer', v: f.phone || '—', full: true },
    { k: 'Viðbótarupplýsingar', v: f.notes || '—', full: true },
  ]
}

/**
 * The demo has no backend. The only "send" path is a mailto link that opens
 * the visitor's own email client; nothing is transmitted or stored by the site.
 * Replace with a real endpoint (Netlify Forms, an API, a booking provider)
 * once it is configured and tested.
 */
export function buildMailto(f: InquiryForm) {
  const subject = `Bókunarfyrirspurn — ${serviceSummary(f)}`
  const body = reviewRows(f).map((r) => `${r.k}: ${r.v}`).join('\n')
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, Check, Info, Loader2, Mail } from 'lucide-react'
import { company } from '../data/company'
import { tours } from '../data/tours'
import { useBooking } from '../lib/booking'
import {
  buildMailto, emptyForm, quoteTypes, reviewRows, serviceSummary, serviceTypes, todayISO, validateDetails,
  type FieldErrors, type InquiryForm, type ServiceType,
} from '../lib/inquiry'
import { Reveal } from './Reveal'

type Step = 1 | 2 | 3 | 'done'
const stepLabels = ['Þjónusta', 'Upplýsingar', 'Yfirfara']

interface FieldProps {
  id: keyof InquiryForm
  label: string
  optional?: boolean
  error?: string
  full?: boolean
  children: (a11y: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode
}

function Field({ id, label, optional, error, full, children }: FieldProps) {
  const uid = useId()
  const inputId = `${id}-${uid}`
  const errId = `${inputId}-err`
  return (
    <div className={`flex flex-col gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
      <label htmlFor={inputId} className="text-sm font-semibold">
        {label} {optional && <span className="font-normal text-slate">(valfrjálst)</span>}
      </label>
      {children({ id: inputId, 'aria-invalid': !!error, 'aria-describedby': error ? errId : undefined })}
      {error && (
        <span id={errId} className="flex items-center gap-1.5 text-[13px] text-danger">
          <AlertCircle size={14} aria-hidden /> {error}
        </span>
      )}
    </div>
  )
}

export function BookingInquiry() {
  const { preset } = useBooking()
  const [form, setForm] = useState<InquiryForm>(emptyForm)
  const [step, setStep] = useState<Step>(1)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [ack, setAck] = useState(false)
  const [ackError, setAckError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstStepRender = useRef(true)

  // Apply pre-selection from service cards, tour cards and CTAs
  useEffect(() => {
    if (!preset) return
    setForm((f) => ({ ...f, ...preset.values }))
    setStep(1)
    setTypeError(false)
  }, [preset])

  // Move focus to the step heading when the step changes (not on first load)
  useEffect(() => {
    if (firstStepRender.current) { firstStepRender.current = false; return }
    const h = headingRef.current
    if (!h) return
    h.focus({ preventScroll: true })
    const r = h.getBoundingClientRect()
    if (r.top < 0 || r.top > window.innerHeight * 0.6) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: window.scrollY + r.top - 140, behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [step])

  const set = <K extends keyof InquiryForm>(k: K, v: InquiryForm[K]) => {
    setForm((prev) => {
      const next = { ...prev, [k]: v }
      if (submitted) setErrors(validateDetails(next))
      return next
    })
  }
  const onText = (k: keyof InquiryForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    set(k, e.target.value as never)

  const pickType = (t: ServiceType) => {
    setTypeError(false)
    setForm((f) => ({ ...f, type: t, quote: quoteTypes.includes(t), tour: t === 'tour' ? f.tour || tours[0].title : '' }))
  }

  const goDetails = () => {
    if (!form.type) { setTypeError(true); return }
    setStep(2)
  }

  const goReview = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const errs = validateDetails(form)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.querySelector<HTMLElement>(`[id^="${first}-"]`)?.focus()
      return
    }
    setStep(3)
  }

  const finish = () => {
    if (!ack) { setAckError(true); return }
    setPreparing(true)
    // Short, honest "preparing" state. Nothing is sent: the next step offers a mailto link.
    window.setTimeout(() => { setPreparing(false); setStep('done') }, 700)
  }

  const reset = () => {
    setForm(emptyForm); setErrors({}); setSubmitted(false); setAck(false); setAckError(false); setStep(1)
  }

  const stepIndex = step === 'done' ? 4 : step
  const errorCount = Object.keys(errors).length
  const titles: Record<string, string> = {
    1: 'Hvað viltu bóka?', 2: 'Upplýsingar um ferðina', 3: 'Farðu yfir fyrirspurnina', done: 'Fyrirspurnin þín er tilbúin.',
  }

  return (
    <section id="boka" aria-labelledby="book-h" className="py-20 sm:py-32">
      <div className="wrap grid items-start gap-10 xl:grid-cols-[5fr_7fr] xl:gap-14">
        <Reveal>
          <p className="eyebrow">Bókunarfyrirspurn</p>
          <h2 id="book-h" className="mb-5 mt-3.5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[52px]">
            Segðu okkur frá ferðinni.
          </h2>
          <p className="mb-7 text-[17px] leading-relaxed text-slate">
            Veldu ferð eða þjónustu, settu inn helstu upplýsingar og farðu yfir fyrirspurnina áður en hún er send.
            Fyrir hópa og sérferðir er hægt að óska eftir sérsniðnu tilboði.
          </p>
          <ul className="grid gap-3.5 text-[15px]">
            {['Engar greiðsluupplýsingar — aðeins fyrirspurn', 'Sérsniðin tilboð fyrir hópa og sérferðir', `Svör berast frá ${company.email}`].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check size={20} aria-hidden className="mt-0.5 flex-none text-nordic" /> {t}
              </li>
            ))}
          </ul>
          <div role="note" className="mt-8 flex gap-3 rounded-[14px] bg-[#e6f1f6] px-[18px] py-4 text-sm leading-relaxed">
            <Info size={20} aria-hidden className="flex-none text-nordic" />
            <span>
              <b>Sýnidæmi:</b> Engin gögn eru send eða vistuð. Í lokin geturðu opnað fyrirspurnina sem tölvupóst í þínu
              eigin póstforriti.
            </span>
          </div>
        </Reveal>

        <div className="rounded-[20px] border border-silver bg-white p-5 shadow-[0_30px_60px_-40px_rgba(16,28,43,.35)] sm:rounded-3xl sm:p-10">
          {step !== 'done' && (
            <ol aria-label="Skref fyrirspurnar" className="mb-8 flex gap-2">
              {stepLabels.map((l, i) => {
                const n = i + 1
                const on = stepIndex >= n
                return (
                  <li
                    key={l}
                    aria-current={stepIndex === n ? 'step' : undefined}
                    className={`flex flex-1 flex-col gap-2 text-[13px] font-semibold ${on ? 'text-navy' : 'text-slate'}`}
                  >
                    <span aria-hidden className={`h-1 rounded ${on ? 'bg-nordic' : 'bg-silver'}`} />
                    <span>{n}. {l}<span className="sr-only">{stepIndex > n ? ' (lokið)' : ''}</span></span>
                  </li>
                )
              })}
            </ol>
          )}

          <h3 ref={headingRef} tabIndex={-1} className="mb-1.5 text-2xl font-semibold focus:outline-none">
            {titles[String(step)]}
          </h3>

          {step === 1 && (
            <div>
              <p className="mb-6 text-[15px] text-slate">Veldu tegund ferðar eða þjónustu.</p>
              <div role="radiogroup" aria-label="Tegund ferðar eða þjónustu" aria-describedby={typeError ? 'type-err' : undefined} className="grid gap-3 sm:grid-cols-2">
                {serviceTypes.map((t) => {
                  const on = form.type === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => pickType(t.id)}
                      className={`flex min-h-24 cursor-pointer flex-col gap-1.5 rounded-2xl border-[1.5px] p-[18px] text-left transition-colors ${
                        on ? 'border-nordic bg-white shadow-[inset_0_0_0_1px_var(--color-nordic)]' : 'border-silver bg-glacier hover:border-ice'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2 font-semibold">
                        {t.label}
                        {on && <Check size={18} aria-hidden className="text-nordic" />}
                      </span>
                      <span className="text-sm leading-snug text-slate">{t.hint}</span>
                    </button>
                  )
                })}
              </div>
              {form.type === 'tour' && (
                <div className="mt-5">
                  <Field id="tour" label="Ferð (dæmi)">
                    {(a) => (
                      <select {...a} className="field" value={form.tour} onChange={onText('tour')}>
                        {tours.map((t) => <option key={t.slug} value={t.title}>{t.title}</option>)}
                        <option value="Annað / óákveðið">Annað / óákveðið</option>
                      </select>
                    )}
                  </Field>
                </div>
              )}
              {(form.type === 'group' || form.type === 'private') && (
                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-silver px-4 py-3.5 text-sm leading-relaxed">
                  <input
                    type="checkbox"
                    checked={form.quote}
                    onChange={(e) => set('quote', e.target.checked)}
                    className="mt-0.5 h-5 w-5 flex-none accent-nordic"
                  />
                  <span><b>Óska eftir sérsniðnu tilboði.</b> Við förum yfir leið, tímasetningu og fjölda og sendum tilboð.</span>
                </label>
              )}
              {typeError && (
                <p id="type-err" role="alert" className="mt-4 flex items-center gap-1.5 text-[13px] text-danger">
                  <AlertCircle size={14} aria-hidden /> Veldu tegund ferðar eða þjónustu til að halda áfram.
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-slate">Skref 1 af 3</span>
                <button type="button" className="btn btn-navy" onClick={goDetails}>Halda áfram</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form noValidate onSubmit={goReview}>
              <p className="mb-6 text-[15px] text-slate">{serviceSummary(form)}</p>
              {submitted && errorCount > 0 && (
                <div role="alert" className="mb-5 flex gap-3 rounded-[14px] bg-[#fbeceb] px-[18px] py-4 text-sm text-[#7d1f20]">
                  <AlertCircle size={20} aria-hidden className="flex-none" />
                  {errorCount === 1 ? 'Einn reitur þarfnast lagfæringar.' : `${errorCount} reitir þarfnast lagfæringar.`}
                </div>
              )}
              <div className="grid gap-x-4 gap-y-[18px] sm:grid-cols-2">
                <Field id="date" label="Brottfarardagur" error={errors.date}>
                  {(a) => <input {...a} type="date" required min={todayISO()} className="field" value={form.date} onChange={onText('date')} />}
                </Field>
                <Field id="passengers" label="Fjöldi farþega" error={errors.passengers}>
                  {(a) => (
                    <input {...a} type="number" required inputMode="numeric" min={1} max={999} className="field"
                      value={form.passengers} onChange={onText('passengers')} />
                  )}
                </Field>
                <Field id="from" label="Brottfararstaður" error={errors.from}>
                  {(a) => (
                    <input {...a} type="text" required placeholder="T.d. hótel eða Keflavíkurflugvöllur" className="field"
                      value={form.from} onChange={onText('from')} />
                  )}
                </Field>
                <Field id="to" label="Áfangastaður" optional>
                  {(a) => <input {...a} type="text" placeholder="T.d. Reykjavík" className="field" value={form.to} onChange={onText('to')} />}
                </Field>
                <Field id="name" label="Nafn" error={errors.name}>
                  {(a) => <input {...a} type="text" required autoComplete="name" className="field" value={form.name} onChange={onText('name')} />}
                </Field>
                <Field id="email" label="Netfang" error={errors.email}>
                  {(a) => (
                    <input {...a} type="email" required autoComplete="email" inputMode="email" className="field"
                      value={form.email} onChange={onText('email')} />
                  )}
                </Field>
                <Field id="phone" label="Símanúmer" optional error={errors.phone} full>
                  {(a) => (
                    <input {...a} type="tel" autoComplete="tel" inputMode="tel" placeholder="+354" className="field"
                      value={form.phone} onChange={onText('phone')} />
                  )}
                </Field>
                <Field id="notes" label="Viðbótarupplýsingar" optional full>
                  {(a) => (
                    <textarea {...a} rows={4} maxLength={2000} className="field min-h-[120px] resize-y"
                      placeholder="T.d. farangur, aðgengisþarfir, óskir um leið eða tímasetningu"
                      value={form.notes} onChange={onText('notes')} />
                  )}
                </Field>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <button type="button" className="btn btn-line flex-1 sm:flex-none" onClick={() => setStep(1)}>Til baka</button>
                <button type="submit" className="btn btn-navy flex-1 sm:flex-none">Yfirfara fyrirspurn</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div>
              <p className="mb-6 text-[15px] text-slate">Athugaðu að allt sé rétt áður en þú heldur áfram.</p>
              <dl className="grid overflow-hidden rounded-2xl border border-silver sm:grid-cols-2">
                {reviewRows(form).map((r) => (
                  <div key={r.k} className={`border-b border-silver bg-glacier px-[18px] py-3.5 ${r.full ? 'sm:col-span-2' : ''}`}>
                    <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate">{r.k}</dt>
                    <dd className="break-words text-[15px] leading-snug">{r.v}</dd>
                  </div>
                ))}
              </dl>
              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-silver px-4 py-3.5 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  checked={ack}
                  onChange={(e) => { setAck(e.target.checked); setAckError(false) }}
                  aria-describedby={ackError ? 'ack-err' : undefined}
                  aria-invalid={ackError}
                  className="mt-0.5 h-5 w-5 flex-none accent-nordic"
                />
                <span>Ég skil að þetta er sýnidæmi og að fyrirspurnin er ekki send sjálfkrafa.</span>
              </label>
              {ackError && (
                <p id="ack-err" role="alert" className="mt-2.5 flex items-center gap-1.5 text-[13px] text-danger">
                  <AlertCircle size={14} aria-hidden /> Hakaðu í reitinn til að halda áfram.
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <button type="button" className="btn btn-line flex-1 sm:flex-none" onClick={() => setStep(2)}>Breyta</button>
                <button type="button" className="btn btn-navy flex-1 sm:flex-none" onClick={finish} disabled={preparing} aria-busy={preparing}>
                  {preparing ? <><Loader2 size={18} aria-hidden className="animate-spin" /> Útbý fyrirspurn…</> : 'Ljúka fyrirspurn'}
                </button>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div role="status" className="flex flex-col gap-[18px]">
              <span className="self-start rounded-lg bg-navy px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-ice">
                Sýnidæmi — ekkert sent
              </span>
              <p className="text-[15px] leading-relaxed text-slate">
                Þessi vefur er hönnunartillaga og er ekki tengdur bókunarkerfi. Engin gögn voru send eða vistuð. Til að
                senda fyrirspurnina geturðu opnað hana sem tölvupóst til Bus2u í þínu eigin póstforriti.
              </p>
              <div className="flex flex-wrap gap-3">
                <a className="btn btn-navy flex-1 sm:flex-none" href={buildMailto(form)}>
                  <Mail size={18} aria-hidden /> Opna sem tölvupóst
                </a>
                <button type="button" className="btn btn-line flex-1 sm:flex-none" onClick={reset}>Ný fyrirspurn</button>
              </div>
              <p className="text-[13px] leading-relaxed text-slate">
                Í endanlegri útgáfu yrði fyrirspurnin send beint til Bus2u með staðfestingu í tölvupósti — þegar tenging
                hefur verið sett upp og prófuð.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

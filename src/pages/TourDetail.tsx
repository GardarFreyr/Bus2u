import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ChevronDown, Clock, Mail, MapPin, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { findTour } from '../data/tours'
import { company } from '../data/company'
import { useBooking } from '../lib/booking'
import { Photo } from '../components/Photo'
import NotFound from './NotFound'

const accordion = [
  { title: 'Ferðaáætlun', body: 'Viðkomustaðir og tímalína dagsins koma hér, skref fyrir skref, þegar Bus2u hefur staðfest leiðina.' },
  { title: 'Hvað á að taka með', body: 'Ráðleggingar um fatnað og búnað miðað við árstíð — fyllt út af Bus2u.' },
  { title: 'Aðgengi og sérþarfir', body: 'Upplýsingar um aðgengi, barnastóla og annað sem skiptir máli. Gestir geta líka tekið þetta fram í fyrirspurninni.' },
]

function Fact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string | null }) {
  return (
    <div className="flex flex-col gap-2 bg-white p-6">
      <Icon size={22} aria-hidden className="text-nordic" />
      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate">{label}</dt>
      <dd className="text-[17px] font-medium">
        {value ?? <span className="text-slate">Staðfest síðar</span>}
      </dd>
    </div>
  )
}

export default function TourDetail() {
  const { slug } = useParams()
  const tour = findTour(slug)
  const { requestInquiry } = useBooking()
  const [open, setOpen] = useState(0)

  useEffect(() => {
    if (tour) document.title = `${tour.title} — Bus2u (sýnidæmi)`
  }, [tour])

  if (!tour) return <NotFound />
  const listOrNull = (l: string[] | null) => (l ? l.join(', ') : null)

  return (
    <>
      <section aria-labelledby="t-h" className="relative flex h-[560px] items-end overflow-hidden bg-navy text-glacier sm:h-[640px]">
        <Photo image={tour.image} priority className="hero-img absolute inset-0 h-full w-full object-cover object-[50%_40%]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,28,43,.55)_0%,rgba(16,28,43,.1)_35%,rgba(16,28,43,.85)_100%)]" />
        <div className="wrap relative pb-14 sm:pb-16">
          <Link to="/#ferdir" className="mb-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-glacier/85 no-underline hover:text-glacier">
            <ArrowLeft size={18} aria-hidden /> Allar ferðir
          </Link>
          <div className="mb-5 flex flex-wrap gap-2">
            {tour.status === 'example' && <span className="tag tag-dark">Dæmi um ferð</span>}
            <span className="tag tag-dark">{tour.region}</span>
          </div>
          <h1 id="t-h" className="text-[42px] font-semibold leading-none sm:text-6xl lg:text-[80px]">{tour.title}</h1>
          <p className="mt-5 max-w-[580px] text-[17px] leading-relaxed text-glacier/90 sm:text-xl">{tour.summary}</p>
        </div>
      </section>

      <div className="wrap grid items-start gap-10 py-14 sm:py-24 lg:grid-cols-[7fr_4fr] lg:gap-16">
        <article>
          <p className="eyebrow">Yfirlit</p>
          <p className="mb-7 mt-4 text-[19px] leading-relaxed sm:text-[22px]">{tour.overview}</p>
          {tour.status === 'example' && (
            <p className="text-[17px] leading-[1.7] text-slate">
              Þetta er sniðmát fyrir ferðasíðu. Reitir merktir „Staðfest síðar“ verða aðeins fylltir út með upplýsingum
              frá Bus2u.
            </p>
          )}

          <dl className="my-12 grid gap-px overflow-hidden rounded-[20px] border border-silver bg-silver sm:grid-cols-2">
            <Fact icon={Clock} label="Lengd" value={tour.duration} />
            <Fact icon={MapPin} label="Brottför" value={tour.departure} />
            <Fact icon={Check} label="Innifalið" value={listOrNull(tour.included)} />
            <Fact icon={ShieldCheck} label="Kröfur" value={listOrNull(tour.requirements)} />
          </dl>

          <div className="border-t border-line">
            {accordion.map((a, i) => {
              const isOpen = open === i
              return (
                <div key={a.title} className="border-b border-line">
                  <h2 className="text-[19px]">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`acc-${i}`}
                      id={`acc-btn-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex min-h-[68px] w-full cursor-pointer items-center justify-between gap-4 text-left font-semibold"
                    >
                      {a.title}
                      <ChevronDown size={20} aria-hidden className={`flex-none transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </h2>
                  <div id={`acc-${i}`} role="region" aria-labelledby={`acc-btn-${i}`} hidden={!isOpen} className="pb-6 leading-[1.7] text-slate">
                    {a.body}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-[2fr_1fr] sm:grid-rows-[240px_240px]">
            {tour.gallery.map((g, i) => (
              <Photo
                key={g + i}
                image={g}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={`h-56 w-full rounded-[18px] object-cover sm:h-full ${i === 0 ? 'sm:row-span-2' : ''}`}
              />
            ))}
          </div>
        </article>

        <aside aria-labelledby="a-h" className="flex flex-col gap-4 rounded-3xl border border-silver bg-white p-6 shadow-[0_30px_60px_-40px_rgba(16,28,43,.35)] sm:p-8 lg:sticky lg:top-6">
          <p className="eyebrow">Bókunarfyrirspurn</p>
          <h2 id="a-h" className="text-[26px] font-semibold">Áhugi á þessari ferð?</h2>
          <dl className="text-[15px]">
            {[
              ['Verð', tour.price ?? 'Eftir fyrirspurn'],
              ['Hópar', 'Sérsniðið tilboð'],
              ['Dagsetningar', 'Staðfestar með svari'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-silver py-3.5">
                <dt className="text-slate">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <button type="button" className="btn btn-navy" onClick={() => requestInquiry('tour', tour.title)}>
            Senda fyrirspurn
          </button>
          <a
            className="btn btn-line"
            href={`mailto:${company.email}?subject=${encodeURIComponent(`Fyrirspurn um ferð: ${tour.title}`)}`}
          >
            <Mail size={18} aria-hidden /> Senda tölvupóst
          </a>
          <p className="rounded-xl bg-glacier px-4 py-3.5 text-[13px] leading-relaxed text-slate">
            Sýnidæmi: Engin bókun eða greiðsla fer fram hér. Laus sæti og brottfarir eru ekki sýnd fyrr en tenging við
            bókunarkerfi er komin.
          </p>
        </aside>
      </div>
    </>
  )
}

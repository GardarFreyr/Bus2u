import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import { regions, tours, type Tour } from '../data/tours'
import { useBooking } from '../lib/booking'
import { Photo } from './Photo'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

function TourCard({ tour, featured }: { tour: Tour; featured: boolean }) {
  const { requestInquiry } = useBooking()
  return (
    <article
      className={`group relative flex h-full min-h-[520px] items-end overflow-hidden rounded-[22px] bg-navy text-glacier ${
        featured ? 'lg:row-span-2 lg:min-h-[1064px]' : ''
      }`}
    >
      <Photo
        image={tour.image}
        sizes={featured ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 45vw, 100vw'}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,28,43,0)_12%,rgba(16,28,43,.6)_48%,rgba(16,28,43,.94)_100%)] sm:bg-[linear-gradient(180deg,rgba(16,28,43,0)_30%,rgba(16,28,43,.55)_60%,rgba(16,28,43,.92)_100%)]" />
      <div className="absolute left-5 top-5 flex flex-wrap gap-2">
        {tour.status === 'example' && <span className="tag tag-dark">Dæmi um ferð</span>}
        <span className="tag tag-dark">{tour.region}</span>
      </div>
      <div className="relative w-full p-6 sm:p-8">
        <h3 className="text-[28px] font-semibold sm:text-[34px]">{tour.title}</h3>
        <p className="mb-5 mt-2.5 max-w-[460px] leading-relaxed text-glacier/85">{tour.summary}</p>
        <ul className="mb-6 flex flex-wrap gap-2.5 text-[13px]" aria-label="Lykilupplýsingar">
          <li className="rounded-full border border-glacier/30 px-3 py-1.5">Lengd: {tour.duration ?? 'staðfest síðar'}</li>
          <li className="rounded-full border border-glacier/30 px-3 py-1.5">Verð: {tour.price ?? 'eftir fyrirspurn'}</li>
        </ul>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button type="button" className="btn btn-ice" onClick={() => requestInquiry('tour', tour.title)}>
            Senda fyrirspurn
          </button>
          <Link to={`/ferdir/${tour.slug}`} className="btn btn-ghost">
            Nánar<span className="sr-only"> um {tour.title}</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export function Tours() {
  const [region, setRegion] = useState<(typeof regions)[number]>('Allar')
  const list = tours.filter((t) => region === 'Allar' || t.region === region)

  return (
    <section id="ferdir" aria-labelledby="tour-h" className="bg-silver py-20 sm:py-32">
      <div className="wrap">
        <SectionHeading
          id="tour-h"
          eyebrow="Ferðir"
          title="Finndu réttu ferðina"
          aside={
            <div role="group" aria-label="Sía ferðir eftir svæði" className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={region === r}
                  onClick={() => setRegion(r)}
                  className={`min-h-11 cursor-pointer rounded-full border px-[18px] text-[15px] font-medium transition-colors ${
                    region === r ? 'border-navy bg-navy text-glacier' : 'border-[#c9d3da] text-navy hover:border-navy'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          }
        />
        <p className="sr-only" aria-live="polite">{list.length} ferðir birtar</p>
        <div className={`grid gap-6 ${list.length > 1 ? 'lg:grid-cols-[1.25fr_1fr]' : ''}`}>
          {list.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.06} className={i === 0 && list.length > 2 ? 'lg:row-span-2' : ''}>
              <TourCard tour={t} featured={i === 0 && list.length > 2} />
            </Reveal>
          ))}
        </div>
        <div role="note" className="mt-7 flex items-start gap-3 rounded-[14px] bg-glacier px-5 py-4 text-sm leading-relaxed text-slate">
          <Info size={20} aria-hidden className="mt-px flex-none text-nordic" />
          <span>
            Ferðirnar hér eru sýnidæmi sem sýna hvernig ferðaframboð gæti litið út. Þær eru ekki til sölu, og lengd,
            verð og brottfarir verða aðeins birt þegar Bus2u hefur staðfest þær.
          </span>
        </div>
      </div>
    </section>
  )
}

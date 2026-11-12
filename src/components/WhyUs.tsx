import { CalendarDays, ListChecks, MessageSquare, Route } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const items = [
  { icon: CalendarDays, title: 'Þægileg skipulagning', text: 'Þú segir okkur hvert, hvenær og hve mörg — við hjálpum við að púsla ferðinni saman.' },
  { icon: MessageSquare, title: 'Persónuleg samskipti', text: 'Beint samband við fyrirtækið, án milliliða eða sjálfvirkra svara.' },
  { icon: ListChecks, title: 'Skýrar fyrirspurnir', text: 'Allar helstu upplýsingar á einum stað, svo svarið verði nákvæmara.' },
  { icon: Route, title: 'Sveigjanleg ferðaáætlun', text: 'Leið, stopp og tímasetningar eru rædd og aðlöguð að þínum hópi.' },
]

export function WhyUs() {
  return (
    <section aria-labelledby="why-h" className="bg-navy py-20 text-glacier sm:py-32">
      <div className="wrap">
        <SectionHeading
          dark
          id="why-h"
          eyebrow="Af hverju Bus2u"
          title="Einn tengiliður, frá fyrstu fyrirspurn til brottfarar."
          aside={
            <p className="max-w-[420px] text-[17px] leading-relaxed text-glacier/75">
              Hjá sérhæfðum ferða- og akstursaðila ræðirðu ferðina beint við þá sem sjá um hana.
            </p>
          }
        />
        <div className="grid gap-px overflow-hidden rounded-[20px] bg-ice/15 sm:grid-cols-2 xl:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.06} className="bg-navy">
              <div className="flex h-full flex-col gap-3.5 px-7 pb-10 pt-9">
                <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-nordic text-ice">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="text-[21px] font-semibold">{title}</h3>
                <p className="text-[15px] leading-relaxed text-glacier/75">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

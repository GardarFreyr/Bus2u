import { BadgeCheck } from 'lucide-react'
import { company, verifiedFacts } from '../data/company'
import { Photo } from './Photo'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="um" aria-labelledby="about-h" className="py-20 sm:py-32">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
          <Photo image="road5" sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Um okkur</p>
          <h2 id="about-h" className="mb-6 mt-3.5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[52px]">
            Ferða- og akstursþjónusta frá Vogum á Reykjanesi.
          </h2>
          <p className="mb-4 text-[17px] leading-[1.7] text-slate">
            {company.name} er íslenskt fyrirtæki á sviði ferða og fólksflutninga, með aðsetur í Vogum á Reykjanesi.
            Fyrirtækið er skráð sem dagsferðafyrirtæki hjá Ferðamálastofu.
          </p>
          <p className="text-[17px] leading-[1.7] text-slate">
            Hér verður saga fyrirtækisins, áherslur og myndir af eigin bílum þegar Bus2u hefur útvegað efnið.
          </p>
          <dl className="mt-9 grid gap-6 border-t border-silver pt-7 sm:grid-cols-2">
            {verifiedFacts.map((f) => (
              <div key={f.label}>
                <dt className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate">{f.label}</dt>
                <dd className="font-medium leading-snug">{f.value}</dd>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-nordic">
                  <BadgeCheck size={14} aria-hidden /> Staðfest
                </span>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

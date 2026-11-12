import { ArrowRight } from 'lucide-react'
import { services } from '../data/services'
import { useBooking } from '../lib/booking'
import { Photo } from './Photo'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Services() {
  const { requestInquiry } = useBooking()
  return (
    <section id="thjonusta" aria-labelledby="svc-h" className="py-20 sm:py-32">
      <div className="wrap">
        <SectionHeading
          id="svc-h"
          eyebrow="Þjónusta"
          title="Ferðalausnir fyrir hópa, fjölskyldur og fyrirtæki."
          aside={
            <p className="max-w-[420px] text-[17px] leading-relaxed text-slate">
              Tillaga að þjónustuflokkum fyrir nýjan vef. Lýsingar verða uppfærðar í samráði við Bus2u áður en vefurinn fer í loftið.
            </p>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-silver bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(16,28,43,.28)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo
                    image={s.image}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="tag absolute left-4 top-4">Tillaga</span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <h3 className="text-[26px] font-semibold">{s.title}</h3>
                  <p className="flex-1 leading-relaxed text-slate">{s.description}</p>
                  <button
                    type="button"
                    onClick={() => requestInquiry(s.id)}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 self-start text-[15px] font-semibold text-navy hover:text-nordic"
                  >
                    {s.cta} <ArrowRight size={18} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

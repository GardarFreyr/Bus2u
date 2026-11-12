import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Photo } from './Photo'
import { company } from '../data/company'
import { useBooking } from '../lib/booking'

export function Hero() {
  const { requestInquiry } = useBooking()
  return (
    <section
      id="heim"
      aria-labelledby="hero-h"
      className="relative flex min-h-[680px] items-end overflow-hidden bg-navy text-glacier sm:min-h-[760px] lg:min-h-[min(880px,100svh)]"
    >
      <Photo image="hero" priority className="hero-img absolute inset-0 h-full w-full object-cover object-[50%_70%]" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,28,43,.6)_0%,rgba(16,28,43,.15)_38%,rgba(16,28,43,.8)_100%)]"
      />
      <div className="wrap relative pb-14 pt-40 sm:pb-24 sm:pt-44">
        <p className="eyebrow mb-5 text-ice">Ferðir og akstur · {company.location}, {company.region}i</p>
        <h1 id="hero-h" className="max-w-[820px] text-[44px] font-semibold leading-none sm:text-6xl lg:text-[88px]">
          Ferðalagið byrjar hér.
        </h1>
        <p className="mb-9 mt-6 max-w-[560px] text-lg leading-relaxed text-glacier/90 sm:text-[21px]">
          Uppgötvaðu Ísland og finndu ferðalausn sem hentar þínum þörfum.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/#ferdir" className="btn btn-ice flex-1 sm:flex-none">
            Skoða ferðir <ArrowRight size={18} aria-hidden />
          </Link>
          <button type="button" className="btn btn-ghost flex-1 sm:flex-none" onClick={() => requestInquiry('private')}>
            Fá tilboð í ferð
          </button>
        </div>
        <dl className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-glacier/25 pt-6 text-sm text-glacier/80 sm:mt-16">
          <div className="flex gap-1.5"><dt className="font-semibold text-glacier">Dagsferðir</dt><dd>· skráð hjá Ferðamálastofu</dd></div>
          <div className="flex gap-1.5"><dt className="font-semibold text-glacier">Staðsetning</dt><dd>· {company.location}, {company.region}i</dd></div>
          <div className="flex gap-1.5"><dt className="font-semibold text-glacier">Fyrirspurnir</dt><dd>· {company.email}</dd></div>
        </dl>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { Photo } from './Photo'
import { Reveal } from './Reveal'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-h" className="relative overflow-hidden bg-navy text-glacier">
      <Photo image="langj" decorative className="absolute inset-0 h-full w-full object-cover object-[50%_40%]" />
      <div aria-hidden className="absolute inset-0 bg-navy/65" />
      <Reveal className="wrap relative flex flex-col items-center gap-7 py-28 text-center sm:py-40">
        <p className="eyebrow text-ice">Næsta ferð</p>
        <h2 id="cta-h" className="max-w-[880px] text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-[64px]">
          Við hjálpum þér að skipuleggja næstu ferð.
        </h2>
        <p className="max-w-[520px] text-lg leading-relaxed text-glacier/85 sm:text-[19px]">
          Sendu okkur helstu upplýsingar og við höfum samband með svar eða tilboð.
        </p>
        <Link to="/#boka" className="btn btn-ice min-h-14 px-8 text-base">Senda fyrirspurn</Link>
      </Reveal>
    </section>
  )
}

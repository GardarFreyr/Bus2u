import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import { company, navLinks } from '../data/company'
import { images } from '../data/images'
import { Logo } from './Navbar'

export function Footer() {
  return (
    <footer id="samband" className="bg-navy-deep pb-10 pt-20 text-[15px] text-glacier/75">
      <div className="wrap">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1.4fr]">
          <div>
            <Logo />
            <p className="mb-5 mt-4 max-w-[320px] leading-relaxed">
              {company.name} — ferðir og fólksflutningar frá Vogum á Reykjanesi.
            </p>
            <span className="inline-flex items-center gap-2 rounded-lg bg-ice px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-navy">
              <Info size={14} aria-hidden /> Sýnidæmi
            </span>
          </div>
          <nav aria-label="Valmynd í fæti">
            <h2 className="mb-4 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ice">Vefur</h2>
            <ul className="grid gap-1">
              {navLinks.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="inline-flex min-h-9 items-center text-glacier no-underline hover:text-ice">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-4 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ice">Upplýsingar</h2>
            <ul className="grid gap-2.5">
              <li>Persónuverndarstefna <span className="text-[#8796a3]">(væntanleg)</span></li>
              <li>Skilmálar <span className="text-[#8796a3]">(væntanlegir)</span></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-ice">Hafa samband</h2>
            <ul className="grid gap-1">
              <li>
                <a href={`mailto:${company.email}`} className="inline-flex min-h-9 items-center text-glacier no-underline hover:text-ice">
                  {company.email}
                </a>
              </li>
              <li className="py-1.5">{company.location}, {company.region}i</li>
            </ul>
            <Link to="/#boka" className="btn btn-ice mt-4">Bókunarfyrirspurn</Link>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-6 border-t border-ice/15 pt-7 text-[13px] leading-relaxed">
          <span>© {company.name} · Óbindandi hönnunartillaga unnin af Gardarvefur. Ekki opinber vefur Bus2u.</span>
          <span>Engin bókun, greiðsla eða gagnavistun fer fram á þessum vef.</span>
        </div>

        <details className="mt-6 text-xs leading-relaxed text-glacier/60">
          <summary className="inline-flex min-h-9 cursor-pointer items-center hover:text-glacier">Myndir og leyfi</summary>
          <ul className="mt-2 grid gap-1">
            {Object.values(images).map((img) => (
              <li key={img.source}>
                <a href={img.source} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center text-glacier/75 underline hover:text-ice">
                  {img.title}
                </a>{' '}
                — {img.author}, {img.license}, Wikimedia Commons
              </li>
            ))}
          </ul>
          <p className="mt-2">Myndirnar sýna landslag; engin þeirra sýnir bíla Bus2u.</p>
        </details>
      </div>
    </footer>
  )
}

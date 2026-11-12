import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section aria-labelledby="nf-h" className="bg-navy pb-28 pt-44 text-glacier">
      <div className="wrap">
        <p className="eyebrow text-ice">404</p>
        <h1 id="nf-h" className="mt-4 text-4xl font-semibold sm:text-6xl">Síða fannst ekki.</h1>
        <p className="mb-8 mt-5 max-w-lg text-lg text-glacier/80">Síðan sem þú leitaðir að er ekki til eða hefur verið færð.</p>
        <Link to="/" className="btn btn-ice">Fara á forsíðu</Link>
      </div>
    </section>
  )
}

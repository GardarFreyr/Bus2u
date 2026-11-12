import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/company'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/#heim"
      aria-label="Bus2u — forsíða"
      className={`inline-flex min-h-11 items-center font-display text-[22px] font-bold leading-none tracking-[0.08em] text-glacier no-underline ${className}`}
    >
      BUS<span className="text-ice">2</span>U
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close on navigation
  useEffect(() => setOpen(false), [location.key])

  // Close on Escape and return focus to the toggle
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="wrap flex h-[84px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Aðalvalmynd" className="hidden lg:block">
          <ul className="flex gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="inline-flex min-h-11 items-center rounded-[10px] px-3.5 text-[15px] font-medium text-glacier/85 no-underline transition-colors hover:bg-glacier/10 hover:text-glacier"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/#boka" className="btn btn-ice hidden lg:inline-flex">
          Bókunarfyrirspurn
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-glacier/40 text-glacier lg:hidden"
          aria-label={open ? 'Loka valmynd' : 'Opna valmynd'}
          aria-expanded={open}
          aria-controls="farsimavalmynd"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="farsimavalmynd"
            aria-label="Farsímavalmynd"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-ice/20 bg-navy px-4 pb-6 pt-2 shadow-2xl sm:px-8 lg:hidden"
          >
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[52px] items-center border-b border-ice/10 text-[17px] text-glacier no-underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/#boka" onClick={() => setOpen(false)} className="btn btn-ice mt-5 w-full">
              Bókunarfyrirspurn
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

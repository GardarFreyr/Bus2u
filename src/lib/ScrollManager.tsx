import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the #hash target after route changes, or to the top for new pages. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const tick = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (tries++ < 20) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [pathname, hash, key])

  return null
}

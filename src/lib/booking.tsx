import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { quoteTypes, type InquiryForm, type ServiceType } from './inquiry'

interface Preset {
  values: Partial<InquiryForm>
  nonce: number
}

interface BookingCtx {
  preset: Preset | null
  /** Pre-fill the inquiry form and jump to it, from any page. */
  requestInquiry: (type?: ServiceType, tour?: string) => void
}

const Ctx = createContext<BookingCtx | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<Preset | null>(null)
  const navigate = useNavigate()

  const requestInquiry = useCallback(
    (type?: ServiceType, tour?: string) => {
      if (type) {
        setPreset({
          values: { type, tour: tour ?? '', quote: quoteTypes.includes(type) },
          nonce: Date.now(),
        })
      }
      navigate({ pathname: '/', hash: '#boka' })
    },
    [navigate],
  )

  return <Ctx.Provider value={{ preset, requestInquiry }}>{children}</Ctx.Provider>
}

export function useBooking() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useBooking must be used inside BookingProvider')
  return v
}

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { scrollToId } from './cn'

interface BookingContextValue {
  /** Servicio preseleccionado desde otra sección (p. ej. una tarjeta de servicio). */
  preset: { serviceId: string; nonce: number } | null
  /** Lleva al usuario al formulario, opcionalmente con un servicio preseleccionado. */
  book: (serviceId?: string) => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<BookingContextValue['preset']>(null)

  const book = useCallback((serviceId?: string) => {
    if (serviceId) setPreset({ serviceId, nonce: Date.now() })
    scrollToId('agendar')
  }, [])

  const value = useMemo(() => ({ preset, book }), [preset, book])
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking debe usarse dentro de <BookingProvider>')
  return ctx
}

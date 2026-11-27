import { useEffect, useState } from 'react'
import { Menu, X, Phone, CalendarHeart, Siren } from 'lucide-react'
import { navLinks, site } from '../../data/site'
import { useActiveSection, useLockBodyScroll, useScrolled } from '../../hooks'
import { cn, scrollToId } from '../../lib/cn'
import { useBooking } from '../../lib/booking'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'

// Se observan también secciones sin enlace para no resaltar un enlace incorrecto.
const sectionIds = [...navLinks.map((l) => l.id), 'galeria', 'agendar']

export function Navbar() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const { book } = useBooking()
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // Espera a que se libere el bloqueo de scroll del menú móvil.
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Franja de urgencias */}
      <div className="bg-forest text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
          <a href={site.emergencyHref} className="group inline-flex items-center gap-2 font-medium">
            <span className="relative flex size-2">
              <span className="animate-pulse-ring absolute inline-flex size-full rounded-full bg-coral" />
              <span className="relative inline-flex size-2 rounded-full bg-coral" />
            </span>
            <Siren className="hidden size-3.5 text-coral sm:block" aria-hidden />
            <span>
              Urgencias 24/7 <span className="hidden sm:inline">· Abierto ahora ·</span>{' '}
              <span className="underline-offset-2 group-hover:underline">{site.emergencyPhone}</span>
            </span>
          </a>
          <p className="hidden text-white/70 md:block">
            {site.address}, {site.city}
          </p>
        </div>
      </div>

      <nav
        aria-label="Principal"
        className={cn(
          'border-b transition-all duration-300',
          scrolled ? 'border-forest/5 bg-cream/85 shadow-soft backdrop-blur-xl' : 'border-transparent bg-cream',
        )}
      >
        <div className={cn('mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8', scrolled ? 'h-16' : 'h-20')}>
          <a href="#inicio" onClick={go('inicio')} className="group shrink-0" aria-label="AlmaVet, ir al inicio">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 rounded-full bg-white/70 p-1.5 ring-1 ring-forest/5 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                    active === link.id ? 'bg-forest text-white' : 'text-ink/75 hover:bg-mint hover:text-forest',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden size-11 place-items-center rounded-full text-forest ring-1 ring-forest/10 transition hover:bg-mint sm:grid lg:hidden xl:grid"
              aria-label={`Llamar al ${site.phone}`}
            >
              <Phone className="size-[18px]" />
            </a>
            <Button size="sm" onClick={() => book()} className="h-11 px-5 max-sm:hidden">
              <CalendarHeart className="size-4" aria-hidden />
              Agendar cita
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="grid size-11 place-items-center rounded-full bg-forest text-white transition active:scale-95 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={cn(
          'absolute inset-x-0 top-full z-40 h-dvh lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
        ref={(el) => {
          if (el) el.inert = !open
        }}
      >
        <div
          className={cn('absolute inset-0 bg-forest/30 backdrop-blur-sm transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            'relative mx-3 mt-2 rounded-[28px] bg-white p-3 shadow-lift transition-all duration-300 ease-out',
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          )}
        >
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li
                key={link.id}
                style={{ transitionDelay: open ? `${60 + i * 35}ms` : '0ms' }}
                className={cn('transition-all duration-300', open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0')}
              >
                <a
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  className={cn(
                    'flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition',
                    active === link.id ? 'bg-mint text-forest' : 'text-ink hover:bg-cream',
                  )}
                >
                  {link.label}
                  {active === link.id && <span className="size-2 rounded-full bg-brand" aria-hidden />}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-forest/5 pt-3">
            <a
              href={site.phoneHref}
              className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold text-forest ring-1 ring-forest/15"
            >
              <Phone className="size-4" /> Llamar
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                requestAnimationFrame(() => book())
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-forest text-sm font-semibold text-white"
            >
              <CalendarHeart className="size-4" /> Agendar cita
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

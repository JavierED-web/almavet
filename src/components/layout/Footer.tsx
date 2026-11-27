import { Mail, MapPin, Phone, Siren } from 'lucide-react'
import { navLinks, site } from '../../data/site'
import { services } from '../../data/services'
import { scrollToId } from '../../lib/cn'
import { useBooking } from '../../lib/booking'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'

function Instagram(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}
function Facebook(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
    </svg>
  )
}
function TikTok(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z" />
    </svg>
  )
}

const socials = [
  { label: 'Instagram', href: site.socials.instagram, icon: Instagram },
  { label: 'Facebook', href: site.socials.facebook, icon: Facebook },
  { label: 'TikTok', href: site.socials.tiktok, icon: TikTok },
]

export function Footer() {
  const { book } = useBooking()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-forest text-white">
      <div className="paw-pattern pointer-events-none absolute inset-0" aria-hidden />

      {/* CTA */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[32px] bg-white/5 p-8 ring-1 ring-white/10 md:flex-row md:items-center sm:p-10">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              ¿Listo para su próxima <em className="text-honey">visita</em>?
            </h2>
            <p className="mt-2 text-white/70">Agenda en línea o escríbenos, te respondemos en minutos.</p>
          </div>
          <Button variant="honey" arrow onClick={() => book()}>
            Agendar cita
          </Button>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            Medicina veterinaria con alma en el corazón de Bogotá. Cuidamos a perros, gatos y mascotas exóticas como parte
            de nuestra familia.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`AlmaVet en ${s.label}`}
                  className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-honey hover:text-forest"
                >
                  <s.icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Navegación del pie de página">
          <h3 className="text-sm font-semibold tracking-wide text-honey uppercase">Navegación</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(l.id)
                  }}
                  className="text-white/70 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-honey uppercase">Servicios</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}>
                <button type="button" onClick={() => book(s.id)} className="text-left text-white/70 transition hover:text-white">
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-honey uppercase">Contacto y horarios</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
              {site.address}, {site.city}
            </li>
            <li>
              <a href={site.phoneHref} className="flex gap-2.5 transition hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-2.5 transition hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden /> {site.email}
              </a>
            </li>
          </ul>
          <dl className="mt-5 space-y-1 text-sm">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-3">
                <dt className="text-white/50">{h.days}</dt>
                <dd className="text-white/80">{h.time}</dd>
              </div>
            ))}
          </dl>
          <a
            href={site.emergencyHref}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-coral/15 px-3.5 py-2 text-sm font-semibold text-[#ff9c90] transition hover:bg-coral/25"
          >
            <Siren className="size-4" aria-hidden /> Urgencias 24/7
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} AlmaVet Clínica Veterinaria. Todos los derechos reservados.</p>
          <p>Sitio de demostración para portafolio · Marca y datos ficticios.</p>
        </div>
      </div>
    </footer>
  )
}

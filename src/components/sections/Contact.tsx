import { useState } from 'react'
import { Check, Clock3, Copy, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { site } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { LinkButton } from '../ui/Button'
import { WhatsAppIcon } from '../layout/FloatingActions'
import { PawMark } from '../ui/Logo'

function isOpenNow(now = new Date()) {
  const d = now.getDay()
  const h = now.getHours() + now.getMinutes() / 60
  if (d >= 1 && d <= 5) return h >= 7 && h < 20
  if (d === 6) return h >= 8 && h < 16
  return false
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const open = isOpenNow()

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${site.address}, ${site.city}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Portapapeles no disponible: no hacemos nada. */
    }
  }

  const channels = [
    { icon: Phone, label: 'Teléfono', value: site.phone, href: site.phoneHref },
    { icon: WhatsAppIcon, label: 'WhatsApp', value: site.whatsapp, href: site.whatsappHref, external: true },
    { icon: Mail, label: 'Correo', value: site.email, href: `mailto:${site.email}` },
  ]

  return (
    <section id="contacto" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contacto"
          title={
            <>
              Ven a visitarnos en <em className="text-brand">Chapinero</em>
            </>
          }
          description="Parqueadero para clientes, acceso para sillas de ruedas y una entrada independiente para urgencias."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          <Reveal className="flex flex-col gap-4">
            <div className="rounded-[28px] bg-cream p-6 ring-1 ring-forest/5">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest text-honey">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted">Dirección</p>
                  <p className="font-display text-xl font-medium text-forest">{site.address}</p>
                  <p className="text-sm text-muted">{site.city}</p>
                </div>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-forest ring-1 ring-forest/10 transition hover:bg-mint"
                  aria-label={copied ? 'Dirección copiada' : 'Copiar dirección'}
                >
                  {copied ? <Check className="size-4 text-brand" /> : <Copy className="size-4" />}
                </button>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-forest/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft hover:ring-brand/40"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <c.icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted">{c.label}</span>
                      <span className="block truncate font-semibold text-forest">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="rounded-[28px] bg-forest p-6 text-white">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-semibold">
                  <Clock3 className="size-5 text-honey" aria-hidden /> Horarios de atención
                </p>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${open ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-white/70'}`}
                >
                  <span className={`size-1.5 rounded-full ${open ? 'bg-emerald-300' : 'bg-white/50'}`} />
                  {open ? 'Abierto ahora' : 'Consulta cerrada'}
                </span>
              </div>
              <dl className="mt-4 divide-y divide-white/10 text-sm">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-white/70">{h.days}</dt>
                    <dd className="text-right font-medium">{h.time}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 py-2.5">
                  <dt className="text-white/70">Urgencias</dt>
                  <dd className="font-semibold text-honey">24 horas · 365 días</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-mint ring-1 ring-forest/5">
            <iframe
              title="Mapa de ubicación de AlmaVet en Chapinero, Bogotá"
              src={site.mapEmbed}
              loading="lazy"
              className="absolute inset-0 size-full border-0 grayscale-[30%] sepia-[15%]"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/60 to-transparent" aria-hidden />
            <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 rounded-3xl bg-white/95 p-4 shadow-lift backdrop-blur sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-forest text-mint">
                  <PawMark className="size-6" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-forest">AlmaVet Chapinero</p>
                  <p className="truncate text-sm text-muted">A 2 cuadras de la estación Calle 72</p>
                </div>
              </div>
              <div className="flex gap-2">
                <LinkButton href={site.mapsHref} target="_blank" rel="noopener noreferrer" size="sm" className="flex-1">
                  <Navigation className="size-4" aria-hidden /> Cómo llegar
                </LinkButton>
                <LinkButton href={site.phoneHref} variant="secondary" size="sm" className="flex-1">
                  <Phone className="size-4" aria-hidden /> Llamar
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

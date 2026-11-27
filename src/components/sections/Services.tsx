import { useState } from 'react'
import { ArrowUpRight, Check, Clock3, Tag } from 'lucide-react'
import { services, type Service } from '../../data/services'
import { cn } from '../../lib/cn'
import { useBooking } from '../../lib/booking'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { PawMark } from '../ui/Logo'

const accents: Record<Service['accent'], { icon: string; badge: string }> = {
  mint: { icon: 'bg-mint text-brand group-hover:bg-brand group-hover:text-white', badge: 'bg-mint text-brand-600' },
  honey: { icon: 'bg-honey-100 text-[#b7811a] group-hover:bg-honey group-hover:text-forest', badge: 'bg-honey-100 text-[#8a5f0e]' },
  coral: { icon: 'bg-coral/10 text-coral group-hover:bg-coral group-hover:text-white', badge: 'bg-coral/10 text-coral' },
}

function ServiceCard({ service, onMore }: { service: Service; onMore: () => void }) {
  const Icon = service.icon
  const a = accents[service.accent]
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-forest/5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lift">
      <PawMark
        className="pointer-events-none absolute -right-6 -bottom-6 size-32 rotate-[-20deg] text-forest/[0.03] transition-all duration-700 group-hover:-right-2 group-hover:-bottom-2 group-hover:text-brand/[0.08]"
      />
      <div className="flex items-start justify-between gap-3">
        <span className={cn('grid size-14 place-items-center rounded-2xl transition-all duration-500 group-hover:rotate-[-6deg]', a.icon)}>
          <Icon className="size-6" aria-hidden />
        </span>
        {service.badge && (
          <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', a.badge)}>{service.badge}</span>
        )}
      </div>
      <h3 className="mt-6 font-display text-xl font-medium text-forest">{service.name}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{service.short}</p>
      <button
        type="button"
        onClick={onMore}
        className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full text-sm font-semibold text-forest after:absolute after:inset-0 after:content-['']"
        aria-label={`Más información sobre ${service.name}`}
      >
        Más información
        <span className="grid size-7 place-items-center rounded-full bg-cream transition-all duration-300 group-hover:rotate-45 group-hover:bg-forest group-hover:text-white">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </button>
    </article>
  )
}

export function Services() {
  const [selected, setSelected] = useState<Service | null>(null)
  const { book } = useBooking()
  const Icon = selected?.icon

  return (
    <section id="servicios" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Servicios"
            title={
              <>
                Todo lo que tu mascota necesita, <em className="text-brand">bajo un mismo techo</em>
              </>
            }
            description="Desde la primera vacuna hasta una cirugía especializada: medicina integral para perros, gatos y mascotas exóticas."
          />
          <Reveal delay={100} className="flex flex-wrap gap-2 text-sm">
            {['Perros', 'Gatos', 'Conejos', 'Aves', 'Exóticos'].map((t) => (
              <span key={t} className="rounded-full bg-cream px-4 py-2 font-medium text-forest ring-1 ring-forest/5">
                {t}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 80} className="h-full">
              <ServiceCard service={s} onMore={() => setSelected(s)} />
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} labelledBy="service-modal-title">
        {selected && Icon && (
          <div>
            <div className="relative overflow-hidden bg-forest px-7 pt-8 pb-7 text-white">
              <PawMark className="absolute -right-6 -bottom-8 size-40 rotate-[-20deg] text-white/5" />
              <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-honey">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 id="service-modal-title" className="mt-5 font-display text-3xl font-medium">
                {selected.name}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                  <Clock3 className="size-3.5" aria-hidden /> {selected.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                  <Tag className="size-3.5" aria-hidden />{' '}
                  {selected.priceFrom.startsWith('$') ? `Desde ${selected.priceFrom}` : selected.priceFrom}
                </span>
              </div>
            </div>
            <div className="px-7 py-7">
              <p className="leading-relaxed text-muted">{selected.description}</p>
              <h4 className="mt-6 text-sm font-semibold tracking-wide text-forest uppercase">Incluye</h4>
              <ul className="mt-3 space-y-2.5">
                {selected.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-ink">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-brand">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="flex-1"
                  onClick={() => {
                    const id = selected.id
                    setSelected(null)
                    requestAnimationFrame(() => book(id))
                  }}
                >
                  Agendar este servicio
                </Button>
                <Button variant="secondary" onClick={() => setSelected(null)}>
                  Seguir viendo
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}

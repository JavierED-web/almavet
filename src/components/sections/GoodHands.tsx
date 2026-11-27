import { BadgeCheck, Cat, FileHeart, MonitorSmartphone, Siren, Phone } from 'lucide-react'
import { img, site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { LinkButton } from '../ui/Button'
import { PawMark } from '../ui/Logo'

const points = [
  { icon: BadgeCheck, title: 'Protocolos libres de miedo', text: 'Manejo amable, feromonas y premios para reducir el estrés en cada visita.' },
  { icon: Cat, title: 'Zonas separadas', text: 'Sala de espera y consultorio exclusivos para gatos, lejos de los ladridos.' },
  { icon: FileHeart, title: 'Presupuesto antes de actuar', text: 'Te explicamos opciones y costos antes de cualquier examen o procedimiento.' },
  { icon: MonitorSmartphone, title: 'Seguimiento en tu celular', text: 'Resultados, fotos de hospitalización y recordatorios por WhatsApp.' },
]

export function GoodHands() {
  return (
    <section aria-labelledby="good-hands" className="bg-cream pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] bg-forest px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <div className="paw-pattern pointer-events-none absolute inset-0 opacity-100" aria-hidden />
          <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-brand/40 blur-3xl" aria-hidden />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHeading
                light
                align="left"
                eyebrow="Confianza"
                title={
                  <span id="good-hands">
                    Tu mascota está en <em className="text-honey">buenas manos</em>
                  </span>
                }
                description="Sabemos lo que significa dejar a un miembro de la familia en manos de otros. Por eso cuidamos cada detalle, de la sala de espera al alta."
              />
              <ul className="mt-10 grid gap-5 sm:grid-cols-2">
                {points.map((p, i) => (
                  <Reveal as="li" key={p.title} delay={i * 80} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-honey">
                      <p.icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/70">{p.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal delay={150} className="relative">
              <div className="overflow-hidden rounded-[32px]">
                <img
                  src={img('1548199973-03cce0bbc87b', 800, 640)}
                  alt="Dos perros felices paseando"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
              {/* Indicador de urgencias */}
              <div className="relative -mt-16 mx-4 rounded-3xl bg-white p-5 shadow-lift sm:mx-8">
                <div className="flex items-start gap-4">
                  <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-coral text-white">
                    <span className="animate-pulse-ring absolute inset-0 rounded-2xl bg-coral" aria-hidden />
                    <Siren className="relative size-6" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-wide text-coral uppercase">¿Es una urgencia?</p>
                    <p className="mt-0.5 font-display text-xl font-medium text-forest">Estamos abiertos ahora mismo</p>
                    <p className="mt-1 text-sm text-muted">Llámanos en camino y preparamos su llegada.</p>
                  </div>
                </div>
                <LinkButton href={site.emergencyHref} variant="primary" className="mt-4 w-full bg-coral hover:bg-coral/90">
                  <Phone className="size-4" aria-hidden /> Llamar a urgencias · {site.emergencyPhone}
                </LinkButton>
              </div>
              <PawMark className="absolute -top-5 -right-3 size-12 rotate-12 text-honey" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

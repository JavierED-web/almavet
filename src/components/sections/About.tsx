import { useState } from 'react'
import { Heart, Award, UserRound, Microscope, Eye } from 'lucide-react'
import { img } from '../../data/site'
import { cn } from '../../lib/cn'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { PawMark } from '../ui/Logo'

const tabs = [
  {
    id: 'historia',
    label: 'Nuestra historia',
    text: 'AlmaVet nació en 2016 en un pequeño consultorio de Chapinero, cuando la Dra. Laura Méndez decidió crear la clínica que ella misma buscaba para su perra Canela: un lugar donde explicaran cada paso y nadie tuviera prisa. Hoy somos un equipo de 18 personas, con quirófano, laboratorio y hospitalización, pero seguimos atendiendo con la misma calma del primer día.',
  },
  {
    id: 'mision',
    label: 'Misión',
    text: 'Cuidar la salud y la calidad de vida de cada mascota con medicina basada en evidencia, trato compasivo y comunicación honesta con sus familias, para que tomen decisiones informadas y tranquilas.',
  },
  {
    id: 'vision',
    label: 'Visión',
    text: 'Ser en 2030 la clínica veterinaria de referencia en Bogotá por la calidad humana de su atención, la formación continua de su equipo y su compromiso con el bienestar animal más allá del consultorio.',
  },
] as const

const values = [
  { icon: Heart, title: 'Amor por los animales', text: 'Manejo libre de miedo, con pausas, premios y paciencia.' },
  { icon: Award, title: 'Profesionalismo', text: 'Médicos especializados y formación continua cada año.' },
  { icon: UserRound, title: 'Atención personalizada', text: 'Planes a la medida de la edad, raza y estilo de vida.' },
  { icon: Microscope, title: 'Tecnología médica', text: 'Rayos X digital, ecografía y laboratorio propio.' },
  { icon: Eye, title: 'Transparencia', text: 'Presupuestos claros antes de cualquier procedimiento.' },
]

export function About() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('historia')
  const current = tabs.find((t) => t.id === tab)!

  return (
    <section id="nosotros" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Collage */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="grid grid-cols-5 grid-rows-6 gap-4" style={{ aspectRatio: '1 / 1.05' }}>
            <div className="col-span-3 row-span-4 overflow-hidden rounded-[32px] shadow-soft">
              <img
                src={img('1629909613654-28e377c37b09', 700, 900)}
                alt="Consultorio de AlmaVet con equipos modernos"
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-[32px] shadow-soft">
              <img
                src={img('1450778869180-41d0601e046e', 500, 700)}
                alt="Perro y gato descansando juntos"
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="col-span-2 row-span-3 flex flex-col justify-between rounded-[32px] bg-forest p-5 text-white">
              <PawMark className="size-8 text-honey" />
              <div>
                <p className="font-display text-4xl font-medium">2016</p>
                <p className="mt-1 text-sm text-white/70">Cuidando mascotas en Bogotá</p>
              </div>
            </div>
            <div className="col-span-3 row-span-2 overflow-hidden rounded-[32px] shadow-soft">
              <img
                src={img('1666214280391-8ff5bd3c0bf0', 700, 400)}
                alt="Equipo médico revisando estudios diagnósticos"
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </Reveal>

        {/* Texto */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Sobre nosotros"
            title={
              <>
                Una clínica hecha por personas que <em className="text-brand">aman a los animales</em>
              </>
            }
          />

          <Reveal delay={100} className="mt-8">
            <div role="tablist" aria-label="Sobre AlmaVet" className="inline-flex rounded-full bg-white p-1 ring-1 ring-forest/5">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls="about-panel"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                    tab === t.id ? 'bg-forest text-white shadow-soft' : 'text-muted hover:text-forest',
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p
              key={tab}
              id="about-panel"
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              className="animate-fade-in mt-5 min-h-[9.5rem] text-[17px] leading-relaxed text-muted"
            >
              {current.text}
            </p>
          </Reveal>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                delay={i * 60}
                className={cn(
                  'flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-forest/5 transition-shadow duration-300 hover:shadow-soft',
                  i === values.length - 1 && 'sm:col-span-2',
                )}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mint text-brand">
                  <v.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-forest">{v.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

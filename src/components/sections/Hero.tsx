import { Star, ShieldCheck, Clock3, HeartPulse } from 'lucide-react'
import { img } from '../../data/site'
import { useCountUp, useInView } from '../../hooks'
import { scrollToId } from '../../lib/cn'
import { useBooking } from '../../lib/booking'
import { Button, LinkButton } from '../ui/Button'
import { PawMark } from '../ui/Logo'

const stats = [
  { value: 2000, prefix: '+', suffix: '', label: 'Mascotas atendidas', format: true },
  { value: 10, prefix: '', suffix: '', label: 'Años de experiencia' },
  { value: 98, prefix: '', suffix: '%', label: 'Clientes satisfechos' },
  { value: 24, prefix: '', suffix: '/7', label: 'Atención de urgencias' },
]

function Stat({ stat, start }: { stat: (typeof stats)[number]; start: boolean }) {
  const n = useCountUp(stat.value, start)
  const shown = stat.format ? n.toLocaleString('es-CO') : n
  return (
    <div className="px-2 py-1">
      <dt className="sr-only">{stat.label}</dt>
      <dd className="font-display text-3xl font-medium tracking-tight text-forest tabular-nums sm:text-4xl">
        {stat.prefix}
        {shown}
        {stat.suffix}
      </dd>
      <dd aria-hidden className="mt-1 text-sm text-muted">
        {stat.label}
      </dd>
    </div>
  )
}

const clients = ['1580489944761-15a19d654956', '1607990281513-2c110a25bd8c', '1559839734-2b71ea197ec2']

export function Hero() {
  const { book } = useBooking()
  const { ref, inView } = useInView<HTMLDListElement>({ threshold: 0.4 })

  return (
    <section id="inicio" className="relative overflow-hidden bg-cream">
      <div className="paw-pattern pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 -right-40 size-[620px] rounded-full bg-mint blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:pt-16 lg:pb-24">
        {/* Texto */}
        <div className="animate-pop-in">
          <p className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-medium text-forest shadow-soft ring-1 ring-forest/5">
            <span className="grid size-7 place-items-center rounded-full bg-mint text-brand">
              <ShieldCheck className="size-4" aria-hidden />
            </span>
            Clínica veterinaria en Bogotá · desde 2016
          </p>

          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.02] font-medium tracking-[-0.02em] text-balance text-forest sm:text-6xl lg:text-[4.4rem]">
            El bienestar de tu mascota,{' '}
            <span className="relative whitespace-nowrap italic text-brand">
              nuestra prioridad
              <svg
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 h-3 w-full text-honey"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M3 14c60-9 150-13 294-6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Medicina veterinaria con alma: diagnósticos precisos, tecnología moderna y un equipo que trata a tu
            compañero como parte de su propia familia. Porque ellos no pueden decirnos qué sienten, nosotros escuchamos
            con más atención.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button arrow onClick={() => book()} className="justify-between sm:justify-center">
              Agendar una cita
            </Button>
            <LinkButton
              href="#servicios"
              variant="secondary"
              size="lg"
              className="px-7"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('servicios')
              }}
            >
              Conoce nuestros servicios
            </LinkButton>
          </div>

          <div className="mt-9 flex items-center gap-4">
            <div className="flex -space-x-3">
              {clients.map((id) => (
                <img
                  key={id}
                  src={img(id, 96, 96)}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover ring-[3px] ring-cream"
                />
              ))}
              <span className="grid size-11 place-items-center rounded-full bg-honey text-forest ring-[3px] ring-cream">
                <PawMark className="size-5" />
              </span>
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-honey" aria-label="Calificación 4,9 de 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden />
                ))}
                <span className="ml-1 font-semibold text-forest">4,9</span>
              </div>
              <p className="mt-0.5 text-muted">+1.200 reseñas de familias en Bogotá</p>
            </div>
          </div>
        </div>

        {/* Composición visual */}
        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-[86%]">
            <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-[999px] rounded-b-[44px] bg-brand/15" aria-hidden />
            <div className="absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-[44px] bg-mint shadow-lift">
              <img
                src={img('1628009368231-7bb7cfcb0def', 900, 1125)}
                alt="Veterinaria de AlmaVet revisando a un gato durante una consulta"
                width={900}
                height={1125}
                {...{ fetchpriority: 'high' }}
                className="size-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/40 to-transparent" aria-hidden />
            </div>
          </div>

          {/* Tarjeta: urgencias */}
          <div className="animate-float absolute bottom-6 -left-1 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift sm:bottom-10 sm:-left-4">
            <span className="relative grid size-11 place-items-center rounded-xl bg-coral/10 text-coral">
              <HeartPulse className="size-5" aria-hidden />
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-forest">
                <span className="relative flex size-2">
                  <span className="animate-pulse-ring absolute inline-flex size-full rounded-full bg-emerald-500" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Urgencias abiertas
              </p>
              <p className="text-xs text-muted">Médico de turno 24/7</p>
            </div>
          </div>

          {/* Tarjeta: foto gato */}
          <div
            className="animate-float absolute top-8 -right-1 w-36 rounded-3xl bg-white p-2 shadow-lift sm:top-12 sm:-right-2 sm:w-44"
            style={{ animationDelay: '-3s' }}
          >
            <img
              src={img('1625321171045-1fea4ac688e9', 360, 280)}
              alt="Perro recibiendo un secado suave después del baño"
              width={360}
              height={280}
              className="aspect-[9/7] w-full rounded-2xl object-cover"
            />
            <p className="px-1.5 pt-2 pb-1 text-xs font-semibold text-forest">Grooming sin estrés</p>
            <p className="px-1.5 pb-1 text-[11px] text-muted">Manejo libre de miedo</p>
          </div>

          {/* Tarjeta: próxima cita */}
          <div className="absolute top-1/2 -right-1 hidden items-center gap-3 rounded-2xl bg-forest p-3 pr-5 text-white shadow-lift sm:-right-6 sm:flex">
            <span className="grid size-10 place-items-center rounded-xl bg-white/10">
              <Clock3 className="size-5 text-honey" aria-hidden />
            </span>
            <div>
              <p className="text-xs text-white/70">Próxima cita disponible</p>
              <p className="text-sm font-semibold">Hoy · 4:30 p. m.</p>
            </div>
          </div>

          {/* Huellas decorativas */}
          <div className="pointer-events-none absolute -bottom-6 left-1/3 flex rotate-[-20deg] gap-4 text-brand/25" aria-hidden>
            <PawMark className="size-6" />
            <PawMark className="mt-5 size-6" />
            <PawMark className="size-6" />
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <dl
          ref={ref}
          className="grid grid-cols-2 gap-y-6 divide-forest/10 rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-forest/5 sm:p-8 lg:grid-cols-4 lg:divide-x"
        >
          {stats.map((s) => (
            <div key={s.label} className="lg:px-6 lg:first:pl-0">
              <Stat stat={s} start={inView} />
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

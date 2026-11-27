import { GraduationCap } from 'lucide-react'
import { team } from '../../data/content'
import { img } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

export function Team() {
  return (
    <section id="equipo" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nuestro equipo"
          title={
            <>
              Médicos con experiencia, <em className="text-brand">y con corazón</em>
            </>
          }
          description="Un equipo de especialistas que se forma cada año y que, sobre todo, disfruta lo que hace."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <article className="group h-full overflow-hidden rounded-[28px] bg-cream ring-1 ring-forest/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative overflow-hidden">
                  <img
                    src={img(m.photo, 600, 680)}
                    alt={`Retrato de ${m.name}, ${m.role}`}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={680}
                    className="aspect-[15/17] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" aria-hidden />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest backdrop-blur">
                    <GraduationCap className="size-3.5 text-brand" aria-hidden />
                    {m.years} años de experiencia
                  </span>
                  <div className="absolute inset-x-4 bottom-4 text-white">
                    <p className="text-xs font-medium tracking-wide text-honey uppercase">{m.role}</p>
                    <h3 className="font-display text-2xl font-medium">{m.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-brand-600">{m.specialty}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{m.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {m.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-forest ring-1 ring-forest/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

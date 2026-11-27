import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/content'
import { img } from '../../data/site'
import { useMediaQuery } from '../../hooks'
import { cn } from '../../lib/cn'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

export function Testimonials() {
  const isLg = useMediaQuery('(min-width: 1024px)')
  const isMd = useMediaQuery('(min-width: 768px)')
  const perView = isLg ? 3 : isMd ? 2 : 1
  const pages = testimonials.length - perView + 1

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    setIndex((i) => Math.min(i, pages - 1))
  }, [pages])

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + pages) % pages), [pages])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [paused, go])

  return (
    <section id="testimonios" className="relative overflow-hidden bg-mint/60 py-20 sm:py-28">
      <div className="paw-pattern pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Testimonios"
            title={
              <>
                Lo que dicen las familias <em className="text-brand">que nos visitan</em>
              </>
            }
          />
          <Reveal delay={100} className="flex items-center gap-4">
            <div className="rounded-2xl bg-white px-5 py-3 shadow-soft">
              <div className="flex items-center gap-1 text-honey" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-sm text-muted">
                <strong className="text-forest">4,9/5</strong> en Google · 1.248 reseñas
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Testimonio anterior"
                className="grid size-12 place-items-center rounded-full bg-white text-forest shadow-soft transition hover:bg-forest hover:text-white active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Testimonio siguiente"
                className="grid size-12 place-items-center rounded-full bg-forest text-white shadow-soft transition hover:bg-brand active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-12">
          <div
            className="-mx-3 overflow-hidden"
            role="region"
            aria-roledescription="carrusel"
            aria-label="Testimonios de clientes"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX
              setPaused(true)
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
              touchX.current = null
              setPaused(false)
            }}
          >
            <ul
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
              style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
            >
              {testimonials.map((t, i) => {
                const visible = i >= index && i < index + perView
                return (
                  <li
                    key={t.name}
                    className="shrink-0 px-3"
                    style={{ width: `${100 / perView}%` }}
                    aria-hidden={!visible}
                    aria-roledescription="diapositiva"
                    aria-label={`${i + 1} de ${testimonials.length}`}
                  >
                    <figure
                      className={cn(
                        'flex h-full flex-col rounded-[28px] bg-white p-7 shadow-soft transition-opacity duration-500',
                        visible ? 'opacity-100' : 'opacity-40',
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5 text-honey" aria-label="5 de 5 estrellas">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <Star key={k} className="size-4 fill-current" aria-hidden />
                          ))}
                          <span className="ml-2 text-xs text-muted">{t.date}</span>
                        </div>
                        <Quote className="size-8 text-mint-200" aria-hidden />
                      </div>
                      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink">“{t.text}”</blockquote>
                      <figcaption className="mt-6 flex items-center gap-3 border-t border-forest/5 pt-5">
                        <img
                          src={img(t.petPhoto, 120, 120)}
                          alt={`${t.pet}, la mascota de ${t.name}`}
                          loading="lazy"
                          width={48}
                          height={48}
                          className="size-12 rounded-2xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-forest">{t.name}</p>
                          <p className="truncate text-sm text-muted">
                            {t.pet} · {t.petType}
                          </p>
                        </div>
                                              </figcaption>
                    </figure>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-8 flex justify-center gap-2" role="group" aria-label="Seleccionar testimonio">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir al grupo ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  i === index ? 'w-8 bg-forest' : 'w-2.5 bg-forest/20 hover:bg-forest/40',
                )}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

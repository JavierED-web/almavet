import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { gallery, type GalleryCategory } from '../../data/content'
import { img } from '../../data/site'
import { useLockBodyScroll } from '../../hooks'
import { cn } from '../../lib/cn'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

const filters: Array<{ id: 'todos' | GalleryCategory; label: string }> = [
  { id: 'todos', label: 'Todos' },
  { id: 'perros', label: 'Perros' },
  { id: 'gatos', label: 'Gatos' },
  { id: 'equipo', label: 'Veterinarios' },
  { id: 'instalaciones', label: 'Instalaciones' },
]

export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('todos')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const items = useMemo(() => (filter === 'todos' ? gallery : gallery.filter((g) => g.category === filter)), [filter])

  useLockBodyScroll(lightbox !== null)

  const step = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightbox, step])

  const current = lightbox !== null ? items[lightbox] : null

  return (
    <section id="galeria" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Galería"
          title={
            <>
              Momentos que nos <em className="text-brand">llenan el alma</em>
            </>
          }
          description="Pacientes, equipo e instalaciones: un vistazo a nuestro día a día."
        />

        <Reveal delay={100} className="mt-10 flex justify-center">
          <div className="no-scrollbar -mx-4 flex max-w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4" role="group" aria-label="Filtrar galería">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  'shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
                  filter === f.id ? 'bg-forest text-white shadow-soft' : 'bg-cream text-forest hover:bg-mint',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <li
              key={`${filter}-${item.id}`}
              className={cn(
                'animate-pop-in',
                item.span === 'tall' && 'row-span-2',
                item.span === 'wide' && 'col-span-2',
              )}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block size-full overflow-hidden rounded-3xl bg-mint"
                aria-label={`Ampliar imagen: ${item.alt}`}
              >
                <img
                  src={img(item.id, item.span === 'wide' ? 900 : 600, item.span === 'tall' ? 900 : 500)}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-4 flex translate-y-3 items-end justify-between gap-3 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">{item.alt}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-forest">
                    <Expand className="size-4" aria-hidden />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current &&
        createPortal(
          <div
            className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-forest/95 p-4 backdrop-blur"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              autoFocus
              onClick={() => setLightbox(null)}
              aria-label="Cerrar galería"
              className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:rotate-90 hover:bg-white/20"
            >
              <X className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label="Imagen anterior"
              className="absolute left-3 z-10 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <figure className="animate-pop-in max-w-5xl" key={current.id} onClick={(e) => e.stopPropagation()}>
              <img
                src={img(current.id, 1600)}
                alt={current.alt}
                className="max-h-[78vh] w-auto rounded-3xl object-contain shadow-lift"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-white/80">
                <span>{current.alt}</span>
                <span className="tabular-nums">
                  {lightbox! + 1} / {items.length}
                </span>
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label="Imagen siguiente"
              className="absolute right-3 z-10 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>,
          document.body,
        )}
    </section>
  )
}

import { useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight, Sun, Sunset } from 'lucide-react'
import { cn } from '../../lib/cn'
import { slotsFor, upcomingDays } from './schedule'

interface DatePickerProps {
  value: string
  onChange: (iso: string) => void
  error?: string
}

export function DatePicker({ value, onChange, error }: DatePickerProps) {
  const days = useMemo(() => upcomingDays(21), [])
  const scroller = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const dir = e.key === 'ArrowRight' ? 1 : -1
    let i = index + dir
    while (days[i]?.closed) i += dir
    const next = days[i]
    if (!next) return
    onChange(next.iso)
    scroller.current?.querySelector<HTMLButtonElement>(`[data-iso="${next.iso}"]`)?.focus()
  }

  const selectedIndex = days.findIndex((d) => d.iso === value)
  const focusIndex = selectedIndex >= 0 ? selectedIndex : days.findIndex((d) => !d.closed)

  return (
    <div className="relative">
      <div
        ref={scroller}
        id="date"
        role="radiogroup"
        aria-labelledby="date-label"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'date-error' : 'date-hint'}
        className={cn(
          'no-scrollbar flex snap-x gap-2 overflow-x-auto rounded-2xl p-1 scroll-smooth',
          error && 'ring-1 ring-coral/70',
        )}
      >
        {days.map((d, i) => {
          const selected = d.iso === value
          return (
            <button
              key={d.iso}
              type="button"
              role="radio"
              data-iso={d.iso}
              aria-checked={selected}
              aria-label={`${d.weekday} ${d.day} de ${d.month}${d.closed ? ', solo urgencias' : ''}`}
              disabled={d.closed}
              tabIndex={i === focusIndex ? 0 : -1}
              onClick={() => onChange(d.iso)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'flex w-[68px] shrink-0 snap-start flex-col items-center rounded-2xl py-3 transition-all duration-200',
                selected
                  ? 'bg-forest text-white shadow-soft'
                  : d.closed
                    ? 'cursor-not-allowed bg-cream/60 text-muted/50'
                    : 'bg-cream text-forest ring-1 ring-forest/10 hover:-translate-y-0.5 hover:ring-brand',
              )}
            >
              <span className={cn('text-[11px] font-semibold uppercase', selected ? 'text-white/70' : 'text-muted')}>
                {i === 0 ? 'hoy' : d.weekday}
              </span>
              <span className="font-display text-2xl leading-tight font-medium">{d.day}</span>
              <span className={cn('text-[11px]', selected ? 'text-honey' : 'text-muted')}>{d.closed ? 'cerrado' : d.month}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-2 hidden justify-end gap-1 sm:flex">
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => scroll(-1)}
          className="grid size-8 place-items-center rounded-full text-forest transition hover:bg-mint"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => scroll(1)}
          className="grid size-8 place-items-center rounded-full text-forest transition hover:bg-mint"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

interface TimePickerProps {
  date: string
  value: string
  onChange: (time: string) => void
  error?: string
}

export function TimePicker({ date, value, onChange, error }: TimePickerProps) {
  const slots = useMemo(() => (date ? slotsFor(date) : []), [date])

  if (!date) {
    return (
      <div
        id="time"
        tabIndex={-1}
        className={cn(
          'rounded-2xl border border-dashed border-forest/15 bg-cream/60 px-4 py-6 text-center text-sm text-muted',
          error && 'border-coral/60',
        )}
      >
        Selecciona primero una fecha para ver los horarios disponibles.
      </div>
    )
  }

  const available = slots.filter((s) => s.available)
  if (!available.length) {
    return (
      <div id="time" tabIndex={-1} className="rounded-2xl bg-honey-100 px-4 py-6 text-center text-sm text-[#7a5410]">
        No quedan horarios disponibles este día. Prueba con otra fecha o llámanos.
      </div>
    )
  }

  const groups = (['mañana', 'tarde'] as const).map((p) => ({ period: p, slots: slots.filter((s) => s.period === p) }))

  return (
    <div
      id="time"
      tabIndex={-1}
      role="radiogroup"
      aria-labelledby="time-label"
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? 'time-error' : undefined}
      className="space-y-4 outline-none"
    >
      {groups.map(
        (g) =>
          g.slots.length > 0 && (
            <div key={g.period}>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
                {g.period === 'mañana' ? <Sun className="size-3.5" aria-hidden /> : <Sunset className="size-3.5" aria-hidden />}
                {g.period}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {g.slots.map((s) => {
                  const selected = s.time === value
                  return (
                    <button
                      key={s.time}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      disabled={!s.available}
                      onClick={() => onChange(s.time)}
                      className={cn(
                        'h-10 rounded-xl text-sm font-medium tabular-nums transition-all duration-200',
                        selected
                          ? 'bg-brand text-white shadow-soft'
                          : s.available
                            ? 'bg-cream text-forest ring-1 ring-forest/10 hover:ring-brand active:scale-95'
                            : 'cursor-not-allowed text-muted/40 line-through',
                      )}
                    >
                      {s.label.replace(' a. m.', '').replace(' p. m.', '')}
                      <span className="sr-only">{s.label.includes('a. m.') ? ' de la mañana' : ' de la tarde'}{!s.available && ', ocupado'}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ),
      )}
    </div>
  )
}

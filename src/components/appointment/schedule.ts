/** Lógica de agenda de demostración: días hábiles y franjas disponibles. */

export interface Day {
  iso: string
  date: Date
  weekday: string
  day: number
  month: string
  closed: boolean
}

const WEEKDAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function fromIso(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Próximos `count` días a partir de hoy. Los domingos solo atienden urgencias. */
export function upcomingDays(count = 21): Day[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return {
      iso: toIso(date),
      date,
      weekday: WEEKDAYS[date.getDay()],
      day: date.getDate(),
      month: MONTHS[date.getMonth()],
      closed: date.getDay() === 0,
    }
  })
}

/** Hash determinista para simular franjas ocupadas de forma estable. */
function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export interface Slot {
  time: string
  label: string
  available: boolean
  period: 'mañana' | 'tarde'
}

export function slotsFor(iso: string): Slot[] {
  const date = fromIso(iso)
  const isSaturday = date.getDay() === 6
  const startH = isSaturday ? 8 : 7
  const endH = isSaturday ? 16 : 20
  const now = new Date()
  const isToday = toIso(now) === iso

  const slots: Slot[] = []
  for (let h = startH; h < endH; h++) {
    for (const m of [0, 30]) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      // Se requiere al menos una hora de anticipación para citas del mismo día.
      const past = isToday && h * 60 + m < now.getHours() * 60 + now.getMinutes() + 60
      const busy = hash(iso + time) % 10 < 3
      slots.push({ time, label: formatTime(time), available: !past && !busy, period: h < 12 ? 'mañana' : 'tarde' })
    }
  }
  return slots
}

export function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number)
  const suffix = h < 12 ? 'a. m.' : 'p. m.'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function formatLongDate(iso: string) {
  return fromIso(iso).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

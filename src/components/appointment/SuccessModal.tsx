import { CalendarCheck2, Check, Clock3, MapPin, PawPrint, Stethoscope, UserRound } from 'lucide-react'
import { services } from '../../data/services'
import { site } from '../../data/site'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { formatLongDate, formatTime } from './schedule'
import type { AppointmentData } from './validation'

interface SuccessModalProps {
  data: (AppointmentData & { code: string }) | null
  petLabel: string
  onClose: () => void
}

export function SuccessModal({ data, petLabel, onClose }: SuccessModalProps) {
  if (!data) return null
  const service = services.find((s) => s.id === data.service)

  const rows = [
    { icon: UserRound, label: 'Propietario', value: data.ownerName },
    { icon: PawPrint, label: 'Mascota', value: `${data.petName} · ${petLabel}` },
    { icon: Stethoscope, label: 'Servicio', value: service?.name ?? data.service },
    { icon: CalendarCheck2, label: 'Fecha', value: formatLongDate(data.date) },
    { icon: Clock3, label: 'Hora', value: formatTime(data.time) },
    { icon: MapPin, label: 'Lugar', value: `${site.address}, Bogotá` },
  ]

  return (
    <Modal open onClose={onClose} labelledBy="success-title" className="sm:max-w-md">
      <div className="relative overflow-hidden bg-mint px-7 pt-10 pb-8 text-center">
        <div className="relative mx-auto grid size-20 place-items-center">
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-brand/30" aria-hidden />
          <span className="animate-pop-in relative grid size-20 place-items-center rounded-full bg-brand text-white shadow-lift">
            <Check className="size-10" strokeWidth={3} aria-hidden />
          </span>
        </div>
        <h3 id="success-title" className="mt-6 font-display text-3xl font-medium text-forest">
          ¡Cita agendada!
        </h3>
        <p className="mt-2 text-sm text-muted">
          Te esperamos con {data.petName}. Enviamos el resumen a <strong className="text-forest">{data.email}</strong>.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm text-muted">
          Código de reserva <strong className="font-mono tracking-wider text-forest">{data.code}</strong>
        </p>
      </div>

      <div className="px-7 py-6">
        <dl className="divide-y divide-forest/5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start gap-3 py-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cream text-brand">
                <r.icon className="size-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <dt className="text-xs text-muted">{r.label}</dt>
                <dd className="font-medium break-words text-forest first-letter:uppercase">{r.value}</dd>
              </div>
            </div>
          ))}
        </dl>
        {data.notes.trim() && (
          <p className="mt-2 rounded-2xl bg-cream p-4 text-sm text-muted">
            <span className="font-semibold text-forest">Observaciones: </span>
            {data.notes}
          </p>
        )}
        <p className="mt-4 text-center text-xs text-muted">
          Llega 10 minutos antes y trae el carné de vacunas. Para reprogramar, escríbenos por WhatsApp.
        </p>
        <Button className="mt-5 w-full" onClick={onClose}>
          Listo, ¡gracias!
        </Button>
      </div>
    </Modal>
  )
}

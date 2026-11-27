import { useEffect, useRef, useState } from 'react'
import { Bird, Cat, ChevronDown, Dog, Loader2, MessageCircle, PawPrint, Phone, Rabbit, ShieldCheck, Send, Info } from 'lucide-react'
import { services } from '../../data/services'
import { img, site } from '../../data/site'
import { cn } from '../../lib/cn'
import { useBooking } from '../../lib/booking'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Field, describe, inputClass } from '../appointment/Field'
import { DatePicker, TimePicker } from '../appointment/DateTimePicker'
import { SuccessModal } from '../appointment/SuccessModal'
import {
  NOTES_MAX,
  emptyAppointment,
  formatPhoneInput,
  validateAll,
  validateField,
  type AppointmentData,
  type Errors,
} from '../appointment/validation'

const petTypes = [
  { id: 'perro', label: 'Perro', icon: Dog },
  { id: 'gato', label: 'Gato', icon: Cat },
  { id: 'conejo', label: 'Conejo', icon: Rabbit },
  { id: 'ave', label: 'Ave', icon: Bird },
  { id: 'otro', label: 'Otro', icon: PawPrint },
]

const FIELD_ORDER: Array<keyof AppointmentData> = [
  'ownerName',
  'phone',
  'email',
  'petName',
  'petType',
  'service',
  'date',
  'time',
  'notes',
]

const steps = [
  { n: '01', title: 'Cuéntanos de tu mascota', text: 'Nombre, especie y lo que necesita.' },
  { n: '02', title: 'Elige día y hora', text: 'Horarios reales con disponibilidad al instante.' },
  { n: '03', title: 'Recibe la confirmación', text: 'Resumen por correo y recordatorio por WhatsApp.' },
]

const makeCode = () => `AV-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

export function Appointment() {
  const { preset } = useBooking()
  const [data, setData] = useState<AppointmentData>(emptyAppointment)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof AppointmentData, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<(AppointmentData & { code: string }) | null>(null)
  const [summary, setSummary] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  // Preselección desde las tarjetas de servicio.
  useEffect(() => {
    if (!preset) return
    setData((d) => ({ ...d, service: preset.serviceId }))
    setErrors((e) => ({ ...e, service: undefined }))
  }, [preset])

  const update = <K extends keyof AppointmentData>(field: K, value: AppointmentData[K]) => {
    const next = { ...data, [field]: value }
    if (field === 'date') next.time = ''
    setData(next)
    // Revalida en vivo solo los campos que ya se tocaron o tienen error.
    setErrors((prevErr) => {
      const e = { ...prevErr }
      if (touched[field] || prevErr[field]) e[field] = validateField(field, next)
      if (field === 'date' && prevErr.time) e.time = validateField('time', next)
      return e
    })
    if (summary) setSummary('')
  }

  const blur = (field: keyof AppointmentData) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((e) => ({ ...e, [field]: validateField(field, data) }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const all = validateAll(data)
    setErrors(all)
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])))
    const firstInvalid = FIELD_ORDER.find((f) => all[f])
    if (firstInvalid) {
      const count = Object.keys(all).length
      setSummary(`Revisa ${count === 1 ? '1 campo' : `${count} campos`} antes de continuar.`)
      const el =
        formRef.current?.querySelector<HTMLElement>(`#${firstInvalid} [aria-checked="true"], #${firstInvalid} [tabindex="0"]`) ??
        document.getElementById(firstInvalid)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el?.focus({ preventScroll: true })
      return
    }
    setSummary('')
    setSubmitting(true)
    // Simulación de envío: no se envía nada a ningún servidor.
    await new Promise((r) => setTimeout(r, 1300))
    setSubmitting(false)
    setSubmitted({ ...data, code: makeCode() })
  }

  const closeSuccess = () => {
    setSubmitted(null)
    setData(emptyAppointment)
    setErrors({})
    setTouched({})
  }

  const err = (f: keyof AppointmentData) => (touched[f] || errors[f] ? errors[f] : undefined)
  const petLabel = petTypes.find((p) => p.id === submitted?.petType)?.label ?? ''

  return (
    <section id="agendar" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className="pointer-events-none absolute top-1/3 -left-40 size-[500px] rounded-full bg-mint blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8">
        {/* Panel informativo */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Agenda tu cita"
            title={
              <>
                Reserva en menos de <em className="text-brand">dos minutos</em>
              </>
            }
            description="Elige el servicio, el día y la hora que mejor te funcionen. Te confirmamos al instante."
          />

          <Reveal delay={100}>
            <ol className="mt-8 space-y-4">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white font-display text-lg font-medium text-brand shadow-soft">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-semibold text-forest">{s.title}</p>
                    <p className="text-sm text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={200} className="mt-8 hidden overflow-hidden rounded-[28px] bg-forest text-white lg:block">
            <div className="flex items-center gap-4 p-5">
              <img
                src={img('1530281700549-e82e7bf110d6', 160, 160)}
                alt=""
                loading="lazy"
                className="size-16 rounded-2xl object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold">¿Prefieres hablar con alguien?</p>
                <p className="mt-0.5 text-white/70">Lun–Sáb · respuesta en minutos</p>
              </div>
            </div>
            <div className="grid grid-cols-2 border-t border-white/10 text-sm font-semibold">
              <a href={site.phoneHref} className="flex items-center justify-center gap-2 py-3.5 transition hover:bg-white/5">
                <Phone className="size-4 text-honey" aria-hidden /> Llamar
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-l border-white/10 py-3.5 transition hover:bg-white/5"
              >
                <MessageCircle className="size-4 text-honey" aria-hidden /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        {/* Formulario */}
        <Reveal delay={100} className="min-w-0">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            aria-labelledby="form-title"
            className="rounded-[32px] bg-white p-5 shadow-lift ring-1 ring-forest/5 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 id="form-title" className="font-display text-2xl font-medium text-forest">
                Datos de la cita
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-brand-600">
                <ShieldCheck className="size-3.5" aria-hidden /> Demo · no se envían datos
              </span>
            </div>

            <div aria-live="assertive" className="empty:hidden">
              {summary && (
                <p className="animate-fade-in mt-5 flex items-center gap-2 rounded-2xl bg-coral/10 px-4 py-3 text-sm font-medium text-coral">
                  <Info className="size-4 shrink-0" aria-hidden /> {summary}
                </p>
              )}
            </div>

            <fieldset className="min-w-0 mt-6">
              <legend className="mb-4 text-xs font-semibold tracking-[0.14em] text-muted uppercase">Tus datos</legend>
              <div className="grid gap-x-4 sm:grid-cols-2">
                <Field id="ownerName" label="Nombre del propietario" error={err('ownerName')} className="sm:col-span-2">
                  <input
                    id="ownerName"
                    name="ownerName"
                    autoComplete="name"
                    placeholder="Ej. María Fernanda López"
                    value={data.ownerName}
                    onChange={(e) => update('ownerName', e.target.value)}
                    onBlur={blur('ownerName')}
                    className={inputClass(err('ownerName'))}
                    {...describe('ownerName', err('ownerName'))}
                  />
                </Field>
                <Field id="phone" label="Teléfono" error={err('phone')} hint="Te confirmaremos por WhatsApp.">
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[15px] text-muted">+57</span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="300 123 4567"
                      value={data.phone}
                      onChange={(e) => update('phone', formatPhoneInput(e.target.value))}
                      onBlur={blur('phone')}
                      className={cn(inputClass(err('phone')), 'pl-13')}
                      {...describe('phone', err('phone'), true)}
                    />
                  </div>
                </Field>
                <Field id="email" label="Correo electrónico" error={err('email')}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={data.email}
                    onChange={(e) => update('email', e.target.value)}
                    onBlur={blur('email')}
                    className={inputClass(err('email'))}
                    {...describe('email', err('email'))}
                  />
                </Field>
              </div>
            </fieldset>

            <fieldset className="min-w-0 mt-4 border-t border-forest/5 pt-6">
              <legend className="sr-only">Tu mascota</legend>
              <p aria-hidden className="mb-4 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                Tu mascota
              </p>
              <div className="grid gap-x-4 sm:grid-cols-2">
                <Field id="petName" label="Nombre de la mascota" error={err('petName')}>
                  <input
                    id="petName"
                    name="petName"
                    placeholder="Ej. Luna"
                    value={data.petName}
                    onChange={(e) => update('petName', e.target.value)}
                    onBlur={blur('petName')}
                    className={inputClass(err('petName'))}
                    {...describe('petName', err('petName'))}
                  />
                </Field>
                <Field id="service" label="Servicio requerido" error={err('service')}>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={data.service}
                      onChange={(e) => update('service', e.target.value)}
                      onBlur={blur('service')}
                      className={cn(inputClass(err('service')), 'appearance-none pr-10', !data.service && 'text-muted/70')}
                      {...describe('service', err('service'))}
                    >
                      <option value="" disabled>
                        Selecciona un servicio
                      </option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id} className="text-ink">
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
                  </div>
                </Field>
                <Field id="petType" label="Tipo de mascota" error={err('petType')} asGroup className="sm:col-span-2">
                  <div
                    id="petType"
                    role="radiogroup"
                    aria-labelledby="petType-label"
                    aria-invalid={err('petType') ? true : undefined}
                    aria-describedby={err('petType') ? 'petType-error' : undefined}
                    className="grid grid-cols-5 gap-2"
                  >
                    {petTypes.map((p, i) => {
                      const selected = data.petType === p.id
                      const focusable = data.petType ? selected : i === 0
                      return (
                        <button
                          key={p.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          tabIndex={focusable ? 0 : -1}
                          onClick={() => {
                            update('petType', p.id)
                            setTouched((t) => ({ ...t, petType: true }))
                          }}
                          onKeyDown={(e) => {
                            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
                            e.preventDefault()
                            const next = petTypes[(i + (e.key === 'ArrowRight' ? 1 : -1) + petTypes.length) % petTypes.length]
                            update('petType', next.id)
                            ;(e.currentTarget.parentElement?.querySelector(`[data-pet="${next.id}"]`) as HTMLElement | null)?.focus()
                          }}
                          data-pet={p.id}
                          className={cn(
                            'flex flex-col items-center gap-1.5 rounded-2xl py-3 text-xs font-semibold transition-all duration-200 sm:text-sm',
                            selected
                              ? 'bg-forest text-white shadow-soft'
                              : cn(
                                  'bg-cream text-forest ring-1 hover:-translate-y-0.5 hover:ring-brand',
                                  err('petType') ? 'ring-coral/60' : 'ring-forest/10',
                                ),
                          )}
                        >
                          <p.icon className={cn('size-6 transition-transform', selected && 'scale-110 text-honey')} aria-hidden />
                          {p.label}
                        </button>
                      )
                    })}
                  </div>
                </Field>
              </div>
            </fieldset>

            <fieldset className="min-w-0 mt-4 border-t border-forest/5 pt-6">
              <legend className="sr-only">Fecha y hora</legend>
              <p aria-hidden className="mb-4 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                Fecha y hora
              </p>
              <Field
                id="date"
                label="Fecha"
                asGroup
                error={err('date')}
                hint="Domingos y festivos atendemos solo urgencias."
              >
                <DatePicker
                  value={data.date}
                  error={err('date')}
                  onChange={(iso) => {
                    update('date', iso)
                    setTouched((t) => ({ ...t, date: true }))
                  }}
                />
              </Field>
              <Field id="time" label="Hora" asGroup error={err('time')}>
                <TimePicker
                  date={data.date}
                  value={data.time}
                  error={err('time')}
                  onChange={(t) => {
                    update('time', t)
                    setTouched((p) => ({ ...p, time: true }))
                  }}
                />
              </Field>
            </fieldset>

            <div className="mt-2 border-t border-forest/5 pt-6">
              <Field
                id="notes"
                label="Observaciones"
                optional
                error={err('notes')}
                hint={`${data.notes.length}/${NOTES_MAX} · Síntomas, medicamentos actuales o algo que debamos saber.`}
              >
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  maxLength={NOTES_MAX + 50}
                  placeholder="Ej. Lleva dos días sin apetito y está un poco decaída."
                  value={data.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  onBlur={blur('notes')}
                  className={cn(inputClass(err('notes')), 'h-auto resize-y py-3 leading-relaxed')}
                  {...describe('notes', err('notes'), true)}
                />
              </Field>
            </div>

            <Button type="submit" disabled={submitting} className="mt-4 h-14 w-full text-base">
              {submitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden /> Confirmando disponibilidad…
                </>
              ) : (
                <>
                  Confirmar cita <Send className="size-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-muted">
              Al confirmar aceptas nuestra política de tratamiento de datos personales (Ley 1581 de 2012).
            </p>
          </form>
        </Reveal>
      </div>

      <SuccessModal data={submitted} petLabel={petLabel} onClose={closeSuccess} />
    </section>
  )
}

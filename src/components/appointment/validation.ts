export interface AppointmentData {
  ownerName: string
  phone: string
  email: string
  petName: string
  petType: string
  service: string
  date: string
  time: string
  notes: string
}

export type Errors = Partial<Record<keyof AppointmentData, string>>

export const emptyAppointment: AppointmentData = {
  ownerName: '',
  phone: '',
  email: '',
  petName: '',
  petType: '',
  service: '',
  date: '',
  time: '',
  notes: '',
}

export const NOTES_MAX = 400

const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]+$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Celular colombiano (3xx xxx xxxx) o fijo nacional (60x xxx xxxx), con o sin +57. */
export function normalizePhone(value: string) {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('57') && digits.length === 12) digits = digits.slice(2)
  return digits
}

export function validateField(field: keyof AppointmentData, data: AppointmentData): string | undefined {
  const v = data[field].trim()
  switch (field) {
    case 'ownerName':
      if (!v) return 'Escribe tu nombre completo.'
      if (v.length < 3) return 'El nombre debe tener al menos 3 caracteres.'
      if (!NAME_RE.test(v)) return 'Usa solo letras y espacios.'
      return
    case 'phone': {
      if (!v) return 'Necesitamos un teléfono para confirmar la cita.'
      const d = normalizePhone(v)
      if (!/^(3\d{9}|60\d{8})$/.test(d)) return 'Ingresa un número válido de 10 dígitos, p. ej. 300 123 4567.'
      return
    }
    case 'email':
      if (!v) return 'Escribe tu correo electrónico.'
      if (!EMAIL_RE.test(v)) return 'Revisa el formato del correo, p. ej. nombre@correo.com.'
      return
    case 'petName':
      if (!v) return '¿Cómo se llama tu mascota?'
      if (v.length > 30) return 'Máximo 30 caracteres.'
      return
    case 'petType':
      if (!v) return 'Selecciona el tipo de mascota.'
      return
    case 'service':
      if (!v) return 'Selecciona el servicio que necesitas.'
      return
    case 'date':
      if (!v) return 'Elige una fecha para la cita.'
      return
    case 'time':
      if (!data.date) return 'Primero elige una fecha.'
      if (!v) return 'Elige un horario disponible.'
      return
    case 'notes':
      if (v.length > NOTES_MAX) return `Máximo ${NOTES_MAX} caracteres.`
      return
  }
}

export function validateAll(data: AppointmentData): Errors {
  const errors: Errors = {}
  ;(Object.keys(data) as Array<keyof AppointmentData>).forEach((k) => {
    const e = validateField(k, data)
    if (e) errors[k] = e
  })
  return errors
}

/** Formatea el teléfono mientras se escribe: 300 123 4567 */
export function formatPhoneInput(value: string) {
  let d = value.replace(/\D/g, '')
  if (d.length > 10 && d.startsWith('57')) d = d.slice(2)
  d = d.slice(0, 10)
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6, 10)].filter(Boolean).join(' ')
}

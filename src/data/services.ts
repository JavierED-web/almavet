import {
  Stethoscope,
  Syringe,
  Scissors,
  Smile,
  FlaskConical,
  Bath,
  Siren,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

export interface Service {
  id: string
  name: string
  short: string
  description: string
  includes: string[]
  duration: string
  priceFrom: string
  badge?: string
  icon: LucideIcon
  accent: 'mint' | 'honey' | 'coral'
}

export const services: Service[] = [
  {
    id: 'consulta',
    name: 'Consulta general',
    short: 'Valoración completa de pies a cola, con tiempo para resolver todas tus dudas.',
    description:
      'Una consulta sin afanes: revisamos historia clínica, peso, piel, ojos, oídos, corazón y abdomen. Te explicamos lo que encontramos y acordamos juntos el plan a seguir.',
    includes: ['Examen físico completo', 'Historia clínica digital', 'Plan de tratamiento por escrito'],
    duration: '30–40 min',
    priceFrom: '$85.000',
    badge: 'Más solicitado',
    icon: Stethoscope,
    accent: 'mint',
  },
  {
    id: 'vacunacion',
    name: 'Vacunación',
    short: 'Esquemas para cachorros, gatitos y adultos, con carné digital actualizado.',
    description:
      'Aplicamos vacunas certificadas y mantenemos la cadena de frío. Te enviamos recordatorios por WhatsApp para que nunca se pase un refuerzo.',
    includes: ['Revisión previa a la vacuna', 'Carné de vacunación digital', 'Recordatorios automáticos'],
    duration: '20 min',
    priceFrom: '$65.000',
    icon: Syringe,
    accent: 'honey',
  },
  {
    id: 'cirugia',
    name: 'Cirugía',
    short: 'Quirófano equipado, anestesia inhalada y monitoreo continuo.',
    description:
      'Desde esterilizaciones hasta cirugías de tejidos blandos y ortopedia. Cada procedimiento incluye exámenes prequirúrgicos y seguimiento postoperatorio.',
    includes: ['Exámenes prequirúrgicos', 'Monitoreo anestésico multiparámetro', 'Control postoperatorio'],
    duration: 'Según procedimiento',
    priceFrom: 'Cotización personalizada',
    icon: Scissors,
    accent: 'mint',
  },
  {
    id: 'odontologia',
    name: 'Odontología veterinaria',
    short: 'Limpiezas con ultrasonido, extracciones y salud oral preventiva.',
    description:
      'El 80% de los perros y gatos mayores de 3 años tiene algún grado de enfermedad periodontal. Hacemos profilaxis y tratamientos con equipos odontológicos especializados.',
    includes: ['Profilaxis con ultrasonido', 'Radiografía dental', 'Guía de cuidado en casa'],
    duration: '1–2 h',
    priceFrom: '$320.000',
    icon: Smile,
    accent: 'honey',
  },
  {
    id: 'laboratorio',
    name: 'Laboratorio clínico',
    short: 'Hemogramas, química sanguínea y pruebas rápidas con resultados el mismo día.',
    description:
      'Contamos con laboratorio propio para obtener resultados en minutos u horas, no días. Los recibes en tu correo con la interpretación del médico.',
    includes: ['Hemograma y química', 'Pruebas rápidas (parvovirus, leucemia felina)', 'Resultados en tu correo'],
    duration: 'Desde 30 min',
    priceFrom: '$70.000',
    badge: 'Resultados en el día',
    icon: FlaskConical,
    accent: 'mint',
  },
  {
    id: 'grooming',
    name: 'Grooming y estética',
    short: 'Baño, corte y spa con productos hipoalergénicos y mucha paciencia.',
    description:
      'Nuestros groomers están entrenados en manejo libre de miedo: sin sedantes, con pausas y premios. Ideal para mascotas sensibles o nerviosas.',
    includes: ['Baño con productos hipoalergénicos', 'Corte de raza o higiénico', 'Limpieza de oídos y uñas'],
    duration: '1–3 h',
    priceFrom: '$55.000',
    icon: Bath,
    accent: 'honey',
  },
  {
    id: 'urgencias',
    name: 'Atención de urgencias',
    short: 'Médicos de turno 24/7, todos los días del año, sin cita previa.',
    description:
      'Si tu mascota está en riesgo, ven directamente o llámanos en camino para preparar su llegada. Hospitalización y cuidados intensivos disponibles.',
    includes: ['Triage inmediato al llegar', 'Hospitalización 24 h', 'Comunicación constante contigo'],
    duration: '24/7',
    priceFrom: '$120.000',
    badge: '24/7',
    icon: Siren,
    accent: 'coral',
  },
  {
    id: 'preventiva',
    name: 'Medicina preventiva',
    short: 'Planes anuales de chequeo, desparasitación y nutrición por etapa de vida.',
    description:
      'Prevenir es más amable y económico que curar. Diseñamos un plan según edad, raza y estilo de vida, con controles periódicos incluidos.',
    includes: ['Chequeos semestrales', 'Desparasitación interna y externa', 'Asesoría nutricional'],
    duration: 'Plan anual',
    priceFrom: '$45.000/mes',
    icon: ShieldCheck,
    accent: 'mint',
  },
]

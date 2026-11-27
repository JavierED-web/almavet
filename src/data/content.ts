export interface TeamMember {
  name: string
  role: string
  specialty: string
  bio: string
  years: number
  photo: string
  tags: string[]
}

export const team: TeamMember[] = [
  {
    name: 'Dra. Laura Méndez',
    role: 'Directora médica',
    specialty: 'Medicina interna',
    bio: 'Fundó AlmaVet con la idea de una clínica donde los dueños entiendan cada decisión. Le encanta resolver casos difíciles.',
    years: 14,
    photo: '1559839734-2b71ea197ec2',
    tags: ['U. Nacional', 'Medicina felina'],
  },
  {
    name: 'Dr. Andrés Rojas',
    role: 'Cirujano veterinario',
    specialty: 'Cirugía y ortopedia',
    bio: 'Especialista en cirugía de tejidos blandos y ortopedia. Explica cada procedimiento con dibujos, literalmente.',
    years: 11,
    photo: '1612349317150-e413f6a5b16d',
    tags: ['Ortopedia', 'Anestesia'],
  },
  {
    name: 'Dra. Camila Torres',
    role: 'Médica veterinaria',
    specialty: 'Odontología y dermatología',
    bio: 'Combina la odontología con la dermatología. Tiene un gato llamado Bruno que visita la clínica los viernes.',
    years: 8,
    photo: '1594824476967-48c8b964273f',
    tags: ['Odontología', 'Dermatología'],
  },
  {
    name: 'Dr. Felipe Gómez',
    role: 'Jefe de urgencias',
    specialty: 'Urgencias y cuidados intensivos',
    bio: 'Lidera el equipo nocturno. Tranquilo bajo presión y muy claro al momento de comunicar diagnósticos.',
    years: 9,
    photo: '1622253692010-333f2da6031d',
    tags: ['UCI', 'Trauma'],
  },
]

export interface Testimonial {
  name: string
  location: string
  pet: string
  petType: string
  petPhoto: string
  text: string
  date: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Mariana Restrepo',
    location: 'Chapinero',
    pet: 'Lola',
    petType: 'Beagle, 6 años',
    petPhoto: '1543466835-00a7907e9de1',
    text: 'Lola llegó con una otitis que no mejoraba con nada. La Dra. Laura se tomó el tiempo de explicarme por qué volvía y en dos semanas estaba como nueva. Me escribieron para preguntar cómo seguía, eso no me había pasado en otra clínica.',
    date: 'Octubre 2026',
  },
  {
    name: 'Julián Castaño',
    location: 'Usaquén',
    pet: 'Milo',
    petType: 'Gato criollo, 3 años',
    petPhoto: '1518791841217-8f162f1e1131',
    text: 'Milo odia salir de casa y aun así la consulta fue tranquila. Nos dejaron en una sala solo para gatos y no hubo que forzarlo. Los precios los dijeron antes de hacer cualquier examen.',
    date: 'Septiembre 2026',
  },
  {
    name: 'Ana María Duarte',
    location: 'Teusaquillo',
    pet: 'Tobías',
    petType: 'Golden retriever, 9 años',
    petPhoto: '1633722715463-d30f4f325e24',
    text: 'Llegamos un domingo a las 2 a. m. por una torsión gástrica. El Dr. Felipe nos atendió de inmediato y nos fue mandando fotos durante la hospitalización. Tobías ya está en casa persiguiendo palomas.',
    date: 'Agosto 2026',
  },
  {
    name: 'Santiago Pérez',
    location: 'Chicó',
    pet: 'Kira',
    petType: 'Corgi, 2 años',
    petPhoto: '1537151625747-768eb6cf92b2',
    text: 'Hicimos la esterilización de Kira con el Dr. Andrés. Todo muy organizado: exámenes previos, instrucciones claras y un control a los diez días. Se recuperó súper rápido.',
    date: 'Julio 2026',
  },
  {
    name: 'Valentina Ríos',
    location: 'La Soledad',
    pet: 'Nala',
    petType: 'Gata siamesa, 5 años',
    petPhoto: '1592194996308-7b43878e84a6',
    text: 'La limpieza dental de Nala salió muy bien. Me enviaron las radiografías y me enseñaron a cepillarle los dientes sin que me arañe. Volvería sin pensarlo.',
    date: 'Junio 2026',
  },
]

export type GalleryCategory = 'perros' | 'gatos' | 'equipo' | 'instalaciones'

export interface GalleryItem {
  id: string
  alt: string
  category: GalleryCategory
  span?: 'tall' | 'wide'
}

export const gallery: GalleryItem[] = [
  { id: '1625321171045-1fea4ac688e9', alt: 'Groomer secando a un perro después del baño', category: 'equipo', span: 'tall' },
  { id: '1587300003388-59208cc962cb', alt: 'Border collie feliz en la playa', category: 'perros' },
  { id: '1574158622682-e40e69881006', alt: 'Gato atigrado mirando al cielo', category: 'gatos' },
  { id: '1629909613654-28e377c37b09', alt: 'Sala de procedimientos de la clínica', category: 'instalaciones', span: 'wide' },
  { id: '1628009368231-7bb7cfcb0def', alt: 'Veterinaria revisando a un gato en consulta', category: 'equipo' },
  { id: '1583511655857-d19b40a7a54e', alt: 'Bulldog francés con sudadera', category: 'perros', span: 'tall' },
  { id: '1527613426441-4da17471b66d', alt: 'Bióloga trabajando en el laboratorio clínico', category: 'instalaciones' },
  { id: '1513360371669-4adf3dd7dff8', alt: 'Gato recibiendo caricias', category: 'gatos' },
  { id: '1560807707-8cc77767d783', alt: 'Cachorro cavalier king charles', category: 'perros' },
  { id: '1666214280391-8ff5bd3c0bf0', alt: 'Médicos revisando imágenes diagnósticas', category: 'instalaciones' },
  { id: '1592194996308-7b43878e84a6', alt: 'Gato estirándose sobre fondo turquesa', category: 'gatos' },
  { id: '1581888227599-779811939961', alt: 'Perro descansando en la zona de recuperación', category: 'instalaciones', span: 'wide' },
]

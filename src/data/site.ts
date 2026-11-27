export const site = {
  name: 'AlmaVet',
  tagline: 'Clínica Veterinaria',
  phone: '+57 601 555 0123',
  phoneHref: 'tel:+576015550123',
  emergencyPhone: '+57 310 555 0911',
  emergencyHref: 'tel:+573105550911',
  whatsapp: '+57 300 555 0147',
  whatsappHref:
    'https://wa.me/573005550147?text=' +
    encodeURIComponent('¡Hola AlmaVet! Quisiera información para agendar una cita para mi mascota.'),
  email: 'hola@almavet.co',
  address: 'Calle 70 # 11-45, Chapinero',
  city: 'Bogotá, Colombia',
  mapsHref: 'https://www.google.com/maps/dir/?api=1&destination=4.6553,-74.0587',
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=-74.0667%2C4.6493%2C-74.0507%2C4.6613&layer=mapnik&marker=4.6553%2C-74.0587',
  hours: [
    { days: 'Lunes a viernes', time: '7:00 a. m. – 8:00 p. m.' },
    { days: 'Sábados', time: '8:00 a. m. – 4:00 p. m.' },
    { days: 'Domingos y festivos', time: 'Solo urgencias' },
  ],
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
  },
} as const

export const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'equipo', label: 'Nuestro equipo' },
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'contacto', label: 'Contacto' },
] as const

/** Construye una URL optimizada de Unsplash. */
export const img = (id: string, w = 800, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`

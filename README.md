# AlmaVet · Clínica Veterinaria (demo de portafolio)

Sitio web de demostración para una clínica veterinaria ficticia en Bogotá, construido con **React 18 + TypeScript + Tailwind CSS v4 + Lucide Icons** sobre Vite.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # compila y verifica tipos
npm run preview  # sirve la versión de producción
```

## Funcionalidades

- Navbar sticky con scroll-spy, menú móvil animado y franja de urgencias 24/7.
- Hero con composición de imágenes, tarjetas flotantes y estadísticas animadas.
- 8 servicios con modal de detalle y botón que preselecciona el servicio en el formulario.
- Sobre nosotros con pestañas (historia / misión / visión) y valores.
- Sección "Tu mascota está en buenas manos" con indicador de urgencias.
- Equipo veterinario, carrusel de testimonios (autoplay, flechas, puntos, swipe).
- Galería con filtros y lightbox (teclado: ← → Esc).
- **Agendamiento de citas** 100 % frontend: validación en vivo, selector de fecha (próximos 21 días, domingos cerrados), horarios con disponibilidad simulada, foco en el primer error y modal de confirmación con resumen y código de reserva. No se envía nada a servidores.
- Contacto con mapa OpenStreetMap, estado "abierto ahora", copiar dirección, cómo llegar.
- Botón flotante de WhatsApp, botón volver arriba, animaciones al hacer scroll (respeta `prefers-reduced-motion`).
- SEO básico: meta tags, Open Graph y datos estructurados `VeterinaryCare`.

## Estructura

```
src/
  data/            contenido (servicios, equipo, testimonios, galería, datos de contacto)
  hooks/           useScrolled, useActiveSection, useInView, useCountUp…
  lib/             utilidades y contexto de reservas
  components/
    ui/            Button, Modal, Reveal, SectionHeading, Logo
    layout/        Navbar, Footer, FloatingActions
    sections/      Hero, Services, About, GoodHands, Team, Testimonials, Gallery, Appointment, Contact
    appointment/   validación, agenda, selectores de fecha/hora, modal de éxito
```

Fotografías de [Unsplash](https://unsplash.com). Marca, personas y datos son ficticios.

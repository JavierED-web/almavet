import { BookingProvider } from './lib/booking'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { FloatingActions } from './components/layout/FloatingActions'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { About } from './components/sections/About'
import { GoodHands } from './components/sections/GoodHands'
import { Team } from './components/sections/Team'
import { Testimonials } from './components/sections/Testimonials'
import { Gallery } from './components/sections/Gallery'
import { Appointment } from './components/sections/Appointment'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <BookingProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-white"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <GoodHands />
        <Team />
        <Testimonials />
        <Gallery />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </BookingProvider>
  )
}

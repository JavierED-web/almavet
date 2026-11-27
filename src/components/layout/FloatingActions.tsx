import { ArrowUp } from 'lucide-react'
import { site } from '../../data/site'
import { useScrolled } from '../../hooks'
import { cn, scrollToId } from '../../lib/cn'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.44-9.44 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.47A11.3 11.3 0 0 0 12.05.7C5.8.7.71 5.78.71 12.04c0 2 .52 3.95 1.52 5.67L.62 23.6l6.03-1.58a11.3 11.3 0 0 0 5.4 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02z" />
    </svg>
  )
}

export { WhatsAppIcon }

export function FloatingActions() {
  const showTop = useScrolled(700)

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={() => scrollToId('inicio')}
        aria-label="Volver arriba"
        tabIndex={showTop ? 0 : -1}
        className={cn(
          'grid size-12 place-items-center rounded-full bg-white text-forest shadow-lift ring-1 ring-forest/10 transition-all duration-300 hover:-translate-y-1 hover:bg-mint',
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
      >
        <ArrowUp className="size-5" />
      </button>

      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="group flex h-14 items-center gap-0 rounded-full bg-[#25D366] pr-0 pl-0 text-white shadow-[0_12px_32px_-8px_rgb(37_211_102/0.6)] transition-all duration-300 hover:-translate-y-1 hover:gap-2 hover:pr-5"
      >
        <span className="relative grid size-14 place-items-center">
          <span className="animate-pulse-ring absolute inset-2 rounded-full bg-[#25D366]" aria-hidden />
          <WhatsAppIcon className="relative size-7" />
        </span>
        <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-40">
          ¿Hablamos?
        </span>
      </a>
    </div>
  )
}

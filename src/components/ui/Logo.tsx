import { cn } from '../../lib/cn'

export function PawMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="currentColor">
      <ellipse cx="20" cy="26" rx="5" ry="6.5" />
      <ellipse cx="44" cy="26" rx="5" ry="6.5" />
      <ellipse cx="27.5" cy="16.5" rx="4.5" ry="6" />
      <ellipse cx="36.5" cy="16.5" rx="4.5" ry="6" />
      <path d="M32 30c-7 0-14 9-14 15 0 4 3 6 7 6 3 0 4.5-1.5 7-1.5s4 1.5 7 1.5c4 0 7-2 7-6 0-6-7-15-14-15z" />
    </svg>
  )
}

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'grid size-10 place-items-center rounded-[14px] transition-transform duration-500 group-hover:rotate-[-8deg]',
          light ? 'bg-mint text-forest' : 'bg-forest text-mint',
        )}
      >
        <PawMark className="size-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-[22px] font-semibold tracking-tight', light ? 'text-white' : 'text-forest')}>
          Alma<span className={light ? 'text-honey' : 'text-brand'}>Vet</span>
        </span>
        <span className={cn('mt-1 text-[10px] font-semibold uppercase tracking-[0.18em]', light ? 'text-white/60' : 'text-muted')}>
          Clínica veterinaria
        </span>
      </span>
    </span>
  )
}

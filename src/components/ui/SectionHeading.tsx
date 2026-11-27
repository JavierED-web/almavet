import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { PawMark } from './Logo'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', light, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      <p
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]',
          light ? 'bg-white/10 text-mint' : 'bg-mint text-brand-600',
        )}
      >
        <PawMark className="size-3.5" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          'mt-4 font-display text-[2.1rem] leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl',
          light ? 'text-white' : 'text-forest',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', light ? 'text-white/75' : 'text-muted')}>{description}</p>
      )}
    </Reveal>
  )
}

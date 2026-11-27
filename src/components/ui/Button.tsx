import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'honey' | 'ghost' | 'light'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-white shadow-soft hover:bg-forest-800 hover:shadow-lift hover:-translate-y-0.5',
  secondary: 'bg-white text-forest ring-1 ring-forest/15 hover:ring-forest/30 hover:bg-mint hover:-translate-y-0.5',
  honey: 'bg-honey text-forest shadow-soft hover:brightness-105 hover:shadow-lift hover:-translate-y-0.5',
  ghost: 'text-forest hover:bg-forest/5',
  light: 'bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 pl-7 pr-2 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  /** Muestra la flecha circular al final (estilo de las referencias). */
  arrow?: boolean
  children: ReactNode
  className?: string
}

function Arrow({ variant }: { variant: Variant }) {
  const dark = variant === 'primary'
  return (
    <span
      aria-hidden
      className={cn(
        'ml-1 grid size-10 place-items-center rounded-full transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-rotate-45',
        dark ? 'bg-honey text-forest' : 'bg-forest text-white',
      )}
    >
      <ArrowRight className="size-4" />
    </span>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[arrow ? 'lg' : size], className)} {...props}>
      {children}
      {arrow && <Arrow variant={variant} />}
    </button>
  )
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[arrow ? 'lg' : size], className)} {...props}>
      {children}
      {arrow && <Arrow variant={variant} />}
    </a>
  )
}

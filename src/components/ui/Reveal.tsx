import type { ElementType, ReactNode } from 'react'
import { useInView } from '../../hooks'
import { cn } from '../../lib/cn'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}

/** Envuelve contenido para animarlo suavemente al entrar en pantalla. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  return (
    <Tag
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}

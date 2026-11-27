import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '../../lib/cn'

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: ReactNode
  optional?: boolean
  className?: string
  /** Usa <span> en vez de <label> para grupos (radio, chips) que ya tienen su propio rotulado. */
  asGroup?: boolean
  children: ReactNode
}

export function Field({ id, label, error, hint, optional, className, asGroup, children }: FieldProps) {
  const LabelTag = asGroup ? 'span' : 'label'
  return (
    <div className={cn('flex flex-col', className)}>
      <LabelTag
        {...(asGroup ? { id: `${id}-label` } : { htmlFor: id })}
        className="mb-2 flex items-center justify-between text-sm font-semibold text-forest"
      >
        <span>
          {label}
          {!optional && (
            <span className="text-coral" aria-hidden>
              {' '}
              *
            </span>
          )}
        </span>
        {optional && <span className="text-xs font-normal text-muted">Opcional</span>}
      </LabelTag>
      {children}
      <div className="min-h-5">
        {error ? (
          <p id={`${id}-error`} className="animate-fade-in mt-1.5 flex items-start gap-1.5 text-[13px] font-medium text-coral">
            <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden />
            {error}
          </p>
        ) : (
          hint && <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-muted">{hint}</p>
        )}
      </div>
    </div>
  )
}

export const inputClass = (error?: string) =>
  cn(
    'h-12 w-full rounded-2xl bg-cream px-4 text-[15px] text-ink ring-1 transition-all duration-200 outline-none placeholder:text-muted/60',
    'hover:ring-forest/25 focus:bg-white focus:ring-2',
    error ? 'ring-coral/70 focus:ring-coral' : 'ring-forest/10 focus:ring-brand',
  )

/** Props aria comunes para inputs con error/hint. */
export const describe = (id: string, error?: string, hasHint?: boolean) => ({
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `${id}-error` : hasHint ? `${id}-hint` : undefined,
})

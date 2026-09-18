import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

const STEP_LABELS = ['Business', 'Pain Points', 'Agents', 'Tone & Persona', 'Review']

export function WizardProgress({ step }: { step: number }) {
  return (
    <div className="mb-10 flex items-center justify-between">
      {STEP_LABELS.map((label, i) => {
        const index = i + 1
        const active = index === step
        const complete = index < step
        return (
          <div key={label} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  complete && 'bg-emerald text-white',
                  active && 'bg-emerald text-white ring-4 ring-emerald/20',
                  !active && !complete && 'bg-black/10 text-midgray'
                )}
              >
                {index}
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className={cn('h-0.5 flex-1', complete ? 'bg-emerald' : 'bg-black/10')} />
              )}
            </div>
            <span
              className={cn(
                'mt-2 hidden text-center text-xs font-medium sm:block',
                active ? 'text-emerald-dark font-semibold' : 'text-midgray'
              )}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function WizardStep({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-textdark">{title}</h2>
      {subtitle && <p className="mt-1 text-midgray">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  )
}

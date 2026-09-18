import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type Tone = 'emerald' | 'gold' | 'navy' | 'gray' | 'red'

const toneClasses: Record<Tone, string> = {
  emerald: 'bg-emerald/10 text-emerald-dark',
  gold: 'bg-gold/15 text-[#8a6f1f]',
  navy: 'bg-navy/10 text-navy',
  gray: 'bg-midgray/15 text-midgray',
  red: 'bg-red-100 text-red-700',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ className, tone = 'emerald', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        toneClasses[tone],
        className
      )}
      {...props}
    />
  )
}

import { Check } from 'lucide-react'
import { PAIN_POINTS } from '../../constants/industries'
import { cn } from '../../lib/utils'

interface Props {
  selected: string[]
  onChange: (selected: string[]) => void
}

export function PainPointsSelector({ selected, onChange }: Props) {
  function toggle(id: string) {
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id])
  }

  return (
    <div className="space-y-3">
      {PAIN_POINTS.map((pp) => {
        const active = selected.includes(pp.id)
        return (
          <button
            key={pp.id}
            type="button"
            onClick={() => toggle(pp.id)}
            aria-pressed={active}
            className={cn(
              'flex w-full items-center justify-between rounded-xl border-2 px-5 py-4 text-left transition',
              active ? 'border-emerald bg-emerald/5' : 'border-black/10 hover:border-emerald/40'
            )}
          >
            <span className={cn('font-medium', active ? 'text-emerald-dark' : 'text-textdark')}>{pp.label}</span>
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
                active ? 'border-emerald bg-emerald text-white' : 'border-black/20'
              )}
            >
              {active && <Check size={14} />}
            </span>
          </button>
        )
      })}
    </div>
  )
}

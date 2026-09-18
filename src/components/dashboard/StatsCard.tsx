import type { LucideIcon } from 'lucide-react'
import { Card } from '../ui/Card'

interface Props {
  label: string
  value: string | number
  icon: LucideIcon
  tone?: 'emerald' | 'gold' | 'teal' | 'navy'
}

const toneClasses = {
  emerald: 'bg-emerald/10 text-emerald-dark',
  gold: 'bg-gold/15 text-[#8a6f1f]',
  teal: 'bg-teal/10 text-teal',
  navy: 'bg-navy/10 text-navy',
}

export function StatsCard({ label, value, icon: Icon, tone = 'emerald' }: Props) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="font-display text-2xl font-extrabold text-textdark">{value}</p>
        <p className="text-sm text-midgray">{label}</p>
      </div>
    </Card>
  )
}

import { Check } from 'lucide-react'
import { AGENT_TEMPLATES } from '../../constants/agentTemplates'
import { getPlan } from '../../constants/plans'
import { cn } from '../../lib/utils'
import type { AgentType } from '../../types'
import { agentIcons } from '../agents/agentIcons'

interface Props {
  planId: string
  selected: AgentType[]
  onChange: (selected: AgentType[]) => void
}

export function AgentSelector({ planId, selected, onChange }: Props) {
  const plan = getPlan(planId)
  const limit = plan.agentLimit === 'unlimited' ? Infinity : plan.agentLimit

  function toggle(type: AgentType) {
    if (selected.includes(type)) {
      onChange(selected.filter((t) => t !== type))
    } else if (selected.length < limit) {
      onChange([...selected, type])
    }
  }

  return (
    <div>
      <p className="mb-4 text-sm text-midgray">
        Your <span className="font-semibold text-emerald-dark">{plan.name}</span> plan includes{' '}
        {plan.agentLimit === 'unlimited' ? 'unlimited' : plan.agentLimit} AI agent{plan.agentLimit === 1 ? '' : 's'}.
        Choose which to deploy first — you can add more later.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {AGENT_TEMPLATES.map((agent) => {
          const Icon = agentIcons[agent.type]
          const active = selected.includes(agent.type)
          const disabled = !active && selected.length >= limit
          return (
            <button
              key={agent.type}
              type="button"
              disabled={disabled}
              onClick={() => toggle(agent.type)}
              aria-pressed={active}
              className={cn(
                'relative rounded-2xl border-2 p-5 text-left transition disabled:cursor-not-allowed disabled:opacity-40',
                active ? 'border-emerald bg-emerald/5' : 'border-black/10 hover:border-emerald/40'
              )}
            >
              {active && (
                <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-white">
                  <Check size={14} />
                </span>
              )}
              <Icon className="mb-3 text-emerald" size={24} />
              <h3 className="font-display font-bold text-textdark">{agent.name}</h3>
              <p className="mt-1 text-sm text-midgray">{agent.tagline}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

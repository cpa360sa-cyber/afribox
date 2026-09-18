import { Link } from 'react-router-dom'
import { MessageCircle, Target, Phone, Workflow, ChevronRight } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import type { Agent } from '../../types'
import { cn } from '../../lib/utils'

const icons = { chatbot: MessageCircle, salesbot: Target, voice: Phone, workflow: Workflow }

interface Props {
  agent: Agent
  onToggle: (status: 'active' | 'paused') => void
}

export function AgentCard({ agent, onToggle }: Props) {
  const Icon = icons[agent.type]

  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
            <Icon size={20} />
          </div>
          <div>
            <p className="font-display font-bold text-textdark">{agent.name}</p>
            <p className="text-xs capitalize text-midgray">{agent.type}</p>
          </div>
        </div>
        <Badge tone={agent.status === 'active' ? 'emerald' : 'gray'}>{agent.status}</Badge>
      </div>

      <p className="mt-4 flex-1 text-sm text-midgray">{agent.role}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-center text-sm">
        <div className="rounded-lg bg-black/[0.03] py-2">
          <p className="font-display font-bold text-textdark">{agent.conversationCount}</p>
          <p className="text-xs text-midgray">Conversations</p>
        </div>
        <div className="rounded-lg bg-black/[0.03] py-2">
          <p className="font-display font-bold text-textdark">{agent.leadsCount}</p>
          <p className="text-xs text-midgray">Leads</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
        <button
          onClick={() => onToggle(agent.status === 'active' ? 'paused' : 'active')}
          className={cn(
            'relative h-6 w-11 shrink-0 rounded-full transition',
            agent.status === 'active' ? 'bg-emerald' : 'bg-black/15'
          )}
          role="switch"
          aria-checked={agent.status === 'active'}
          aria-label={`Toggle ${agent.name} ${agent.status === 'active' ? 'off' : 'on'}`}
        >
          <span
            className={cn(
              'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
              agent.status === 'active' ? 'left-5' : 'left-0.5'
            )}
          />
        </button>
        <Link
          to={`/app/agents/${agent.id}`}
          className="flex items-center gap-1 text-sm font-semibold text-emerald hover:text-emerald-dark"
        >
          Configure
          <ChevronRight size={16} />
        </Link>
      </div>
    </Card>
  )
}

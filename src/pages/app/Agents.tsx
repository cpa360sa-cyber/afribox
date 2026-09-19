import { useState } from 'react'
import { Bot, Plus } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { AgentCard } from '../../components/agents/AgentCard'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { useBusiness } from '../../hooks/useBusiness'
import { useAgents } from '../../hooks/useAgents'
import { useAuth } from '../../hooks/useAuth'
import { AGENT_TEMPLATES } from '../../constants/agentTemplates'
import { getPlan } from '../../constants/plans'
import { cn } from '../../lib/utils'
import type { AgentType } from '../../types'

export default function Agents() {
  const { appUser } = useAuth()
  const { business } = useBusiness()
  const { agents, toggleAgentStatus, createAgent } = useAgents(business?.id)
  const [modalOpen, setModalOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  const plan = getPlan(appUser?.planId ?? 'starterbot')
  const limit = plan.agentLimit === 'unlimited' ? Infinity : plan.agentLimit
  const atLimit = agents.length >= limit
  const availableTemplates = AGENT_TEMPLATES.filter((t) => !agents.some((a) => a.type === t.type))

  async function handleCreate(type: AgentType) {
    if (!business) return
    setCreating(true)
    try {
      const template = AGENT_TEMPLATES.find((t) => t.type === type)!
      await createAgent(business.id, type, template.name, template.description)
      setModalOpen(false)
    } finally {
      setCreating(false)
    }
  }

  return (
    <AppShell title="Agents">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-textdark">Your AI Employees</h2>
          <p className="text-sm text-midgray">
            {agents.length} of {plan.agentLimit === 'unlimited' ? 'unlimited' : plan.agentLimit} agents deployed on
            the {plan.name} plan
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} disabled={atLimit || availableTemplates.length === 0}>
          <Plus size={16} />
          Add Agent
        </Button>
      </div>

      {agents.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <Bot className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No agents deployed yet</p>
          <p className="max-w-sm text-sm text-midgray">Add your first AI employee to start automating your business.</p>
          <Button onClick={() => setModalOpen(true)} className="mt-2">
            <Plus size={16} />
            Add Agent
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onToggle={(status) => toggleAgentStatus(agent.id, status)}
            />
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add an AI Agent">
        <div className="space-y-3">
          {availableTemplates.map((t) => (
            <button
              key={t.type}
              disabled={creating}
              onClick={() => handleCreate(t.type)}
              className={cn(
                'flex w-full items-center justify-between rounded-xl border border-black/10 p-4 text-left transition hover:border-emerald hover:bg-emerald/5',
                creating && 'opacity-50'
              )}
            >
              <div>
                <p className="font-semibold text-textdark">{t.name}</p>
                <p className="text-sm text-midgray">{t.tagline}</p>
              </div>
            </button>
          ))}
          {atLimit && (
            <p className="rounded-lg bg-gold/10 p-3 text-sm text-[#8a6f1f]">
              You've reached your plan's agent limit.{' '}
              <a href="/app/billing" className="font-semibold underline">
                Upgrade your plan
              </a>{' '}
              to add more.
            </p>
          )}
        </div>
      </Modal>
    </AppShell>
  )
}

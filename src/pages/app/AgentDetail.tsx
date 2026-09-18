import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Target, Phone, Workflow } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { ConversationWindow } from '../../components/agents/ConversationWindow'
import { LeadForm } from '../../components/agents/LeadForm'
import { AgentConfig } from '../../components/agents/AgentConfig'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { useBusiness } from '../../hooks/useBusiness'
import { useAgents } from '../../hooks/useAgents'
import { useLeads } from '../../hooks/useLeads'
import { useConversations } from '../../hooks/useConversations'

const icons = { chatbot: MessageCircle, salesbot: Target, voice: Phone, workflow: Workflow }

export default function AgentDetail() {
  const { id } = useParams<{ id: string }>()
  const { business } = useBusiness()
  const { agents, updateAgentConfig } = useAgents(business?.id)
  const { createLead } = useLeads(business?.id)
  const { createConversation } = useConversations(business?.id)

  const agent = agents.find((a) => a.id === id)

  if (agents.length > 0 && !agent) {
    return <Navigate to="/app/agents" replace />
  }
  if (!agent || !business) {
    return (
      <AppShell title="Agent">
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      </AppShell>
    )
  }

  const Icon = icons[agent.type]

  return (
    <AppShell title={agent.name}>
      <Link to="/app/agents" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-midgray hover:text-textdark">
        <ArrowLeft size={16} />
        Back to Agents
      </Link>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
          <Icon size={26} />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-textdark">{agent.name}</h2>
            <Badge tone={agent.status === 'active' ? 'emerald' : 'gray'}>{agent.status}</Badge>
          </div>
          <p className="text-sm capitalize text-midgray">{agent.type} agent</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <AgentConfig agent={agent} onSave={(config) => updateAgentConfig(agent.id, config)} />
        </Card>

        {agent.type === 'chatbot' && (
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-textdark">Test Conversation</h3>
            <ConversationWindow
              agent={agent}
              business={business}
              onConversationEnd={(messages) => createConversation(agent.id, business.id, messages)}
            />
          </div>
        )}

        {agent.type === 'salesbot' && (
          <Card>
            <CardHeader>
              <CardTitle>Test Lead Capture</CardTitle>
            </CardHeader>
            <LeadForm
              onSubmit={(data) =>
                createLead({
                  agentId: agent.id,
                  businessId: business.id,
                  name: data.name,
                  phone: data.phone,
                  email: data.email,
                  queryType: data.queryType,
                })
              }
            />
          </Card>
        )}
      </div>
    </AppShell>
  )
}

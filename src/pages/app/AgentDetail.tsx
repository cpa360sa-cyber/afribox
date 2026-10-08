import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarClock, Palette, Receipt, Users } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { ConversationWindow } from '../../components/agents/ConversationWindow'
import { LeadForm } from '../../components/agents/LeadForm'
import { AgentConfig } from '../../components/agents/AgentConfig'
import { agentIcons } from '../../components/agents/agentIcons'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { useBusiness } from '../../hooks/useBusiness'
import { useAgents } from '../../hooks/useAgents'
import { useLeads } from '../../hooks/useLeads'
import { useConversations } from '../../hooks/useConversations'

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

  const Icon = agentIcons[agent.type]

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

        {(agent.type === 'salesbot' || agent.type === 'supportbot') && (
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-textdark">Test Conversation</h3>
            <ConversationWindow
              agent={agent}
              business={business}
              onConversationEnd={(messages) => createConversation(agent.id, business.id, messages)}
            />
            {agent.type === 'salesbot' ? (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Manual Lead Entry</CardTitle>
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
            ) : (
              <p className="mt-4 text-sm text-midgray">
                {agent.name} answers from your{' '}
                <Link to="/app/knowledge-base" className="font-semibold text-emerald hover:underline">
                  Knowledge Base
                </Link>
                . Add FAQs and articles there to improve its answers.
              </p>
            )}
          </div>
        )}

        {agent.type === 'adminbot' && (
          <Card className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <CalendarClock className="text-emerald" size={36} />
            <p className="font-semibold text-textdark">AdminBot manages bookings and reminders</p>
            <p className="max-w-xs text-sm text-midgray">
              See and manage everything this agent is tracking on the Bookings page.
            </p>
            <Link to="/app/bookings" className="btn-primary mt-1 text-sm">
              Go to Bookings
              <ArrowRight size={14} />
            </Link>
          </Card>
        )}

        {agent.type === 'financebot' && (
          <Card className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <Receipt className="text-emerald" size={36} />
            <p className="font-semibold text-textdark">FinanceBot handles invoices and cashflow</p>
            <p className="max-w-xs text-sm text-midgray">
              Track invoices, payments, and expenses on the Bookings & Payments page.
            </p>
            <Link to="/app/bookings" className="btn-primary mt-1 text-sm">
              Go to Bookings & Payments
              <ArrowRight size={14} />
            </Link>
          </Card>
        )}

        {agent.type === 'brandbot' && (
          <Card className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <Palette className="text-emerald" size={36} />
            <p className="font-semibold text-textdark">BrandBot keeps your branding consistent</p>
            <p className="max-w-xs text-sm text-midgray">
              Generate and manage your logo, bio, and slogans in BrandBox.
            </p>
            <Link to="/app/brandbox" className="btn-primary mt-1 text-sm">
              Open BrandBox
              <ArrowRight size={14} />
            </Link>
          </Card>
        )}

        {agent.type === 'hrbot' && (
          <Card className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <Users className="text-emerald" size={36} />
            <p className="font-semibold text-textdark">HRBot supports recruitment and onboarding</p>
            <p className="max-w-xs text-sm text-midgray">
              Manage your team, roles, and invitations on the Team page.
            </p>
            <Link to="/app/team" className="btn-primary mt-1 text-sm">
              Go to Team
              <ArrowRight size={14} />
            </Link>
          </Card>
        )}
      </div>
    </AppShell>
  )
}

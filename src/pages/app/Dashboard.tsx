import { Bot, MessageSquare, Target, Clock } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { RecentConversations } from '../../components/dashboard/RecentConversations'
import { QuickActions } from '../../components/dashboard/QuickActions'
import { useAuth } from '../../hooks/useAuth'
import { useBusiness } from '../../hooks/useBusiness'
import { useAgents } from '../../hooks/useAgents'
import { useConversations } from '../../hooks/useConversations'
import { useLeads } from '../../hooks/useLeads'

export default function Dashboard() {
  const { appUser } = useAuth()
  const { business } = useBusiness()
  const { agents } = useAgents(business?.id)
  const { conversations } = useConversations(business?.id)
  const { leads } = useLeads(business?.id)

  const activeAgents = agents.filter((a) => a.status === 'active').length
  const startOfDay = new Date().setHours(0, 0, 0, 0)
  const conversationsToday = conversations.filter((c) => c.createdAt >= startOfDay).length
  const timeSavedHours = Math.round(conversations.length * 0.15 + leads.length * 0.1)

  return (
    <AppShell title="Dashboard">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-textdark">
          Welcome back{appUser?.displayName ? `, ${appUser.displayName.split(' ')[0]}` : ''} 👋
        </h2>
        <p className="mt-1 text-midgray">
          {business ? `Here's how ${business.name} is performing today.` : "Let's get your AI employees set up."}
        </p>
      </div>

      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Active Agents" value={activeAgents} icon={Bot} tone="emerald" />
        <StatsCard label="Conversations Today" value={conversationsToday} icon={MessageSquare} tone="teal" />
        <StatsCard label="Leads Captured" value={leads.length} icon={Target} tone="gold" />
        <StatsCard label="Est. Time Saved" value={`${timeSavedHours}h`} icon={Clock} tone="navy" />
      </div>

      <div className="mb-8">
        <h3 className="mb-4 font-display text-lg font-bold text-textdark">Quick Actions</h3>
        <QuickActions />
      </div>

      <RecentConversations conversations={conversations} />
    </AppShell>
  )
}

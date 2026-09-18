import { useMemo } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AppShell } from '../../components/layout/AppShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { MessageSquare, Target, TrendingUp, CheckCircle } from 'lucide-react'
import { useBusiness } from '../../hooks/useBusiness'
import { useConversations } from '../../hooks/useConversations'
import { useLeads } from '../../hooks/useLeads'

function last7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    d.setHours(0, 0, 0, 0)
    return d
  })
}

export default function Analytics() {
  const { business } = useBusiness()
  const { conversations } = useConversations(business?.id)
  const { leads } = useLeads(business?.id)

  const days = useMemo(() => last7Days(), [])

  const conversationSeries = useMemo(
    () =>
      days.map((day) => {
        const nextDay = new Date(day)
        nextDay.setDate(day.getDate() + 1)
        const count = conversations.filter((c) => c.createdAt >= day.getTime() && c.createdAt < nextDay.getTime()).length
        return { date: day.toLocaleDateString('en-ZA', { weekday: 'short' }), conversations: count }
      }),
    [days, conversations]
  )

  const leadSeries = useMemo(
    () =>
      days.map((day) => {
        const nextDay = new Date(day)
        nextDay.setDate(day.getDate() + 1)
        const count = leads.filter((l) => l.createdAt >= day.getTime() && l.createdAt < nextDay.getTime()).length
        return { date: day.toLocaleDateString('en-ZA', { weekday: 'short' }), leads: count }
      }),
    [days, leads]
  )

  const resolved = conversations.filter((c) => c.status === 'resolved').length
  const resolutionRate = conversations.length ? Math.round((resolved / conversations.length) * 100) : 0
  const responseRate = conversations.length ? 100 : 0

  return (
    <AppShell title="Analytics">
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Conversations" value={conversations.length} icon={MessageSquare} tone="emerald" />
        <StatsCard label="Total Leads" value={leads.length} icon={Target} tone="gold" />
        <StatsCard label="Response Rate" value={`${responseRate}%`} icon={TrendingUp} tone="teal" />
        <StatsCard label="Resolution Rate" value={`${resolutionRate}%`} icon={CheckCircle} tone="navy" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Conversations — Last 7 Days</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={conversationSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#8A9BAE" />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#8A9BAE" />
              <Tooltip />
              <Bar dataKey="conversations" fill="#1A936F" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads — Last 7 Days</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={leadSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#8A9BAE" />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#8A9BAE" />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="#C9A84C" strokeWidth={3} dot={{ fill: '#C9A84C' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </AppShell>
  )
}

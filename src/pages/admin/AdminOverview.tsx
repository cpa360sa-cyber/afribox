import { Users, Bot, MessageSquare, DollarSign } from 'lucide-react'
import { AdminShell } from '../../components/layout/AdminShell'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { useAdminData } from '../../hooks/useAdminData'
import { getPlan } from '../../constants/plans'
import { formatZAR, formatDate } from '../../lib/utils'

export default function AdminOverview() {
  const { users, businesses, conversations, loading } = useAdminData()

  const clients = users.filter((u) => u.role === 'client')
  const arr = clients.reduce((sum, u) => sum + (getPlan(u.planId).priceZAR ?? 0) * 12, 0)

  return (
    <AdminShell title="Platform Overview">
      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : (
        <>
          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard label="Total Clients" value={clients.length} icon={Users} tone="emerald" />
            <StatsCard label="Businesses Onboarded" value={businesses.length} icon={Bot} tone="teal" />
            <StatsCard label="Total Conversations" value={conversations.length} icon={MessageSquare} tone="gold" />
            <StatsCard label="Estimated ARR" value={formatZAR(arr)} icon={DollarSign} tone="navy" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recently Onboarded Businesses</CardTitle>
            </CardHeader>
            {businesses.length === 0 ? (
              <p className="py-8 text-center text-sm text-midgray">No businesses onboarded yet.</p>
            ) : (
              <ul className="divide-y divide-black/5">
                {businesses
                  .slice()
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .slice(0, 8)
                  .map((b) => (
                    <li key={b.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-semibold text-textdark">{b.name}</p>
                        <p className="text-xs text-midgray">{b.industry} · {b.location}</p>
                      </div>
                      <span className="text-xs text-midgray">{formatDate(b.createdAt)}</span>
                    </li>
                  ))}
              </ul>
            )}
          </Card>
        </>
      )}
    </AdminShell>
  )
}

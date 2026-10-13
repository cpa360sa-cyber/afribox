import { useState } from 'react'
import { Users2, UserPlus, UserCheck, TrendingUp } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { Select } from '../../components/ui/Select'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { useBusiness } from '../../hooks/useBusiness'
import { useLeads } from '../../hooks/useLeads'
import { formatDate, cn } from '../../lib/utils'
import type { LeadStatus } from '../../types'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'closed', label: 'Closed' },
]

const TABS: { id: 'all' | LeadStatus; label: string }[] = [
  { id: 'all', label: 'All Customers' },
  { id: 'new', label: 'Leads' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'closed', label: 'Closed' },
]

export default function Customers() {
  const { business } = useBusiness()
  const { leads, loading, updateLeadStatus } = useLeads(business?.id)
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('all')

  const filtered = tab === 'all' ? leads : leads.filter((l) => l.status === tab)
  const qualified = leads.filter((l) => l.status === 'qualified').length

  return (
    <AppShell title="Customers" subtitle="Manage relationships, track interactions and grow your business.">
      <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Customers" value={leads.length} icon={Users2} tone="emerald" />
        <StatsCard label="New Leads" value={leads.filter((l) => l.status === 'new').length} icon={UserPlus} tone="gold" />
        <StatsCard label="Qualified" value={qualified} icon={UserCheck} tone="teal" />
        <StatsCard
          label="Conversion Rate"
          value={leads.length ? `${Math.round((qualified / leads.length) * 100)}%` : '0%'}
          icon={TrendingUp}
          tone="navy"
        />
      </div>

      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-black/5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'shrink-0 border-b-2 px-4 py-2.5 text-sm font-semibold transition',
              tab === t.id ? 'border-emerald text-emerald-dark' : 'border-transparent text-midgray hover:text-textdark'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : filtered.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <Users2 className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No customers here yet</p>
          <p className="max-w-sm text-sm text-midgray">Customers captured by SalesBot will appear here.</p>
        </div>
      ) : (
        <div className="card-surface overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase text-midgray">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Contact</th>
                <th className="px-5 py-3 font-semibold">Query Type</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-5 py-3 font-semibold text-textdark">{lead.name}</td>
                  <td className="px-5 py-3 text-midgray">
                    <div>{lead.phone}</div>
                    {lead.email && <div className="text-xs">{lead.email}</div>}
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone="gray">{lead.queryType}</Badge>
                  </td>
                  <td className="px-5 py-3 text-midgray">{formatDate(lead.createdAt)}</td>
                  <td className="px-5 py-3">
                    <Select
                      options={STATUS_OPTIONS}
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                      className="h-8 w-36 py-0 text-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  )
}

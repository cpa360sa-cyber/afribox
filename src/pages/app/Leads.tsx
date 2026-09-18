import { Target } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { Select } from '../../components/ui/Select'
import { useBusiness } from '../../hooks/useBusiness'
import { useLeads } from '../../hooks/useLeads'
import { formatDate } from '../../lib/utils'
import type { LeadStatus } from '../../types'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'closed', label: 'Closed' },
]

export default function Leads() {
  const { business } = useBusiness()
  const { leads, loading, updateLeadStatus } = useLeads(business?.id)

  return (
    <AppShell title="Leads">
      {loading ? (
        <div className="h-96 animate-pulse rounded-2xl bg-black/5" />
      ) : leads.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <Target className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No leads captured yet</p>
          <p className="max-w-sm text-sm text-midgray">
            Leads captured by your SalesBot agent will appear here.
          </p>
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
              {leads.map((lead) => (
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

import { Link } from 'react-router-dom'
import { AdminShell } from '../../components/layout/AdminShell'
import { Badge } from '../../components/ui/Badge'
import { useAdminData } from '../../hooks/useAdminData'
import { getPlan } from '../../constants/plans'
import { formatZAR, formatDate } from '../../lib/utils'

export default function ClientList() {
  const { users, businesses, loading } = useAdminData()
  const clients = users.filter((u) => u.role === 'client')

  function businessFor(uid: string) {
    return businesses.find((b) => b.ownerId === uid)
  }

  return (
    <AdminShell title="Clients">
      {loading ? (
        <div className="h-96 animate-pulse rounded-2xl bg-black/5" />
      ) : (
        <div className="card-surface overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase text-midgray">
              <tr>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Business</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">MRR</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
                <th className="px-5 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {clients.map((c) => {
                const business = businessFor(c.uid)
                const plan = getPlan(c.planId)
                return (
                  <tr key={c.uid}>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-textdark">{c.displayName || c.email}</p>
                      <p className="text-xs text-midgray">{c.email}</p>
                    </td>
                    <td className="px-5 py-3 text-midgray">{business?.name ?? '—'}</td>
                    <td className="px-5 py-3">
                      <Badge tone="emerald">{plan.name}</Badge>
                    </td>
                    <td className="px-5 py-3 text-midgray">{plan.priceZAR !== null ? formatZAR(plan.priceZAR) : 'Custom'}</td>
                    <td className="px-5 py-3 text-midgray">{formatDate(c.createdAt)}</td>
                    <td className="px-5 py-3 text-right">
                      <Link to={`/admin/clients/${c.uid}`} className="text-sm font-semibold text-emerald hover:text-emerald-dark">
                        View
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  )
}

import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { AdminShell } from '../../components/layout/AdminShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Select } from '../../components/ui/Select'
import { supabase } from '../../lib/supabase'
import { useAdminData } from '../../hooks/useAdminData'
import { PLANS, getPlan } from '../../constants/plans'
import { formatDate } from '../../lib/utils'

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>()
  const { users, businesses, agents, loading } = useAdminData()

  if (loading) {
    return (
      <AdminShell title="Client">
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      </AdminShell>
    )
  }

  const client = users.find((u) => u.uid === id)
  if (!client) return <Navigate to="/admin/clients" replace />

  const business = businesses.find((b) => b.ownerId === client.uid)
  const clientAgents = business ? agents.filter((a) => a.businessId === business.id) : []
  const plan = getPlan(client.planId)

  async function handlePlanChange(planId: string) {
    await supabase.from('profiles').update({ plan_id: planId }).eq('id', client!.uid)
  }

  return (
    <AdminShell title="Client Detail">
      <Link to="/admin/clients" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-midgray hover:text-textdark">
        <ArrowLeft size={16} />
        Back to Clients
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{business?.name ?? client.displayName ?? client.email}</CardTitle>
            <Badge tone="emerald">{plan.name}</Badge>
          </CardHeader>
          {business ? (
            <div className="space-y-3 text-sm">
              <Row label="Industry" value={business.industry} />
              <Row label="Location" value={business.location} />
              <Row label="Website" value={business.website || '—'} />
              <Row label="Onboarded" value={formatDate(business.createdAt)} />
              <Row label="Tone / Language" value={`${business.tone} · ${business.language}`} />
            </div>
          ) : (
            <p className="text-sm text-midgray">This client has not completed onboarding yet.</p>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Plan</CardTitle>
          </CardHeader>
          <Select
            label="Subscription plan"
            options={PLANS.map((p) => ({ value: p.id, label: p.name }))}
            value={client.planId}
            onChange={(e) => handlePlanChange(e.target.value)}
          />
          {business && (
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-emerald hover:text-emerald-dark"
            >
              <ExternalLink size={14} />
              Impersonate client (coming soon)
            </a>
          )}
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Deployed Agents</CardTitle>
        </CardHeader>
        {clientAgents.length === 0 ? (
          <p className="text-sm text-midgray">No agents deployed.</p>
        ) : (
          <ul className="divide-y divide-black/5">
            {clientAgents.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold text-textdark">{a.name}</p>
                  <p className="text-xs capitalize text-midgray">{a.type}</p>
                </div>
                <Badge tone={a.status === 'active' ? 'emerald' : 'gray'}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </AdminShell>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 pb-2">
      <span className="text-midgray">{label}</span>
      <span className="font-medium text-textdark">{value}</span>
    </div>
  )
}

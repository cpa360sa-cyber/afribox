import { useState } from 'react'
import { Plus, Megaphone, DollarSign, TrendingUp, Target } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { useBusiness } from '../../hooks/useBusiness'
import { useCampaigns } from '../../hooks/useCampaigns'
import { useLeads } from '../../hooks/useLeads'
import { formatZAR, formatDate } from '../../lib/utils'
import type { CampaignChannel, CampaignStatus } from '../../types'

const CHANNELS: { value: CampaignChannel; label: string }[] = [
  { value: 'social', label: 'Social Media' },
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'ads', label: 'Ads' },
  { value: 'landing_page', label: 'Landing Page' },
]

const STATUS_TONE: Record<CampaignStatus, 'emerald' | 'gold' | 'navy' | 'gray'> = {
  draft: 'gray',
  active: 'emerald',
  paused: 'gold',
  completed: 'navy',
}

export default function Marketing() {
  const { business } = useBusiness()
  const { campaigns, loading, createCampaign, updateCampaignStatus } = useCampaigns(business?.id)
  const { leads } = useLeads(business?.id)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', channel: 'social' as CampaignChannel, budgetZAR: '' })
  const [creating, setCreating] = useState(false)

  async function handleCreate() {
    if (!business || !form.name) return
    setCreating(true)
    try {
      await createCampaign({
        businessId: business.id,
        name: form.name,
        channel: form.channel,
        budgetZAR: form.budgetZAR ? Number(form.budgetZAR) : undefined,
      })
      setForm({ name: '', channel: 'social', budgetZAR: '' })
      setModalOpen(false)
    } finally {
      setCreating(false)
    }
  }

  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budgetZAR ?? 0), 0)
  const active = campaigns.filter((c) => c.status === 'active').length

  return (
    <AppShell
      title="Marketing"
      subtitle="Create campaigns, track performance and grow your brand."
      primaryAction={{ label: 'Create Campaign', icon: <Plus size={16} />, onClick: () => setModalOpen(true) }}
    >
      <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Active Campaigns" value={active} icon={Megaphone} tone="emerald" />
        <StatsCard label="Total Budget" value={formatZAR(totalBudget)} icon={DollarSign} tone="gold" />
        <StatsCard label="Leads Generated" value={leads.length} icon={Target} tone="teal" />
        <StatsCard label="Total Campaigns" value={campaigns.length} icon={TrendingUp} tone="navy" />
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : campaigns.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <Megaphone className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No campaigns yet</p>
          <p className="max-w-sm text-sm text-midgray">Create your first campaign to start reaching customers.</p>
        </div>
      ) : (
        <div className="card-surface overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase text-midgray">
              <tr>
                <th className="px-5 py-3 font-semibold">Campaign</th>
                <th className="px-5 py-3 font-semibold">Channel</th>
                <th className="px-5 py-3 font-semibold">Budget</th>
                <th className="px-5 py-3 font-semibold">Started</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td className="px-5 py-3 font-semibold text-textdark">{c.name}</td>
                  <td className="px-5 py-3 capitalize text-midgray">{c.channel.replace('_', ' ')}</td>
                  <td className="px-5 py-3 text-midgray">{c.budgetZAR ? formatZAR(c.budgetZAR) : '—'}</td>
                  <td className="px-5 py-3 text-midgray">{formatDate(c.createdAt)}</td>
                  <td className="px-5 py-3">
                    <Badge tone={STATUS_TONE[c.status]}>{c.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {c.status === 'active' ? (
                      <button onClick={() => updateCampaignStatus(c.id, 'paused')} className="text-sm font-semibold text-midgray hover:underline">
                        Pause
                      </button>
                    ) : c.status === 'paused' ? (
                      <button onClick={() => updateCampaignStatus(c.id, 'active')} className="text-sm font-semibold text-emerald hover:underline">
                        Resume
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Campaign">
        <div className="space-y-4">
          <Input label="Campaign name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Select
            label="Channel"
            options={CHANNELS}
            value={form.channel}
            onChange={(e) => setForm({ ...form, channel: e.target.value as CampaignChannel })}
          />
          <Input
            label="Budget (ZAR, optional)"
            type="number"
            value={form.budgetZAR}
            onChange={(e) => setForm({ ...form, budgetZAR: e.target.value })}
          />
          <Button onClick={handleCreate} disabled={creating} className="w-full">
            {creating ? 'Creating…' : 'Create Campaign'}
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

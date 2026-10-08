import { useState } from 'react'
import { Plus, Briefcase } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useBusiness } from '../../hooks/useBusiness'
import { useDeals } from '../../hooks/useDeals'
import { formatZAR, cn } from '../../lib/utils'
import type { Deal, DealStage } from '../../types'

const STAGES: { id: DealStage; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'won', label: 'Won' },
  { id: 'lost', label: 'Lost' },
]

export default function CRM() {
  const { business } = useBusiness()
  const { deals, loading, createDeal, updateDealStage } = useDeals(business?.id)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ title: '', customerName: '', valueZAR: '' })
  const [creating, setCreating] = useState(false)
  const [dragId, setDragId] = useState<string | null>(null)

  async function handleCreate() {
    if (!business || !form.title) return
    setCreating(true)
    try {
      await createDeal({
        businessId: business.id,
        title: form.title,
        customerName: form.customerName,
        valueZAR: form.valueZAR ? Number(form.valueZAR) : undefined,
      })
      setForm({ title: '', customerName: '', valueZAR: '' })
      setModalOpen(false)
    } finally {
      setCreating(false)
    }
  }

  function dealsByStage(stage: DealStage): Deal[] {
    return deals.filter((d) => d.stage === stage)
  }

  const pipelineValue = deals.filter((d) => d.stage !== 'lost').reduce((sum, d) => sum + (d.valueZAR ?? 0), 0)

  return (
    <AppShell title="CRM">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-textdark">Pipeline</h2>
          <p className="text-sm text-midgray">{deals.length} deals · {formatZAR(pipelineValue)} in active pipeline</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          New Deal
        </Button>
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : deals.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <Briefcase className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No deals yet</p>
          <p className="max-w-sm text-sm text-midgray">
            Track leads, deals and customers through your pipeline — SalesBot feeds leads in here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((stage) => (
            <div
              key={stage.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) updateDealStage(dragId, stage.id)
                setDragId(null)
              }}
              className="flex min-h-[120px] flex-col gap-3 rounded-2xl bg-black/[0.03] p-3"
            >
              <p className="px-1 text-xs font-bold uppercase tracking-wide text-midgray">
                {stage.label} <span className="text-textdark/40">· {dealsByStage(stage.id).length}</span>
              </p>
              {dealsByStage(stage.id).map((deal) => (
                <div
                  key={deal.id}
                  draggable
                  onDragStart={() => setDragId(deal.id)}
                  className={cn(
                    'card-surface cursor-grab space-y-1 p-3 active:cursor-grabbing',
                    dragId === deal.id && 'opacity-50'
                  )}
                >
                  <p className="text-sm font-semibold text-textdark">{deal.title}</p>
                  {deal.customerName && <p className="text-xs text-midgray">{deal.customerName}</p>}
                  {deal.valueZAR !== null && (
                    <p className="text-xs font-bold text-emerald-dark">{formatZAR(deal.valueZAR)}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Deal">
        <div className="space-y-4">
          <Input label="Deal title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input label="Customer name" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
          <Input
            label="Estimated value (ZAR)"
            type="number"
            value={form.valueZAR}
            onChange={(e) => setForm({ ...form, valueZAR: e.target.value })}
          />
          <Button onClick={handleCreate} disabled={creating} className="w-full">
            {creating ? 'Adding…' : 'Add Deal'}
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

import { useState } from 'react'
import { Plus, Receipt, DollarSign, Clock, AlertCircle } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { useBusiness } from '../../hooks/useBusiness'
import { useInvoices } from '../../hooks/useInvoices'
import { formatZAR, formatDate } from '../../lib/utils'
import type { InvoiceStatus } from '../../types'

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
]

export default function Finance() {
  const { business } = useBusiness()
  const { invoices, loading, createInvoice, updateInvoiceStatus } = useInvoices(business?.id)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ customerName: '', description: '', amountZAR: '', dueDate: '' })
  const [creating, setCreating] = useState(false)

  async function handleCreate() {
    if (!business || !form.customerName || !form.amountZAR) return
    setCreating(true)
    try {
      await createInvoice({
        businessId: business.id,
        customerName: form.customerName,
        description: form.description,
        amountZAR: Number(form.amountZAR),
        dueDate: form.dueDate || undefined,
      })
      setForm({ customerName: '', description: '', amountZAR: '', dueDate: '' })
      setModalOpen(false)
    } finally {
      setCreating(false)
    }
  }

  const paid = invoices.filter((i) => i.status === 'paid')
  const outstanding = invoices.filter((i) => i.status === 'sent' || i.status === 'overdue')
  const overdue = invoices.filter((i) => i.status === 'overdue')
  const totalPaid = paid.reduce((sum, i) => sum + i.amountZAR, 0)
  const totalOutstanding = outstanding.reduce((sum, i) => sum + i.amountZAR, 0)

  return (
    <AppShell
      title="Finance"
      subtitle="Invoices, expenses and cashflow — handled by FinanceBot."
      primaryAction={{ label: 'New Invoice', icon: <Plus size={16} />, onClick: () => setModalOpen(true) }}
    >
      <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Collected" value={formatZAR(totalPaid)} icon={DollarSign} tone="emerald" />
        <StatsCard label="Outstanding" value={formatZAR(totalOutstanding)} icon={Clock} tone="gold" />
        <StatsCard label="Overdue Invoices" value={overdue.length} icon={AlertCircle} tone="navy" />
        <StatsCard label="Total Invoices" value={invoices.length} icon={Receipt} tone="teal" />
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : invoices.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <Receipt className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No invoices yet</p>
          <p className="max-w-sm text-sm text-midgray">
            FinanceBot generates invoices and estimates and chases payment reminders. Add one to get started.
          </p>
        </div>
      ) : (
        <div className="card-surface overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase text-midgray">
              <tr>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Description</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Due</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-5 py-3 font-semibold text-textdark">{inv.customerName}</td>
                  <td className="px-5 py-3 text-midgray">{inv.description || '—'}</td>
                  <td className="px-5 py-3 font-bold text-textdark">{formatZAR(inv.amountZAR)}</td>
                  <td className="px-5 py-3 text-midgray">{inv.dueDate ? formatDate(new Date(inv.dueDate).getTime()) : '—'}</td>
                  <td className="px-5 py-3">
                    <Select
                      options={STATUS_OPTIONS}
                      value={inv.status}
                      onChange={(e) => updateInvoiceStatus(inv.id, e.target.value as InvoiceStatus)}
                      className="h-8 w-28 py-0 text-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Invoice">
        <div className="space-y-4">
          <Input label="Customer name" required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Amount (ZAR)" type="number" required value={form.amountZAR} onChange={(e) => setForm({ ...form, amountZAR: e.target.value })} />
            <Input label="Due date" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          </div>
          <Button onClick={handleCreate} disabled={creating} className="w-full">
            {creating ? 'Creating…' : 'Create Invoice'}
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

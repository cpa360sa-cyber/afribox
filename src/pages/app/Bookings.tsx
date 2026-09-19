import { useState } from 'react'
import { CalendarClock, Plus } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { useBusiness } from '../../hooks/useBusiness'
import { useBookings } from '../../hooks/useBookings'
import { formatDate, formatZAR } from '../../lib/utils'
import type { BookingStatus, PaymentProvider } from '../../types'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const PAYMENT_PROVIDERS: { id: PaymentProvider; label: string }[] = [
  { id: 'paystack', label: 'Paystack' },
  { id: 'yoco', label: 'Yoco' },
  { id: 'snapscan', label: 'SnapScan' },
]

export default function Bookings() {
  const { business } = useBusiness()
  const { bookings, loading, createBooking, updateBookingStatus } = useBookings(business?.id)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ customerName: '', customerPhone: '', service: '', scheduledAt: '', amountZAR: '' })
  const [creating, setCreating] = useState(false)

  async function handleCreate() {
    if (!business || !form.customerName || !form.scheduledAt) return
    setCreating(true)
    try {
      await createBooking({
        businessId: business.id,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        service: form.service,
        scheduledAt: new Date(form.scheduledAt).getTime(),
        amountZAR: form.amountZAR ? Number(form.amountZAR) : undefined,
      })
      setForm({ customerName: '', customerPhone: '', service: '', scheduledAt: '', amountZAR: '' })
      setModalOpen(false)
    } finally {
      setCreating(false)
    }
  }

  return (
    <AppShell title="Bookings & Payments">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-textdark">Bookings</h2>
          <p className="text-sm text-midgray">Manage appointments and payments — AdminBot tracks these automatically.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          New Booking
        </Button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {PAYMENT_PROVIDERS.map((p) => (
          <div key={p.id} className="card-surface flex items-center justify-between p-4">
            <span className="font-semibold text-textdark">{p.label}</span>
            <Badge tone="gray">Not connected</Badge>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : bookings.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <CalendarClock className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No bookings yet</p>
          <p className="max-w-sm text-sm text-midgray">Add your first booking, or let AdminBot capture them automatically.</p>
        </div>
      ) : (
        <div className="card-surface overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase text-midgray">
              <tr>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Service</th>
                <th className="px-5 py-3 font-semibold">When</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="px-5 py-3">
                    <p className="font-semibold text-textdark">{b.customerName}</p>
                    <p className="text-xs text-midgray">{b.customerPhone}</p>
                  </td>
                  <td className="px-5 py-3 text-midgray">{b.service || '—'}</td>
                  <td className="px-5 py-3 text-midgray">{formatDate(b.scheduledAt)}</td>
                  <td className="px-5 py-3 text-midgray">{b.amountZAR ? formatZAR(b.amountZAR) : '—'}</td>
                  <td className="px-5 py-3">
                    <Select
                      options={STATUS_OPTIONS}
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                      className="h-8 w-32 py-0 text-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Booking">
        <div className="space-y-4">
          <Input
            label="Customer name"
            required
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          />
          <Input
            label="Phone"
            value={form.customerPhone}
            onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
          />
          <Input label="Service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date & time"
              type="datetime-local"
              required
              value={form.scheduledAt}
              onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
            />
            <Input
              label="Amount (ZAR)"
              type="number"
              value={form.amountZAR}
              onChange={(e) => setForm({ ...form, amountZAR: e.target.value })}
            />
          </div>
          <Button onClick={handleCreate} disabled={creating} className="w-full">
            {creating ? 'Adding…' : 'Add Booking'}
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

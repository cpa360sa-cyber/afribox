import { useMemo, useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useBusiness } from '../../hooks/useBusiness'
import { useCalendarEvents } from '../../hooks/useCalendarEvents'
import { cn } from '../../lib/utils'

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

export default function CalendarPage() {
  const { business } = useBusiness()
  const { events, loading, createEvent } = useCalendarEvents(business?.id)
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()))
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ title: '', date: '', time: '09:00', location: '' })
  const [creating, setCreating] = useState(false)

  const grid = useMemo(() => {
    const first = startOfMonth(cursor)
    const startWeekday = first.getDay()
    const total = daysInMonth(cursor)
    const cells: (Date | null)[] = Array(startWeekday).fill(null)
    for (let d = 1; d <= total; d++) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d))
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [cursor])

  function eventsOn(day: Date) {
    return events.filter((e) => {
      const d = new Date(e.startsAt)
      return d.getFullYear() === day.getFullYear() && d.getMonth() === day.getMonth() && d.getDate() === day.getDate()
    })
  }

  async function handleCreate() {
    if (!business || !form.title || !form.date) return
    setCreating(true)
    try {
      const startsAt = new Date(`${form.date}T${form.time}`).getTime()
      await createEvent({ businessId: business.id, title: form.title, startsAt, location: form.location })
      setForm({ title: '', date: '', time: '09:00', location: '' })
      setModalOpen(false)
    } finally {
      setCreating(false)
    }
  }

  const monthLabel = cursor.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })
  const today = new Date()

  return (
    <AppShell
      title="Calendar"
      subtitle="Schedule, manage and track all your events and appointments."
      primaryAction={{ label: 'New Event', icon: <Plus size={16} />, onClick: () => setModalOpen(true) }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="rounded-lg border border-black/10 p-1.5 hover:bg-black/5"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <h2 className="font-display text-lg font-bold text-textdark">{monthLabel}</h2>
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="rounded-lg border border-black/10 p-1.5 hover:bg-black/5"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <button onClick={() => setCursor(startOfMonth(new Date()))} className="text-sm font-semibold text-emerald hover:underline">
          Today
        </button>
      </div>

      {loading ? (
        <div className="h-96 animate-pulse rounded-2xl bg-black/5" />
      ) : (
        <div className="card-surface overflow-hidden p-0">
          <div className="grid grid-cols-7 border-b border-black/5 bg-black/[0.02] text-center text-xs font-bold uppercase text-midgray">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="py-2.5">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {grid.map((day, i) => {
              const isToday = day && day.toDateString() === today.toDateString()
              const dayEvents = day ? eventsOn(day) : []
              return (
                <div key={i} className={cn('min-h-[90px] border-b border-r border-black/5 p-2', !day && 'bg-black/[0.015]')}>
                  {day && (
                    <>
                      <span
                        className={cn(
                          'mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                          isToday ? 'bg-emerald text-white' : 'text-textdark'
                        )}
                      >
                        {day.getDate()}
                      </span>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((e) => (
                          <p key={e.id} className="truncate rounded bg-emerald/10 px-1.5 py-0.5 text-[11px] font-medium text-emerald-dark">
                            {e.title}
                          </p>
                        ))}
                        {dayEvents.length > 2 && <p className="text-[11px] text-midgray">+{dayEvents.length - 2} more</p>}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {events.length === 0 && !loading && (
        <div className="mt-6 flex flex-col items-center gap-2 text-center text-sm text-midgray">
          <CalendarDays className="text-emerald" size={28} />
          No events yet — add your first one above.
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Event">
        <div className="space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Input label="Time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </div>
          <Input label="Location (optional)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Button onClick={handleCreate} disabled={creating} className="w-full">
            {creating ? 'Adding…' : 'Add Event'}
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

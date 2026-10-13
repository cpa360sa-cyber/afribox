import { useState } from 'react'
import { Plus, Users, Trash2, UserCheck, CalendarOff, UserPlus } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { useBusiness } from '../../hooks/useBusiness'
import { useTeam } from '../../hooks/useTeam'
import { useLeaveRequests } from '../../hooks/useLeaveRequests'
import { initials, formatDate, cn } from '../../lib/utils'
import type { LeaveStatus, LeaveType, TeamMemberStatus } from '../../types'

const STATUS_TONE: Record<TeamMemberStatus, 'emerald' | 'gold' | 'gray'> = {
  active: 'emerald',
  invited: 'gold',
  inactive: 'gray',
}

const LEAVE_TONE: Record<LeaveStatus, 'gold' | 'emerald' | 'gray'> = {
  pending: 'gold',
  approved: 'emerald',
  declined: 'gray',
}

const LEAVE_TYPES: { value: LeaveType; label: string }[] = [
  { value: 'annual', label: 'Annual Leave' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'personal', label: 'Personal Leave' },
  { value: 'unpaid', label: 'Unpaid Leave' },
]

const TABS = ['Overview', 'Employees', 'Leave'] as const

export default function HR() {
  const { business } = useBusiness()
  const { members, loading, inviteMember, removeMember } = useTeam(business?.id)
  const { requests, requestLeave, updateLeaveStatus } = useLeaveRequests(business?.id)
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview')
  const [modalOpen, setModalOpen] = useState(false)
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', email: '' })
  const [leaveForm, setLeaveForm] = useState({ memberName: '', leaveType: 'annual' as LeaveType, startsOn: '', endsOn: '' })
  const [inviting, setInviting] = useState(false)

  async function handleInvite() {
    if (!business || !form.name) return
    setInviting(true)
    try {
      await inviteMember(business.id, form.name, form.role, form.email)
      setForm({ name: '', role: '', email: '' })
      setModalOpen(false)
    } finally {
      setInviting(false)
    }
  }

  async function handleLeaveRequest() {
    if (!business || !leaveForm.memberName || !leaveForm.startsOn || !leaveForm.endsOn) return
    await requestLeave({ businessId: business.id, ...leaveForm })
    setLeaveForm({ memberName: '', leaveType: 'annual', startsOn: '', endsOn: '' })
    setLeaveModalOpen(false)
  }

  const activeCount = members.filter((m) => m.status === 'active').length
  const pendingLeave = requests.filter((r) => r.status === 'pending').length

  return (
    <AppShell
      title="HR"
      subtitle="Manage your people, streamline HR processes and build a great workplace."
      primaryAction={{ label: 'Add Employee', icon: <Plus size={16} />, onClick: () => setModalOpen(true) }}
    >
      <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Employees" value={members.length} icon={Users} tone="emerald" />
        <StatsCard label="Active Employees" value={activeCount} icon={UserCheck} tone="teal" />
        <StatsCard label="Pending Leave Requests" value={pendingLeave} icon={CalendarOff} tone="gold" />
        <StatsCard label="Invited" value={members.filter((m) => m.status === 'invited').length} icon={UserPlus} tone="navy" />
      </div>

      <div className="mb-6 flex gap-1 border-b border-black/5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'border-b-2 px-4 py-2.5 text-sm font-semibold transition',
              tab === t ? 'border-emerald text-emerald-dark' : 'border-transparent text-midgray hover:text-textdark'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {(tab === 'Overview' || tab === 'Employees') &&
        (loading ? (
          <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
        ) : members.length === 0 ? (
          <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
            <Users className="text-emerald" size={40} />
            <p className="font-semibold text-textdark">No team members yet</p>
            <p className="max-w-sm text-sm text-midgray">Add your first employee to start onboarding with HRBot.</p>
          </div>
        ) : (
          <div className="card-surface overflow-x-auto p-0">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-black/5 text-xs uppercase text-midgray">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {members.map((m) => (
                  <tr key={m.id}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald/10 text-xs font-bold text-emerald-dark">
                          {initials(m.name)}
                        </span>
                        <span className="font-semibold text-textdark">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-midgray">{m.role || '—'}</td>
                    <td className="px-5 py-3 text-midgray">{m.email || '—'}</td>
                    <td className="px-5 py-3">
                      <Badge tone={STATUS_TONE[m.status]}>{m.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => removeMember(m.id)} aria-label="Remove" className="text-midgray hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {tab === 'Leave' && (
        <div>
          <div className="mb-4 flex justify-end">
            <Button size="sm" variant="outline" onClick={() => setLeaveModalOpen(true)}>
              <Plus size={14} />
              Request Leave
            </Button>
          </div>
          {requests.length === 0 ? (
            <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
              <CalendarOff className="text-emerald" size={40} />
              <p className="font-semibold text-textdark">No leave requests</p>
            </div>
          ) : (
            <div className="card-surface overflow-x-auto p-0">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-black/5 text-xs uppercase text-midgray">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Employee</th>
                    <th className="px-5 py-3 font-semibold">Type</th>
                    <th className="px-5 py-3 font-semibold">From - To</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {requests.map((r) => (
                    <tr key={r.id}>
                      <td className="px-5 py-3 font-semibold text-textdark">{r.memberName}</td>
                      <td className="px-5 py-3 text-midgray capitalize">{r.leaveType}</td>
                      <td className="px-5 py-3 text-midgray">
                        {formatDate(new Date(r.startsOn).getTime())} – {formatDate(new Date(r.endsOn).getTime())}
                      </td>
                      <td className="px-5 py-3">
                        <Badge tone={LEAVE_TONE[r.status]}>{r.status}</Badge>
                      </td>
                      <td className="px-5 py-3 text-right">
                        {r.status === 'pending' && (
                          <div className="flex justify-end gap-3">
                            <button onClick={() => updateLeaveStatus(r.id, 'approved')} className="text-sm font-semibold text-emerald hover:underline">
                              Approve
                            </button>
                            <button onClick={() => updateLeaveStatus(r.id, 'declined')} className="text-sm font-semibold text-midgray hover:underline">
                              Decline
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Employee">
        <div className="space-y-4">
          <Input label="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Role" placeholder="e.g. Store Manager" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Button onClick={handleInvite} disabled={inviting} className="w-full">
            {inviting ? 'Adding…' : 'Add Employee'}
          </Button>
        </div>
      </Modal>

      <Modal open={leaveModalOpen} onClose={() => setLeaveModalOpen(false)} title="Request Leave">
        <div className="space-y-4">
          <Select
            label="Employee"
            required
            placeholder="Select employee"
            options={members.map((m) => ({ value: m.name, label: m.name }))}
            value={leaveForm.memberName}
            onChange={(e) => setLeaveForm({ ...leaveForm, memberName: e.target.value })}
          />
          <Select
            label="Leave type"
            options={LEAVE_TYPES}
            value={leaveForm.leaveType}
            onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value as LeaveType })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="From" type="date" required value={leaveForm.startsOn} onChange={(e) => setLeaveForm({ ...leaveForm, startsOn: e.target.value })} />
            <Input label="To" type="date" required value={leaveForm.endsOn} onChange={(e) => setLeaveForm({ ...leaveForm, endsOn: e.target.value })} />
          </div>
          <Button onClick={handleLeaveRequest} className="w-full">
            Submit Request
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

import { useState } from 'react'
import { Plus, Users, Trash2 } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useBusiness } from '../../hooks/useBusiness'
import { useTeam } from '../../hooks/useTeam'
import { initials } from '../../lib/utils'
import type { TeamMemberStatus } from '../../types'

const STATUS_TONE: Record<TeamMemberStatus, 'emerald' | 'gold' | 'gray'> = {
  active: 'emerald',
  invited: 'gold',
  inactive: 'gray',
}

export default function Team() {
  const { business } = useBusiness()
  const { members, loading, inviteMember, removeMember } = useTeam(business?.id)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', email: '' })
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

  return (
    <AppShell title="Team">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-textdark">Your Team</h2>
          <p className="text-sm text-midgray">HRBot helps with recruitment, interview scheduling, and onboarding.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          Invite Member
        </Button>
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : members.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <Users className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No team members yet</p>
          <p className="max-w-sm text-sm text-midgray">Invite your first team member to start onboarding with HRBot.</p>
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
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Invite Team Member">
        <div className="space-y-4">
          <Input label="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Role" placeholder="e.g. Store Manager" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Button onClick={handleInvite} disabled={inviting} className="w-full">
            {inviting ? 'Inviting…' : 'Send Invite'}
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

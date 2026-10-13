import { useState } from 'react'
import { Plus, ClipboardList, Clock, CheckCircle2, AlertTriangle } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { useBusiness } from '../../hooks/useBusiness'
import { useTasks } from '../../hooks/useTasks'
import { formatDate, cn } from '../../lib/utils'
import type { TaskPriority, TaskStatus } from '../../types'

const PRIORITY_TONE: Record<TaskPriority, 'red' | 'gold' | 'gray'> = { high: 'red', medium: 'gold', low: 'gray' }
const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  completed: 'Completed',
  overdue: 'Overdue',
}

const TABS: { id: 'all' | TaskStatus; label: string }[] = [
  { id: 'all', label: 'All Tasks' },
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
]

export default function Tasks() {
  const { business } = useBusiness()
  const { tasks, loading, createTask, updateTaskStatus, deleteTask } = useTasks(business?.id)
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ title: '', project: '', assignee: '', priority: 'medium' as TaskPriority, dueDate: '' })
  const [creating, setCreating] = useState(false)

  async function handleCreate() {
    if (!business || !form.title) return
    setCreating(true)
    try {
      await createTask({
        businessId: business.id,
        title: form.title,
        project: form.project,
        assignee: form.assignee,
        priority: form.priority,
        dueDate: form.dueDate ? new Date(form.dueDate).getTime() : undefined,
      })
      setForm({ title: '', project: '', assignee: '', priority: 'medium', dueDate: '' })
      setModalOpen(false)
    } finally {
      setCreating(false)
    }
  }

  const filtered = tab === 'all' ? tasks : tasks.filter((t) => t.status === tab)
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length
  const completed = tasks.filter((t) => t.status === 'completed').length
  const overdue = tasks.filter((t) => t.status === 'overdue').length

  return (
    <AppShell
      title="Tasks"
      subtitle="Organize, assign and track tasks across your team."
      primaryAction={{ label: 'New Task', icon: <Plus size={16} />, onClick: () => setModalOpen(true) }}
    >
      <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Tasks" value={tasks.length} icon={ClipboardList} tone="emerald" />
        <StatsCard label="In Progress" value={inProgress} icon={Clock} tone="teal" />
        <StatsCard label="Completed" value={completed} icon={CheckCircle2} tone="gold" />
        <StatsCard label="Overdue" value={overdue} icon={AlertTriangle} tone="navy" />
      </div>

      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-black/5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'shrink-0 border-b-2 px-4 py-2.5 text-sm font-semibold transition',
              tab === t.id ? 'border-emerald text-emerald-dark' : 'border-transparent text-midgray hover:text-textdark'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : filtered.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <ClipboardList className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No tasks here</p>
        </div>
      ) : (
        <div className="card-surface overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 text-xs uppercase text-midgray">
              <tr>
                <th className="px-5 py-3 font-semibold">Task</th>
                <th className="px-5 py-3 font-semibold">Assignee</th>
                <th className="px-5 py-3 font-semibold">Priority</th>
                <th className="px-5 py-3 font-semibold">Due</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td className="px-5 py-3">
                    <p className="font-semibold text-textdark">{t.title}</p>
                    {t.project && <p className="text-xs text-midgray">{t.project}</p>}
                  </td>
                  <td className="px-5 py-3 text-midgray">{t.assignee || '—'}</td>
                  <td className="px-5 py-3">
                    <Badge tone={PRIORITY_TONE[t.priority]}>{t.priority}</Badge>
                  </td>
                  <td className="px-5 py-3 text-midgray">{t.dueDate ? formatDate(t.dueDate) : '—'}</td>
                  <td className="px-5 py-3">
                    <Select
                      options={Object.entries(STATUS_LABEL).map(([value, label]) => ({ value, label }))}
                      value={t.status}
                      onChange={(e) => updateTaskStatus(t.id, e.target.value as TaskStatus)}
                      className="h-8 w-32 py-0 text-xs"
                    />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => deleteTask(t.id)} className="text-sm font-semibold text-midgray hover:text-red-600">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Task">
        <div className="space-y-4">
          <Input label="Task title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Project" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
            <Input label="Assignee" value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as TaskPriority })}
            />
            <Input label="Due date" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          </div>
          <Button onClick={handleCreate} disabled={creating} className="w-full">
            {creating ? 'Adding…' : 'Add Task'}
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

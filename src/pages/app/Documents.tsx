import { useState } from 'react'
import { Plus, FileText, Trash2, ExternalLink } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useBusiness } from '../../hooks/useBusiness'
import { useDocuments } from '../../hooks/useDocuments'
import { formatDate } from '../../lib/utils'

export default function Documents() {
  const { business } = useBusiness()
  const { documents, loading, addDocument, removeDocument } = useDocuments(business?.id)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', category: 'General', url: '' })
  const [saving, setSaving] = useState(false)

  async function handleAdd() {
    if (!business || !form.name || !form.url) return
    setSaving(true)
    try {
      await addDocument(business.id, form.name, form.category, form.url)
      setForm({ name: '', category: 'General', url: '' })
      setModalOpen(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppShell
      title="Documents"
      subtitle="Store and organize links to the documents your business relies on."
      primaryAction={{ label: 'Add Document', icon: <Plus size={16} />, onClick: () => setModalOpen(true) }}
    >
      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : documents.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <FileText className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No documents yet</p>
          <p className="max-w-sm text-sm text-midgray">
            Add links to contracts, policies, and other business documents to keep them organized in one place.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((d) => (
            <div key={d.id} className="card-surface flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <FileText size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-textdark">{d.name}</p>
                <Badge tone="gray" className="mt-1">
                  {d.category}
                </Badge>
                <p className="mt-2 text-xs text-midgray">{formatDate(d.createdAt)}</p>
                <div className="mt-3 flex items-center gap-3">
                  {d.url && (
                    <a href={d.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-semibold text-emerald hover:underline">
                      Open <ExternalLink size={12} />
                    </a>
                  )}
                  <button onClick={() => removeDocument(d.id)} className="text-xs font-semibold text-midgray hover:text-red-600">
                    <Trash2 size={13} className="inline" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Document">
        <div className="space-y-4">
          <Input label="Document name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input label="Link (URL)" required placeholder="https://…" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <Button onClick={handleAdd} disabled={saving} className="w-full">
            {saving ? 'Adding…' : 'Add Document'}
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

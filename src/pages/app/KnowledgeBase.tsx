import { useState } from 'react'
import { Plus, BookOpen, Trash2, Pencil } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useBusiness } from '../../hooks/useBusiness'
import { useKnowledgeBase } from '../../hooks/useKnowledgeBase'
import { formatRelativeTime } from '../../lib/utils'
import type { KnowledgeArticle } from '../../types'

export default function KnowledgeBase() {
  const { business } = useBusiness()
  const { articles, loading, createArticle, updateArticle, deleteArticle } = useKnowledgeBase(business?.id)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<KnowledgeArticle | null>(null)
  const [form, setForm] = useState({ title: '', content: '' })
  const [saving, setSaving] = useState(false)

  function openNew() {
    setEditing(null)
    setForm({ title: '', content: '' })
    setModalOpen(true)
  }

  function openEdit(article: KnowledgeArticle) {
    setEditing(article)
    setForm({ title: article.title, content: article.content })
    setModalOpen(true)
  }

  async function handleSave() {
    if (!business || !form.title || !form.content) return
    setSaving(true)
    try {
      if (editing) {
        await updateArticle(editing.id, form.title, form.content)
      } else {
        await createArticle(business.id, form.title, form.content)
      }
      setModalOpen(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppShell title="Knowledge Base">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-textdark">Business Knowledge</h2>
          <p className="text-sm text-midgray">SupportBot and SalesBot draw on these articles to answer customers accurately.</p>
        </div>
        <Button onClick={openNew}>
          <Plus size={16} />
          Add Article
        </Button>
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : articles.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-16 text-center">
          <BookOpen className="text-emerald" size={40} />
          <p className="font-semibold text-textdark">No articles yet</p>
          <p className="max-w-sm text-sm text-midgray">
            Add pricing details, policies, and common questions so your AI Employees always answer correctly.
          </p>
          <Button onClick={openNew} className="mt-2">
            <Plus size={16} />
            Add Article
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="flex flex-col">
              <p className="font-display font-bold text-textdark">{article.title}</p>
              <p className="mt-2 flex-1 text-sm text-midgray line-clamp-4">{article.content}</p>
              <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
                <span className="text-xs text-midgray">{formatRelativeTime(article.updatedAt)}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(article)} aria-label="Edit" className="rounded-lg p-1.5 text-midgray hover:bg-black/5 hover:text-textdark">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => deleteArticle(article.id)} aria-label="Delete" className="rounded-lg p-1.5 text-midgray hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Article' : 'Add Article'}>
        <div className="space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-textdark">Content</label>
            <textarea
              rows={6}
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-textdark focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
              placeholder="e.g. We deliver across Soweto Monday to Saturday, 8am to 6pm. Delivery is R35, free over R500."
            />
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Article'}
          </Button>
        </div>
      </Modal>
    </AppShell>
  )
}

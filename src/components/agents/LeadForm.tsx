import { useState, type FormEvent } from 'react'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

interface Props {
  onSubmit: (data: { name: string; phone: string; email: string; queryType: string }) => Promise<void>
}

const QUERY_TYPES = [
  { value: 'general', label: 'General enquiry' },
  { value: 'quote', label: 'Request a quote' },
  { value: 'support', label: 'Customer support' },
  { value: 'partnership', label: 'Partnership' },
]

export function LeadForm({ onSubmit }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', queryType: 'general' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit(form)
      setDone(true)
      setForm({ name: '', phone: '', email: '', queryType: 'general' })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-xl bg-emerald/10 p-6 text-center">
        <p className="font-semibold text-emerald-dark">Thanks! We've captured your details.</p>
        <button onClick={() => setDone(false)} className="mt-2 text-sm text-emerald hover:underline">
          Submit another lead
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Name" name="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Phone"
          name="phone"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <Select
        label="What do you need help with?"
        name="queryType"
        options={QUERY_TYPES}
        value={form.queryType}
        onChange={(e) => setForm({ ...form, queryType: e.target.value })}
      />
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Submitting…' : 'Submit'}
      </Button>
    </form>
  )
}

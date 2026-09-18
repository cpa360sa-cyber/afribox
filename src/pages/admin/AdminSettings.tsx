import { useState } from 'react'
import { Megaphone } from 'lucide-react'
import { AdminShell } from '../../components/layout/AdminShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { supabase } from '../../lib/supabase'

export default function AdminSettings() {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleBroadcast() {
    if (!message.trim()) return
    setSending(true)
    try {
      await supabase.from('broadcasts').insert({ message })
      setMessage('')
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <AdminShell title="Platform Settings">
      <Card>
        <CardHeader>
          <CardTitle>Broadcast Message</CardTitle>
        </CardHeader>
        <p className="mb-4 text-sm text-midgray">
          Send an update to every AfriBox client — shown as a banner in their dashboard.
        </p>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. New Voice AI features are now live!"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-textdark focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
        />
        <div className="mt-4 flex items-center gap-3">
          <Button onClick={handleBroadcast} disabled={sending || !message.trim()}>
            <Megaphone size={16} />
            {sending ? 'Sending…' : 'Send Broadcast'}
          </Button>
          {sent && <span className="text-sm font-medium text-emerald">Broadcast sent!</span>}
        </div>
      </Card>
    </AdminShell>
  )
}

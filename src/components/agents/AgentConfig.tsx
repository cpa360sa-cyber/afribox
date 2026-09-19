import { useState } from 'react'
import { Save } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import type { Agent, AgentConfig as AgentConfigType } from '../../types'

interface Props {
  agent: Agent
  onSave: (config: AgentConfigType) => Promise<void>
}

export function AgentConfig({ agent, onSave }: Props) {
  const [config, setConfig] = useState<AgentConfigType>(agent.config ?? {})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    try {
      await onSave(config)
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      {agent.type === 'salesbot' && (
        <>
          <Input
            label="WhatsApp Business number"
            placeholder="+27 82 000 0000"
            value={config.whatsappNumber ?? ''}
            onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
          />
          <Input
            label="Facebook Page URL"
            placeholder="https://facebook.com/yourbusiness"
            value={config.facebookPageUrl ?? ''}
            onChange={(e) => setConfig({ ...config, facebookPageUrl: e.target.value })}
          />
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-textdark">
              Qualifying questions (one per line)
            </label>
            <textarea
              rows={4}
              value={(config.qualifyingQuestions ?? []).join('\n')}
              onChange={(e) =>
                setConfig({ ...config, qualifyingQuestions: e.target.value.split('\n').filter(Boolean) })
              }
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-textdark focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/30"
              placeholder={'What service are you interested in?\nWhat is your budget range?'}
            />
          </div>
          <p className="text-sm text-midgray">
            This agent uses your Business Profile FAQs and tone settings from{' '}
            <a href="/app/settings" className="font-semibold text-emerald hover:underline">
              Settings
            </a>
            . Update them there to change how {agent.name} responds.
          </p>
        </>
      )}

      {agent.type === 'adminbot' && (
        <>
          <Input
            label="Reminder lead time (hours before booking)"
            type="number"
            min={1}
            placeholder="24"
            value={config.reminderLeadTimeHours ?? ''}
            onChange={(e) => setConfig({ ...config, reminderLeadTimeHours: Number(e.target.value) })}
          />
          <Input
            label="Calendar sync webhook (optional)"
            placeholder="https://hooks.zapier.com/…"
            value={config.webhookUrl ?? ''}
            onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
          />
          <p className="text-sm text-midgray">
            {agent.name} tracks bookings, sends reminders, and follows up on invoices — manage bookings on the{' '}
            <a href="/app/bookings" className="font-semibold text-emerald hover:underline">
              Bookings
            </a>{' '}
            page.
          </p>
        </>
      )}

      {agent.type === 'brandbot' && (
        <p className="text-sm text-midgray">
          {agent.name} keeps your branding consistent using assets generated in{' '}
          <a href="/app/brandbox" className="font-semibold text-emerald hover:underline">
            BrandBox
          </a>
          . Generate a logo, bio, or slogan there and {agent.name} will keep your profile aligned with it.
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleSave} disabled={saving}>
          <Save size={16} />
          {saving ? 'Saving…' : 'Save Configuration'}
        </Button>
        {saved && <span className="text-sm font-medium text-emerald">Saved!</span>}
      </div>
    </div>
  )
}

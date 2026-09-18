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
      {agent.type === 'voice' && (
        <>
          <div className="rounded-xl bg-gold/10 px-4 py-3 text-sm text-[#8a6f1f]">
            Voice AI is coming soon. Fill in your details below and we'll activate your agent as soon as Vapi
            integration goes live.
          </div>
          <Input
            label="Vapi Webhook URL"
            placeholder="https://api.vapi.ai/webhook/…"
            value={config.webhookUrl ?? ''}
            onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
          />
          <Input
            label="Business phone number"
            placeholder="+27 12 345 6789"
            value={config.phoneNumber ?? ''}
            onChange={(e) => setConfig({ ...config, phoneNumber: e.target.value })}
          />
          <Input
            label="Voice persona"
            placeholder="e.g. Warm, professional female voice"
            value={config.voicePersona ?? ''}
            onChange={(e) => setConfig({ ...config, voicePersona: e.target.value })}
          />
        </>
      )}

      {agent.type === 'workflow' && (
        <Input
          label="Webhook URL (n8n / Zapier / Make)"
          placeholder="https://hooks.zapier.com/…"
          value={config.webhookUrl ?? ''}
          onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
        />
      )}

      {agent.type === 'salesbot' && (
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
      )}

      {agent.type === 'chatbot' && (
        <p className="text-sm text-midgray">
          This agent uses your Business Profile FAQs and tone settings from{' '}
          <a href="/app/settings" className="font-semibold text-emerald hover:underline">
            Settings
          </a>
          . Update them there to change how {agent.name} responds.
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

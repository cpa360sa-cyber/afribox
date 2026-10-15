import { useState } from 'react'
import { MessageCircle, CreditCard, Calendar, Mail, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useBusiness } from '../../hooks/useBusiness'
import { useIntegrations } from '../../hooks/useIntegrations'
import { formatRelativeTime } from '../../lib/utils'
import type { Integration, IntegrationProvider } from '../../types'

interface FieldDef {
  key: string
  label: string
  placeholder: string
  type?: string
}

interface ProviderDef {
  provider: IntegrationProvider
  name: string
  icon: typeof MessageCircle
  copy: string
  fields: FieldDef[]
  helpUrl: string
}

const PROVIDERS: ProviderDef[] = [
  {
    provider: 'whatsapp',
    name: 'WhatsApp Business API',
    icon: MessageCircle,
    copy: 'Power SalesBot and SupportBot conversations over WhatsApp.',
    fields: [
      { key: 'phoneNumberId', label: 'Phone Number ID', placeholder: '109876543210123' },
      { key: 'accessToken', label: 'Permanent Access Token', placeholder: 'EAAG...', type: 'password' },
    ],
    helpUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api/get-started',
  },
  {
    provider: 'stripe',
    name: 'Stripe',
    icon: CreditCard,
    copy: 'Accept international card payments.',
    fields: [{ key: 'secretKey', label: 'Secret key', placeholder: 'sk_live_…', type: 'password' }],
    helpUrl: 'https://dashboard.stripe.com/apikeys',
  },
  {
    provider: 'paystack',
    name: 'Paystack',
    icon: CreditCard,
    copy: 'Accept payments across Africa.',
    fields: [{ key: 'secretKey', label: 'Secret key', placeholder: 'sk_live_…', type: 'password' }],
    helpUrl: 'https://dashboard.paystack.com/#/settings/developer',
  },
  {
    provider: 'yoco',
    name: 'Yoco',
    icon: CreditCard,
    copy: 'South African card payments and POS.',
    fields: [{ key: 'secretKey', label: 'Secret key', placeholder: 'sk_live_…', type: 'password' }],
    helpUrl: 'https://portal.yoco.com/settings/api-keys',
  },
]

const COMING_SOON = [
  { name: 'Google Calendar', icon: Calendar, copy: 'Two-way sync with your Calendar module.' },
  { name: 'Outlook', icon: Mail, copy: 'Sync email and calendar with Microsoft 365.' },
]

function statusBadge(integration: Integration | undefined) {
  if (!integration || integration.status === 'disconnected') return <Badge tone="gray">Not connected</Badge>
  if (integration.status === 'connected') return <Badge tone="emerald">Connected</Badge>
  return <Badge tone="red">Connection failed</Badge>
}

export default function Integrations() {
  const { business } = useBusiness()
  const { integrations, loading, connect, disconnect } = useIntegrations(business?.id)
  const [modalProvider, setModalProvider] = useState<ProviderDef | null>(null)
  const [form, setForm] = useState<Record<string, string>>({})
  const [connecting, setConnecting] = useState(false)
  const [modalError, setModalError] = useState('')

  function byProvider(provider: IntegrationProvider) {
    return integrations.find((i) => i.provider === provider)
  }

  function openModal(def: ProviderDef) {
    const existing = byProvider(def.provider)
    setForm(existing?.credentials ?? {})
    setModalError('')
    setModalProvider(def)
  }

  async function handleConnect() {
    if (!business || !modalProvider) return
    setConnecting(true)
    setModalError('')
    const result = await connect(business.id, modalProvider.provider, form)
    setConnecting(false)
    if (result.success) {
      setModalProvider(null)
    } else {
      setModalError(result.error ?? 'Connection failed. Please check your credentials.')
    }
  }

  return (
    <AppShell title="Integrations" subtitle="Connect AfriBox to the tools you already use.">
      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROVIDERS.map((def) => {
              const integration = byProvider(def.provider)
              return (
                <div key={def.provider} className="card-surface flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <def.icon size={20} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-textdark">{def.name}</p>
                      {statusBadge(integration)}
                    </div>
                    <p className="mt-1 text-sm text-midgray">{def.copy}</p>
                    {integration?.status === 'connected' && integration.lastCheckedAt && (
                      <p className="mt-1 text-xs text-midgray">
                        Verified {formatRelativeTime(integration.lastCheckedAt)}
                      </p>
                    )}
                    {integration?.status === 'failed' && integration.lastError && (
                      <p className="mt-1 text-xs text-red-600">{integration.lastError}</p>
                    )}
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openModal(def)}>
                        {integration?.status === 'connected' ? 'Reconnect' : 'Connect'}
                      </Button>
                      {integration?.status === 'connected' && business && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => disconnect(business.id, def.provider)}
                        >
                          Disconnect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="mb-3 mt-10 text-sm font-semibold text-midgray">Requires account setup</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMING_SOON.map((i) => (
              <div key={i.name} className="card-surface flex items-start gap-3 opacity-70">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/5 text-midgray">
                  <i.icon size={20} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-textdark">{i.name}</p>
                    <Badge tone="gray">Coming soon</Badge>
                  </div>
                  <p className="mt-1 text-sm text-midgray">{i.copy}</p>
                  <p className="mt-2 text-xs text-midgray">
                    Needs an OAuth app registered with {i.name.includes('Google') ? 'Google' : 'Microsoft'} — reach
                    out from the Help Center to set this up.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal open={!!modalProvider} onClose={() => setModalProvider(null)} title={`Connect ${modalProvider?.name ?? ''}`}>
        {modalProvider && (
          <div className="space-y-4">
            <p className="text-sm text-midgray">
              Your key is verified directly against {modalProvider.name}'s API before we save it — nothing is
              marked "Connected" unless it actually works.{' '}
              <a href={modalProvider.helpUrl} target="_blank" rel="noreferrer" className="font-semibold text-emerald hover:underline">
                Find your credentials →
              </a>
            </p>
            {modalProvider.fields.map((f) => (
              <Input
                key={f.key}
                label={f.label}
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key] ?? ''}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            ))}
            {modalError && (
              <p className="flex items-center gap-1.5 text-sm text-red-600">
                <XCircle size={14} /> {modalError}
              </p>
            )}
            <Button onClick={handleConnect} disabled={connecting} className="w-full">
              {connecting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Verifying…
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} /> Verify & Connect
                </>
              )}
            </Button>
          </div>
        )}
      </Modal>
    </AppShell>
  )
}

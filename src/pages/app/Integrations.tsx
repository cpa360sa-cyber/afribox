import { MessageCircle, CreditCard, Calendar, Mail } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Badge } from '../../components/ui/Badge'

const integrations = [
  { name: 'WhatsApp Business API', icon: MessageCircle, copy: 'Power SalesBot and SupportBot conversations.' },
  { name: 'Stripe', icon: CreditCard, copy: 'Accept international card payments.' },
  { name: 'Paystack', icon: CreditCard, copy: 'Accept payments across Africa.' },
  { name: 'Yoco', icon: CreditCard, copy: 'South African card payments and POS.' },
  { name: 'Google Calendar', icon: Calendar, copy: 'Two-way sync with your Calendar module.' },
  { name: 'Outlook', icon: Mail, copy: 'Sync email and calendar with Microsoft 365.' },
]

export default function Integrations() {
  return (
    <AppShell title="Integrations" subtitle="Connect AfriBox to the tools you already use.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((i) => (
          <div key={i.name} className="card-surface flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
              <i.icon size={20} />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-textdark">{i.name}</p>
                <Badge tone="gray">Not connected</Badge>
              </div>
              <p className="mt-1 text-sm text-midgray">{i.copy}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-midgray">
        Connecting these requires API credentials from each provider. Reach out from the Help Center and we'll walk
        you through setup.
      </p>
    </AppShell>
  )
}

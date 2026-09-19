import { useState } from 'react'
import { CreditCard, Check } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { useAuth } from '../../hooks/useAuth'
import { PLANS, getPlan } from '../../constants/plans'
import { formatZAR, formatDate, cn } from '../../lib/utils'

export default function Billing() {
  const { appUser } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const plan = getPlan(appUser?.planId ?? 'starterbot')
  const nextBillingDate = Date.now() + 30 * 24 * 60 * 60 * 1000

  return (
    <AppShell title="Billing">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <Badge tone="emerald">Active</Badge>
          </CardHeader>
          <div className="flex items-center justify-between rounded-xl bg-emerald/5 p-5">
            <div>
              <p className="font-display text-xl font-bold text-textdark">{plan.name}</p>
              <p className="text-sm text-midgray">
                {plan.priceZAR !== null ? `${formatZAR(plan.priceZAR)}/month` : 'Custom pricing'}
              </p>
            </div>
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Change Plan
            </Button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-black/5 p-4">
              <CreditCard className="text-emerald" size={20} />
              <div>
                <p className="text-xs text-midgray">Next billing date</p>
                <p className="font-semibold text-textdark">{formatDate(nextBillingDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-black/5 p-4">
              <Check className="text-emerald" size={20} />
              <div>
                <p className="text-xs text-midgray">Payment method</p>
                <p className="font-semibold text-textdark">Paystack / Yoco / SnapScan — not yet connected</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Includes</CardTitle>
          </CardHeader>
          <ul className="space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-textdark">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald" />
                {f}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Choose a plan" className="max-w-3xl">
        <div className="grid gap-4 sm:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={cn(
                'flex flex-col rounded-2xl border-2 p-5',
                p.id === plan.id ? 'border-emerald bg-emerald/5' : 'border-black/10'
              )}
            >
              <p className="font-display font-bold text-textdark">{p.name}</p>
              <p className="mt-1 mb-4 font-display text-2xl font-extrabold text-textdark">
                {p.priceZAR !== null ? formatZAR(p.priceZAR) : 'Custom'}
              </p>
              {p.id === plan.id ? (
                <Badge tone="emerald" className="justify-center py-2">
                  Current Plan
                </Badge>
              ) : p.priceZAR !== null ? (
                <Button size="sm">Switch to {p.name}</Button>
              ) : (
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-emerald px-4 py-2 text-sm font-semibold text-emerald hover:bg-emerald/10"
                >
                  Contact Us
                </a>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </AppShell>
  )
}
